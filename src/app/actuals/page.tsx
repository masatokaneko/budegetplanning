import React from 'react'
import { DataGrid } from '@/components/data-grid/DataGrid'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useActual } from '@/hooks/useActual'
import { Actual } from '@/types/actual'

export default function ActualsPage() {
  const { actuals, loading, error } = useActual()

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
      header: '実績額',
      accessorKey: 'amount',
      cell: ({ row }: { row: { original: Actual } }) => (
        <span>¥{row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      header: '説明',
      accessorKey: 'description',
    },
    {
      header: '登録日',
      accessorKey: 'createdAt',
      cell: ({ row }: { row: { original: Actual } }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">実績データ</h1>
        <div className="flex space-x-4">
          <Button variant="outline">
            テンプレートダウンロード
          </Button>
          <Button>
            実績データ取込
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          {error ? (
            <div className="text-red-500">エラーが発生しました: {error.message}</div>
          ) : (
            <DataGrid
              data={actuals}
              columns={columns}
              pageSize={10}
            />
          )}
        </div>
      </Card>
    </div>
  )
} 