// 共通の型定義
export type BudgetStatus = 'draft' | 'submitted' | 'approved' | 'rejected';
export type FactorType = 'percentage' | 'fixed';
export type CategoryType = 'income' | 'expense';
export type UserRole = 'admin' | 'user';

// ベースエンティティ
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザー
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

// 予算
export interface Budget extends BaseEntity {
  year: number;
  month: number;
  department: string;
  category: string;
  amount: number;
  description?: string;
  status: BudgetStatus;
  createdBy: string;
}

// 実績
export interface Actual extends BaseEntity {
  year: number;
  month: number;
  department: string;
  category: string;
  amount: number;
  description?: string;
  recordedAt: Date;
  recordedBy: string;
}

// 取引先
export interface Vendor extends BaseEntity {
  name: string;
  code: string;
  type: string;
  status: 'active' | 'inactive';
}

// 変動要因
export interface FluctuationFactor extends BaseEntity {
  name: string;
  type: FactorType;
  description: string;
  isActive: boolean;
}

// 予測値
export interface FactorForecast extends BaseEntity {
  factorId: string;
  year: number;
  month: number;
  value: number;
  confidence: number;
  notes: string;
}

// 部門
export interface Department extends BaseEntity {
  name: string;
  code: string;
  parentId?: string;
}

// カテゴリ
export interface Category extends BaseEntity {
  name: string;
  code: string;
  type: CategoryType;
  parentId?: string;
}

// 予算計算結果
export interface BudgetCalculationResult {
  originalAmount: number;
  adjustedAmount: number;
  factors: {
    factorId: string;
    factorName: string;
    impact: number;
  }[];
} 