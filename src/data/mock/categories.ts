import { Category } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: '人件費',
    code: 'C001',
    type: 'expense',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '旅費交通費',
    code: 'C002',
    type: 'expense',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '接待交際費',
    code: 'C003',
    type: 'expense',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: '売上',
    code: 'C004',
    type: 'income',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: '雑収入',
    code: 'C005',
    type: 'income',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]; 