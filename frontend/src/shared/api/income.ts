import { Income } from '../types/base-transaction'
import { baseApi } from './baseApi'

export const incomeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIncome: build.query<
      Income[],
      { userId: number; familyId?: number | null; filter: string; date?: string }
    >({
      query: ({ userId, familyId, filter, date }) => {
        const params = new URLSearchParams({
          userId: String(userId),
          filter: filter ?? 'day',
        })
        if (familyId) params.append('familyId', String(familyId))
        if (date) params.append('date', date)
        return `/income?${params.toString()}`
      },
      providesTags: ['Income'],
    }),

    getLastIncome: build.query<
      Income[][],
      {
        userId: number
        familyId?: number | null
        filter: 'day' | 'week' | 'month' | 'year'
        n?: number
      }
    >({
      query: ({ userId, familyId, filter, n = 5 }) => {
        const params = new URLSearchParams({
          userId: String(userId),
          filter,
          n: String(n),
        })
        if (familyId) params.append('familyId', String(familyId))
        return `/income/last?${params.toString()}`
      },
      providesTags: ['Income'],
      keepUnusedDataFor: 300,
    }),

    deleteIncome: build.mutation<void, number>({
      query: (id) => ({
        url: `income/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Income'],
    }),
  }),
})

export const { useGetIncomeQuery, useDeleteIncomeMutation, useGetLastIncomeQuery } = incomeApi
