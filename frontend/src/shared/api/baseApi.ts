import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://financial-compass-5i55.onrender.com/api' }),
  tagTypes: ['Categories', 'Expenses'],
  endpoints: () => ({}),
})
