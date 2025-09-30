import { baseApi } from '../../../shared/api/baseApi'
import { Category } from '../../../shared/types/category'

export const categoriesApiIncome = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIncomeCategories: build.query<Category[], void>({
      query: () => '/categories-income',
      providesTags: ['IncomeCategories'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetIncomeCategoriesQuery } = categoriesApiIncome
