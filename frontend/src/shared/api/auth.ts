import axios from 'axios'
import { LoginForm } from '../types/user'
import axiosBase from './instance'

export const registerApi = async (data: {
  name: string
  login: string
  password: string
  isFamily?: boolean
  invite?: string
}) => {
  try {
    const res = await axiosBase.post('/register', data)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      const message = err.response?.data?.message

      if (status === 409) {
        throw new Error('Пользователь с таким логином уже существует')
      }
      if (status === 400) {
        if (message?.includes('инвайт-код') || message?.includes('Инвайт')) {
          throw new Error(message)
        }
        throw new Error('Неверные данные для регистрации')
      }
      if (status === 500) {
        throw new Error('Ошибка сервера, попробуйте позже')
      }
    }
    throw new Error('Произошла ошибка при регистрации')
  }
}

export const loginApi = async (data: LoginForm) => {
  try {
    const res = await axiosBase.post('/login', data)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status

      if (status === 401) {
        throw new Error('Неверный логин или пароль')
      }
      if (status === 404) {
        throw new Error('Пользователь не найден')
      }
      if (status === 500) {
        throw new Error('Ошибка сервера, попробуйте позже')
      }
    }
    throw new Error('Произошла ошибка при входе')
  }
}

export const logoutApi = async () => {
  const res = await axiosBase.post('/logout')
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axiosBase.get('/me')
  return res.data
}
