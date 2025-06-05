import * as XLSX from 'xlsx';
import { Budget, Actual, VarianceAnalysis } from '@/types/budget';
import { logger } from '@/lib/logger';

interface ExportOptions {
  startDate: string;
  endDate: string;
  accountTypes?: ('cost_of_sales' | 'selling_admin')[];
  format: 'excel' | 'csv' | 'pdf';
}

interface MonthlyComparison {
  yearMonth: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  varianceRate: number;
}

interface AccountDetail {
  accountCode: string;
  accountName: string;
  accountType: 'cost_of_sales' | 'selling_admin';
  monthlyData: MonthlyComparison[];
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
  totalVarianceRate: number;
}

interface VendorSummary {
  vendorCode: string;
  vendorName: string;
  accountDetails: AccountDetail[];
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
  totalVarianceRate: number;
}

export class ExportService {
  private async generateMonthlyComparison(
    budgets: Budget[],
    actuals: Actual[],
    options: ExportOptions
  ): Promise<MonthlyComparison[]> {
    const monthlyData: { [key: string]: MonthlyComparison } = {};

    // 予算データの集計
    budgets.forEach(budget => {
      if (!monthlyData[budget.year_month]) {
        monthlyData[budget.year_month] = {
          yearMonth: budget.year_month,
          budgetAmount: 0,
          actualAmount: 0,
          variance: 0,
          varianceRate: 0
        };
      }
      monthlyData[budget.year_month].budgetAmount += budget.amount;
    });

    // 実績データの集計
    actuals.forEach(actual => {
      if (!monthlyData[actual.year_month]) {
        monthlyData[actual.year_month] = {
          yearMonth: actual.year_month,
          budgetAmount: 0,
          actualAmount: 0,
          variance: 0,
          varianceRate: 0
        };
      }
      monthlyData[actual.year_month].actualAmount += actual.amount;
    });

    // 差異の計算
    Object.values(monthlyData).forEach(data => {
      data.variance = data.actualAmount - data.budgetAmount;
      data.varianceRate = data.budgetAmount !== 0
        ? (data.variance / data.budgetAmount) * 100
        : 0;
    });

    return Object.values(monthlyData).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));
  }

  private async generateAccountDetails(
    budgets: Budget[],
    actuals: Actual[],
    options: ExportOptions
  ): Promise<AccountDetail[]> {
    const accountMap: { [key: string]: AccountDetail } = {};

    // 予算データの集計
    budgets.forEach(budget => {
      if (!accountMap[budget.account_code]) {
        accountMap[budget.account_code] = {
          accountCode: budget.account_code,
          accountName: budget.account_name,
          accountType: budget.account_type,
          monthlyData: [],
          totalBudget: 0,
          totalActual: 0,
          totalVariance: 0,
          totalVarianceRate: 0
        };
      }
      accountMap[budget.account_code].totalBudget += budget.amount;
    });

    // 実績データの集計
    actuals.forEach(actual => {
      if (!accountMap[actual.account_code]) {
        accountMap[actual.account_code] = {
          accountCode: actual.account_code,
          accountName: actual.account_name,
          accountType: actual.account_type,
          monthlyData: [],
          totalBudget: 0,
          totalActual: 0,
          totalVariance: 0,
          totalVarianceRate: 0
        };
      }
      accountMap[actual.account_code].totalActual += actual.amount;
    });

    // 月次データの生成と差異の計算
    Object.values(accountMap).forEach(account => {
      account.monthlyData = this.generateMonthlyComparison(
        budgets.filter(b => b.account_code === account.accountCode),
        actuals.filter(a => a.account_code === account.accountCode),
        options
      );
      account.totalVariance = account.totalActual - account.totalBudget;
      account.totalVarianceRate = account.totalBudget !== 0
        ? (account.totalVariance / account.totalBudget) * 100
        : 0;
    });

    return Object.values(accountMap);
  }

  private async generateVendorSummary(
    budgets: Budget[],
    actuals: Actual[],
    options: ExportOptions
  ): Promise<VendorSummary[]> {
    const vendorMap: { [key: string]: VendorSummary } = {};

    // 予算データの集計
    budgets.forEach(budget => {
      if (!budget.vendor_code) return;

      if (!vendorMap[budget.vendor_code]) {
        vendorMap[budget.vendor_code] = {
          vendorCode: budget.vendor_code,
          vendorName: budget.vendor_name || '',
          accountDetails: [],
          totalBudget: 0,
          totalActual: 0,
          totalVariance: 0,
          totalVarianceRate: 0
        };
      }
      vendorMap[budget.vendor_code].totalBudget += budget.amount;
    });

    // 実績データの集計
    actuals.forEach(actual => {
      if (!actual.vendor_code) return;

      if (!vendorMap[actual.vendor_code]) {
        vendorMap[actual.vendor_code] = {
          vendorCode: actual.vendor_code,
          vendorName: actual.vendor_name || '',
          accountDetails: [],
          totalBudget: 0,
          totalActual: 0,
          totalVariance: 0,
          totalVarianceRate: 0
        };
      }
      vendorMap[actual.vendor_code].totalActual += actual.amount;
    });

    // 科目別詳細の生成と差異の計算
    for (const vendor of Object.values(vendorMap)) {
      vendor.accountDetails = await this.generateAccountDetails(
        budgets.filter(b => b.vendor_code === vendor.vendorCode),
        actuals.filter(a => a.vendor_code === vendor.vendorCode),
        options
      );
      vendor.totalVariance = vendor.totalActual - vendor.totalBudget;
      vendor.totalVarianceRate = vendor.totalBudget !== 0
        ? (vendor.totalVariance / vendor.totalBudget) * 100
        : 0;
    }

    return Object.values(vendorMap);
  }

  private async exportToExcel(
    monthlyComparison: MonthlyComparison[],
    accountDetails: AccountDetail[],
    vendorSummary: VendorSummary[],
    options: ExportOptions
  ): Promise<Blob> {
    const workbook = XLSX.utils.book_new();

    // 月別予実対比表
    const monthlySheet = XLSX.utils.json_to_sheet(
      monthlyComparison.map(data => ({
        '年月': data.yearMonth,
        '予算': data.budgetAmount,
        '実績': data.actualAmount,
        '差異': data.variance,
        '差異率(%)': data.varianceRate
      }))
    );
    XLSX.utils.book_append_sheet(workbook, monthlySheet, '月別予実対比');

    // 科目別詳細レポート
    const accountSheet = XLSX.utils.json_to_sheet(
      accountDetails.flatMap(account => [
        {
          '科目コード': account.accountCode,
          '科目名': account.accountName,
          '科目種別': account.accountType,
          '合計予算': account.totalBudget,
          '合計実績': account.totalActual,
          '合計差異': account.totalVariance,
          '合計差異率(%)': account.totalVarianceRate
        },
        ...account.monthlyData.map(data => ({
          '年月': data.yearMonth,
          '予算': data.budgetAmount,
          '実績': data.actualAmount,
          '差異': data.variance,
          '差異率(%)': data.varianceRate
        }))
      ])
    );
    XLSX.utils.book_append_sheet(workbook, accountSheet, '科目別詳細');

    // 取引先別集計表
    const vendorSheet = XLSX.utils.json_to_sheet(
      vendorSummary.flatMap(vendor => [
        {
          '取引先コード': vendor.vendorCode,
          '取引先名': vendor.vendorName,
          '合計予算': vendor.totalBudget,
          '合計実績': vendor.totalActual,
          '合計差異': vendor.totalVariance,
          '合計差異率(%)': vendor.totalVarianceRate
        },
        ...vendor.accountDetails.flatMap(account => [
          {
            '科目コード': account.accountCode,
            '科目名': account.accountName,
            '科目種別': account.accountType,
            '合計予算': account.totalBudget,
            '合計実績': account.totalActual,
            '合計差異': account.totalVariance,
            '合計差異率(%)': account.totalVarianceRate
          }
        ])
      ])
    );
    XLSX.utils.book_append_sheet(workbook, vendorSheet, '取引先別集計');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  private async exportToCsv(
    monthlyComparison: MonthlyComparison[],
    accountDetails: AccountDetail[],
    vendorSummary: VendorSummary[],
    options: ExportOptions
  ): Promise<Blob> {
    const csvData = [
      // 月別予実対比表
      ['月別予実対比表'],
      ['年月', '予算', '実績', '差異', '差異率(%)'],
      ...monthlyComparison.map(data => [
        data.yearMonth,
        data.budgetAmount,
        data.actualAmount,
        data.variance,
        data.varianceRate
      ]),
      [],
      // 科目別詳細レポート
      ['科目別詳細レポート'],
      ['科目コード', '科目名', '科目種別', '合計予算', '合計実績', '合計差異', '合計差異率(%)'],
      ...accountDetails.map(account => [
        account.accountCode,
        account.accountName,
        account.accountType,
        account.totalBudget,
        account.totalActual,
        account.totalVariance,
        account.totalVarianceRate
      ]),
      [],
      // 取引先別集計表
      ['取引先別集計表'],
      ['取引先コード', '取引先名', '合計予算', '合計実績', '合計差異', '合計差異率(%)'],
      ...vendorSummary.map(vendor => [
        vendor.vendorCode,
        vendor.vendorName,
        vendor.totalBudget,
        vendor.totalActual,
        vendor.totalVariance,
        vendor.totalVarianceRate
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  }

  public async exportReport(
    budgets: Budget[],
    actuals: Actual[],
    options: ExportOptions
  ): Promise<Blob> {
    try {
      logger.info('Exporting report', { options });

      const monthlyComparison = await this.generateMonthlyComparison(budgets, actuals, options);
      const accountDetails = await this.generateAccountDetails(budgets, actuals, options);
      const vendorSummary = await this.generateVendorSummary(budgets, actuals, options);

      switch (options.format) {
        case 'excel':
          return this.exportToExcel(monthlyComparison, accountDetails, vendorSummary, options);
        case 'csv':
          return this.exportToCsv(monthlyComparison, accountDetails, vendorSummary, options);
        case 'pdf':
          throw new Error('PDF export is not implemented yet');
        default:
          throw new Error(`Unsupported format: ${options.format}`);
      }
    } catch (error) {
      logger.error('Export failed', { error });
      throw error;
    }
  }
} 