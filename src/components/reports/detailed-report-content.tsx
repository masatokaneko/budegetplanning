"use client"

import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Calendar,
  Download,
  Edit3,
  FileText,
  Printer,
  Save,
  User,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

// 仮データ
const reportData = {
  period: "2024年4月～2024年10月",
  createdAt: "2024年10月15日 16:45",
  createdBy: "田中 太郎",
  summary: {
    totalBudget: 11000,
    totalActual: 10750,
    totalDifference: -250,
    totalDifferenceRate: -2.3,
  },
  topVariances: [
    { account: "旅費交通費", difference: -150, rate: -18.8, impact: "high" },
    { account: "広告宣伝費", difference: 300, rate: 15.0, impact: "high" },
    { account: "人件費", difference: -200, rate: -4.0, impact: "medium" },
    { account: "通信費", difference: 20, rate: 4.0, impact: "low" },
    { account: "消耗品費", difference: -20, rate: -6.7, impact: "low" },
  ],
  accountDetails: [
    {
      account: "人件費",
      budget: 5000,
      actual: 4800,
      difference: -200,
      rate: -4.0,
      suppliers: [
        { name: "株式会社A", budget: 3000, actual: 2900, difference: -100, rate: -3.3 },
        { name: "株式会社B", budget: 2000, actual: 1900, difference: -100, rate: -5.0 },
      ],
      monthlyData: [
        { month: "4月", budget: 714, actual: 686 },
        { month: "5月", budget: 714, actual: 686 },
        { month: "6月", budget: 714, actual: 686 },
        { month: "7月", budget: 714, actual: 686 },
        { month: "8月", budget: 714, actual: 686 },
        { month: "9月", budget: 714, actual: 686 },
        { month: "10月", budget: 716, actual: 684 },
      ],
    },
    {
      account: "広告宣伝費",
      budget: 2000,
      actual: 2300,
      difference: 300,
      rate: 15.0,
      suppliers: [
        { name: "株式会社C", budget: 1200, actual: 1400, difference: 200, rate: 16.7 },
        { name: "株式会社D", budget: 800, actual: 900, difference: 100, rate: 12.5 },
      ],
      monthlyData: [
        { month: "4月", budget: 286, actual: 329 },
        { month: "5月", budget: 286, actual: 329 },
        { month: "6月", budget: 286, actual: 329 },
        { month: "7月", budget: 286, actual: 329 },
        { month: "8月", budget: 286, actual: 329 },
        { month: "9月", budget: 286, actual: 329 },
        { month: "10月", budget: 284, actual: 327 },
      ],
    },
    {
      account: "旅費交通費",
      budget: 800,
      actual: 650,
      difference: -150,
      rate: -18.8,
      suppliers: [
        { name: "個人E", budget: 400, actual: 320, difference: -80, rate: -20.0 },
        { name: "個人F", budget: 400, actual: 330, difference: -70, rate: -17.5 },
      ],
      monthlyData: [
        { month: "4月", budget: 114, actual: 93 },
        { month: "5月", budget: 114, actual: 93 },
        { month: "6月", budget: 114, actual: 93 },
        { month: "7月", budget: 114, actual: 93 },
        { month: "8月", budget: 114, actual: 93 },
        { month: "9月", budget: 114, actual: 93 },
        { month: "10月", budget: 116, actual: 92 },
      ],
    },
  ],
}

interface CommentData {
  [key: string]: {
    analysis: string
    action: string
  }
}

export function DetailedReportContent() {
  const [comments, setComments] = useState<CommentData>({
    人件費: {
      analysis: "採用計画の遅れにより、予定していた人員増強が実現できなかった。",
      action: "来月より積極的な採用活動を実施し、年度末までに計画人員を確保する。",
    },
    広告宣伝費: {
      analysis: "新商品のプロモーション強化により、当初予算を上回る投資を実施。",
      action: "効果測定を行い、ROIの高い施策に予算を集中させる。",
    },
    旅費交通費: {
      analysis: "リモートワークの浸透により、出張頻度が大幅に減少。",
      action: "削減分を他の成長投資に振り向けることを検討する。",
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  // コメント更新
  const updateComment = (account: string, field: "analysis" | "action", value: string) => {
    setComments((prev) => ({
      ...prev,
      [account]: {
        ...prev[account],
        [field]: value,
      },
    }))
  }

  // 印刷機能
  const handlePrint = () => {
    window.print()
  }

  // PDF出力
  const handlePdfExport = () => {
    console.log("PDF出力実行")
    // 実際の実装では、html2pdf.jsやjsPDFなどを使用
  }

  // Excel出力
  const handleExcelExport = () => {
    console.log("Excel出力実行")
    // 実際の実装では、SheetJSなどを使用
  }

  // コメント保存
  const handleSaveComments = () => {
    console.log("コメント保存:", comments)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col space-y-6 print:space-y-4">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">詳細レポート</h2>
          <p className="text-sm text-gray-500">予実対比の詳細分析レポートです</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "編集終了" : "コメント編集"}
          </Button>
          {isEditing && (
            <Button onClick={handleSaveComments}>
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          )}
        </div>
      </div>

      {/* レポートヘッダー */}
      <Card className="shadow-sm print:shadow-none print:border-0">
        <CardHeader className="text-center border-b print:border-gray-300">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 print:text-2xl">予実対比詳細レポート</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mt-4">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>対象期間: {reportData.period}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                <span>出力日時: {reportData.createdAt}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                <span>作成者: {reportData.createdBy}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* サマリーセクション */}
      <Card className="shadow-sm print:shadow-none print:border print:border-gray-300">
        <CardHeader>
          <CardTitle className="text-lg font-medium">1. 全体概況</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg print:bg-gray-50">
              <div className="text-2xl font-bold text-blue-600 print:text-gray-900">
                {reportData.summary.totalBudget.toLocaleString()}万円
              </div>
              <div className="text-sm text-gray-600">総予算額</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg print:bg-gray-50">
              <div className="text-2xl font-bold text-green-600 print:text-gray-900">
                {reportData.summary.totalActual.toLocaleString()}万円
              </div>
              <div className="text-sm text-gray-600">総実績額</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg print:bg-gray-50">
              <div className="text-2xl font-bold text-red-600 print:text-gray-900">
                {reportData.summary.totalDifference.toLocaleString()}万円
              </div>
              <div className="text-sm text-gray-600">総差異額</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg print:bg-gray-50">
              <div className="text-2xl font-bold text-purple-600 print:text-gray-900">
                {reportData.summary.totalDifferenceRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">差異率</div>
            </div>
          </div>

          <Separator className="print:border-gray-300" />

          <div>
            <h3 className="text-base font-medium mb-3">主要差異項目（TOP5）</h3>
            <div className="space-y-2">
              {reportData.topVariances.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg print:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white print:bg-gray-100">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{item.account}</div>
                      <div className="text-sm text-gray-500">
                        {item.difference > 0 ? "予算超過" : "予算未達"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        item.difference > 0 ? "text-red-600" : "text-green-600"
                      } print:text-gray-900`}
                    >
                      {item.difference.toLocaleString()}万円
                    </div>
                    <div className="text-sm text-gray-500">{item.rate.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 勘定科目別詳細 */}
      {reportData.accountDetails.map((account, index) => (
        <Card key={account.account} className="shadow-sm print:shadow-none print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {index + 2}. {account.account}の詳細
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* サマリー */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg print:bg-gray-50">
                <div className="text-xl font-bold text-blue-600 print:text-gray-900">
                  {account.budget.toLocaleString()}万円
                </div>
                <div className="text-sm text-gray-600">予算額</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg print:bg-gray-50">
                <div className="text-xl font-bold text-green-600 print:text-gray-900">
                  {account.actual.toLocaleString()}万円
                </div>
                <div className="text-sm text-gray-600">実績額</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg print:bg-gray-50">
                <div className="text-xl font-bold text-red-600 print:text-gray-900">
                  {account.difference.toLocaleString()}万円
                </div>
                <div className="text-sm text-gray-600">差異額</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg print:bg-gray-50">
                <div className="text-xl font-bold text-purple-600 print:text-gray-900">
                  {account.rate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">差異率</div>
              </div>
            </div>

            {/* 月次推移グラフ */}
            <div className="h-[300px] print:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={account.monthlyData}>
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
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 取引先別内訳 */}
            <div>
              <h3 className="text-base font-medium mb-3">取引先別内訳</h3>
              <div className="space-y-2">
                {account.suppliers.map((supplier, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg print:bg-gray-50"
                  >
                    <div className="font-medium">{supplier.name}</div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          supplier.difference > 0 ? "text-red-600" : "text-green-600"
                        } print:text-gray-900`}
                      >
                        {supplier.difference.toLocaleString()}万円
                      </div>
                      <div className="text-sm text-gray-500">{supplier.rate.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 分析とアクション */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`analysis-${account.account}`}>分析</Label>
                  <Textarea
                    id={`analysis-${account.account}`}
                    value={comments[account.account]?.analysis || ""}
                    onChange={(e) => updateComment(account.account, "analysis", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`action-${account.account}`}>アクション</Label>
                  <Textarea
                    id={`action-${account.account}`}
                    value={comments[account.account]?.action || ""}
                    onChange={(e) => updateComment(account.account, "action", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">分析</h3>
                  <p className="text-gray-700">{comments[account.account]?.analysis || "分析コメントがありません"}</p>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">アクション</h3>
                  <p className="text-gray-700">{comments[account.account]?.action || "アクションが設定されていません"}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* 印刷用フッター */}
      <div className="hidden print:block text-center text-sm text-gray-500 mt-8">
        <p>このレポートは自動生成されました</p>
        <p>最終更新: {reportData.createdAt}</p>
      </div>
    </div>
  )
} 