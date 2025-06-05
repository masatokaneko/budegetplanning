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

interface User {
  id: string
  code: string
  name: string
  email: string
  department: string
  role: 'admin' | 'manager' | 'user'
  isActive: boolean
}

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  const columns = [
    {
      header: 'ユーザーコード',
      accessorKey: 'code',
    },
    {
      header: 'ユーザー名',
      accessorKey: 'name',
    },
    {
      header: 'メールアドレス',
      accessorKey: 'email',
    },
    {
      header: '部署',
      accessorKey: 'department',
    },
    {
      header: '権限',
      accessorKey: 'role',
      cell: ({ row }: { row: { original: User } }) => {
        const roleStyles = {
          admin: 'bg-purple-100 text-purple-800',
          manager: 'bg-blue-100 text-blue-800',
          user: 'bg-gray-100 text-gray-800',
        }
        const roleLabels = {
          admin: '管理者',
          manager: 'マネージャー',
          user: '一般',
        }
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${roleStyles[row.original.role]}`}
          >
            {roleLabels[row.original.role]}
          </span>
        )
      },
    },
    {
      header: 'ステータス',
      accessorKey: 'isActive',
      cell: ({ row }: { row: { original: User } }) => (
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
    // TODO: ユーザーの保存処理を実装
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">ユーザーマスタ</h1>
        <Button onClick={() => {
          setSelectedUser(null)
          setIsModalOpen(true)
        }}>
          新規作成
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <DataGrid
            data={users}
            columns={columns}
            pageSize={10}
            onRowClick={(row) => {
              setSelectedUser(row as User)
              setIsModalOpen(true)
            }}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'ユーザー編集' : 'ユーザー登録'}
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
            label="ユーザーコード"
            name="code"
            required
            value={selectedUser?.code}
          />
          <FormField
            label="ユーザー名"
            name="name"
            required
            value={selectedUser?.name}
          />
          <FormField
            label="メールアドレス"
            name="email"
            type="email"
            required
            value={selectedUser?.email}
          />
          <FormField
            label="部署"
            name="department"
            required
            value={selectedUser?.department}
          />
          <FormField
            label="権限"
            name="role"
            type="select"
            options={[
              { label: '管理者', value: 'admin' },
              { label: 'マネージャー', value: 'manager' },
              { label: '一般', value: 'user' },
            ]}
            required
            value={selectedUser?.role}
          />
        </Form>
      </Modal>
    </div>
  )
} 