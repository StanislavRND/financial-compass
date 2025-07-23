import { Path, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../../shared/api/auth'
import { FormData, LoginForm, Modes, RegisterForm } from '../../shared/types/user'

export const useAuthForm = <M extends Modes>(mode: M) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData<M>>({ mode: 'onChange' })

  const familyValue = useWatch({
    control,
    name: 'isFamily' as Path<FormData<M>>,
  })

  const navigate = useNavigate()

  const onSubmit = async (
    data: FormData<M>,
    setError: (msg: string) => void,
    setLoading: (val: boolean) => void,
  ) => {
    setLoading(true)
    try {
      if (mode === 'login') {
        await loginApi(data as LoginForm)
        navigate('/user-expenses')
      } else {
        await registerApi(data as RegisterForm)
        navigate('/login')
      }
    } catch {
      setError('Неверный логин или пароль')
    } finally {
      setLoading(false)
    }
  }

  return { register, handleSubmit, errors, familyValue, onSubmit }
}
