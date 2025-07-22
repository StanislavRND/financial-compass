import { baseApi } from '../../../shared/api/baseApi'
import { Category } from '../model/types'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
