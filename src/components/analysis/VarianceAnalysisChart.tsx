import React from 'react';
import { Card } from '../ui/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface VarianceData {
  month: string;
  budget: number;
  actual: number;
  variance: number;
}

interface VarianceAnalysisChartProps {
  data: VarianceData[];
  title: string;
}

export const VarianceAnalysisChart: React.FC<VarianceAnalysisChartProps> = ({
  data,
  title
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#8884d8"
              name="予算"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#82ca9d"
              name="実績"
            />
            <Line
              type="monotone"
              dataKey="variance"
              stroke="#ff7300"
              name="差異"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}; 