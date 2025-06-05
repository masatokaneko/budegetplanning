import React from 'react'
import { DataGrid } from '@/components/data-grid/DataGrid'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Form, FormField } from '@/components/ui/Form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Factor {
  id: string
  code: string
  name: string
  category: string
  description?: string
  impact: 'positive' | 'negative' | 'neutral'
  isActive: boolean
}

export default function FactorsPage() {
  const [factors, setFactors] = React.useState<Factor[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedFactor, setSelectedFactor] = React.useState<Factor | null>(null)

  const columns = [
    {
      header: '要因コード',
      accessorKey: 'code',
    },
    {
      header: '要因名',
      accessorKey: 'name',
    },
    {
      header: 'カテゴリー',
      accessorKey: 'category',
    },
    {
      header: '影響',
      accessorKey: 'impact',
      cell: ({ row }: { row: { original: Factor } }) => {
        const impactStyles = {
          positive: 'bg-green-100 text-green-800',
          negative: 'bg-red-100 text-red-800',
          neutral: 'bg-gray-100 text-gray-800',
        }
        const impactLabels = {
          positive: 'プラス',
          negative: 'マイナス',
          neutral: '中立',
        }
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${impactStyles[row.original.impact]}`}
          >
            {impactLabels[row.original.impact]}
          </span>
        )
      },
    },
    {
      header: '説明',
      accessorKey: 'description',
    },
    {
      header: 'ステータス',
      accessorKey: 'isActive',
      cell: ({ row }: { row: { original: Factor } }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {row.original.isActive ? '有効' : '無効'}
        </span>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 要因の保存処理を実装
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">要因マスタ</h1>
        <Button onClick={() => {
          setSelectedFactor(null)
          setIsModalOpen(true)
        }}>
          新規作成
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <DataGrid
            data={factors}
            columns={columns}
            pageSize={10}
            onRowClick={(row) => {
              setSelectedFactor(row as Factor)
              setIsModalOpen(true)
            }}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedFactor ? '要因編集' : '要因登録'}
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSubmit}>
              保存
            </Button>
          </div>
        }
      >
        <Form onSubmit={handleSubmit}>
          <FormField
            label="要因コード"
            name="code"
            required
            value={selectedFactor?.code}
          />
          <FormField
            label="要因名"
            name="name"
            required
            value={selectedFactor?.name}
          />
          <FormField
            label="カテゴリー"
            name="category"
            type="select"
            options={[
              { label: '市場要因', value: 'market' },
              { label: '内部要因', value: 'internal' },
              { label: '外部要因', value: 'external' },
            ]}
            required
            value={selectedFactor?.category}
          />
          <FormField
            label="影響"
            name="impact"
            type="select"
            options={[
              { label: 'プラス', value: 'positive' },
              { label: 'マイナス', value: 'negative' },
              { label: '中立', value: 'neutral' },
            ]}
            required
            value={selectedFactor?.impact}
          />
          <FormField
            label="説明"
            name="description"
            value={selectedFactor?.description}
          />
        </Form>
      </Modal>
    </div>
  )
} 