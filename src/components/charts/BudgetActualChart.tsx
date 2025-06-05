import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: '1月', budget: 1500000, actual: 1420000 },
  { month: '2月', budget: 1500000, actual: 1480000 },
  { month: '3月', budget: 1500000, actual: 1550000 },
  { month: '4月', budget: 1500000, actual: 1380000 },
  { month: '5月', budget: 1500000, actual: 1450000 },
  { month: '6月', budget: 1500000, actual: 1520000 },
  { month: '7月', budget: 1500000, actual: 1470000 },
  { month: '8月', budget: 1500000, actual: 1430000 },
  { month: '9月', budget: 1500000, actual: 1490000 },
  { month: '10月', budget: 1500000, actual: 1510000 },
  { month: '11月', budget: 1500000, actual: 1460000 },
  { month: '12月', budget: 1500000, actual: 1440000 },
];

const formatYAxis = (value: number) => {
  return `¥${(value / 10000).toLocaleString()}万`;
};

export const BudgetActualChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={(value: number) => [
            `¥${value.toLocaleString()}`,
            '',
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="budget"
          name="予算"
          stroke="#0ea5e9"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="actual"
          name="実績"
          stroke="#22c55e"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 