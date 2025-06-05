import { Budget, BudgetInput } from '@/types/budget';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateBudgetInput = (input: BudgetInput): void => {
  const errors: string[] = [];

  // 年度のバリデーション
  if (!input.year || input.year < 2000 || input.year > 2100) {
    errors.push('年度は2000年から2100年の間で指定してください');
  }

  // 月のバリデーション
  if (!input.month || input.month < 1 || input.month > 12) {
    errors.push('月は1から12の間で指定してください');
  }

  // 部門のバリデーション
  if (!input.department || input.department.trim().length === 0) {
    errors.push('部門を指定してください');
  }

  // カテゴリのバリデーション
  if (!input.category || input.category.trim().length === 0) {
    errors.push('カテゴリを指定してください');
  }

  // 金額のバリデーション
  if (typeof input.amount !== 'number' || isNaN(input.amount)) {
    errors.push('金額は数値で指定してください');
  } else if (input.amount < 0) {
    errors.push('金額は0以上で指定してください');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join('\n'));
  }
};

export const sanitizeBudgetInput = (input: BudgetInput): BudgetInput => {
  return {
    ...input,
    department: input.department.trim(),
    category: input.category.trim(),
    description: input.description?.trim(),
  };
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
};

export const parseAmount = (value: string): number => {
  const numericValue = value.replace(/[^\d-]/g, '');
  const amount = parseInt(numericValue, 10);
  if (isNaN(amount)) {
    throw new ValidationError('金額の形式が正しくありません');
  }
  return amount;
}; 