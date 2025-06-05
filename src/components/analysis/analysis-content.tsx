"use client"

import React from "react"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Printer,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"

// 仮データ
const monthlyTrendData = [
  { month: "4月", budget: 1200, actual: 1100, lastYear: 1050 },
  { month: "5月", budget: 1300, actual: 1250, lastYear: 1180 },
  { month: "6月", budget: 1400, actual: 1500, lastYear: 1320 },
  { month: "7月", budget: 1500, actual: 1600, lastYear: 1450 },
  { month: "8月", budget: 1600, actual: 1400, lastYear: 1380 },
  { month: "9月", budget: 1700, actual: 1650, lastYear: 1520 },
  { month: "10月", budget: 1800, actual: 1750, lastYear: 1680 },
]

const accountAnalysisData = [
  { account: "人件費", budget: 5000, actual: 4800, difference: -200, rate: -4.0, lastYear: 4600 },
  { account: "広告宣伝費", budget: 2000, actual: 2300, difference: 300, rate: 15.0, lastYear: 2100 },
  { account: "旅費交通費", budget: 800, actual: 650, difference: -150, rate: -18.8, lastYear: 720 },
  { account: "通信費", budget: 500, actual: 520, difference: 20, rate: 4.0, lastYear: 480 },
  { account: "消耗品費", budget: 300, actual: 280, difference: -20, rate: -6.7, lastYear: 290 },
]

const supplierCompositionData = [
  { name: "株式会社A", value: 3500, color: "#3b82f6" },
  { name: "株式会社B", value: 2800, color: "#10b981" },
  { name: "株式会社C", value: 1900, color: "#f59e0b" },
  { name: "株式会社D", value: 1200, color: "#ef4444" },
  { name: "その他", value: 1600, color: "#8b5cf6" },
]

interface AnalysisData {
  account: string
  budget: number
  actual: number
  difference: number
  rate: number
  lastYear: number
  suppliers?: {
    name: string
    budget: number
    actual: number
    difference: number
    rate: number
  }[]
  expanded?: boolean
}

export function AnalysisContent() {
  const [period, setPeriod] = useState("current-month")
  const [customPeriod, setCustomPeriod] = useState({
    startYear: "2024",
    startMonth: "4",
    endYear: "2024",
    endMonth: "10",
  })
  const [displayUnit, setDisplayUnit] = useState("10000") // 万円
  const [accountFilter, setAccountFilter] = useState("all")
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [sortField, setSortField] = useState<"account" | "budget" | "actual" | "difference" | "rate">("difference")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [expandedAccounts, setExpandedAccounts] = useState<string[]>([])

  // 詳細データ（取引先含む）
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([
    {
      account: "人件費",
      budget: 5000,
      actual: 4800,
      difference: -200,
      rate: -4.0,
      lastYear: 4600,
      suppliers: [
        { name: "株式会社A", budget: 3000, actual: 2900, difference: -100, rate: -3.3 },
        { name: "株式会社B", budget: 2000, actual: 1900, difference: -100, rate: -5.0 },
      ],
    },
    {
      account: "広告宣伝費",
      budget: 2000,
      actual: 2300,
      difference: 300,
      rate: 15.0,
      lastYear: 2100,
      suppliers: [
        { name: "株式会社C", budget: 1200, actual: 1400, difference: 200, rate: 16.7 },
        { name: "株式会社D", budget: 800, actual: 900, difference: 100, rate: 12.5 },
      ],
    },
    {
      account: "旅費交通費",
      budget: 800,
      actual: 650,
      difference: -150,
      rate: -18.8,
      lastYear: 720,
      suppliers: [
        { name: "個人E", budget: 400, actual: 320, difference: -80, rate: -20.0 },
        { name: "個人F", budget: 400, actual: 330, difference: -70, rate: -17.5 },
      ],
    },
  ])

  // 表示単位の変換
  const formatAmount = (amount: number) => {
    const unit = Number(displayUnit)
    const converted = amount / unit
    return converted.toLocaleString()
  }

  // 単位表示
  const getUnitLabel = () => {
    switch (displayUnit) {
      case "1":
        return "円"
      case "1000":
        return "千円"
      case "10000":
        return "万円"
      default:
        return "万円"
    }
  }

  // 期間表示ラベルの取得
  const getPeriodLabel = () => {
    switch (period) {
      case "current-month":
        return "2024年10月"
      case "quarter":
        return "2024年Q3"
      case "year":
        return "2024年度"
      case "custom":
        return `${customPeriod.startYear}年${customPeriod.startMonth}月～${customPeriod.endYear}年${customPeriod.endMonth}月`
      default:
        return "2024年10月"
    }
  }

  // ソート処理
  const sortedData = [...analysisData].sort((a, b) => {
    let aValue: number, bValue: number

    switch (sortField) {
      case "budget":
        aValue = a.budget
        bValue = b.budget
        break
      case "actual":
        aValue = a.actual
        bValue = b.actual
        break
      case "difference":
        aValue = Math.abs(a.difference)
        bValue = Math.abs(b.difference)
        break
      case "rate":
        aValue = Math.abs(a.rate)
        bValue = Math.abs(b.rate)
        break
      default:
        return a.account.localeCompare(b.account)
    }

    return sortDirection === "desc" ? bValue - aValue : aValue - bValue
  })

  // 行の展開/折りたたみ
  const toggleExpand = (account: string) => {
    setExpandedAccounts((prev) => (prev.includes(account) ? prev.filter((a) => a !== account) : [...prev, account]))
  }

  // サマリー計算
  const totalBudget = analysisData.reduce((sum, item) => sum + item.budget, 0)
  const totalActual = analysisData.reduce((sum, item) => sum + item.actual, 0)
  const totalDifference = totalActual - totalBudget
  const totalDifferenceRate = totalBudget > 0 ? (totalDifference / totalBudget) * 100 : 0
  const achievementRate = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0

  // エクスポート機能
  const handleExcelExport = () => {
    console.log("Excelエクスポート実行")
  }

  const handlePrintReport = () => {
    console.log("レポート印刷実行")
  }

  const handleDetailedAnalysis = () => {
    console.log("詳細分析画面へ遷移")
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">予実分析</h2>
          <p className="text-sm text-gray-500">予算と実績の対比分析を行います</p>
        </div>
        <Badge variant="outline" className="text-sm">
          最終更新: 2024年10月15日 16:30
        </Badge>
      </div>

      {/* 条件設定エリア */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" />
            分析条件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 期間選択 */}
            <div className="space-y-2">
              <Label>期間</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="期間を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">当月</SelectItem>
                  <SelectItem value="quarter">四半期</SelectItem>
                  <SelectItem value="year">年度</SelectItem>
                  <SelectItem value="custom">カスタム</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 表示単位 */}
            <div className="space-y-2">
              <Label>表示単位</Label>
              <Select value={displayUnit} onValueChange={setDisplayUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="単位を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">円</SelectItem>
                  <SelectItem value="1000">千円</SelectItem>
                  <SelectItem value="10000">万円</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 勘定科目フィルター */}
            <div className="space-y-2">
              <Label>勘定科目</Label>
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="勘定科目を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="cost">売上原価</SelectItem>
                  <SelectItem value="expense">販管費</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 取引先フィルター */}
            <div className="space-y-2">
              <Label>取引先</Label>
              <Select
                value={selectedSuppliers.length > 0 ? selectedSuppliers[0] : "all"}
                onValueChange={(value) => setSelectedSuppliers(value === "all" ? [] : [value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="取引先を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="A">株式会社A</SelectItem>
                  <SelectItem value="B">株式会社B</SelectItem>
                  <SelectItem value="C">株式会社C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatAmount(totalBudget)} {getUnitLabel()}
              </div>
              <div className="text-sm text-gray-500">総予算額</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatAmount(totalActual)} {getUnitLabel()}
              </div>
              <div className="text-sm text-gray-500">総実績額</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatAmount(totalDifference)} {getUnitLabel()}
              </div>
              <div className="text-sm text-gray-500">総差異額</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{achievementRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">達成率</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 分析タブ */}
      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">トレンド分析</TabsTrigger>
          <TabsTrigger value="account">勘定科目別分析</TabsTrigger>
          <TabsTrigger value="supplier">取引先別分析</TabsTrigger>
        </TabsList>

        {/* トレンド分析 */}
        <TabsContent value="trend">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">月次推移</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      name="予算"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="実績"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      name="前年"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 勘定科目別分析 */}
        <TabsContent value="account">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">勘定科目別分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accountAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="account" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="budget" name="予算" fill="#3b82f6" />
                    <Bar dataKey="actual" name="実績" fill="#22c55e" />
                    <Bar dataKey="lastYear" name="前年" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 取引先別分析 */}
        <TabsContent value="supplier">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">取引先別構成</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={supplierCompositionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label
                    >
                      {supplierCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* アクションボタン */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleExcelExport}>
          <Download className="h-4 w-4 mr-2" />
          Excel出力
        </Button>
        <Button variant="outline" onClick={handlePrintReport}>
          <Printer className="h-4 w-4 mr-2" />
          印刷
        </Button>
        <Button onClick={handleDetailedAnalysis}>
          <FileText className="h-4 w-4 mr-2" />
          詳細レポート
        </Button>
      </div>
    </div>
  )
} 