import { useState } from 'react'
import { useDeleteExpenseMutation } from '../../shared/api/expenses'
import { Expense } from '../../shared/types/expense'
import { ModalLayout } from '../../shared/ui/modal/modal-layout'
import { convertDataToString } from '../../shared/utils/convertDataToString'
import styles from './list-expenses.module.scss'

type PropsModal = {
  expensesBySelectedCategory: Expense[]
  setSelectedCategoryId: (id: number | null) => void
}

export const CategoryListModal = ({
  setSelectedCategoryId,
  expensesBySelectedCategory,
}: PropsModal) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [deleteExpense] = useDeleteExpenseMutation()

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id).unwrap()
    } catch {
      console.log('Ошибка')
    }
  }

  return (
    <ModalLayout onClose={() => setSelectedCategoryId(null)}>
      <div className={styles.expenses}>
        {expensesBySelectedCategory.map((expense, i) => (
          <div
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            key={i}
            className={styles.expense}
          >
            <div className={styles.left}>
              <div
                style={{ backgroundColor: expense.category.color }}
                className={styles.color}
              ></div>
              <div className={styles.name}>{expense.category.name}</div>
            </div>
            <div className={styles.rightWrapper}>
              <div className={`${styles.right} ${hoveredIdx === i ? styles.rightShifted : ''}`}>
                <div className={styles.percent}>{convertDataToString(expense.date)}</div>
                <div className={styles.price}>{expense.sum} ₽</div>
              </div>
            </div>
            {hoveredIdx === i && (
              <button
                onClick={() => handleDelete(expense.id)}
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
