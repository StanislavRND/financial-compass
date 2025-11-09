import { ReactNode } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import styles from './checkbox.module.scss'

type Props<T extends FieldValues> = {
  label: ReactNode
  name: Path<T>
  register: UseFormRegister<T>
}

export function Checkbox<T extends FieldValues>({ label, name, register }: Props<T>) {
  return (
    <div className={styles.fields}>
      <label className={styles.checkbox}>
        <input type="checkbox" {...register(name)} className={styles.checkboxInput} />
        <span className={styles.checkboxLabel}>{label}</span>
      </label>
    </div>
  )
}
