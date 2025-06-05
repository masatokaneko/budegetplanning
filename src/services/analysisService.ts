import { Budget, Actual, VarianceAnalysis, KPIAnalysis } from '@/types/budget';
import { logger } from '@/lib/logger';
import { monitorPerformance } from '@/lib/performance';

interface ValidationError extends Error {
  code: string;
  details?: Record<string, unknown>;
}

export class AnalysisService {
  private static readonly SIGNIFICANT_VARIANCE_THRESHOLD = 0.1; // 10%以上の差異を重要とみなす
  private static readonly TOP_N_VARIANCES = 5; // 上位N件の差異を抽出

  /**
   * 予実差異分析を実行します
   * @param budgets 予算データ
   * @param actuals 実績データ
   * @param yearMonth 対象年月
   * @returns 差異分析結果
   */
  public static async analyzeVariance(
    budgets: Budget[],
    actuals: Actual[],
    yearMonth: string
  ): Promise<VarianceAnalysis[]> {
    const startTime = performance.now();
    try {
      // 入力値の検証
      this.validateInputs(budgets, actuals, yearMonth);

      // 予算と実績を科目IDでグループ化
      const budgetMap = this.groupByAccountId(budgets);
      const actualMap = this.groupByAccountId(actuals);

      // 差異分析の実行
      const analysis: VarianceAnalysis[] = [];
      for (const [accountId, budgetItems] of budgetMap) {
        const actualItems = actualMap.get(accountId) || [];
        const variance = this.calculateVariance(budgetItems, actualItems, yearMonth);
        if (variance) {
          analysis.push(variance);
        }
      }

      // 差異の大きい順にソート
      analysis.sort((a, b) => Math.abs(b.variance_amount) - Math.abs(a.variance_amount));

      logger.info('Variance analysis completed', {
        yearMonth,
        totalAccounts: analysis.length
      });

      return analysis;
    } catch (err) {
      logger.error('Failed to analyze variance', { error: err });
      throw err;
    } finally {
      monitorPerformance('analyzeVariance', startTime);
    }
  }

  /**
   * KPI分析を実行します
   * @param budgets 予算データ
   * @param actuals 実績データ
   * @param yearMonth 対象年月
   * @returns KPI分析結果
   */
  public static async analyzeKPI(
    budgets: Budget[],
    actuals: Actual[],
    yearMonth: string
  ): Promise<KPIAnalysis> {
    const startTime = performance.now();
    try {
      // 入力値の検証
      this.validateInputs(budgets, actuals, yearMonth);

      // 予算と実績の合計を計算
      const totalBudget = this.calculateTotalAmount(budgets, yearMonth);
      const totalActual = this.calculateTotalAmount(actuals, yearMonth);

      // KPIの計算
      const achievementRate = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;
      const varianceRate = totalBudget > 0 ? ((totalActual - totalBudget) / totalBudget) * 100 : 0;

      // 重要差異の抽出
      const significantVariances = this.extractSignificantVariances(budgets, actuals, yearMonth);

      const analysis: KPIAnalysis = {
        year_month: yearMonth,
        total_budget: totalBudget,
        total_actual: totalActual,
        achievement_rate: achievementRate,
        variance_rate: varianceRate,
        significant_variances: significantVariances
      };

      logger.info('KPI analysis completed', {
        yearMonth,
        achievementRate,
        varianceRate
      });

      return analysis;
    } catch (err) {
      logger.error('Failed to analyze KPI', { error: err });
      throw err;
    } finally {
      monitorPerformance('analyzeKPI', startTime);
    }
  }

  /**
   * 予算と実績の差異を計算します
   * @param budgets 予算データ
   * @param actuals 実績データ
   * @param yearMonth 対象年月
   * @returns 差異分析結果
   */
  private static calculateVariance(
    budgets: Budget[],
    actuals: Actual[],
    yearMonth: string
  ): VarianceAnalysis | null {
    const budgetAmount = this.calculateTotalAmount(budgets, yearMonth);
    const actualAmount = this.calculateTotalAmount(actuals, yearMonth);

    if (budgetAmount === 0 && actualAmount === 0) {
      return null;
    }

    const varianceAmount = actualAmount - budgetAmount;
    const varianceRate = budgetAmount !== 0 ? (varianceAmount / budgetAmount) * 100 : 0;

    return {
      account_id: budgets[0]?.account_id || actuals[0]?.account_id,
      account_name: budgets[0]?.account_name || actuals[0]?.account_name,
      account_type: budgets[0]?.account_type || actuals[0]?.account_type,
      year_month: yearMonth,
      budget_amount: budgetAmount,
      actual_amount: actualAmount,
      variance_amount: varianceAmount,
      variance_rate: varianceRate,
      is_significant: Math.abs(varianceRate) >= this.SIGNIFICANT_VARIANCE_THRESHOLD * 100
    };
  }

  /**
   * 重要差異を抽出します
   * @param budgets 予算データ
   * @param actuals 実績データ
   * @param yearMonth 対象年月
   * @returns 重要差異のリスト
   */
  private static extractSignificantVariances(
    budgets: Budget[],
    actuals: Actual[],
    yearMonth: string
  ): VarianceAnalysis[] {
    const budgetMap = this.groupByAccountId(budgets);
    const actualMap = this.groupByAccountId(actuals);

    const variances: VarianceAnalysis[] = [];
    for (const [accountId, budgetItems] of budgetMap) {
      const actualItems = actualMap.get(accountId) || [];
      const variance = this.calculateVariance(budgetItems, actualItems, yearMonth);
      if (variance && variance.is_significant) {
        variances.push(variance);
      }
    }

    // 差異の大きい順にソートして上位N件を返す
    return variances
      .sort((a, b) => Math.abs(b.variance_amount) - Math.abs(a.variance_amount))
      .slice(0, this.TOP_N_VARIANCES);
  }

  /**
   * 合計金額を計算します
   * @param items 予算または実績データ
   * @param yearMonth 対象年月
   * @returns 合計金額
   */
  private static calculateTotalAmount(
    items: (Budget | Actual)[],
    yearMonth: string
  ): number {
    return items
      .filter(item => item.year_month === yearMonth)
      .reduce((sum, item) => sum + item.amount, 0);
  }

  /**
   * 科目IDでグループ化します
   * @param items 予算または実績データ
   * @returns グループ化されたデータ
   */
  private static groupByAccountId(
    items: (Budget | Actual)[]
  ): Map<string, (Budget | Actual)[]> {
    return items.reduce((map, item) => {
      const accountId = item.account_id;
      const group = map.get(accountId) || [];
      group.push(item);
      map.set(accountId, group);
      return map;
    }, new Map<string, (Budget | Actual)[]>());
  }

  /**
   * 入力値の検証を行います
   * @param budgets 予算データ
   * @param actuals 実績データ
   * @param yearMonth 対象年月
   */
  private static validateInputs(
    budgets: Budget[],
    actuals: Actual[],
    yearMonth: string
  ): void {
    // 年月フォーマットの検証（YYYYMM）
    const yearMonthRegex = /^\d{6}$/;
    if (!yearMonthRegex.test(yearMonth)) {
      throw this.createValidationError('INVALID_YEAR_MONTH_FORMAT', {
        yearMonth
      });
    }

    // データの存在確認
    if (!budgets.length && !actuals.length) {
      throw this.createValidationError('NO_DATA_AVAILABLE');
    }
  }

  /**
   * 検証エラーを作成します
   * @param code エラーコード
   * @param details エラー詳細
   * @returns 検証エラー
   */
  private static createValidationError(
    code: string,
    details?: Record<string, unknown>
  ): ValidationError {
    const error = new Error('Validation error') as ValidationError;
    error.code = code;
    error.details = details;
    return error;
  }
} 