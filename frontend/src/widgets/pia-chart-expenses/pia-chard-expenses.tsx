import { useState } from 'react'
import { PieChart } from '../../features/showExpensesChart/ui/pie-chart'
import { CreateExpense } from '../../shared/ui/button/createExpense'
import { Calendar } from '../../shared/ui/calendar/calendar'
import { Filter } from '../../shared/ui/filter/filter'
import styles from './pia-chart-expenses.module.scss'

export const PiaChartExpenses = () => {
  const [selected, setSelected] = useState<Date>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const handlePrevDate = () => {
    const prev = new Date(selected)
    prev.setDate(prev.getDate() - 1)
    setSelected(prev)
  }

  const handleNextDate = () => {
    const next = new Date(selected)
    next.setDate(next.getDate() + 1)
    setSelected(next)
  }

  return (
    <div className={styles.pieChart}>
      <Filter />
      <div className={styles.dateNavigation}>
        <button onClick={handlePrevDate} className={styles.arrowBtn}>
          &lt;
        </button>

        <div onClick={() => setShowCalendar(!showCalendar)} className={styles.selectedDate}>
          {selected.toLocaleDateString()}
        </div>

        <button onClick={handleNextDate} className={styles.arrowBtn}>
          &gt;
        </button>
      </div>

      {showCalendar && (
        <Calendar
          selected={selected}
          onSelect={(date) => setSelected(date)}
          onClose={() => setShowCalendar(false)}
        />
      )}

      <PieChart />
      <CreateExpense />
    </div>
  )
}
