import React from 'react'
import { DataGrid } from '@/components/data-grid/DataGrid'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Form, FormField } from '@/components/ui/Form'

interface Vendor {
  id: string
  code: string
  name: string
  type: string
  address?: string
  contactPerson?: string
  phone?: string
  email?: string
  isActive: boolean
}

export default function VendorsPage() {
  const [vendors, setVendors] = React.useState<Vendor[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedVendor, setSelectedVendor] = React.useState<Vendor | null>(null)

  const columns = [
    {
      header: '取引先コード',
      accessorKey: 'code',
    },
    {
      header: '取引先名',
      accessorKey: 'name',
    },
    {
      header: '取引先種別',
      accessorKey: 'type',
    },
    {
      header: '担当者',
      accessorKey: 'contactPerson',
    },
    {
      header: 'メールアドレス',
      accessorKey: 'email',
    },
    {
      header: 'ステータス',
      accessorKey: 'isActive',
      cell: ({ row }: { row: { original: Vendor } }) => (
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
    // TODO: 取引先の保存処理を実装
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">取引先マスタ</h1>
        <Button onClick={() => {
          setSelectedVendor(null)
          setIsModalOpen(true)
        }}>
          新規作成
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <DataGrid
            data={vendors}
            columns={columns}
            pageSize={10}
            onRowClick={(row) => {
              setSelectedVendor(row as Vendor)
              setIsModalOpen(true)
            }}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedVendor ? '取引先編集' : '取引先登録'}
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
            label="取引先コード"
            name="code"
            required
            value={selectedVendor?.code}
          />
          <FormField
            label="取引先名"
            name="name"
            required
            value={selectedVendor?.name}
          />
          <FormField
            label="取引先種別"
            name="type"
            type="select"
            options={[
              { label: '法人', value: 'corporation' },
              { label: '個人', value: 'individual' },
            ]}
            required
            value={selectedVendor?.type}
          />
          <FormField
            label="住所"
            name="address"
            value={selectedVendor?.address}
          />
          <FormField
            label="担当者"
            name="contactPerson"
            value={selectedVendor?.contactPerson}
          />
          <FormField
            label="電話番号"
            name="phone"
            value={selectedVendor?.phone}
          />
          <FormField
            label="メールアドレス"
            name="email"
            type="email"
            value={selectedVendor?.email}
          />
        </Form>
      </Modal>
    </div>
  )
} 