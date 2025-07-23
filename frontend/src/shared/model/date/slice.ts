import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = { date: string }

const initialState: State = { date: new Date().toISOString() }

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
  },
})

export const { setDate } = dateSlice.actions
export default dateSlice.reducer
