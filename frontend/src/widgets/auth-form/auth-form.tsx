import { useState } from 'react'
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuthForm } from '../../features/auth/use-auth-form'
import { FormData, Modes, RegisterForm } from '../../shared/types/user'
import { Button, Logo } from '../../shared/ui/button'
import { Checkbox } from '../../shared/ui/checkbox/checkbox'
import { InputField } from '../../shared/ui/input-field/input-field'
import styles from './auth-form.module.scss'

interface Field<T> {
  name: Path<T>
  placeholder?: string
  type: 'text' | 'password' | 'checkbox'
}

interface AuthFormProps<M extends Modes> {
  title: string
  buttonText: string
  toggleText: string
  toggleLink: string
  routeLink: string
  mode: M
  fields: Field<FormData<M>>[]
}

export const AuthForm = <M extends Modes>({
  title,
  buttonText,
  toggleText,
  toggleLink,
  routeLink,
  mode,
  fields,
}: AuthFormProps<M>) => {
  const { register, handleSubmit, errors, familyValue, onSubmit, watch } = useAuthForm(mode)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isVisiblePass, setIsVisiblePass] = useState(false)

  let agreementChecked = false
  if (mode === 'register') {
    agreementChecked = (
      watch as unknown as <TField extends keyof RegisterForm>(
        name: TField,
        defaultValue?: boolean,
      ) => boolean
    )('agreement', false)
  }

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>{title}</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, setError, setLoading))}
        className={styles.form}
      >
        {fields.map((field) =>
          field.type === 'checkbox' ? (
            <Checkbox
              key={field.name}
              name={field.name}
              label={
                field.name === 'agreement' && mode === 'register' ? (
                  <>
                    Я принимаю{' '}
                    <Link to="/user-agreement" className={styles.agreementLink}>
                      пользовательское соглашение
                    </Link>
                  </>
                ) : (
                  'Семейный аккаунт'
                )
              }
              register={register}
            />
          ) : (
            <InputField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder ?? ''}
              type={field.type}
              register={register}
              error={errors[field.name]?.message as string}
              isVisible={isVisiblePass}
              toggleVisible={
                field.type === 'password' ? () => setIsVisiblePass((v) => !v) : undefined
              }
            />
          ),
        )}

        {familyValue && mode === 'register' && (
          <InputField<RegisterForm>
            name="invite"
            placeholder="Инвайт-код"
            type="text"
            register={register as UseFormRegister<RegisterForm>}
            error={(errors as FieldErrors<RegisterForm>)['invite']?.message as string}
          />
        )}

        {mode === 'register' && (
          <Checkbox<RegisterForm>
            name="agreement"
            label={
              <>
                Я принимаю{' '}
                <Link to="/user-agreement" className={styles.agreementLink}>
                  пользовательское соглашение
                </Link>
              </>
            }
            register={register as UseFormRegister<RegisterForm>}
          />
        )}

        {error && <p className={styles.errorText}>{error}</p>}
        <Button className={styles.btn} disabled={mode === 'register' && !agreementChecked}>
          {loading ? 'Загрузка...' : buttonText}
        </Button>
      </form>

      <div className={styles.variable}>
        {toggleText} <br />
        <Link to={`/${routeLink}`}>{toggleLink}</Link>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
    </div>
  )
}
