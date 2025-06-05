import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBudget, useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from '../useBudget';

// テスト用のQueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// テスト用のラッパー
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useBudget', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('個別の予算を取得できる', async () => {
    const { result } = renderHook(() => useBudget('1'), { wrapper });

    // 初期状態
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // データ取得完了
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      id: '1',
      year: 2024,
      month: 1,
      department: '営業部',
      category: '旅費交通費',
      amount: 150000,
      status: 'approved',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('予算一覧を取得できる', async () => {
    const { result } = renderHook(() => useBudgets(), { wrapper });

    // 初期状態
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // データ取得完了
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(2);
  });

  it('予算を作成できる', async () => {
    const { result } = renderHook(() => useCreateBudget(), { wrapper });

    const newBudget = {
      year: 2024,
      month: 2,
      department: '営業部',
      category: '旅費交通費',
      amount: 200000,
    };

    await act(async () => {
      await result.current.mutateAsync(newBudget);
    });

    expect(result.current.isSuccess).toBe(true);
  });

  it('予算を更新できる', async () => {
    const { result } = renderHook(() => useUpdateBudget(), { wrapper });

    const updateData = {
      id: '1',
      data: {
        year: 2024,
        month: 1,
        department: '営業部',
        category: '旅費交通費',
        amount: 180000,
      },
    };

    await act(async () => {
      await result.current.mutateAsync(updateData);
    });

    expect(result.current.isSuccess).toBe(true);
  });

  it('予算を削除できる', async () => {
    const { result } = renderHook(() => useDeleteBudget(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('1');
    });

    expect(result.current.isSuccess).toBe(true);
  });

  it('エラー時に適切に処理される', async () => {
    const { result } = renderHook(() => useBudget('999'), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
  });
}); 