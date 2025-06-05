import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">カテゴリ管理</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>カテゴリ名</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>作成日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>サンプルカテゴリ</TableCell>
            <TableCell>サンプル説明</TableCell>
            <TableCell>2024-03-20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
} 