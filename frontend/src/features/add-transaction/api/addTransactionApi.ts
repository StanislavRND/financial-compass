import { baseApi } from '../../../shared/api/baseApi'
import { Expense } from '../model/types'

interface CreateExpenseDto {
  sum: number
  categoryId: number | null
  date: string
  userId: number
  familyId: number | null
}

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createExpense: build.mutation<Expense, CreateExpenseDto>({
      query: (expense) => ({
        url: '/expense',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expenses'],
    }),
  }),
})

export const { useCreateExpenseMutation } = expensesApi
