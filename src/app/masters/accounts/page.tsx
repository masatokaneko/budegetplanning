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

interface Account {
  id: string
  code: string
  name: string
  category: string
  description?: string
  isActive: boolean
}

export default function AccountsPage() {
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null)

  const columns = [
    {
      header: '科目コード',
      accessorKey: 'code',
    },
    {
      header: '科目名',
      accessorKey: 'name',
    },
    {
      header: 'カテゴリー',
      accessorKey: 'category',
    },
    {
      header: '説明',
      accessorKey: 'description',
    },
    {
      header: 'ステータス',
      accessorKey: 'isActive',
      cell: ({ row }: { row: { original: Account } }) => (
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
    // TODO: 勘定科目の保存処理を実装
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">勘定科目マスタ</h1>
        <Button onClick={() => {
          setSelectedAccount(null)
          setIsModalOpen(true)
        }}>
          新規作成
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <DataGrid
            data={accounts}
            columns={columns}
            pageSize={10}
            onRowClick={(row) => {
              setSelectedAccount(row as Account)
              setIsModalOpen(true)
            }}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAccount ? '勘定科目編集' : '勘定科目登録'}
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
            label="科目コード"
            name="code"
            required
            value={selectedAccount?.code}
          />
          <FormField
            label="科目名"
            name="name"
            required
            value={selectedAccount?.name}
          />
          <FormField
            label="カテゴリー"
            name="category"
            type="select"
            options={[
              { label: '経費', value: 'expense' },
              { label: '収入', value: 'income' },
            ]}
            required
            value={selectedAccount?.category}
          />
          <FormField
            label="説明"
            name="description"
            value={selectedAccount?.description}
          />
        </Form>
      </Modal>
    </div>
  )
} 