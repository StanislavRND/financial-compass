import { CategoriesList } from '../../categories'

import { Controller } from 'react-hook-form'
import { Button } from '../../../shared/ui/button'
import { Calendar } from '../../../shared/ui/calendar/calendar'
import { ModalLayout } from '../../../shared/ui/modal/modal-layout'
import { formatDateInput } from '../../../shared/utils/formatDateInput'
import { useAuth } from '../../auth/useAuth'
import { TransactionType, useAddTransactionForm } from '../model/useAddTransaction'
import styles from './modal.module.scss'

type Props = {
  onClose: () => void
  type: TransactionType
  typeCategories: 'income' | 'expense'
}

export const Modal = ({ onClose, type, typeCategories }: Props) => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selected,
    showCalendar,
    setShowCalendar,
    handleDateSelect,
    setValue,
    control,
    isLoading,
  } = useAddTransactionForm({
    userId: user?.id ?? 0,
    familyId: user?.familyId ?? null,
    type,
    onClose,
  })

  return (
    <ModalLayout onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.blockInput}>
          <input
            className={`${styles.sum} ${errors.sum ? styles.errorBorder : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="0"
            {...register('sum', { required: 'Введите сумму' })}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
            }}
          />
          <div className={styles.rub}>RUB</div>
        </div>

        <Controller
          control={control}
          name="categoryId"
          rules={{ required: 'Выберите категорию' }}
          render={({ field, fieldState }) => (
            <>
              <CategoriesList
                type={typeCategories}
                selectedCategoryId={field.value}
                onSelectCategory={(id: number) => field.onChange(id)}
              />
              {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <div className={styles.dateWrapper}>
          <input
            type="text"
            {...register('date', {
              required: 'Введите дату',
              pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/,
                message: 'Введите в формате дд.мм.гггг',
              },
            })}
            className={styles.dateInput}
            placeholder="дд.мм.гггг"
            maxLength={10}
            onInput={(e) => {
              const formatted = formatDateInput(e.currentTarget.value)
              e.currentTarget.value = formatted
              setValue('date', formatted)
            }}
          />
          <button
            type="button"
            className={styles.calendarIcon}
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            📅
          </button>
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>

        {showCalendar && (
          <Calendar
            selected={selected}
            onSelect={handleDateSelect}
            onClose={() => setShowCalendar(false)}
          />
        )}

        <Button type="submit" className={styles.save} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Добавить'}
        </Button>
      </form>
    </ModalLayout>
  )
}
