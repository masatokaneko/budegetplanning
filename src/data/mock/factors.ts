import { Factor } from '@/types';

export const mockFactors: Factor[] = [
  {
    id: '1',
    name: '為替変動',
    type: '外部要因',
    impact: 'negative',
    description: '円安による原材料費の上昇',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '新規事業展開',
    type: '内部要因',
    impact: 'positive',
    description: '新規市場への参入による売上増加',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '原材料価格上昇',
    type: '外部要因',
    impact: 'negative',
    description: '世界的な原材料不足による価格上昇',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]; 