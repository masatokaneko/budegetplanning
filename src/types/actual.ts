// src/types/actual.ts
// 実績関連の型定義

export type Actual = {
  actual_id: string;
  account_id: string;
  account_name: string;
  account_type: 'cost_of_sales' | 'selling_admin';
  vendor_id?: string;
  vendor_name?: string;
  transaction_date: Date;
  year_month: string;
  actual_amount: number;
  description?: string;
  source_file_name: string;
  imported_at: Date;
  created_at: Date;
}

export interface ActualInput {
  account_id: string;
  vendor_id?: string;
  transaction_date: Date;
  actual_amount: number;
  description?: string;
}

export interface ActualSummary {
  total_actual: number;
  cost_of_sales_actual: number;
  selling_admin_actual: number;
  monthly_totals: MonthlyActualTotal[];
  transaction_count: number;
}

export interface MonthlyActualTotal {
  month: number;
  year_month: string;
  total_amount: number;
  cost_of_sales: number;
  selling_admin: number;
  transaction_count: number;
}

export interface ActualGridData {
  account_id: string;
  account_name: string;
  account_category: 'cost_of_sales' | 'selling_admin';
  vendor_id?: string;
  vendor_name?: string;
  monthly_actuals: MonthlyActual[];
  annual_total: number;
  transaction_count: number;
}

export interface MonthlyActual {
  month: number;
  year_month: string;
  amount: number;
  transaction_count: number;
  last_transaction_date?: Date;
}

export interface FreeeCSVRow {
  transaction_date: string; // 'YYYY-MM-DD'
  account_name: string;
  auxiliary_account_name?: string; // 補助科目（取引先）
  debit_amount?: number;
  credit_amount?: number;
  description?: string;
  document_number?: string;
}

export interface ActualImportData {
  file_name: string;
  import_date: Date;
  target_year_month?: string;
  import_option: 'replace' | 'append';
  total_rows: number;
  success_rows: number;
  error_rows: number;
  skipped_rows: number; // 対象外データ（収益など）
  errors: ImportError[];
  imported_actuals: ActualInput[];
}

export interface ImportError {
  row_number: number;
  column: string;
  error_message: string;
  value: string;
  raw_data: FreeeCSVRow;
}

export interface ActualImportPreview {
  detected_columns: CSVColumnMapping;
  preview_data: FreeeCSVRow[];
  estimated_import_count: number;
  validation_errors: ValidationError[];
}

export interface CSVColumnMapping {
  date_column: string;
  account_column: string;
  auxiliary_column?: string;
  debit_column?: string;
  credit_column?: string;
  amount_column?: string;
  description_column?: string;
}

export interface ValidationError {
  type: 'missing_column' | 'invalid_format' | 'invalid_amount' | 'invalid_date';
  message: string;
  affected_rows?: number[];
}

export interface ActualsByVendor {
  vendor_id: string;
  vendor_name: string;
  monthly_totals: MonthlyVendorActual[];
  annual_total: number;
  account_breakdown: AccountActual[];
}

export interface MonthlyVendorActual {
  month: number;
  year_month: string;
  amount: number;
  transaction_count: number;
}

export interface AccountActual {
  account_id: string;
  account_name: string;
  amount: number;
  transaction_count: number;
  percentage_of_vendor_total: number;
}

export interface ActualTrend {
  account_id: string;
  account_name: string;
  monthly_data: MonthlyTrendData[];
  trend_analysis: TrendAnalysis;
}

export interface MonthlyTrendData {
  year_month: string;
  amount: number;
  transaction_count: number;
  average_per_transaction: number;
}

export interface TrendAnalysis {
  trend_direction: 'increasing' | 'decreasing' | 'stable';
  growth_rate: number; // 月平均成長率
  volatility: number; // 変動の大きさ
  seasonality_detected: boolean;
} 