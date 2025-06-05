import { Budget, Actual } from '../types';

interface VarianceData {
  month: string;
  budget: number;
  actual: number;
  variance: number;
  variancePercentage: number;
}

interface AnalysisResult {
  monthlyData: VarianceData[];
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
  totalVariancePercentage: number;
  significantVariances: {
    month: string;
    variance: number;
    variancePercentage: number;
  }[];
}

export const analyzeVariance = (
  budgets: Budget[],
  actuals: Actual[],
  threshold: number = 10 // 差異が10%以上の場合を重要とみなす
): AnalysisResult => {
  const monthlyData: VarianceData[] = [];
  let totalBudget = 0;
  let totalActual = 0;

  // 月次データの集計
  for (let month = 1; month <= 12; month++) {
    const monthBudgets = budgets.filter(b => b.month === month);
    const monthActuals = actuals.filter(a => a.month === month);

    const budgetAmount = monthBudgets.reduce((sum, b) => sum + b.amount, 0);
    const actualAmount = monthActuals.reduce((sum, a) => sum + a.amount, 0);
    const variance = actualAmount - budgetAmount;
    const variancePercentage = budgetAmount !== 0 
      ? (variance / budgetAmount) * 100 
      : 0;

    monthlyData.push({
      month: `${month}月`,
      budget: budgetAmount,
      actual: actualAmount,
      variance,
      variancePercentage
    });

    totalBudget += budgetAmount;
    totalActual += actualAmount;
  }

  const totalVariance = totalActual - totalBudget;
  const totalVariancePercentage = totalBudget !== 0 
    ? (totalVariance / totalBudget) * 100 
    : 0;

  // 重要な差異の抽出
  const significantVariances = monthlyData
    .filter(data => Math.abs(data.variancePercentage) >= threshold)
    .map(data => ({
      month: data.month,
      variance: data.variance,
      variancePercentage: data.variancePercentage
    }))
    .sort((a, b) => Math.abs(b.variancePercentage) - Math.abs(a.variancePercentage));

  return {
    monthlyData,
    totalBudget,
    totalActual,
    totalVariance,
    totalVariancePercentage,
    significantVariances
  };
}; 