import { Budget, FluctuationFactor, FactorForecast } from '../types';

interface BudgetCalculationResult {
  originalAmount: number;
  adjustedAmount: number;
  factors: {
    factorId: string;
    factorName: string;
    impact: number;
  }[];
}

export const calculateBudgetWithFactors = (
  budget: Budget,
  factors: FluctuationFactor[],
  forecasts: FactorForecast[]
): BudgetCalculationResult => {
  const originalAmount = budget.amount;
  let adjustedAmount = originalAmount;
  const appliedFactors: BudgetCalculationResult['factors'] = [];

  // 各変動要因の影響を計算
  factors.forEach(factor => {
    const forecast = forecasts.find(
      f => f.factorId === factor.id && 
      f.year === budget.year && 
      f.month === budget.month
    );

    if (forecast) {
      let impact = 0;
      if (factor.type === 'percentage') {
        // パーセンテージの場合
        impact = originalAmount * (forecast.value / 100);
      } else {
        // 固定値の場合
        impact = forecast.value;
      }

      adjustedAmount += impact;
      appliedFactors.push({
        factorId: factor.id,
        factorName: factor.name,
        impact
      });
    }
  });

  return {
    originalAmount,
    adjustedAmount,
    factors: appliedFactors
  };
};

export const calculateMonthlyBudget = (
  budgets: Budget[],
  factors: FluctuationFactor[],
  forecasts: FactorForecast[]
): Map<string, BudgetCalculationResult> => {
  const results = new Map<string, BudgetCalculationResult>();

  budgets.forEach(budget => {
    const key = `${budget.year}-${budget.month}`;
    const result = calculateBudgetWithFactors(budget, factors, forecasts);
    results.set(key, result);
  });

  return results;
}; 