import { Category } from './category'

export interface Expense {
  id: number
  sum: number
  categoryId: number
  date: string
  userId: number
  familyId: number | null
  category: Category
}
