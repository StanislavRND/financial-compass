import axiosBase from './instance'

export const getCategories = async () => {
  const res = await axiosBase.get('/categories')
  return res.data
}
