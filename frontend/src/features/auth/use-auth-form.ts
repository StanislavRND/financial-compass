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
    watch,
  } = useForm<FormData<M>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

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
    setError('')

    try {
      if (mode === 'login') {
        await loginApi(data as LoginForm)
        navigate('/user-expenses')
      } else {
        const registerData = { ...data } as RegisterForm
        if (!registerData.isFamily) {
          delete registerData.invite
        }
        await registerApi(registerData)
        navigate('/login')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === 'string') {
        setError(error)
      } else {
        setError('Произошла неизвестная ошибка')
      }
    } finally {
      setLoading(false)
    }
  }

  return { register, handleSubmit, errors, familyValue, onSubmit, watch }
}
