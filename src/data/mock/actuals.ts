// src/data/mock/actualData.ts
// 実績データのモック

import { 
  Actual, 
  ActualSummary,
  ActualGridData,
  FreeeCSVRow,
  ActualImportData,
  MonthlyActualTotal,
  ActualsByVendor,
  MonthlyVendorActual,
  AccountActual
} from '@/types/actual';

// 実績データ（過去3ヶ月分：2024年4月〜6月）
export const mockActuals: Actual[] = [
  // 4月の実績データ
  // 外注費
  { actual_id: 'act_001', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-04-05'), year_month: '202404', actual_amount: 250000, description: 'システム開発費（第1回）', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-05') },
  { actual_id: 'act_002', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-04-15'), year_month: '202404', actual_amount: 300000, description: 'システム開発費（第2回）', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-15') },
  { actual_id: 'act_003', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-04-25'), year_month: '202404', actual_amount: 320000, description: 'システム開発費（第3回）', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-25') },
  
  // ソフトウェア減価償却費
  { actual_id: 'act_004', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', transaction_date: new Date('2024-04-30'), year_month: '202404', actual_amount: 250000, description: '月次減価償却費', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-30') },
  
  // 情報システム利用料
  { actual_id: 'act_005', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', transaction_date: new Date('2024-04-01'), year_month: '202404', actual_amount: 680000, description: 'クラウドサービス月額利用料', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-01') },
  
  // 賃借料
  { actual_id: 'act_006', account_id: 'acc_102', account_name: '賃借料', account_type: 'selling_admin', vendor_id: 'vnd_003', transaction_date: new Date('2024-04-01'), year_month: '202404', actual_amount: 800000, description: 'オフィス賃料', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-01') },
  
  // 通信費
  { actual_id: 'act_007', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-04-28'), year_month: '202404', actual_amount: 45000, description: 'インターネット回線費用', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-28') },
  { actual_id: 'act_008', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-04-28'), year_month: '202404', actual_amount: 35000, description: '電話代', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-28') },
  
  // 広告宣伝費
  { actual_id: 'act_009', account_id: 'acc_105', account_name: '広告宣伝費', account_type: 'selling_admin', vendor_id: 'vnd_005', transaction_date: new Date('2024-04-10'), year_month: '202404', actual_amount: 120000, description: 'Web広告費', source_file_name: 'freee_202404.csv', imported_at: new Date('2024-05-01'), created_at: new Date('2024-04-10') },
  
  // 5月の実績データ
  // 外注費
  { actual_id: 'act_010', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-05-10'), year_month: '202405', actual_amount: 280000, description: 'システム開発費（第1回）', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-10') },
  { actual_id: 'act_011', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-05-20'), year_month: '202405', actual_amount: 350000, description: 'システム開発費（第2回）', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-20') },
  { actual_id: 'act_012', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-05-30'), year_month: '202405', actual_amount: 280000, description: 'システム開発費（第3回）', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-30') },
  
  // ソフトウェア減価償却費
  { actual_id: 'act_013', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', transaction_date: new Date('2024-05-31'), year_month: '202405', actual_amount: 250000, description: '月次減価償却費', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-31') },
  
  // 情報システム利用料
  { actual_id: 'act_014', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', transaction_date: new Date('2024-05-01'), year_month: '202405', actual_amount: 710000, description: 'クラウドサービス月額利用料', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-01') },
  
  // 賃借料
  { actual_id: 'act_015', account_id: 'acc_102', account_name: '賃借料', account_type: 'selling_admin', vendor_id: 'vnd_003', transaction_date: new Date('2024-05-01'), year_month: '202405', actual_amount: 800000, description: 'オフィス賃料', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-01') },
  
  // 通信費
  { actual_id: 'act_016', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-05-28'), year_month: '202405', actual_amount: 48000, description: 'インターネット回線費用', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-28') },
  { actual_id: 'act_017', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-05-28'), year_month: '202405', actual_amount: 38000, description: '電話代', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-28') },
  
  // 採用費
  { actual_id: 'act_018', account_id: 'acc_106', account_name: '採用費', account_type: 'selling_admin', vendor_id: 'vnd_006', transaction_date: new Date('2024-05-15'), year_month: '202405', actual_amount: 300000, description: '人材紹介手数料', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-15') },
  
  // 広告宣伝費
  { actual_id: 'act_019', account_id: 'acc_105', account_name: '広告宣伝費', account_type: 'selling_admin', vendor_id: 'vnd_005', transaction_date: new Date('2024-05-12'), year_month: '202405', actual_amount: 150000, description: 'Web広告費', source_file_name: 'freee_202405.csv', imported_at: new Date('2024-06-01'), created_at: new Date('2024-05-12') },
  
  // 6月の実績データ
  // 外注費
  { actual_id: 'act_020', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-06-05'), year_month: '202406', actual_amount: 300000, description: 'システム開発費（第1回）', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-05') },
  { actual_id: 'act_021', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-06-15'), year_month: '202406', actual_amount: 380000, description: 'システム開発費（第2回）', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-15') },
  { actual_id: 'act_022', account_id: 'acc_001', account_name: '外注費', account_type: 'cost_of_sales', vendor_id: 'vnd_001', transaction_date: new Date('2024-06-25'), year_month: '202406', actual_amount: 250000, description: 'システム開発費（第3回）', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-25') },
  
  // ソフトウェア減価償却費
  { actual_id: 'act_023', account_id: 'acc_002', account_name: 'ソフトウェア減価償却費', account_type: 'cost_of_sales', transaction_date: new Date('2024-06-30'), year_month: '202406', actual_amount: 250000, description: '月次減価償却費', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-30') },
  
  // 情報システム利用料
  { actual_id: 'act_024', account_id: 'acc_101', account_name: '情報システム利用料', account_type: 'selling_admin', vendor_id: 'vnd_002', transaction_date: new Date('2024-06-01'), year_month: '202406', actual_amount: 720000, description: 'クラウドサービス月額利用料', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-01') },
  
  // 賃借料
  { actual_id: 'act_025', account_id: 'acc_102', account_name: '賃借料', account_type: 'selling_admin', vendor_id: 'vnd_003', transaction_date: new Date('2024-06-01'), year_month: '202406', actual_amount: 800000, description: 'オフィス賃料', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-01') },
  
  // 通信費
  { actual_id: 'act_026', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-06-28'), year_month: '202406', actual_amount: 47000, description: 'インターネット回線費用', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-28') },
  { actual_id: 'act_027', account_id: 'acc_103', account_name: '通信費', account_type: 'selling_admin', vendor_id: 'vnd_004', transaction_date: new Date('2024-06-28'), year_month: '202406', actual_amount: 41000, description: '電話代', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-28') },
  
  // 研修費
  { actual_id: 'act_028', account_id: 'acc_107', account_name: '研修費', account_type: 'selling_admin', vendor_id: 'vnd_007', transaction_date: new Date('2024-06-20'), year_month: '202406', actual_amount: 180000, description: '技術研修費', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-20') },
  
  // 福利厚生費
  { actual_id: 'act_029', account_id: 'acc_108', account_name: '福利厚生費', account_type: 'selling_admin', transaction_date: new Date('2024-06-25'), year_month: '202406', actual_amount: 150000, description: '社員旅行費', source_file_name: 'freee_202406.csv', imported_at: new Date('2024-07-01'), created_at: new Date('2024-06-25') },
];

// freee会計CSVフォーマットのサンプルデータ
export const mockFreeeCSVData: FreeeCSVRow[] = [
  {
    transaction_date: '2024-04-05',
    account_name: '外注費',
    auxiliary_account_name: 'システム開発パートナー',
    debit_amount: 250000,
    credit_amount: 0,
    description: 'システム開発費（第1回）',
    document_number: 'INV-2024-001',
  },
  {
    transaction_date: '2024-04-01',
    account_name: '情報システム利用料',
    auxiliary_account_name: 'クラウドサービス',
    debit_amount: 680000,
    credit_amount: 0,
    description: 'クラウドサービス月額利用料',
    document_number: 'INV-2024-002',
  },
  {
    transaction_date: '2024-04-01',
    account_name: '賃借料',
    auxiliary_account_name: '東京不動産管理',
    debit_amount: 800000,
    credit_amount: 0,
    description: 'オフィス賃料',
    document_number: 'INV-2024-003',
  },
  {
    transaction_date: '2024-04-28',
    account_name: '通信費',
    auxiliary_account_name: 'NTTコミュニケーションズ',
    debit_amount: 45000,
    credit_amount: 0,
    description: 'インターネット回線費用',
    document_number: 'INV-2024-004',
  },
  {
    transaction_date: '2024-04-30',
    account_name: 'ソフトウェア減価償却費',
    auxiliary_account_name: '',
    debit_amount: 250000,
    credit_amount: 0,
    description: '月次減価償却費',
    document_number: 'DEP-2024-001',
  },
];

// 実績データのグリッド表示用
export const mockActualGridData: ActualGridData[] = [
  {
    account_id: 'acc_001',
    account_name: '外注費',
    account_category: 'cost_of_sales',
    vendor_id: 'vnd_001',
    vendor_name: '株式会社システム開発パートナー',
    monthly_actuals: [
      { month: 4, year_month: '202404', amount: 870000, transaction_count: 3, last_transaction_date: new Date('2024-04-25') },
      { month: 5, year_month: '202405', amount: 910000, transaction_count: 3, last_transaction_date: new Date('2024-05-30') },
      { month: 6, year_month: '202406', amount: 930000, transaction_count: 3, last_transaction_date: new Date('2024-06-25') },
      { month: 7, year_month: '202407', amount: 0, transaction_count: 0 },
      { month: 8, year_month: '202408', amount: 0, transaction_count: 0 },
      { month: 9, year_month: '202409', amount: 0, transaction_count: 0 },
      { month: 10, year_month: '202410', amount: 0, transaction_count: 0 },
      { month: 11, year_month: '202411', amount: 0, transaction_count: 0 },
      { month: 12, year_month: '202412', amount: 0, transaction_count: 0 },
      { month: 1, year_month: '202501', amount: 0, transaction_count: 0 },
      { month: 2, year_month: '202502', amount: 0, transaction_count: 0 },
      { month: 3, year_month: '202503', amount: 0, transaction_count: 0 },
    ],
    annual_total: 2710000,
    transaction_count: 9,
  },
  {
    account_id: 'acc_002',
    account_name: 'ソフトウェア減価償却費',
    account_category: 'cost_of_sales',
    monthly_actuals: [
      { month: 4, year_month: '202404', amount: 250000, transaction_count: 1 },
      { month: 5, year_month: '202405', amount: 250000, transaction_count: 1 },
      { month: 6, year_month: '202406', amount: 250000, transaction_count: 1 },
      { month: 7, year_month: '202407', amount: 0, transaction_count: 0 },
      { month: 8, year_month: '202408', amount: 0, transaction_count: 0 },
      { month: 9, year_month: '202409', amount: 0, transaction_count: 0 },
      { month: 10, year_month: '202410', amount: 0, transaction_count: 0 },
      { month: 11, year_month: '202411', amount: 0, transaction_count: 0 },
      { month: 12, year_month: '202412', amount: 0, transaction_count: 0 },
      { month: 1, year_month: '202501', amount: 0, transaction_count: 0 },
      { month: 2, year_month: '202502', amount: 0, transaction_count: 0 },
      { month: 3, year_month: '202503', amount: 0, transaction_count: 0 },
    ],
    annual_total: 750000,
    transaction_count: 3,
  },
  {
    account_id: 'acc_101',
    account_name: '情報システム利用料',
    account_category: 'selling_admin',
    vendor_id: 'vnd_002',
    vendor_name: 'クラウドサービス株式会社',
    monthly_actuals: [
      { month: 4, year_month: '202404', amount: 680000, transaction_count: 1 },
      { month: 5, year_month: '202405', amount: 710000, transaction_count: 1 },
      { month: 6, year_month: '202406', amount: 720000, transaction_count: 1 },
      { month: 7, year_month: '202407', amount: 0, transaction_count: 0 },
      { month: 8, year_month: '202408', amount: 0, transaction_count: 0 },
      { month: 9, year_month: '202409', amount: 0, transaction_count: 0 },
      { month: 10, year_month: '202410', amount: 0, transaction_count: 0 },
      { month: 11, year_month: '202411', amount: 0, transaction_count: 0 },
      { month: 12, year_month: '202412', amount: 0, transaction_count: 0 },
      { month: 1, year_month: '202501', amount: 0, transaction_count: 0 },
      { month: 2, year_month: '202502', amount: 0, transaction_count: 0 },
      { month: 3, year_month: '202503', amount: 0, transaction_count: 0 },
    ],
    annual_total: 2110000,
    transaction_count: 3,
  },
];

// 実績サマリー（過去3ヶ月分）
export const mockActualSummary: ActualSummary = {
  total_actual: 6970000, // 3ヶ月合計
  cost_of_sales_actual: 3460000, // 売上原価実績
  selling_admin_actual: 3510000, // 販管費実績
  monthly_totals: [
    {
      month: 4,
      year_month: '202404',
      total_amount: 2230000,
      cost_of_sales: 1120000,
      selling_admin: 1110000,
      transaction_count: 8,
    },
    {
      month: 5,
      year_month: '202405',
      total_amount: 2346000,
      cost_of_sales: 1160000,
      selling_admin: 1186000,
      transaction_count: 8,
    },
    {
      month: 6,
      year_month: '202406',
      total_amount: 2394000,
      cost_of_sales: 1180000,
      selling_admin: 1214000,
      transaction_count: 8,
    },
  ],
  transaction_count: 24,
};

// 取引先別実績分析
export const mockActualsByVendor: ActualsByVendor[] = [
  {
    vendor_id: 'vnd_001',
    vendor_name: '株式会社システム開発パートナー',
    monthly_totals: [
      { month: 4, year_month: '202404', amount: 870000, transaction_count: 3 },
      { month: 5, year_month: '202405', amount: 910000, transaction_count: 3 },
      { month: 6, year_month: '202406', amount: 930000, transaction_count: 3 },
    ],
    annual_total: 2710000,
    account_breakdown: [
      {
        account_id: 'acc_001',
        account_name: '外注費',
        amount: 2710000,
        transaction_count: 9,
        percentage_of_vendor_total: 100.0,
      },
    ],
  },
  {
    vendor_id: 'vnd_002',
    vendor_name: 'クラウドサービス株式会社',
    monthly_totals: [
      { month: 4, year_month: '202404', amount: 680000, transaction_count: 1 },
      { month: 5, year_month: '202405', amount: 710000, transaction_count: 1 },
      { month: 6, year_month: '202406', amount: 720000, transaction_count: 1 },
    ],
    annual_total: 2110000,
    account_breakdown: [
      {
        account_id: 'acc_101',
        account_name: '情報システム利用料',
        amount: 2110000,
        transaction_count: 3,
        percentage_of_vendor_total: 100.0,
      },
    ],
  },
  {
    vendor_id: 'vnd_003',
    vendor_name: '東京不動産管理',
    monthly_totals: [
      { month: 4, year_month: '202404', amount: 800000, transaction_count: 1 },
      { month: 5, year_month: '202405', amount: 800000, transaction_count: 1 },
      { month: 6, year_month: '202406', amount: 800000, transaction_count: 1 },
    ],
    annual_total: 2400000,
    account_breakdown: [
      {
        account_id: 'acc_102',
        account_name: '賃借料',
        amount: 2400000,
        transaction_count: 3,
        percentage_of_vendor_total: 100.0,
      },
    ],
  },
];

// インポートデータのサンプル
export const mockActualImportData: ActualImportData = {
  file_name: 'freee_export_202406.csv',
  import_date: new Date('2024-07-01T09:00:00Z'),
  target_year_month: '202406',
  import_option: 'replace',
  total_rows: 25,
  success_rows: 23,
  error_rows: 2,
  skipped_rows: 0,
  errors: [
    {
      row_number: 15,
      column: 'debit_amount',
      error_message: '金額が数値ではありません',
      value: '不明',
      raw_data: {
        transaction_date: '2024-06-15',
        account_name: '消耗品費',
        auxiliary_account_name: 'オフィス用品サプライ',
        debit_amount: undefined,
        credit_amount: 0,
        description: 'オフィス用品購入',
      },
    },
    {
      row_number: 22,
      column: 'transaction_date',
      error_message: '日付形式が正しくありません',
      value: '2024/13/45',
      raw_data: {
        transaction_date: '2024/13/45',
        account_name: '通信費',
        auxiliary_account_name: 'NTTコミュニケーションズ',
        debit_amount: 35000,
        credit_amount: 0,
        description: '電話代',
      },
    },
  ],
  imported_actuals: mockActuals.filter(actual => actual.year_month === '202406'),
};

// ヘルパー関数
export const getActualsByAccount = (accountId: string): Actual[] => {
  return mockActuals.filter(actual => actual.account_id === accountId);
};

export const getActualsByMonth = (yearMonth: string): Actual[] => {
  return mockActuals.filter(actual => actual.year_month === yearMonth);
};

export const getActualsByVendor = (vendorId: string): Actual[] => {
  return mockActuals.filter(actual => actual.vendor_id === vendorId);
};

export const calculateMonthlyTotal = (yearMonth: string): number => {
  return mockActuals
    .filter(actual => actual.year_month === yearMonth)
    .reduce((total, actual) => total + actual.actual_amount, 0);
};

export const getLatestActualByAccount = (accountId: string): Actual | undefined => {
  const actuals = getActualsByAccount(accountId);
  return actuals.sort((a, b) => b.transaction_date.getTime() - a.transaction_date.getTime())[0];
};