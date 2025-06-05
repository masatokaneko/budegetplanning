import { useState, useCallback } from 'react'
import { Budget, BudgetInput, BudgetGridData } from '@/types/budget'

export const useBudget = () => {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // 予算データの取得
  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIから予算データを取得する処理を実装
      const response = await fetch('/api/budgets')
      const data = await response.json()
      setBudgets(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('予算データの取得に失敗しました'))
    } finally {
      setLoading(false)
    }
  }, [])

  // 予算データの作成
  const createBudget = useCallback(async (input: BudgetInput) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIに予算データを作成する処理を実装
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      setBudgets(prev => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('予算データの作成に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 予算データの更新
  const updateBudget = useCallback(async (id: string, input: Partial<BudgetInput>) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIで予算データを更新する処理を実装
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      setBudgets(prev => prev.map(budget => 
        budget.id === id ? { ...budget, ...data } : budget
      ))
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('予算データの更新に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 予算データの削除
  const deleteBudget = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIで予算データを削除する処理を実装
      await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      })
      setBudgets(prev => prev.filter(budget => budget.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('予算データの削除に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // グリッド表示用データの変換
  const getGridData = useCallback((budgets: Budget[]): BudgetGridData[] => {
    return budgets.map(budget => ({
      ...budget,
      status: 'draft', // TODO: 実際のステータスを設定
      submittedBy: undefined,
      approvedBy: undefined,
      comments: undefined,
    }))
  }, [])

  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    getGridData,
  }
} 