import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface FactorForecast {
  id: string;
  factorId: string;
  year: number;
  month: number;
  value: number;
  confidence: number;
  notes: string;
}

interface FactorForecastFormProps {
  factorId: string;
  year: number;
  month: number;
  onSubmit: (forecast: Omit<FactorForecast, 'id'>) => void;
  initialData?: FactorForecast;
}

export const FactorForecastForm: React.FC<FactorForecastFormProps> = ({
  factorId,
  year,
  month,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = React.useState<Omit<FactorForecast, 'id'>>({
    factorId,
    year,
    month,
    value: initialData?.value || 0,
    confidence: initialData?.confidence || 0,
    notes: initialData?.notes || ''
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
            予測値
          </label>
          <Input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
            required
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            信頼度 (%)
          </label>
          <Input
            type="number"
            value={formData.confidence}
            onChange={(e) => setFormData({ ...formData, confidence: parseFloat(e.target.value) })}
            required
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            備考
          </label>
          <Input
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <Button type="submit" variant="default">
          {initialData ? '更新' : '作成'}
        </Button>
      </form>
    </Card>
  );
}; 