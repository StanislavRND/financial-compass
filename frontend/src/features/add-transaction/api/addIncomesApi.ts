import { baseApi } from '../../../shared/api/baseApi'
import { Income } from '../../../shared/types/base-transaction'

type CreateIncomesDto = Omit<Income, 'id' | 'category'>

export const incomesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createIncomes: build.mutation<Income, CreateIncomesDto>({
      query: (income) => ({
        url: '/income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: ['Income'],
    }),
  }),
})

export const { useCreateIncomesMutation } = incomesApi
