import { skipToken } from '@reduxjs/toolkit/query'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTransactionsQuery } from '../../entities/transactions/api/useTransactions'
import { useAuth } from '../../features/auth/useAuth'
import { selectDate } from '../../shared/model/date'
import { getPercent } from '../../shared/utils/getPepsent'
import { CategoryListModal } from './category-list-modal'
import styles from './list-transactions.module.scss'
import { useExpensesByCategory } from './model/expensesBySelectedCategory'
import { groupExpensesByCategory } from './model/groupedExpenses'

type Props = {
  type: 'expense' | 'income'
  filter: 'day' | 'week' | 'month' | 'year'
}

export const ListTransactions = ({ type, filter }: Props) => {
  const selected = useSelector(selectDate)
  const { user } = useAuth()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const queryArgs = useMemo(() => {
    if (!user) return skipToken
    return {
      type,
      userId: user.id,
      familyId: user.familyId ?? null,
      filter,
      date: new Date(selected).toISOString(),
    }
  }, [user, type, filter, selected])

  const { data: transactions, isLoading } = useTransactionsQuery(queryArgs)

  const groupedTransactions = useMemo(() => groupExpensesByCategory(transactions), [transactions])

  const transactionsBySelectedCategory = useExpensesByCategory(transactions, selectedCategoryId)

  const selectedCategory = useMemo(() => {
    if (selectedCategoryId === null) return null
    return groupedTransactions.find((el) => el.category.id === selectedCategoryId)?.category || null
  }, [selectedCategoryId, groupedTransactions])

  if (isLoading) return <div>Загрузка...</div>

  if (!groupedTransactions || groupedTransactions.length === 0) {
    return (
      <section className={styles.listExpenses}>
        <div className={styles.emptyBlock}>
          <div className={styles.emptyText}>
            Пока что тишина — <br />
            {type === 'expense' ? 'расходов' : 'доходов'} за этот период не найдено.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.listExpenses}>
      <div className={styles.list}>
        {groupedTransactions.map((el, index) => (
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
              <div className={styles.percent}>{getPercent(el.sum, transactions ?? [])} %</div>
              <div className={styles.price}>{el.sum} ₽</div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <CategoryListModal
          transactionsBySelectedCategory={transactionsBySelectedCategory}
          setSelectedCategoryId={setSelectedCategoryId}
          type={type}
        />
      )}
    </section>
  )
}
