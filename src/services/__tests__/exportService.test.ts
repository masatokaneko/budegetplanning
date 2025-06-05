import { ExportService } from '../exportService';
import { Budget, Actual } from '@/types/budget';

describe('ExportService', () => {
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
      calculation_type: 'manual',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'system'
    }
  ];

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

  const exportService = new ExportService();

  describe('generateMonthlyComparison', () => {
    it('月別予実対比データを正しく生成する', async () => {
      const result = await exportService['generateMonthlyComparison'](
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'excel'
        }
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        yearMonth: '202404',
        budgetAmount: 800000,
        actualAmount: 820000,
        variance: 20000,
        varianceRate: 2.5
      });
    });
  });

  describe('generateAccountDetails', () => {
    it('科目別詳細データを正しく生成する', async () => {
      const result = await exportService['generateAccountDetails'](
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'excel'
        }
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        accountCode: 'ACC001',
        accountName: '外注費',
        accountType: 'cost_of_sales',
        monthlyData: [{
          yearMonth: '202404',
          budgetAmount: 800000,
          actualAmount: 820000,
          variance: 20000,
          varianceRate: 2.5
        }],
        totalBudget: 800000,
        totalActual: 820000,
        totalVariance: 20000,
        totalVarianceRate: 2.5
      });
    });
  });

  describe('generateVendorSummary', () => {
    it('取引先別集計データを正しく生成する', async () => {
      const result = await exportService['generateVendorSummary'](
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'excel'
        }
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        vendorCode: 'VND001',
        vendorName: '株式会社A',
        accountDetails: [{
          accountCode: 'ACC001',
          accountName: '外注費',
          accountType: 'cost_of_sales',
          monthlyData: [{
            yearMonth: '202404',
            budgetAmount: 800000,
            actualAmount: 820000,
            variance: 20000,
            varianceRate: 2.5
          }],
          totalBudget: 800000,
          totalActual: 820000,
          totalVariance: 20000,
          totalVarianceRate: 2.5
        }],
        totalBudget: 800000,
        totalActual: 820000,
        totalVariance: 20000,
        totalVarianceRate: 2.5
      });
    });
  });

  describe('exportReport', () => {
    it('Excel形式でレポートを出力する', async () => {
      const result = await exportService.exportReport(
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'excel'
        }
      );

      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });

    it('CSV形式でレポートを出力する', async () => {
      const result = await exportService.exportReport(
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'csv'
        }
      );

      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('text/csv;charset=utf-8;');
    });

    it('無効な形式の場合はエラーをスローする', async () => {
      await expect(exportService.exportReport(
        mockBudgets,
        mockActuals,
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          format: 'pdf' as any
        }
      )).rejects.toThrow('PDF export is not implemented yet');
    });
  });
}); 