"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const RechartsChart = dynamic(
  () => import('./RechartsChart'),
  { ssr: false }
)

interface ChartProps {
  data: any[]
  type: 'line' | 'bar'
  xAxisKey: string
  yAxisKey: string
  title?: string
  height?: number
}

export const Chart: React.FC<ChartProps> = (props) => {
  return <RechartsChart {...props} />
} 