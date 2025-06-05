import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Actual = {
  id: string;
  date: string;
  account: string;
  vendor: string;
  amount: number;
  description: string;
  createdAt: string;
};

const columnHelper = createColumnHelper<Actual>();

const columns = [
  columnHelper.accessor('date', {
    header: '日付',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor('account', {
    header: '勘定科目',
  }),
  columnHelper.accessor('vendor', {
    header: '取引先',
  }),
  columnHelper.accessor('amount', {
    header: '金額',
    cell: (info) => `¥${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('description', {
    header: '摘要',
  }),
  columnHelper.accessor('createdAt', {
    header: '登録日時',
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
];

const mockData: Actual[] = [
  {
    id: '1',
    date: '2024-01-15',
    account: '旅費交通費',
    vendor: '株式会社A',
    amount: 15000,
    description: '出張交通費',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    date: '2024-01-16',
    account: '接待交際費',
    vendor: '株式会社B',
    amount: 25000,
    description: '取引先との打ち合わせ',
    createdAt: '2024-01-16T15:30:00Z',
  },
  {
    id: '3',
    date: '2024-01-17',
    account: '会議費',
    vendor: '株式会社C',
    amount: 10000,
    description: '社内会議',
    createdAt: '2024-01-17T09:00:00Z',
  },
];

export const ActualGrid: React.FC = () => {
  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 