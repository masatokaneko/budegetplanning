import React from 'react'
import { DataGrid } from '@/components/data-grid/DataGrid'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useBudget } from '@/hooks/useBudget'
import { BudgetGridData } from '@/types/budget'

export default function BudgetPage() {
  const { budgets, loading, error, getGridData } = useBudget()

  const columns = [
    {
      header: '部門',
      accessorKey: 'department',
    },
    {
      header: 'カテゴリー',
      accessorKey: 'category',
    },
    {
      header: '予算額',
      accessorKey: 'amount',
      cell: ({ row }: { row: { original: BudgetGridData } }) => (
        <span>¥{row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      header: 'ステータス',
      accessorKey: 'status',
      cell: ({ row }: { row: { original: BudgetGridData } }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.original.status === 'approved' ? 'bg-green-100 text-green-800' :
            row.original.status === 'rejected' ? 'bg-red-100 text-red-800' :
            row.original.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'}`}
        >
          {row.original.status === 'approved' ? '承認済' :
           row.original.status === 'rejected' ? '却下' :
           row.original.status === 'submitted' ? '申請中' :
           '下書き'}
        </span>
      ),
    },
    {
      header: '申請者',
      accessorKey: 'submittedBy',
    },
    {
      header: '承認者',
      accessorKey: 'approvedBy',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">予算策定</h1>
        <div className="flex space-x-4">
          <Button variant="outline">
            テンプレートダウンロード
          </Button>
          <Button>
            新規作成
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          {error ? (
            <div className="text-red-500">エラーが発生しました: {error.message}</div>
          ) : (
            <DataGrid
              data={getGridData(budgets)}
              columns={columns}
              pageSize={10}
            />
          )}
        </div>
      </Card>
    </div>
  )
} 