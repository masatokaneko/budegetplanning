import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

interface FluctuationFactor {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  description: string;
  isActive: boolean;
}

interface FluctuationFactorFormProps {
  onSubmit: (factor: Omit<FluctuationFactor, 'id'>) => void;
  initialData?: FluctuationFactor;
}

export const FluctuationFactorForm: React.FC<FluctuationFactorFormProps> = ({
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = React.useState<Omit<FluctuationFactor, 'id'>>({
    name: initialData?.name || '',
    type: initialData?.type || 'percentage',
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            変動要因名
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            変動タイプ
          </label>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
          >
            <option value="percentage">パーセンテージ</option>
            <option value="fixed">固定値</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            説明
          </label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            有効
          </label>
        </div>

        <Button type="submit" variant="primary">
          {initialData ? '更新' : '作成'}
        </Button>
      </form>
    </Card>
  );
}; 