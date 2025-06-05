export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  fiscalYear: number;
  department: string;
  category: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Actual {
  id: string;
  fiscalYear: number;
  department: string;
  category: string;
  amount: number;
  transactionDate: Date;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  code: string;
  type: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Factor {
  id: string;
  name: string;
  type: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  type: 'income' | 'expense';
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
} 