import { FluctuationFactor } from '@/types/budget';

export const mockFluctuationFactors: FluctuationFactor[] = [
  {
    factor_id: 'fact_001',
    factor_name: '社員数',
    factor_type: 'headcount',
    description: '社員数の変動に基づく計算',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    created_by: 'admin'
  },
  {
    factor_id: 'fact_002',
    factor_name: '売上高',
    factor_type: 'revenue',
    description: '売上高の変動に基づく計算',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    created_by: 'admin'
  }
]; 