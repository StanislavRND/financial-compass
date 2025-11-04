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
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6f6f6f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-icon lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6f6f6f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-off-icon lucide-eye-off"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
}
