import { Expense } from '../types/base-transaction'
import { baseApi } from './baseApi'

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExpenses: build.query<
      Expense[],
      { userId: number; familyId?: number | null; filter: string; date?: string }
    >({
      query: ({ userId, familyId, filter, date }) => {
        const params = new URLSearchParams({
          userId: String(userId),
          filter: filter ?? 'day',
        })
        if (familyId) params.append('familyId', String(familyId))
        if (date) params.append('date', date)

        return `/expense?${params.toString()}`
      },
      providesTags: ['Expenses'],
      keepUnusedDataFor: 300,
    }),
    getLastExpenses: build.query<
      Expense[],
      { userId: number; familyId?: number | null; filter: 'day' | 'week' | 'month' | 'year' }
    >({
      query: ({ userId, familyId, filter }) => {
        const params = new URLSearchParams({ userId: String(userId), filter })
        if (familyId) params.append('familyId', String(familyId))
        return `/expense/last?${params.toString()}`
      },
      providesTags: ['Expenses'],
      keepUnusedDataFor: 300,
    }),

    deleteExpense: build.mutation<void, number>({
      query: (id) => ({
        url: `expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expenses'],
    }),
  }),
})

export const { useGetExpensesQuery, useDeleteExpenseMutation, useGetLastExpensesQuery } =
  expensesApi
