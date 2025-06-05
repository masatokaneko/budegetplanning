'use client'

import { useState, useCallback, useEffect } from 'react';
import { mockBudgets, mockBudgetGridData, mockFactorForecasts, mockBudgetVersions } from '@/data/mock/budgets';
import { mockAccounts, mockVendors } from '@/data/mock/masterData';
import { 
  Budget, 
  BudgetGridData, 
  BudgetVersion,
  FactorForecast,
  BudgetCalculationRequest,
  BudgetCalculationResult
} from '@/types/budget';
import { logger } from '@/lib/logger';
import { monitorPerformance } from '@/lib/performance';
import { mockFluctuationFactors } from '@/data/mock/factors';

const STORAGE_KEY = 'budget_data';

interface UseBudgetReturn {
  budgets: Budget[];
  gridData: BudgetGridData[];
  versions: BudgetVersion[];
  loading: boolean;
  error: Error | null;
  getGridData: () => BudgetGridData[];
  fetchBudgets: (yearMonth?: string) => Promise<void>;
  generateGridData: (budgets: Budget[]) => BudgetGridData[];
  calculateFactorLinkedBudget: (request: BudgetCalculationRequest) => Promise<number>;
  saveBudget: (budget: Budget) => Promise<void>;
  createBudget: (budget: Omit<Budget, 'budget_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateBudget: (budget: Budget) => Promise<void>;
  deleteBudget: (budgetId: string) => Promise<void>;
  finalizeBudget: (versionId: string) => Promise<void>;
  getBudgetByVersion: (versionId: string) => Budget[];
}

export const useBudget = (): UseBudgetReturn => {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [gridData, setGridData] = useState<BudgetGridData[]>([]);
  const [versions, setVersions] = useState<BudgetVersion[]>(mockBudgetVersions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // ローカルストレージからのデータ読み込み
  const loadFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setBudgets(data.budgets.map((b: any) => ({
          ...b,
          created_at: new Date(b.created_at),
          updated_at: new Date(b.updated_at)
        })));
        setGridData(data.gridData);
        setVersions(data.versions.map((v: any) => ({
          ...v,
          created_at: new Date(v.created_at),
          confirmed_at: v.confirmed_at ? new Date(v.confirmed_at) : undefined
        })));
      } else {
        // 初期データの設定
        setBudgets(mockBudgets);
        setGridData(mockBudgetGridData);
        setVersions(mockBudgetVersions);
      }
    } catch (err) {
      logger.error('予算データの読み込みに失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算データの読み込みに失敗しました'));
    } finally {
      setLoading(false);
    }
  }, []);

  // ローカルストレージへのデータ保存
  const saveToStorage = useCallback((data: { budgets: Budget[], gridData: BudgetGridData[], versions: BudgetVersion[] }) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      logger.error('予算データの保存に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算データの保存に失敗しました'));
    }
  }, []);

  // 予算データの取得
  const fetchBudgets = useCallback(async (yearMonth?: string) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      // 実際のAPI呼び出しの代わりにモックデータを使用
      const filteredBudgets = yearMonth
        ? mockBudgets.filter(b => b.year_month === yearMonth)
        : mockBudgets;
      setBudgets(filteredBudgets);
      setError(null);
    } catch (err) {
      logger.error('予算データの取得に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算データの取得に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('fetchBudgets', startTime);
    }
  }, []);

  // 予算グリッドデータの生成
  const generateGridData = useCallback((budgets: Budget[]) => {
    const startTime = performance.now();
    try {
      const gridData: BudgetGridData[] = mockBudgetGridData.map(grid => {
        const monthlyBudgets = grid.monthly_budgets.map(monthly => {
          const budget = budgets.find(b => 
            b.account_id === grid.account_id && 
            b.year_month === monthly.year_month
          );
          return {
            ...monthly,
            amount: budget?.budget_amount || 0,
            is_calculated: budget?.calculation_type === 'factor_linked'
          };
        });

        return {
          ...grid,
          monthly_budgets: monthlyBudgets,
          annual_total: monthlyBudgets.reduce((sum, mb) => sum + mb.amount, 0)
        };
      });

      setGridData(gridData);
      return gridData;
    } catch (err) {
      logger.error('グリッドデータの生成に失敗しました', err);
      setError(err instanceof Error ? err : new Error('グリッドデータの生成に失敗しました'));
      return [];
    } finally {
      monitorPerformance('generateGridData', startTime);
    }
  }, []);

  // 変動要因連動の計算
  const calculateFactorLinkedBudget = useCallback(async (request: BudgetCalculationRequest): Promise<number> => {
    const startTime = performance.now();
    try {
      const factor = mockFluctuationFactors.find(f => f.factor_id === request.factor_id);
      if (!factor) {
        throw new Error('変動要因が見つかりません');
      }

      // 変動要因のタイプに応じて計算ロジックを実装
      let amount = 0;
      switch (factor.factor_type) {
        case 'headcount':
          // 社員数に基づく計算（例：1人あたり45,000円）
          amount = request.basis_value * 45000;
          break;
        case 'revenue':
          // 売上に基づく計算（例：売上の5%）
          amount = request.basis_value * 0.05;
          break;
        default:
          throw new Error('未対応の変動要因タイプです');
      }

      logger.info('Factor-linked budget calculated', { factorId: request.factor_id, basisValue: request.basis_value, amount });
      return amount;
    } catch (err) {
      logger.error('Failed to calculate factor-linked budget', { error: err });
      throw err;
    } finally {
      monitorPerformance('calculateFactorLinkedBudget', startTime);
    }
  }, []);

  // 予算の保存
  const saveBudget = useCallback(async (budget: Budget) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const updatedBudgets = budgets.map(b => 
        b.budget_id === budget.budget_id ? budget : b
      );
      setBudgets(updatedBudgets);
      
      // グリッドデータの更新
      const updatedGridData = generateGridData(updatedBudgets);
      
      // ローカルストレージに保存
      saveToStorage({
        budgets: updatedBudgets,
        gridData: updatedGridData,
        versions
      });

      setError(null);
    } catch (err) {
      logger.error('予算の保存に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算の保存に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('saveBudget', startTime);
    }
  }, [budgets, versions, generateGridData, saveToStorage]);

  // 予算の作成
  const createBudget = useCallback(async (budget: Omit<Budget, 'budget_id' | 'created_at' | 'updated_at'>) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const newBudget: Budget = {
        ...budget,
        budget_id: `BUD${Date.now()}`,
        created_at: new Date(),
        updated_at: new Date()
      };

      const updatedBudgets = [...budgets, newBudget];
      setBudgets(updatedBudgets);
      
      // グリッドデータの更新
      const updatedGridData = generateGridData(updatedBudgets);
      
      // ローカルストレージに保存
      saveToStorage({
        budgets: updatedBudgets,
        gridData: updatedGridData,
        versions
      });

      setError(null);
    } catch (err) {
      logger.error('予算の作成に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算の作成に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('createBudget', startTime);
    }
  }, [budgets, versions, generateGridData, saveToStorage]);

  // 予算の更新
  const updateBudget = useCallback(async (budget: Budget) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const updatedBudgets = budgets.map(b => 
        b.budget_id === budget.budget_id ? { ...budget, updated_at: new Date() } : b
      );
      setBudgets(updatedBudgets);
      
      // グリッドデータの更新
      const updatedGridData = generateGridData(updatedBudgets);
      
      // ローカルストレージに保存
      saveToStorage({
        budgets: updatedBudgets,
        gridData: updatedGridData,
        versions
      });

      setError(null);
    } catch (err) {
      logger.error('予算の更新に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算の更新に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('updateBudget', startTime);
    }
  }, [budgets, versions, generateGridData, saveToStorage]);

  // 予算の削除
  const deleteBudget = useCallback(async (budgetId: string) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const updatedBudgets = budgets.filter(b => b.budget_id !== budgetId);
      setBudgets(updatedBudgets);
      
      // グリッドデータの更新
      const updatedGridData = generateGridData(updatedBudgets);
      
      // ローカルストレージに保存
      saveToStorage({
        budgets: updatedBudgets,
        gridData: updatedGridData,
        versions
      });

      setError(null);
    } catch (err) {
      logger.error('予算の削除に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算の削除に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('deleteBudget', startTime);
    }
  }, [budgets, versions, generateGridData, saveToStorage]);

  // 予算の確定
  const finalizeBudget = useCallback(async (versionId: string) => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const updatedVersions = versions.map(v => 
        v.version_id === versionId ? { ...v, is_confirmed: true, confirmed_at: new Date() } : v
      );
      setVersions(updatedVersions);
      
      // ローカルストレージに保存
      saveToStorage({
        budgets,
        gridData,
        versions: updatedVersions
      });

      setError(null);
    } catch (err) {
      logger.error('予算の確定に失敗しました', err);
      setError(err instanceof Error ? err : new Error('予算の確定に失敗しました'));
    } finally {
      setLoading(false);
      monitorPerformance('finalizeBudget', startTime);
    }
  }, [budgets, gridData, versions, saveToStorage]);

  // バージョン別の予算取得
  const getBudgetByVersion = useCallback((versionId: string) => {
    const version = versions.find(v => v.version_id === versionId);
    if (!version) return [];

    return budgets.filter(b => b.budget_version === versionId);
  }, [budgets, versions]);

  // 初期データの読み込み
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return {
    budgets,
    gridData,
    versions,
    loading,
    error,
    getGridData: () => gridData,
    fetchBudgets,
    generateGridData,
    calculateFactorLinkedBudget,
    saveBudget,
    createBudget,
    updateBudget,
    deleteBudget,
    finalizeBudget,
    getBudgetByVersion
  };
}; 