import { baseApi } from '../../../shared/api/baseApi'
import { Category } from '../../../shared/types/category'

export const categoriesApiExpense = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExpenseCategories: build.query<Category[], void>({
      query: () => '/categories-expense',
      providesTags: ['ExpenseCategories'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetExpenseCategoriesQuery } = categoriesApiExpense
