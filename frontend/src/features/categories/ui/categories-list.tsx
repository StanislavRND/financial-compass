import { useGetExpenseCategoriesQuery } from '../api/categoriesApiExpense'
import { useGetIncomeCategoriesQuery } from '../api/categoriesApiIncome'
import styles from './categories-list.module.scss'

type Props = {
  selectedCategoryId: number | null
  onSelectCategory: (id: number) => void
  type: 'expense' | 'income'
}

export const CategoriesList = ({ selectedCategoryId, onSelectCategory, type }: Props) => {
  const expenseQuery = useGetExpenseCategoriesQuery()
  const incomeQuery = useGetIncomeCategoriesQuery()

  const { data: categories = [], isLoading } = type === 'expense' ? expenseQuery : incomeQuery

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className={styles.categories}>
      {categories.map((el) => (
        <div
          key={el.id}
          onClick={() => onSelectCategory(el.id)}
          className={`${styles.category} ${selectedCategoryId === el.id ? styles.active : ''}`}
          style={{ backgroundColor: selectedCategoryId === el.id ? el.color : undefined }}
        >
          <span className={styles.colorCircle} style={{ backgroundColor: el.color }} />
          <span className={styles.name}>{el.name}</span>
        </div>
      ))}
    </div>
  )
}
