import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateExpenseMutation } from '../api/addTransactionApi'

type Inputs = {
  sum: string
  date: string
  categoryId: number | null
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
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const todayFormatted = `${day}.${month}.${year}`
    setValue('date', todayFormatted)
  }, [setValue])

  const formatDateInput = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    let formatted = ''

    if (numbers.length <= 2) {
      formatted = numbers
    } else if (numbers.length <= 4) {
      formatted = numbers.slice(0, 2) + '.' + numbers.slice(2)
    } else if (numbers.length <= 8) {
      formatted = numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8)
    } else {
      formatted = numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8)
    }

    return formatted
  }

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
    formatDateInput,
    setValue,
    watch,
    control,
    isLoading,
  }
}
