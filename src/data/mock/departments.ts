import { Department } from '@/types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: '経営企画部',
    code: 'D001',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '財務部',
    code: 'D002',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '営業部',
    code: 'D003',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: '開発部',
    code: 'D004',
    parentId: '3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]; 