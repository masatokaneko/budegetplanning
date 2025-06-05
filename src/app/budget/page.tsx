import React from 'react'
import { DataGrid } from '@/components/data-grid/DataGrid'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { useBudget } from '@/hooks/useBudget'
import { BudgetGridData } from '@/types/budget'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
      accessorKey: 'annual_total',
      cell: ({ row }: { row: { original: BudgetGridData } }) => (
        <span>¥{row.original.annual_total.toLocaleString()}</span>
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

  const data = getGridData();

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
              data={data}
              columns={columns}
              pageSize={10}
            />
          )}
        </div>
      </Card>
    </div>
  )
} 