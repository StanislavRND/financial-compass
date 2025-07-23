import { useMemo } from 'react'
import { Expense } from '../../../shared/types/expense'

export const useExpensesByCategory = (
  expenses: Expense[] | undefined,
  selectedCategoryId: number | null,
): Expense[] => {
  return useMemo(() => {
    if (selectedCategoryId === null || !expenses) return []
    return expenses.filter((e) => e.categoryId === selectedCategoryId)
  }, [selectedCategoryId, expenses])
}
