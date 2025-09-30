import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['ExpenseCategories', 'IncomeCategories', 'Expenses', 'Income'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: () => ({}),
})
