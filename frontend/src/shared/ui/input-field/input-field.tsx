import clsx from 'clsx'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import styles from './input-field.module.scss'

type Props<T extends FieldValues> = {
  name: Path<T>
  placeholder: string
  type: 'text' | 'password'
  error?: string
  register: UseFormRegister<T>
  isVisible?: boolean
  toggleVisible?: () => void
}

export function InputField<T extends FieldValues>({
  name,
  placeholder,
  type,
  error,
  register,
  isVisible,
  toggleVisible,
}: Props<T>) {
  return (
    <div className={styles.fields}>
      <div className={styles.inputWrapper}>
        <input
          {...register(name, {
            required: 'Обязательное поле',
            minLength: { value: 4, message: 'Минимум 4 символа' },
            maxLength: { value: 20, message: 'Максимум 20 символов' },
          })}
          type={type === 'password' && isVisible ? 'text' : type}
          placeholder={placeholder}
          className={clsx(styles.input, styles[name as string], error && styles.error)}
        />
        {type === 'password' && toggleVisible && (
          <button type="button" className={styles.eye} onClick={toggleVisible}>
            {isVisible ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
}
