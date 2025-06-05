'use client'

import { useState, useCallback } from 'react'
import { Actual, ActualSummary } from '@/types/actual'

export const useActual = () => {
  const [actuals, setActuals] = useState<Actual[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // 実績データの取得
  const fetchActuals = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIから実績データを取得する処理を実装
      const response = await fetch('/api/actuals')
      const data = await response.json()
      setActuals(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('実績データの取得に失敗しました'))
    } finally {
      setLoading(false)
    }
  }, [])

  // 実績データの作成
  const createActual = useCallback(async (input: Omit<Actual, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIに実績データを作成する処理を実装
      const response = await fetch('/api/actuals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      setActuals(prev => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('実績データの作成に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 実績データの更新
  const updateActual = useCallback(async (id: string, input: Partial<Omit<Actual, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIで実績データを更新する処理を実装
      const response = await fetch(`/api/actuals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      setActuals(prev => prev.map(actual => 
        actual.id === id ? { ...actual, ...data } : actual
      ))
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('実績データの更新に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 実績データの削除
  const deleteActual = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      // TODO: APIで実績データを削除する処理を実装
      await fetch(`/api/actuals/${id}`, {
        method: 'DELETE',
      })
      setActuals(prev => prev.filter(actual => actual.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('実績データの削除に失敗しました'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 実績サマリーの計算
  const calculateSummary = useCallback((actuals: Actual[]): ActualSummary[] => {
    const summaryMap = new Map<string, ActualSummary>()

    actuals.forEach(actual => {
      const key = `${actual.department}-${actual.category}`
      const existing = summaryMap.get(key)

      if (existing) {
        existing.totalAmount += actual.amount
        existing.averageAmount = existing.totalAmount / actuals.filter(
          a => a.department === actual.department && a.category === actual.category
        ).length
      } else {
        summaryMap.set(key, {
          department: actual.department,
          category: actual.category,
          totalAmount: actual.amount,
          averageAmount: actual.amount,
          lastMonthAmount: 0,
          trend: 'stable',
          percentageChange: 0,
        })
      }
    })

    // トレンドと前月比の計算
    summaryMap.forEach((summary, key) => {
      const [department, category] = key.split('-')
      const lastMonthActuals = actuals.filter(
        a => a.department === department && 
        a.category === category && 
        a.month === new Date().getMonth() // TODO: 適切な月の計算に修正
      )
      
      if (lastMonthActuals.length > 0) {
        const lastMonthAmount = lastMonthActuals.reduce((sum, a) => sum + a.amount, 0)
        summary.lastMonthAmount = lastMonthAmount
        summary.percentageChange = ((summary.totalAmount - lastMonthAmount) / lastMonthAmount) * 100
        summary.trend = summary.percentageChange > 0 ? 'up' : summary.percentageChange < 0 ? 'down' : 'stable'
      }
    })

    return Array.from(summaryMap.values())
  }, [])

  return {
    actuals,
    loading,
    error,
    fetchActuals,
    createActual,
    updateActual,
    deleteActual,
    calculateSummary,
  }
} 