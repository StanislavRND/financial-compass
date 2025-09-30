import { useState } from 'react'
import { useDeleteExpenseMutation } from '../../shared/api/expenses'
import { useDeleteIncomeMutation } from '../../shared/api/income'
import { Expense, Income } from '../../shared/types/base-transaction'
import { ModalLayout } from '../../shared/ui/modal/modal-layout'
import { formatDate } from '../../shared/utils/formatDate'
import styles from './list-transactions.module.scss'

type PropsModal = {
  transactionsBySelectedCategory: Expense[] | Income[]
  setSelectedCategoryId: (id: number | null) => void
  type: 'expense' | 'income'
}

export const CategoryListModal = ({
  setSelectedCategoryId,
  transactionsBySelectedCategory,
  type,
}: PropsModal) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [deleteExpense] = useDeleteExpenseMutation()
  const [deleteIncome] = useDeleteIncomeMutation()

  const handleDelete = async (id: number) => {
    try {
      if (type === 'expense') await deleteExpense(id).unwrap()
      else await deleteIncome(id).unwrap()
    } catch {
      console.log('Ошибка')
    }
  }

  return (
    <ModalLayout onClose={() => setSelectedCategoryId(null)}>
      <div className={styles.expenses}>
        {transactionsBySelectedCategory.map((el, i) => (
          <div
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            key={i}
            className={styles.expense}
          >
            <div className={styles.left}>
              <div style={{ backgroundColor: el.category.color }} className={styles.color}></div>
              <div className={styles.name}>{el.category.name}</div>
            </div>
            <div className={styles.rightWrapper}>
              <div className={`${styles.right} ${hoveredIdx === i ? styles.rightShifted : ''}`}>
                <div className={styles.percent}>{formatDate(el.date)}</div>
                <div className={styles.price}>{el.sum} ₽</div>
              </div>
            </div>
            {hoveredIdx === i && (
              <button
                onClick={() => handleDelete(el.id)}
                className={styles.deleteBtn}
                type="button"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </ModalLayout>
  )
}
