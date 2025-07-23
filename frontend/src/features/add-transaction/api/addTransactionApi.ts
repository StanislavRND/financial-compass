import { baseApi } from '../../../shared/api/baseApi'
import { Expense } from '../../../shared/types/expense'

type CreateExpenseDto = Omit<Expense, 'id' | 'category'>

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
