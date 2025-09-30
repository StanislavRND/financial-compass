import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formatDate } from '../../../shared/utils/formatDate'
import { useCreateIncomesMutation } from '../api/addIncomesApi'
import { useCreateExpenseMutation } from '../api/addTransactionApi'

type Inputs = {
  sum: string
  date: string
  categoryId: number
}

export type TransactionType = 'expense' | 'income'

interface UseAddTransactionFormProps {
  userId: number
  familyId: number | null
  type: TransactionType
  onClose: () => void
}

export const useAddTransactionForm = ({
  userId,
  familyId,
  type,
  onClose,
}: UseAddTransactionFormProps) => {
  const [selected, setSelected] = useState<Date>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' })

  const [createExpense, expenseMeta] = useCreateExpenseMutation()
  const [createIncome, incomeMeta] = useCreateIncomesMutation()

  const mutation = type === 'expense' ? createExpense : createIncome
  const isLoading = type === 'expense' ? expenseMeta.isLoading : incomeMeta.isLoading

  useEffect(() => {
    setValue('date', formatDate(new Date()))
  }, [setValue])

  const handleDateSelect = (date: Date) => {
    const formatted = date.toLocaleDateString('ru-RU')
    setValue('date', formatted)
    setSelected(date)
    setShowCalendar(false)
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutation({
      sum: Number(data.sum),
      categoryId: data.categoryId,
      date: data.date,
      userId,
      familyId,
    }).unwrap()
    onClose()
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selected,
    showCalendar,
    setShowCalendar,
    handleDateSelect,
    setValue,
    watch,
    control,
    isLoading,
  }
}
