// src/types/budget.ts
// 予算関連の型定義

export type BudgetStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export type Budget = {
  id: string;
  year: number;
  month: number;
  department: string;
  category: string;
  account: string; // 勘定科目を追加
  amount: number;
  status: BudgetStatus; // ステータスを追加
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BudgetInput = Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>;

export type BudgetGridData = Budget & {
  submittedBy?: string;
  approvedBy?: string;
  comments?: string;
};

export interface BudgetVersion {
  version_id: string;
  version_name: string; // '通常予算', '楽観予算', '悲観予算'
  description?: string;
  is_confirmed: boolean;
  confirmed_by?: string;
  confirmed_at?: Date;
  created_at: Date;
}

export interface BudgetAccount {
  account_id: string;
  account_name: string;
  account_category: 'cost_of_sales' | 'selling_admin';
  vendor_id?: string;
  vendor_name?: string;
  monthly_budgets: MonthlyBudget[];
  annual_total: number;
  has_factor_link: boolean;
  factor_settings?: FactorLinkSettings;
}

export interface MonthlyBudget {
  month: number; // 1-12
  year_month: string; // YYYYMM
  amount: number;
  is_calculated: boolean; // 変動要因で自動計算されたかどうか
}

export interface FactorLinkSettings {
  factor_id: string;
  factor_name: string;
  calculation_method: 'per_person' | 'percentage' | 'fixed_rate';
  basis_value: number; // 単価または率
  description?: string;
}

export interface BudgetSummary {
  total_budget: number;
  cost_of_sales_budget: number;
  selling_admin_budget: number;
  monthly_totals: MonthlyTotal[];
  year_over_year_change: number;
  year_over_year_rate: number;
}

export interface MonthlyTotal {
  month: number;
  year_month: string;
  total_amount: number;
  cost_of_sales: number;
  selling_admin: number;
}

export interface BudgetImportData {
  file_name: string;
  import_date: Date;
  total_rows: number;
  success_rows: number;
  error_rows: number;
  errors: ImportError[];
  imported_budgets: BudgetInput[];
}

export interface ImportError {
  row_number: number;
  column: string;
  error_message: string;
  value: string;
}

export interface ExcelBudgetRow {
  account_code?: string;
  account_name: string;
  vendor_code?: string;
  vendor_name?: string;
  april?: number;
  may?: number;
  june?: number;
  july?: number;
  august?: number;
  september?: number;
  october?: number;
  november?: number;
  december?: number;
  january?: number;
  february?: number;
  march?: number;
  annual_total?: number;
}

export interface BudgetCalculationRequest {
  account_id: string;
  vendor_id?: string;
  factor_id: string;
  basis_value: number;
  target_months: string[]; // YYYYMM配列
}

export interface BudgetCalculationResult {
  monthly_amounts: MonthlyBudget[];
  total_amount: number;
  calculation_details: CalculationDetail[];
}

export interface CalculationDetail {
  month: number;
  year_month: string;
  factor_value: number; // その月の変動要因の値
  basis_value: number; // 基準単価
  calculated_amount: number;
  formula: string; // 計算式の説明
}