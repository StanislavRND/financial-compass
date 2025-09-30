import { Expense } from '../types/base-transaction'

export const getPercent = (sum: number, expenses: Expense[]) => {
  const totalAmount = expenses?.reduce((acc, item) => acc + item.sum, 0) ?? 0
  if (totalAmount === 0) return 0
  const percent = Math.round((sum / totalAmount) * 100)
  return percent === 0 ? 1 : percent
}
