import { Vendor } from '@/types';

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: '株式会社サンプル',
    code: 'V001',
    type: '取引先',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '株式会社テスト',
    code: 'V002',
    type: '取引先',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '株式会社デモ',
    code: 'V003',
    type: '取引先',
    status: 'inactive',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]; 