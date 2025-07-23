import { Expense } from '../types/expense'

export const getPercent = (sum: number, expenses: Expense[]) => {
  const totalAmount = expenses?.reduce((acc, item) => acc + item.sum, 0) ?? 0
  return totalAmount === 0 ? 0 : Math.round((sum / totalAmount) * 100)
}
