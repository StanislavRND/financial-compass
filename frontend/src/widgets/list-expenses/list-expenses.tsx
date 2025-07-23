import { skipToken } from '@reduxjs/toolkit/query'
import { Sticker } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../../features/auth/useAuth'
import { useGetExpensesQuery } from '../../shared/api/expenses'
import { selectDate } from '../../shared/model/date'
import { getPercent } from '../../shared/utils/getPepsent'
import { CategoryListModal } from './category-list-modal'
import styles from './list-expenses.module.scss'
import { useExpensesByCategory } from './model/expensesBySelectedCategory'
import { groupExpensesByCategory } from './model/groupedExpenses'

export const ListExpenses = ({ filter }: { filter: 'day' | 'week' | 'month' | 'year' }) => {
  const selected = useSelector(selectDate)

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const { user } = useAuth()

  const { data: expenses } = useGetExpensesQuery(
    user ? { userId: user.id, familyId: user.familyId ?? null, filter, date: selected } : skipToken,
  )

  const groupedExpenses = useMemo(() => groupExpensesByCategory(expenses), [expenses])
  const expensesBySelectedCategory = useExpensesByCategory(expenses, selectedCategoryId)

  const selectedCategory = useMemo(() => {
    if (selectedCategoryId === null) return null
    return groupedExpenses.find((el) => el.category.id === selectedCategoryId)?.category || null
  }, [selectedCategoryId, groupedExpenses])

  if (!groupedExpenses || groupedExpenses.length === 0) {
    return (
      <section className={styles.listExpenses}>
        <div className={styles.emptyBlock}>
          <div className={styles.sticker}>
            <Sticker />
          </div>
          <div className={styles.emptyText}>
            Пока что тишина — <br />
            расходов за этот период не найдено.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.listExpenses}>
      <div className={styles.list}>
        {(groupedExpenses ?? []).map((el, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => setSelectedCategoryId(el.category.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.left}>
              <div style={{ backgroundColor: el.category.color }} className={styles.color}></div>
              <div className={styles.name}>{el.category.name}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.percent}>{getPercent(el.sum, expenses ?? [])} %</div>
              <div className={styles.price}>{el.sum} ₽</div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <CategoryListModal
          expensesBySelectedCategory={expensesBySelectedCategory}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      )}
    </section>
  )
}
