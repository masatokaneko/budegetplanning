import { useState, useCallback, useEffect } from 'react';
import { 
  mockActuals, 
  mockActualGridData, 
  mockActualSummary,
  getActualsByMonth,
  calculateMonthlyTotal
} from '@/data/mock/actuals';
import { 
  Actual, 
  ActualGridData, 
  ActualSummary,
  MonthlyActualTotal,
  ActualsByVendor
} from '@/types/actual';
import { logger } from '@/lib/logger';

const STORAGE_KEY = 'actual_data';

export const useActuals = () => {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [gridData, setGridData] = useState<ActualGridData[]>([]);
  const [summary, setSummary] = useState<ActualSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ローカルストレージからのデータ読み込み
  const loadFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setActuals(data.actuals);
        setGridData(data.gridData);
        setSummary(data.summary);
      } else {
        // 初期データの設定
        setActuals(mockActuals);
        setGridData(mockActualGridData);
        setSummary(mockActualSummary);
      }
    } catch (err) {
      logger.error('実績データの読み込みに失敗しました', err);
      setError(err instanceof Error ? err : new Error('実績データの読み込みに失敗しました'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ローカルストレージへのデータ保存
  const saveToStorage = useCallback((data: { actuals: Actual[], gridData: ActualGridData[], summary: ActualSummary }) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      logger.error('実績データの保存に失敗しました', err);
      setError(err instanceof Error ? err : new Error('実績データの保存に失敗しました'));
    }
  }, []);

  // 実績データの取得
  const fetchActuals = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: APIからデータを取得
      // 現在はモックデータを使用
      const mockActuals: Actual[] = [
        {
          actual_id: '1',
          account_code: 'ACC001',
          account_name: '外注費',
          account_type: 'cost_of_sales',
          vendor_code: 'VND001',
          vendor_name: '株式会社A',
          transaction_date: new Date('2024-04-01'),
          year_month: '202404',
          amount: 820000,
          description: 'システム開発費用',
          source_file: 'freee_202404.csv',
          imported_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'system'
        }
      ];
      setActuals(mockActuals);
      logger.info('Actuals fetched successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('実績データの取得に失敗しました');
      setError(error);
      logger.error('Failed to fetch actuals', { error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 月別・科目別の集計
  const calculateMonthlyTotals = useCallback((yearMonth: string): MonthlyActualTotal => {
    try {
      const monthActuals = actuals.filter(a => a.year_month === yearMonth);
      const totalAmount = monthActuals.reduce((sum, a) => sum + a.amount, 0);
      const costOfSales = monthActuals
        .filter(a => a.account_type === 'cost_of_sales')
        .reduce((sum, a) => sum + a.amount, 0);
      const sellingAdmin = monthActuals
        .filter(a => a.account_type === 'selling_admin')
        .reduce((sum, a) => sum + a.amount, 0);

      return {
        month: parseInt(yearMonth.slice(4, 6)),
        year_month: yearMonth,
        total_amount: totalAmount,
        cost_of_sales: costOfSales,
        selling_admin: sellingAdmin,
        transaction_count: monthActuals.length
      };
    } catch (err) {
      logger.error('月次集計の計算に失敗しました', err);
      throw err;
    }
  }, [actuals]);

  // 実績グリッドデータの生成
  const generateGridData = useCallback((actuals: Actual[]) => {
    try {
      const gridData: ActualGridData[] = mockActualGridData.map(grid => {
        const monthlyActuals = grid.monthly_actuals.map(monthly => {
          const actual = actuals.find(a => 
            a.account_id === grid.account_id && 
            a.year_month === monthly.year_month
          );
          return {
            ...monthly,
            amount: actual?.amount || 0,
            transaction_count: actual ? 1 : 0,
            last_transaction_date: actual?.transaction_date
          };
        });

        return {
          ...grid,
          monthly_actuals: monthlyActuals,
          annual_total: monthlyActuals.reduce((sum, ma) => sum + ma.amount, 0),
          transaction_count: monthlyActuals.reduce((sum, ma) => sum + ma.transaction_count, 0)
        };
      });

      setGridData(gridData);
      return gridData;
    } catch (err) {
      logger.error('グリッドデータの生成に失敗しました', err);
      setError(err instanceof Error ? err : new Error('グリッドデータの生成に失敗しました'));
      return [];
    }
  }, []);

  // 取引先別実績分析
  const analyzeByVendor = useCallback((): ActualsByVendor[] => {
    try {
      const vendorMap = new Map<string, ActualsByVendor>();

      actuals.forEach(actual => {
        if (!actual.vendor_id) return;

        if (!vendorMap.has(actual.vendor_id)) {
          vendorMap.set(actual.vendor_id, {
            vendor_id: actual.vendor_id,
            vendor_name: actual.vendor_name || '',
            monthly_totals: [],
            annual_total: 0,
            account_breakdown: []
          });
        }

        const vendor = vendorMap.get(actual.vendor_id)!;
        const monthIndex = vendor.monthly_totals.findIndex(
          mt => mt.year_month === actual.year_month
        );

        if (monthIndex === -1) {
          vendor.monthly_totals.push({
            month: parseInt(actual.year_month.slice(4, 6)),
            year_month: actual.year_month,
            amount: actual.amount,
            transaction_count: 1
          });
        } else {
          vendor.monthly_totals[monthIndex].amount += actual.amount;
          vendor.monthly_totals[monthIndex].transaction_count += 1;
        }

        vendor.annual_total += actual.amount;

        const accountIndex = vendor.account_breakdown.findIndex(
          ab => ab.account_id === actual.account_id
        );

        if (accountIndex === -1) {
          vendor.account_breakdown.push({
            account_id: actual.account_id,
            account_name: actual.account_name || '',
            amount: actual.amount,
            transaction_count: 1,
            percentage_of_vendor_total: 0
          });
        } else {
          vendor.account_breakdown[accountIndex].amount += actual.amount;
          vendor.account_breakdown[accountIndex].transaction_count += 1;
        }
      });

      // 取引先別の割合を計算
      vendorMap.forEach(vendor => {
        vendor.account_breakdown.forEach(account => {
          account.percentage_of_vendor_total = 
            (account.amount / vendor.annual_total) * 100;
        });
      });

      return Array.from(vendorMap.values());
    } catch (err) {
      logger.error('取引先別分析に失敗しました', err);
      throw err;
    }
  }, [actuals]);

  // 初期データの読み込み
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    fetchActuals();
  }, [fetchActuals]);

  return {
    actuals,
    gridData,
    summary,
    isLoading,
    error,
    calculateMonthlyTotals,
    generateGridData,
    analyzeByVendor
  };
}; 