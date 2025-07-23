import { Expense } from '../../../shared/types/expense'

export const groupExpensesByCategory = (expenses: Expense[] | undefined) => {
  if (!expenses) return []

  const map = new Map<number, { category: Expense['category']; sum: number }>()

  expenses.forEach(({ categoryId, sum, category }) => {
    if (map.has(categoryId)) {
      map.get(categoryId)!.sum += sum
    } else {
      map.set(categoryId, { category, sum })
    }
  })

  return Array.from(map.values())
}
