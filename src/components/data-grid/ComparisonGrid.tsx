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

type Comparison = {
  account: string;
  budget: number;
  actual: number;
  difference: number;
  variance: number;
};

const columnHelper = createColumnHelper<Comparison>();

const columns = [
  columnHelper.accessor('account', {
    header: '勘定科目',
  }),
  columnHelper.accessor('budget', {
    header: '予算',
    cell: (info) => `¥${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('actual', {
    header: '実績',
    cell: (info) => `¥${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('difference', {
    header: '差異',
    cell: (info) => {
      const value = info.getValue();
      const formattedValue = `¥${Math.abs(value).toLocaleString()}`;
      return value >= 0 ? formattedValue : `-${formattedValue}`;
    },
  }),
  columnHelper.accessor('variance', {
    header: '差異率',
    cell: (info) => {
      const value = info.getValue();
      return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    },
  }),
];

const mockData: Comparison[] = [
  {
    account: '旅費交通費',
    budget: 1500000,
    actual: 1420000,
    difference: -80000,
    variance: -5.3,
  },
  {
    account: '接待交際費',
    budget: 2000000,
    actual: 1950000,
    difference: -50000,
    variance: -2.5,
  },
  {
    account: '会議費',
    budget: 1000000,
    actual: 980000,
    difference: -20000,
    variance: -2.0,
  },
  {
    account: '通信費',
    budget: 500000,
    actual: 480000,
    difference: -20000,
    variance: -4.0,
  },
  {
    account: '消耗品費',
    budget: 300000,
    actual: 320000,
    difference: 20000,
    variance: 6.7,
  },
];

export const ComparisonGrid: React.FC = () => {
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