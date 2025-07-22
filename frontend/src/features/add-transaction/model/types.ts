export interface Expense {
  id: number
  sum: number
  categoryId: number
  date: string
  userId: number
  familyId: number | null
}
