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
} from '@/components/ui/Table';

type Budget = {
  id: string;
  year: number;
  month: number;
  account: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved';
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<Budget>();

const columns = [
  columnHelper.accessor('year', {
    header: '年度',
    cell: (info) => `${info.getValue()}年度`,
  }),
  columnHelper.accessor('month', {
    header: '月',
    cell: (info) => `${info.getValue()}月`,
  }),
  columnHelper.accessor('account', {
    header: '勘定科目',
  }),
  columnHelper.accessor('amount', {
    header: '金額',
    cell: (info) => `¥${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('status', {
    header: 'ステータス',
    cell: (info) => {
      const status = info.getValue();
      const statusMap = {
        draft: '下書き',
        submitted: '申請中',
        approved: '承認済',
      };
      return statusMap[status];
    },
  }),
  columnHelper.accessor('updatedAt', {
    header: '更新日時',
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
];

const mockData: Budget[] = [
  {
    id: '1',
    year: 2024,
    month: 1,
    account: '旅費交通費',
    amount: 150000,
    status: 'approved',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    year: 2024,
    month: 1,
    account: '接待交際費',
    amount: 200000,
    status: 'submitted',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    year: 2024,
    month: 1,
    account: '会議費',
    amount: 100000,
    status: 'draft',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

export const BudgetGrid: React.FC = () => {
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