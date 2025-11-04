import axiosBase from './instance'

export const getCurrentUser = async () => {
  const res = await axiosBase.get('/me')
  return res.data
}

export const createFamily = async (userId: number) => {
  const res = await axiosBase.post('/create-family', { userId })
  return res.data
}

export const getInfoFamilyForUser = async () => {
  const res = await axiosBase.get('/family')
  return res.data
}

export const transferExpensesToFamily = async (userId: number, familyId: number) => {
  const res = await axiosBase.post('/expense/transfer-to-family', { userId, familyId })
  return res.data
}

export const transferIncomeToFamily = async (userId: number, familyId: number) => {
  const res = await axiosBase.post('/income/transfer-to-family', { userId, familyId })
  return res.data
}
