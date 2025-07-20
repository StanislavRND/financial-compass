import axios from 'axios'
import axiosBase from './instance'

export const registerApi = async (data: {
  name: string
  login: string
  password: string
  invite?: string
}) => {
  try {
    const res = await axiosBase.post('/register', data)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 409) {
      throw new Error('Такой логин уже занят')
    }
    throw err
  }
}

export const loginApi = async (data: { login: string; password: string }) => {
  const res = await axiosBase.post('/login', data)
  return res.data
}

export const logoutApi = async () => {
  const res = await axiosBase.post('/logout')
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axiosBase.get('/me')
  return res.data
}
