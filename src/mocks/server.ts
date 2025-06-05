import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Budget } from '@/types/budget';

// モックデータ
const mockBudgets: Budget[] = [
  {
    id: '1',
    year: 2024,
    month: 1,
    department: '営業部',
    category: '旅費交通費',
    amount: 150000,
    status: 'approved',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    year: 2024,
    month: 1,
    department: '開発部',
    category: '会議費',
    amount: 100000,
    status: 'submitted',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// ハンドラーの定義
export const handlers = [
  // 予算一覧の取得
  rest.get('/api/budgets', (req, res, ctx) => {
    return res(ctx.json(mockBudgets));
  }),

  // 個別の予算取得
  rest.get('/api/budgets/:id', (req, res, ctx) => {
    const { id } = req.params;
    const budget = mockBudgets.find(b => b.id === id);
    
    if (!budget) {
      return res(
        ctx.status(404),
        ctx.json({ message: '予算が見つかりません' })
      );
    }

    return res(ctx.json(budget));
  }),

  // 予算の作成
  rest.post('/api/budgets', async (req, res, ctx) => {
    const newBudget = await req.json();
    const budget: Budget = {
      ...newBudget,
      id: String(mockBudgets.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBudgets.push(budget);
    return res(ctx.json(budget));
  }),

  // 予算の更新
  rest.put('/api/budgets/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const index = mockBudgets.findIndex(b => b.id === id);

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: '予算が見つかりません' })
      );
    }

    const updatedBudget = {
      ...mockBudgets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    mockBudgets[index] = updatedBudget;
    return res(ctx.json(updatedBudget));
  }),

  // 予算の削除
  rest.delete('/api/budgets/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockBudgets.findIndex(b => b.id === id);

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: '予算が見つかりません' })
      );
    }

    mockBudgets.splice(index, 1);
    return res(ctx.status(204));
  }),
];

// サーバーの設定
export const server = setupServer(...handlers); 