import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BudgetGrid from '../BudgetGrid';
import { Budget } from '@/types/budget';

// テスト用のデータ
const mockBudgets: Budget[] = [
  {
    id: '1',
    year: 2024,
    month: 1,
    department: '営業部',
    category: '旅費交通費',
    amount: 150000,
    status: 'approved',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    year: 2024,
    month: 1,
    department: '開発部',
    category: '会議費',
    amount: 100000,
    status: 'submitted',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
  },
];

// テスト用のQueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// テスト用のラッパーコンポーネント
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('BudgetGrid', () => {
  it('データが正しく表示される', () => {
    render(<BudgetGrid data={mockBudgets} />, { wrapper });

    // ヘッダーの確認
    expect(screen.getByText('年度')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('勘定科目')).toBeInTheDocument();
    expect(screen.getByText('金額')).toBeInTheDocument();
    expect(screen.getByText('ステータス')).toBeInTheDocument();
    expect(screen.getByText('更新日時')).toBeInTheDocument();

    // データの確認
    expect(screen.getByText('2024年度')).toBeInTheDocument();
    expect(screen.getByText('1月')).toBeInTheDocument();
    expect(screen.getByText('旅費交通費')).toBeInTheDocument();
    expect(screen.getByText('¥150,000')).toBeInTheDocument();
    expect(screen.getByText('承認済')).toBeInTheDocument();
  });

  it('ローディング状態が正しく表示される', () => {
    render(<BudgetGrid data={mockBudgets} isLoading={true} />, { wrapper });
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('行クリック時にコールバックが呼ばれる', () => {
    const handleRowClick = jest.fn();
    render(
      <BudgetGrid
        data={mockBudgets}
        onRowClick={handleRowClick}
      />,
      { wrapper }
    );

    // 最初の行をクリック
    const firstRow = screen.getByText('旅費交通費').closest('tr');
    fireEvent.click(firstRow!);

    expect(handleRowClick).toHaveBeenCalledWith(mockBudgets[0]);
  });

  it('データが空の場合の表示', () => {
    render(<BudgetGrid data={[]} />, { wrapper });
    expect(screen.getByText('データがありません')).toBeInTheDocument();
  });
}); 