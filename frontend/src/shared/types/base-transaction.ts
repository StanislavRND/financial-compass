import { Category } from './category'

interface BaseTransaction {
  id: number
  sum: number
  categoryId: number
  date: string
  userId: number
  familyId: number | null
  category: Category
}

export type Expense = BaseTransaction
export type Income = BaseTransaction
