import { FluctuationFactor } from '@/types/budget';
import { logger } from '@/lib/logger';
import { monitorPerformance } from '@/lib/performance';

interface CalculationResult {
  monthlyAmounts: {
    year_month: string;
    amount: number;
    calculation_details: {
      factor_value: number;
      basis_value: number;
      formula: string;
    };
  }[];
  totalAmount: number;
}

interface ValidationError extends Error {
  code: string;
  details?: Record<string, unknown>;
}

export class CalculationService {
  private static readonly HEADCOUNT_UNIT_PRICE = 45000; // 1人あたりの単価（円）
  private static readonly REVENUE_LINKAGE_RATE = 0.05; // 売上高連動率（5%）

  /**
   * 変動要因に基づく予算額を計算します
   * @param factor 変動要因
   * @param basisValue 基準値
   * @param targetMonths 対象月
   * @returns 計算結果
   */
  public static async calculateFactorLinkedBudget(
    factor: FluctuationFactor,
    basisValue: number,
    targetMonths: string[]
  ): Promise<CalculationResult> {
    const startTime = performance.now();
    try {
      // 入力値の検証
      this.validateInputs(factor, basisValue, targetMonths);

      const monthlyAmounts = targetMonths.map(yearMonth => {
        const { amount, details } = this.calculateMonthlyAmount(
          factor,
          basisValue,
          yearMonth
        );

        return {
          year_month: yearMonth,
          amount,
          calculation_details: details
        };
      });

      const totalAmount = monthlyAmounts.reduce((sum, item) => sum + item.amount, 0);

      logger.info('Factor-linked budget calculated', {
        factorId: factor.factor_id,
        basisValue,
        totalAmount
      });

      return {
        monthlyAmounts,
        totalAmount
      };
    } catch (err) {
      logger.error('Failed to calculate factor-linked budget', { error: err });
      throw err;
    } finally {
      monitorPerformance('calculateFactorLinkedBudget', startTime);
    }
  }

  /**
   * 月別予算額を計算します
   * @param factor 変動要因
   * @param basisValue 基準値
   * @param yearMonth 対象年月
   * @returns 計算結果と詳細
   */
  private static calculateMonthlyAmount(
    factor: FluctuationFactor,
    basisValue: number,
    yearMonth: string
  ): { amount: number; details: { factor_value: number; basis_value: number; formula: string } } {
    let amount: number;
    let formula: string;

    switch (factor.factor_type) {
      case 'headcount':
        amount = basisValue * this.HEADCOUNT_UNIT_PRICE;
        formula = `${basisValue}人 × ${this.HEADCOUNT_UNIT_PRICE.toLocaleString()}円`;
        break;
      case 'revenue':
        amount = basisValue * this.REVENUE_LINKAGE_RATE;
        formula = `${basisValue.toLocaleString()}円 × ${(this.REVENUE_LINKAGE_RATE * 100)}%`;
        break;
      default:
        throw this.createValidationError('INVALID_FACTOR_TYPE', {
          factorType: factor.factor_type
        });
    }

    return {
      amount,
      details: {
        factor_value: basisValue,
        basis_value: factor.factor_type === 'headcount' ? this.HEADCOUNT_UNIT_PRICE : this.REVENUE_LINKAGE_RATE,
        formula
      }
    };
  }

  /**
   * 入力値の検証を行います
   * @param factor 変動要因
   * @param basisValue 基準値
   * @param targetMonths 対象月
   */
  private static validateInputs(
    factor: FluctuationFactor,
    basisValue: number,
    targetMonths: string[]
  ): void {
    // 変動要因の検証
    if (!factor.is_active) {
      throw this.createValidationError('INACTIVE_FACTOR', {
        factorId: factor.factor_id
      });
    }

    // 基準値の検証
    if (basisValue <= 0) {
      throw this.createValidationError('INVALID_BASIS_VALUE', {
        basisValue
      });
    }

    // 対象月の検証
    if (!targetMonths.length) {
      throw this.createValidationError('EMPTY_TARGET_MONTHS');
    }

    // 年月フォーマットの検証（YYYYMM）
    const yearMonthRegex = /^\d{6}$/;
    const invalidMonths = targetMonths.filter(month => !yearMonthRegex.test(month));
    if (invalidMonths.length > 0) {
      throw this.createValidationError('INVALID_YEAR_MONTH_FORMAT', {
        invalidMonths
      });
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