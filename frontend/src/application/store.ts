import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../shared/api/baseApi'
import { dateReducer } from '../shared/model/date'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
