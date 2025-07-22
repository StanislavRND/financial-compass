export interface User {
  id: number
  name?: string
  login: string
  password: string
  familyId: number
  createdAt: string
}

export interface UserProps {
  id: number
  name: string
  login: string
  createdAt: string
}

export type LoginForm = {
  login: string
  password: string
}

export type RegisterForm = LoginForm & {
  name: string
  isFamily: boolean
  invite?: string
}

export type Modes = 'login' | 'register'

export type FormData<M extends Modes> = M extends 'login' ? LoginForm : RegisterForm
