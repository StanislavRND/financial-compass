import { skipToken } from '@reduxjs/toolkit/query'
import 'chartjs-adapter-date-fns'
import { endOfWeek, format, startOfWeek, subDays, subMonths, subYears } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { useAuth } from '../../features/auth/useAuth'
import { BarChartUI } from '../../features/show-statistics-chart/ui/bar-chart'
import { useGetLastExpensesQuery } from '../../shared/api/expenses'
import { useGetLastIncomeQuery } from '../../shared/api/income'
import { FilterItem } from '../../shared/types/filter'
import { Filter } from '../../shared/ui/filter/filter'
import styles from './bar-chart.module.scss'

type FilterType = 'day' | 'week' | 'month' | 'year'

export const BarChart = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState<FilterType>('year')

  const queryArgs = user ? { userId: user.id, familyId: user.familyId ?? null, filter } : skipToken

  const { data: incomesArr = [], isLoading: loadingIncomes } = useGetLastIncomeQuery(queryArgs)
  const { data: expensesArr = [], isLoading: loadingExpenses } = useGetLastExpensesQuery(queryArgs)

  const isLoading = loadingIncomes || loadingExpenses

  const incomes = useMemo(() => incomesArr.flat(), [incomesArr])
  const expenses = useMemo(() => expensesArr.flat(), [expensesArr])

  const labels = useMemo(() => {
    const now = new Date()
    switch (filter) {
      case 'day':
        return Array.from({ length: 5 }, (_, i) =>
          format(subDays(now, i), 'dd.MM', { locale: ru }),
        ).reverse()

      case 'week':
        return Array.from({ length: 5 }, (_, i) => {
          const start = startOfWeek(subDays(now, i * 7), { weekStartsOn: 1 })
          const end = endOfWeek(subDays(now, i * 7), { weekStartsOn: 1 })
          return `${format(start, 'dd.MM', { locale: ru })}-${format(end, 'dd.MM', { locale: ru })}`
        }).reverse()

      case 'month':
        return Array.from({ length: 5 }, (_, i) =>
          format(subMonths(now, i), 'LLLL', { locale: ru }),
        ).reverse()

      case 'year':
        return Array.from({ length: 5 }, (_, i) => format(subYears(now, i), 'yyyy')).reverse()

      default:
        return []
    }
  }, [filter])

  const datasets = useMemo(() => {
    if (!labels.length) return []

    const incomeData = labels.map((label) =>
      incomes
        .filter((i) => matchDateLocal(i.date, label, filter))
        .reduce((sum, i) => sum + i.sum, 0),
    )

    const expenseData = labels.map((label) =>
      expenses
        .filter((e) => matchDateLocal(e.date, label, filter))
        .reduce((sum, e) => sum + e.sum, 0),
    )

    const profitData = incomeData.map((inc, i) => inc - expenseData[i])

    return [
      { label: 'Доходы', data: incomeData, backgroundColor: '#E6E13F' },
      { label: 'Расходы', data: expenseData, backgroundColor: '#63C96D' },
      {
        label: 'Прибыль / Убыток',
        data: profitData.map((p) => Math.abs(p)),
        backgroundColor: profitData.map((p) => (p >= 0 ? '#46E8D3' : '#E16D56')),
      },
    ]
  }, [incomes, expenses, labels, filter])

  const filters: FilterItem[] = [
    { label: 'по годам', value: 'year' },
    { label: 'по месяцам', value: 'month' },
    { label: 'по неделям', value: 'week' },
    { label: 'по дням', value: 'day' },
  ]

  const names = [
    { id: 1, name: 'Расходы', color: '#63C96D' },
    { id: 2, name: 'Доходы', color: '#E6E13F' },
    { id: 3, name: 'Прибыль', color: '#46E8D3' },
    { id: 4, name: 'Убыток', color: '#E16D56' },
  ]

  if (isLoading) return <div>Загрузка...</div>

  return (
    <section className={styles.barChart}>
      <Filter onChange={setFilter} selectedFilter={filter} filters={filters} />
      <BarChartUI labels={labels} datasets={datasets} />
      <div className={styles.names}>
        {names.map((el) => (
          <div key={el.id} className={styles.name}>
            <div className={styles.circle} style={{ backgroundColor: el.color }} />
            <span>-</span>
            <span className={styles.text}>{el.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// Сравнение даты с лейблом в локальном формате
function matchDateLocal(dateStr: string, label: string, filter: FilterType) {
  if (!dateStr) return false
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return false
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

  switch (filter) {
    case 'day':
      return format(localDate, 'dd.MM', { locale: ru }) === label
    case 'week': {
      const start = startOfWeek(localDate, { weekStartsOn: 1 })
      const end = endOfWeek(localDate, { weekStartsOn: 1 })
      return (
        `${format(start, 'dd.MM', { locale: ru })}-${format(end, 'dd.MM', { locale: ru })}` ===
        label
      )
    }
    case 'month':
      return format(localDate, 'LLLL', { locale: ru }) === label
    case 'year':
      return format(localDate, 'yyyy') === label
  }
}
