import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formatDate } from '../../../shared/utils/formatDate'
import { useCreateExpenseMutation } from '../api/addTransactionApi'

type Inputs = {
  sum: string
  date: string
  categoryId: number
}

interface UseAddTransactionFormProps {
  userId: number
  familyId: number | null
  onClose: () => void
}

export const useAddTransactionForm = ({
  userId,
  familyId,
  onClose,
}: UseAddTransactionFormProps) => {
  const [createExpense, { isLoading }] = useCreateExpenseMutation()
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

  useEffect(() => {
    const todayFormatted = formatDate(new Date())
    setValue('date', todayFormatted)
  }, [setValue])

  const handleDateSelect = (date: Date) => {
    const formatted = date.toLocaleDateString('ru-RU')
    setValue('date', formatted)
    setSelected(date)
    setShowCalendar(false)
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createExpense({
        sum: Number(data.sum),
        categoryId: data.categoryId,
        date: data.date,
        userId,
        familyId,
      }).unwrap()
      onClose()
    } catch (error) {
      console.log(error)
    }
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
