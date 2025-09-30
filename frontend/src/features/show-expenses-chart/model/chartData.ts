import { Expense } from '../../../shared/types/base-transaction'

export interface ChartData {
  labels: string[]
  data: number[]
  colors: string[]
}

export const getChartData = (expenses: Expense[] | undefined): ChartData => {
  if (!expenses) return { labels: [], data: [], colors: [] }

  const categoryMap = new Map<number, { label: string; sum: number; color: string }>()

  expenses.forEach(({ sum, categoryId, category }) => {
    if (categoryMap.has(categoryId)) {
      categoryMap.get(categoryId)!.sum += sum
    } else {
      categoryMap.set(categoryId, {
        label: category.name,
        sum,
        color: category.color || '#000000',
      })
    }
  })

  return {
    labels: Array.from(categoryMap.values()).map((c) => c.label),
    data: Array.from(categoryMap.values()).map((c) => c.sum),
    colors: Array.from(categoryMap.values()).map((c) => c.color),
  }
}
