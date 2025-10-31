import { skipToken } from '@reduxjs/toolkit/query'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../features/add-transaction/ui/modal'
import { useAuth } from '../../features/auth/useAuth'
import { getChartData } from '../../features/show-expenses-chart/model/chartData'
import { PieChart } from '../../features/show-expenses-chart/ui'
import { useGetExpensesQuery } from '../../shared/api/expenses'
import { selectDate, setDate } from '../../shared/model/date'
import { FilterItem } from '../../shared/types/filter'
import { CreateExpense } from '../../shared/ui/button/createExpense'
import { Calendar } from '../../shared/ui/calendar/calendar'
import { Filter } from '../../shared/ui/filter/filter'
import styles from './pia-chart-expenses.module.scss'

type Props = {
  filter: 'day' | 'week' | 'month' | 'year'
  setFilter: (value: 'day' | 'week' | 'month' | 'year') => void
}

const filters: FilterItem[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
]

export const PiaChartExpenses = ({ filter, setFilter }: Props) => {
  const selected = useSelector(selectDate)
  const selectedDate = new Date(selected)

  const dispatch = useDispatch()

  const [showCalendar, setShowCalendar] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { user } = useAuth()

  const queryArgs = useMemo(() => {
    if (!user) return skipToken
    return {
      userId: user.id,
      familyId: user.familyId ?? null,
      filter,
      date: new Date(selected).toISOString(),
    }
  }, [user, filter, selected])

  const { data: expenses } = useGetExpensesQuery(queryArgs, {
    refetchOnMountOrArgChange: false,
  })

  const chartData = useMemo(() => getChartData(expenses), [expenses])

  const handlePrevDate = () => {
    const prev = new Date(selected)
    prev.setDate(prev.getDate() - 1)
    dispatch(setDate(prev.toISOString()))
  }

  const handleNextDate = () => {
    const next = new Date(selected)
    next.setDate(next.getDate() + 1)
    dispatch(setDate(next.toISOString()))
  }

  return (
    <div className={styles.pieChart}>
      <Filter selectedFilter={filter} onChange={setFilter} filters={filters} />
      <div className={styles.dateNavigation}>
        <button onClick={handlePrevDate} className={styles.arrowBtn}>
          &lt;
        </button>

        <div onClick={() => setShowCalendar(!showCalendar)} className={styles.selectedDate}>
          {selectedDate.toLocaleDateString()}
        </div>

        <button onClick={handleNextDate} className={styles.arrowBtn}>
          &gt;
        </button>
      </div>

      {showCalendar && (
        <Calendar
          selected={selectedDate}
          onSelect={(date) => dispatch(setDate(date.toISOString()))}
          onClose={() => setShowCalendar(false)}
        />
      )}

      <PieChart
        type="expense"
        labels={chartData.labels}
        data={chartData.data}
        colors={chartData.colors}
      />
      <CreateExpense setShowModal={setShowModal} />

      {showModal &&
        createPortal(
          <Modal typeCategories="expense" type="expense" onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </div>
  )
}
