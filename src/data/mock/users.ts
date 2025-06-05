import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '山田太郎',
    email: 'yamada@example.com',
    role: 'admin',
    department: '経営企画部',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '鈴木花子',
    email: 'suzuki@example.com',
    role: 'user',
    department: '財務部',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '佐藤一郎',
    email: 'sato@example.com',
    role: 'user',
    department: '営業部',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]; 