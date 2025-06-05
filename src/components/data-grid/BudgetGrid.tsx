import React, { useMemo } from 'react';
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
import { Budget, BudgetStatus } from '@/types/budget';
import { useVirtualizer } from '@tanstack/react-virtual';
import { BUDGET_STATUS_LABELS } from '@/constants/budget';

interface BudgetGridProps {
  data: Budget[];
  isLoading?: boolean;
  onRowClick?: (budget: Budget) => void;
  onStatusChange?: (budget: Budget, newStatus: BudgetStatus) => void;
}

const columnHelper = createColumnHelper<Budget>();

const BudgetGrid: React.FC<BudgetGridProps> = ({
  data,
  isLoading = false,
  onRowClick,
  onStatusChange,
}) => {
  // メモ化されたカラム定義
  const columns = useMemo(() => [
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
      cell: (info) => {
        const amount = info.getValue();
        return new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'JPY',
        }).format(amount);
      },
    }),
    columnHelper.accessor('status', {
      header: 'ステータス',
      cell: (info) => BUDGET_STATUS_LABELS[info.getValue()],
    }),
    columnHelper.accessor('updatedAt', {
      header: '更新日時',
      cell: (info) => new Date(info.getValue()).toLocaleString('ja-JP'),
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 仮想化の設定
  const { rows } = table.getRowModel();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35, // 行の高さの推定値
    overscan: 5,
  });

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (data.length === 0) {
    return <div>データがありません</div>;
  }

  return (
    <div ref={parentRef} className="h-[500px] overflow-auto">
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
          <tr>
            <td colSpan={columns.length} style={{ height: `${rowVirtualizer.getTotalSize()}px` }} />
          </tr>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className="cursor-pointer hover:bg-gray-100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(BudgetGrid); 