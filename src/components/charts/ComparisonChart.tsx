import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    account: '旅費交通費',
    budget: 1500000,
    actual: 1420000,
    difference: -80000,
  },
  {
    account: '接待交際費',
    budget: 2000000,
    actual: 1950000,
    difference: -50000,
  },
  {
    account: '会議費',
    budget: 1000000,
    actual: 980000,
    difference: -20000,
  },
  {
    account: '通信費',
    budget: 500000,
    actual: 480000,
    difference: -20000,
  },
  {
    account: '消耗品費',
    budget: 300000,
    actual: 320000,
    difference: 20000,
  },
];

const formatYAxis = (value: number) => {
  return `¥${(value / 10000).toLocaleString()}万`;
};

export const ComparisonChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="account" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={(value: number) => [
            `¥${value.toLocaleString()}`,
            '',
          ]}
        />
        <Legend />
        <Bar
          dataKey="budget"
          name="予算"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="actual"
          name="実績"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 