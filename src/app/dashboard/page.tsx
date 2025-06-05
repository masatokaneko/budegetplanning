"use client"

import React from 'react'
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from "recharts"
import { ArrowDown, ArrowRight, ArrowUp, BarChart3, Calculator, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Chart } from '@/components/ui/chart'

// 仮データ
const monthlyData = [
  { month: "4月", budget: 1200, actual: 1100 },
  { month: "5月", budget: 1300, actual: 1250 },
  { month: "6月", budget: 1400, actual: 1500 },
  { month: "7月", budget: 1500, actual: 1600 },
  { month: "8月", budget: 1600, actual: 1400 },
  { month: "9月", budget: 1700, actual: 1650 },
  { month: "10月", budget: 1800, actual: 1750 },
  { month: "11月", budget: 1900, actual: 0 },
  { month: "12月", budget: 2000, actual: 0 },
  { month: "1月", budget: 1800, actual: 0 },
  { month: "2月", budget: 1700, actual: 0 },
  { month: "3月", budget: 1600, actual: 0 },
]

const currentMonth = "10月"
const currentMonthData = monthlyData.find((item) => item.month === currentMonth) || { budget: 0, actual: 0 }
const difference = currentMonthData.actual - currentMonthData.budget
const achievementRate =
  currentMonthData.budget > 0 ? Math.round((currentMonthData.actual / currentMonthData.budget) * 100) : 0

const totalBudget = monthlyData.reduce((sum, item) => sum + item.budget, 0)
const totalActual = monthlyData.reduce((sum, item) => sum + item.actual, 0)
const progressPercentage = Math.round((totalActual / totalBudget) * 100)

const categoryDifferences = [
  { category: "人件費", difference: -120, budget: 1000, actual: 880 },
  { category: "広告宣伝費", difference: 80, budget: 500, actual: 580 },
  { category: "旅費交通費", difference: -50, budget: 300, actual: 250 },
  { category: "通信費", difference: 30, budget: 200, actual: 230 },
  { category: "消耗品費", difference: -20, budget: 150, actual: 130 },
]

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">ダッシュボード</h1>
      
      {/* KPIカード */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">予算消化率</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">75%</p>
              <p className="ml-2 text-sm text-gray-500">前年比 +5%</p>
            </div>
            <Progress value={75} className="mt-4" />
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">予算残高</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">¥2,500,000</p>
              <p className="ml-2 text-sm text-gray-500">前年比 -10%</p>
            </div>
            <Progress value={25} className="mt-4" />
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">未承認案件</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">5件</p>
              <p className="ml-2 text-sm text-gray-500">前週比 -2件</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">予算超過案件</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">2件</p>
              <p className="ml-2 text-sm text-gray-500">前週比 +1件</p>
            </div>
          </div>
        </Card>
      </div>

      {/* グラフ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">予算vs実績推移</h3>
            <div className="mt-4 h-80">
              <Chart
                type="line"
                data={{
                  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                  datasets: [
                    {
                      label: '予算',
                      data: [100, 120, 115, 134, 168, 132],
                      borderColor: 'rgb(59, 130, 246)',
                    },
                    {
                      label: '実績',
                      data: [90, 110, 125, 140, 160, 140],
                      borderColor: 'rgb(16, 185, 129)',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">部門別予算消化率</h3>
            <div className="mt-4 h-80">
              <Chart
                type="bar"
                data={{
                  labels: ['営業部', '開発部', '管理部', '人事部'],
                  datasets: [
                    {
                      label: '消化率',
                      data: [85, 65, 90, 75],
                      backgroundColor: 'rgb(59, 130, 246)',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* アクションボタン */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Calculator className="h-4 w-4" />
          予算を策定する
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
          <Upload className="h-4 w-4" />
          実績を取込む
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700">
          <BarChart3 className="h-4 w-4" />
          予実分析を見る
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 