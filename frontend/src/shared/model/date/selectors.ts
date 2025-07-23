import { RootState } from '../../../application/store'

export const selectDate = (state: RootState) => state.date.date
