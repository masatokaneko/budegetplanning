'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'
import { Chart } from '@/components/ui/chart'
import { useBudget } from '@/hooks/useBudget'
import { useActual } from '@/hooks/useActual'

export default function AnalysisPage() {
  const { budgets } = useBudget()
  const { actuals } = useActual()

  // 予算と実績の比較データを作成
  const comparisonData = [
    { month: '1月', 予算: 1000000, 実績: 950000 },
    { month: '2月', 予算: 1200000, 実績: 1100000 },
    { month: '3月', 予算: 1100000, 実績: 1050000 },
    { month: '4月', 予算: 1300000, 実績: 1250000 },
    { month: '5月', 予算: 1400000, 実績: 1350000 },
    { month: '6月', 予算: 1500000, 実績: 1450000 },
  ]

  // 部門別予算消化率データを作成
  const summaryData = [
    { department: '営業部', 消化率: 85 },
    { department: '開発部', 消化率: 92 },
    { department: '管理部', 消化率: 78 },
    { department: '総務部', 消化率: 88 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">予実分析</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Chart
            data={comparisonData}
            type="line"
            xAxisKey="month"
            yAxisKey="予算"
            title="予算実績推移"
            height={300}
          />
        </Card>

        <Card>
          <Chart
            data={summaryData}
            type="bar"
            xAxisKey="department"
            yAxisKey="消化率"
            title="部門別予算消化率"
            height={300}
          />
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-medium mb-4">部門別詳細分析</h2>
        <div className="space-y-4">
          {summaryData.map((item) => (
            <div key={item.department} className="border-b pb-4 last:border-0">
              <h3 className="font-medium mb-2">{item.department}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">予算消化率</p>
                  <p className="text-lg font-medium">{item.消化率}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">前月比</p>
                  <p className="text-lg font-medium text-green-600">+5%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 