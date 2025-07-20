import axiosBase from './instance'

export const getCurrentUser = async () => {
  const res = await axiosBase.get('/me')
  return res.data
}

export const createFamily = async (userId: number) => {
  const res = await axiosBase.post('/create-family', { userId })
  return res.data
}

export const getInfoFamilyForUser = async (userId: number) => {
  const res = await axiosBase.get('/family')
  return res.data
}
