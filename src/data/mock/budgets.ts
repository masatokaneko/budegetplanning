// src/data/mock/budgetData.ts
// 予算データのモック

import { 
  Budget, 
  BudgetVersion, 
  BudgetGridData, 
  FactorForecast, 
  FactorForecastGrid,
  MonthlyBudget,
  FactorLinkSettings,
  BudgetSummary,
  MonthlyTotal
} from '@/types/budget';
import { mockAccounts, mockVendors, mockFluctuationFactors } from './masterData';

// 予算バージョン
export const mockBudgetVersions: BudgetVersion[] = [
  {
    version_id: 'ver_001',
    version_name: '通常予算',
    description: '2024年度通常予算',
    is_confirmed: true,
    confirmed_by: 'user_001',
    confirmed_at: new Date('2024-03-15'),
    created_at: new Date('2024-02-01'),
  },
  {
    version_id: 'ver_002',
    version_name: '楽観予算',
    description: '2024年度楽観シナリオ',
    is_confirmed: false,
    created_at: new Date('2024-02-01'),
  },
  {
    version_id: 'ver_003',
    version_name: '悲観予算',
    description: '2024年度悲観シナリオ',
    is_confirmed: false,
    created_at: new Date('2024-02-01'),
  },
];

// 変動要因の予測値
export const mockFactorForecasts: FactorForecast[] = [
  // 社員数の予測（2024年4月〜2025年3月）
  { forecast_id: 'ff_001', factor_id: 'fact_001', year_month: '202404', forecast_value: 45, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_002', factor_id: 'fact_001', year_month: '202405', forecast_value: 47, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_003', factor_id: 'fact_001', year_month: '202406', forecast_value: 48, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_004', factor_id: 'fact_001', year_month: '202407', forecast_value: 50, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_005', factor_id: 'fact_001', year_month: '202408', forecast_value: 50, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_006', factor_id: 'fact_001', year_month: '202409', forecast_value: 52, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_007', factor_id: 'fact_001', year_month: '202410', forecast_value: 53, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_008', factor_id: 'fact_001', year_month: '202411', forecast_value: 55, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_009', factor_id: 'fact_001', year_month: '202412', forecast_value: 55, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_010', factor_id: 'fact_001', year_month: '202501', forecast_value: 57, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_011', factor_id: 'fact_001', year_month: '202502', forecast_value: 58, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_012', factor_id: 'fact_001', year_month: '202503', forecast_value: 60, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },

  // 売上高の予測（月次、万円単位）
  { forecast_id: 'ff_013', factor_id: 'fact_002', year_month: '202404', forecast_value: 5000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_014', factor_id: 'fact_002', year_month: '202405', forecast_value: 5200, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_015', factor_id: 'fact_002', year_month: '202406', forecast_value: 5500, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_016', factor_id: 'fact_002', year_month: '202407', forecast_value: 5800, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_017', factor_id: 'fact_002', year_month: '202408', forecast_value: 5600, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_018', factor_id: 'fact_002', year_month: '202409', forecast_value: 6000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_019', factor_id: 'fact_002', year_month: '202410', forecast_value: 6200, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_020', factor_id: 'fact_002', year_month: '202411', forecast_value: 6500, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_021', factor_id: 'fact_002', year_month: '202412', forecast_value: 7000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_022', factor_id: 'fact_002', year_month: '202501', forecast_value: 6800, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_023', factor_id: 'fact_002', year_month: '202502', forecast_value: 6500, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { forecast_id: 'ff_024', factor_id: 'fact_002', year_month: '202503', forecast_value: 7200, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
];

// 変動要因連動設定
export const mockFactorLinkSettings: FactorLinkSettings[] = [
  {
    factor_id: 'fact_001',
    factor_name: '社員数',
    calculation_method: 'per_person',
    basis_value: 15000, // 月15,000円/人
    description: '情報システム利用料：1人あたり月15,000円',
  },
  {
    factor_id: 'fact_001',
    factor_name: '社員数',
    calculation_method: 'per_person',
    basis_value: 3000, // 月3,000円/人
    description: '福利厚生費：1人あたり月3,000円',
  },
  {
    factor_id: 'fact_002',
    factor_name: '売上高',
    calculation_method: 'percentage',
    basis_value: 0.02, // 2%
    description: '広告宣伝費：売上高の2%',
  },
];

// 予算データ（基本となる Budget エンティティ）
export const mockBudgets: Budget[] = [
  // 外注費の予算データ（月別）
  { budget_id: 'bud_001', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202404', budget_amount: 800000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_002', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202405', budget_amount: 850000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_003', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202406', budget_amount: 900000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_004', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202407', budget_amount: 920000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_005', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202408', budget_amount: 900000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_006', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202409', budget_amount: 950000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_007', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202410', budget_amount: 980000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_008', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202411', budget_amount: 1000000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_009', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202412', budget_amount: 1020000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_010', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202501', budget_amount: 980000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_011', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202502', budget_amount: 950000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_012', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', year_month: '202503', budget_amount: 1050000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },

  // ソフトウェア減価償却費（固定額）
  { budget_id: 'bud_013', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202404', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_014', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202405', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_015', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202406', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_016', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202407', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_017', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202408', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_018', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202409', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_019', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202410', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_020', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202411', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_021', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202412', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_022', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202501', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_023', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202502', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_024', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', year_month: '202503', budget_amount: 250000, budget_version: 'ver_001', calculation_type: 'manual', created_by: 'user_002', created_at: new Date(), updated_at: new Date() },

  // 情報システム利用料（社員数連動）
  { budget_id: 'bud_025', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202404', budget_amount: 675000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_026', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202405', budget_amount: 705000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_027', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202406', budget_amount: 720000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_028', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202407', budget_amount: 750000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_029', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202408', budget_amount: 750000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_030', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202409', budget_amount: 780000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_031', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202410', budget_amount: 795000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_032', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202411', budget_amount: 825000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_033', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202412', budget_amount: 825000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_034', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202501', budget_amount: 855000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_035', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202502', budget_amount: 870000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
  { budget_id: 'bud_036', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', year_month: '202503', budget_amount: 900000, budget_version: 'ver_001', calculation_type: 'factor_linked', linked_factor_id: 'fact_001', basis_value: 15000, created_by: 'user_002', created_at: new Date(), updated_at: new Date() },
];

// UI表示用のグリッドデータ
export const mockBudgetGridData: BudgetGridData[] = [
  // 外注費
  {
    account_id: 'acc_001',
    account_name: '外注費',
    account_category: 'cost_of_sales',
    vendor_id: 'vnd_001',
    vendor_name: '株式会社システム開発パートナー',
    monthly_budgets: [
      { month: 4, year_month: '202404', amount: 800000, is_calculated: false },
      { month: 5, year_month: '202405', amount: 850000, is_calculated: false },
      { month: 6, year_month: '202406', amount: 900000, is_calculated: false },
      { month: 7, year_month: '202407', amount: 920000, is_calculated: false },
      { month: 8, year_month: '202408', amount: 900000, is_calculated: false },
      { month: 9, year_month: '202409', amount: 950000, is_calculated: false },
      { month: 10, year_month: '202410', amount: 980000, is_calculated: false },
      { month: 11, year_month: '202411', amount: 1000000, is_calculated: false },
      { month: 12, year_month: '202412', amount: 1020000, is_calculated: false },
      { month: 1, year_month: '202501', amount: 980000, is_calculated: false },
      { month: 2, year_month: '202502', amount: 950000, is_calculated: false },
      { month: 3, year_month: '202503', amount: 1050000, is_calculated: false },
    ],
    annual_total: 11300000,
    has_factor_link: false,
  },
  // ソフトウェア減価償却費
  {
    account_id: 'acc_002',
    account_name: 'ソフトウェア減価償却費',
    account_category: 'cost_of_sales',
    monthly_budgets: [
      { month: 4, year_month: '202404', amount: 250000, is_calculated: false },
      { month: 5, year_month: '202405', amount: 250000, is_calculated: false },
      { month: 6, year_month: '202406', amount: 250000, is_calculated: false },
      { month: 7, year_month: '202407', amount: 250000, is_calculated: false },
      { month: 8, year_month: '202408', amount: 250000, is_calculated: false },
      { month: 9, year_month: '202409', amount: 250000, is_calculated: false },
      { month: 10, year_month: '202410', amount: 250000, is_calculated: false },
      { month: 11, year_month: '202411', amount: 250000, is_calculated: false },
      { month: 12, year_month: '202412', amount: 250000, is_calculated: false },
      { month: 1, year_month: '202501', amount: 250000, is_calculated: false },
      { month: 2, year_month: '202502', amount: 250000, is_calculated: false },
      { month: 3, year_month: '202503', amount: 250000, is_calculated: false },
    ],
    annual_total: 3000000,
    has_factor_link: false,
  },
  // 情報システム利用料（社員数連動）
  {
    account_id: 'acc_101',
    account_name: '情報システム利用料',
    account_category: 'selling_admin',
    vendor_id: 'vnd_002',
    vendor_name: 'クラウドサービス株式会社',
    monthly_budgets: [
      { month: 4, year_month: '202404', amount: 675000, is_calculated: true },
      { month: 5, year_month: '202405', amount: 705000, is_calculated: true },
      { month: 6, year_month: '202406', amount: 720000, is_calculated: true },
      { month: 7, year_month: '202407', amount: 750000, is_calculated: true },
      { month: 8, year_month: '202408', amount: 750000, is_calculated: true },
      { month: 9, year_month: '202409', amount: 780000, is_calculated: true },
      { month: 10, year_month: '202410', amount: 795000, is_calculated: true },
      { month: 11, year_month: '202411', amount: 825000, is_calculated: true },
      { month: 12, year_month: '202412', amount: 825000, is_calculated: true },
      { month: 1, year_month: '202501', amount: 855000, is_calculated: true },
      { month: 2, year_month: '202502', amount: 870000, is_calculated: true },
      { month: 3, year_month: '202503', amount: 900000, is_calculated: true },
    ],
    annual_total: 9450000,
    has_factor_link: true,
    factor_settings: {
      factor_id: 'fact_001',
      factor_name: '社員数',
      calculation_method: 'per_person',
      basis_value: 15000,
      description: '1人あたり月15,000円',
    },
  },
];

// 変動要因予測値のグリッド表示用データ
export const mockFactorForecastGrid: FactorForecastGrid[] = [
  {
    factor_id: 'fact_001',
    factor_name: '社員数',
    unit: '人',
    monthly_forecasts: [
      { month: 4, year_month: '202404', forecast_value: 45, is_estimated: false },
      { month: 5, year_month: '202405', forecast_value: 47, is_estimated: false },
      { month: 6, year_month: '202406', forecast_value: 48, is_estimated: false },
      { month: 7, year_month: '202407', forecast_value: 50, is_estimated: false },
      { month: 8, year_month: '202408', forecast_value: 50, is_estimated: false },
      { month: 9, year_month: '202409', forecast_value: 52, is_estimated: false },
      { month: 10, year_month: '202410', forecast_value: 53, is_estimated: false },
      { month: 11, year_month: '202411', forecast_value: 55, is_estimated: false },
      { month: 12, year_month: '202412', forecast_value: 55, is_estimated: false },
      { month: 1, year_month: '202501', forecast_value: 57, is_estimated: true },
      { month: 2, year_month: '202502', forecast_value: 58, is_estimated: true },
      { month: 3, year_month: '202503', forecast_value: 60, is_estimated: true },
    ],
    annual_average: 52.9,
  },
  {
    factor_id: 'fact_002',
    factor_name: '売上高',
    unit: '万円',
    monthly_forecasts: [
      { month: 4, year_month: '202404', forecast_value: 5000, is_estimated: false },
      { month: 5, year_month: '202405', forecast_value: 5200, is_estimated: false },
      { month: 6, year_month: '202406', forecast_value: 5500, is_estimated: false },
      { month: 7, year_month: '202407', forecast_value: 5800, is_estimated: false },
      { month: 8, year_month: '202408', forecast_value: 5600, is_estimated: false },
      { month: 9, year_month: '202409', forecast_value: 6000, is_estimated: false },
      { month: 10, year_month: '202410', forecast_value: 6200, is_estimated: false },
      { month: 11, year_month: '202411', forecast_value: 6500, is_estimated: false },
      { month: 12, year_month: '202412', forecast_value: 7000, is_estimated: false },
      { month: 1, year_month: '202501', forecast_value: 6800, is_estimated: true },
      { month: 2, year_month: '202502', forecast_value: 6500, is_estimated: true },
      { month: 3, year_month: '202503', forecast_value: 7200, is_estimated: true },
    ],
    annual_average: 6108.3,
  },
];

// 予算サマリー
export const mockBudgetSummary: BudgetSummary = {
  total_budget: 23750000, // 年間予算総額
  cost_of_sales_budget: 14300000, // 売上原価予算
  selling_admin_budget: 9450000, // 販管費予算
  monthly_totals: [
    { month: 4, year_month: '202404', total_amount: 1725000, cost_of_sales: 1050000, selling_admin: 675000 },
    { month: 5, year_month: '202405', total_amount: 1805000, cost_of_sales: 1100000, selling_admin: 705000 },
    { month: 6, year_month: '202406', total_amount: 1870000, cost_of_sales: 1150000, selling_admin: 720000 },
    { month: 7, year_month: '202407', total_amount: 1920000, cost_of_sales: 1170000, selling_admin: 750000 },
    { month: 8, year_month: '202408', total_amount: 1900000, cost_of_sales: 1150000, selling_admin: 750000 },
    { month: 9, year_month: '202409', total_amount: 1980000, cost_of_sales: 1200000, selling_admin: 780000 },
    { month: 10, year_month: '202410', total_amount: 2025000, cost_of_sales: 1230000, selling_admin: 795000 },
    { month: 11, year_month: '202411', total_amount: 2075000, cost_of_sales: 1250000, selling_admin: 825000 },
    { month: 12, year_month: '202412', total_amount: 2095000, cost_of_sales: 1270000, selling_admin: 825000 },
    { month: 1, year_month: '202501', total_amount: 2085000, cost_of_sales: 1230000, selling_admin: 855000 },
    { month: 2, year_month: '202502', total_amount: 2070000, cost_of_sales: 1200000, selling_admin: 870000 },
    { month: 3, year_month: '202503', total_amount: 2200000, cost_of_sales: 1300000, selling_admin: 900000 },
  ],
  year_over_year_change: 2400000, // 前年比増加額
  year_over_year_rate: 0.112, // 前年比増加率 11.2%
};

// ヘルパー関数
export const getBudgetByAccountAndMonth = (accountId: string, yearMonth: string): Budget | undefined => {
  return mockBudgets.find(budget => budget.account_id === accountId && budget.year_month === yearMonth);
};

export const getBudgetsByAccount = (accountId: string): Budget[] => {
  return mockBudgets.filter(budget => budget.account_id === accountId);
};

export const getFactorForecastByMonth = (factorId: string, yearMonth: string): FactorForecast | undefined => {
  return mockFactorForecasts.find(forecast => forecast.factor_id === factorId && forecast.year_month === yearMonth);
};

export const calculateBudgetByFactor = (factorId: string, yearMonth: string, basisValue: number): number => {
  const forecast = getFactorForecastByMonth(factorId, yearMonth);
  return forecast ? forecast.forecast_value * basisValue : 0;
};