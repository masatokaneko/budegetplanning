import { useState, useEffect } from 'react';
import { Budget } from '@/types/budget';
import { logger } from '@/lib/logger';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true);
        // TODO: APIからデータを取得
        // 現在はモックデータを使用
        const mockBudgets: Budget[] = [
          {
            budget_id: '1',
            account_code: 'ACC001',
            account_name: '外注費',
            account_type: 'cost_of_sales',
            vendor_code: 'VND001',
            vendor_name: '株式会社A',
            year_month: '202404',
            amount: 800000,
            version: '1.0',
            calculation_type: 'fixed',
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system'
          }
        ];
        setBudgets(mockBudgets);
        logger.info('Budgets fetched successfully');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('予算データの取得に失敗しました');
        setError(error);
        logger.error('Failed to fetch budgets', { error });
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  return { budgets, loading, error };
}; 