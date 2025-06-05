import { useState, useCallback } from 'react';
import { Budget, BudgetGridData } from '@/types/budget';
import { Actual, ActualGridData } from '@/types/actual';
import { logger } from '@/lib/logger';
import { performanceMonitor } from '@/lib/performance';

interface VarianceAnalysis {
  account_id: string;
  account_name: string;
  account_type: 'cost_of_sales' | 'selling_admin';
  budget_amount: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
  monthly_breakdown: MonthlyVariance[];
}

interface MonthlyVariance {
  year_month: string;
  budget_amount: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
}

interface KPIAnalysis {
  total_budget: number;
  total_actual: number;
  total_variance: number;
  total_variance_percentage: number;
  cost_of_sales_variance: number;
  selling_admin_variance: number;
  monthly_kpis: MonthlyKPI[];
}

interface MonthlyKPI {
  year_month: string;
  budget_amount: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
  cost_of_sales_variance: number;
  selling_admin_variance: number;
}

export const useAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 予算と実績の差異分析
  const analyzeVariance = useCallback((
    budgets: Budget[],
    actuals: Actual[],
    yearMonth?: string
  ): VarianceAnalysis[] => {
    performanceMonitor.startMeasure('analyzeVariance');
    try {
      const filteredBudgets = yearMonth
        ? budgets.filter(b => b.year_month === yearMonth)
        : budgets;
      const filteredActuals = yearMonth
        ? actuals.filter(a => a.year_month === yearMonth)
        : actuals;

      const varianceMap = new Map<string, VarianceAnalysis>();

      // 予算データの集計
      filteredBudgets.forEach(budget => {
        if (!varianceMap.has(budget.account_id)) {
          varianceMap.set(budget.account_id, {
            account_id: budget.account_id,
            account_name: budget.account_name,
            account_type: budget.account_type,
            budget_amount: 0,
            actual_amount: 0,
            variance: 0,
            variance_percentage: 0,
            monthly_breakdown: []
          });
        }

        const analysis = varianceMap.get(budget.account_id)!;
        analysis.budget_amount += budget.budget_amount;

        // 月次内訳の追加
        const monthlyIndex = analysis.monthly_breakdown.findIndex(
          m => m.year_month === budget.year_month
        );

        if (monthlyIndex === -1) {
          analysis.monthly_breakdown.push({
            year_month: budget.year_month,
            budget_amount: budget.budget_amount,
            actual_amount: 0,
            variance: 0,
            variance_percentage: 0
          });
        } else {
          analysis.monthly_breakdown[monthlyIndex].budget_amount += budget.budget_amount;
        }
      });

      // 実績データの集計
      filteredActuals.forEach(actual => {
        if (!varianceMap.has(actual.account_id)) {
          varianceMap.set(actual.account_id, {
            account_id: actual.account_id,
            account_name: actual.account_name,
            account_type: actual.account_type,
            budget_amount: 0,
            actual_amount: 0,
            variance: 0,
            variance_percentage: 0,
            monthly_breakdown: []
          });
        }

        const analysis = varianceMap.get(actual.account_id)!;
        analysis.actual_amount += actual.actual_amount;

        // 月次内訳の更新
        const monthlyIndex = analysis.monthly_breakdown.findIndex(
          m => m.year_month === actual.year_month
        );

        if (monthlyIndex === -1) {
          analysis.monthly_breakdown.push({
            year_month: actual.year_month,
            budget_amount: 0,
            actual_amount: actual.actual_amount,
            variance: 0,
            variance_percentage: 0
          });
        } else {
          analysis.monthly_breakdown[monthlyIndex].actual_amount += actual.actual_amount;
        }
      });

      // 差異の計算
      varianceMap.forEach(analysis => {
        analysis.variance = analysis.actual_amount - analysis.budget_amount;
        analysis.variance_percentage = analysis.budget_amount !== 0
          ? (analysis.variance / analysis.budget_amount) * 100
          : 0;

        analysis.monthly_breakdown.forEach(monthly => {
          monthly.variance = monthly.actual_amount - monthly.budget_amount;
          monthly.variance_percentage = monthly.budget_amount !== 0
            ? (monthly.variance / monthly.budget_amount) * 100
            : 0;
        });
      });

      return Array.from(varianceMap.values());
    } catch (err) {
      logger.error('差異分析に失敗しました', err);
      setError(err instanceof Error ? err : new Error('差異分析に失敗しました'));
      return [];
    } finally {
      performanceMonitor.endMeasure('analyzeVariance');
    }
  }, []);

  // KPI分析
  const analyzeKPI = useCallback((
    budgets: Budget[],
    actuals: Actual[],
    yearMonth?: string
  ): KPIAnalysis => {
    performanceMonitor.startMeasure('analyzeKPI');
    try {
      const varianceAnalysis = analyzeVariance(budgets, actuals, yearMonth);
      
      const totalBudget = varianceAnalysis.reduce((sum, v) => sum + v.budget_amount, 0);
      const totalActual = varianceAnalysis.reduce((sum, v) => sum + v.actual_amount, 0);
      const totalVariance = totalActual - totalBudget;
      const totalVariancePercentage = totalBudget !== 0
        ? (totalVariance / totalBudget) * 100
        : 0;

      const costOfSalesVariance = varianceAnalysis
        .filter(v => v.account_type === 'cost_of_sales')
        .reduce((sum, v) => sum + v.variance, 0);

      const sellingAdminVariance = varianceAnalysis
        .filter(v => v.account_type === 'selling_admin')
        .reduce((sum, v) => sum + v.variance, 0);

      // 月次KPIの計算
      const monthlyKPIs = new Map<string, MonthlyKPI>();
      
      varianceAnalysis.forEach(analysis => {
        analysis.monthly_breakdown.forEach(monthly => {
          if (!monthlyKPIs.has(monthly.year_month)) {
            monthlyKPIs.set(monthly.year_month, {
              year_month: monthly.year_month,
              budget_amount: 0,
              actual_amount: 0,
              variance: 0,
              variance_percentage: 0,
              cost_of_sales_variance: 0,
              selling_admin_variance: 0
            });
          }

          const kpi = monthlyKPIs.get(monthly.year_month)!;
          kpi.budget_amount += monthly.budget_amount;
          kpi.actual_amount += monthly.actual_amount;
          kpi.variance += monthly.variance;

          if (analysis.account_type === 'cost_of_sales') {
            kpi.cost_of_sales_variance += monthly.variance;
          } else if (analysis.account_type === 'selling_admin') {
            kpi.selling_admin_variance += monthly.variance;
          }
        });
      });

      // 月次KPIのパーセンテージ計算
      monthlyKPIs.forEach(kpi => {
        kpi.variance_percentage = kpi.budget_amount !== 0
          ? (kpi.variance / kpi.budget_amount) * 100
          : 0;
      });

      return {
        total_budget: totalBudget,
        total_actual: totalActual,
        total_variance: totalVariance,
        total_variance_percentage: totalVariancePercentage,
        cost_of_sales_variance: costOfSalesVariance,
        selling_admin_variance: sellingAdminVariance,
        monthly_kpis: Array.from(monthlyKPIs.values())
      };
    } catch (err) {
      logger.error('KPI分析に失敗しました', err);
      setError(err instanceof Error ? err : new Error('KPI分析に失敗しました'));
      return {
        total_budget: 0,
        total_actual: 0,
        total_variance: 0,
        total_variance_percentage: 0,
        cost_of_sales_variance: 0,
        selling_admin_variance: 0,
        monthly_kpis: []
      };
    } finally {
      performanceMonitor.endMeasure('analyzeKPI');
    }
  }, [analyzeVariance]);

  return {
    isLoading,
    error,
    analyzeVariance,
    analyzeKPI
  };
}; 