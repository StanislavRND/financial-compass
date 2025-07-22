import styles from './categories-list.module.scss'

import { useGetCategoriesQuery } from '../api/categoriesApi'

type Props = {
  selectedCategoryId: number | null | undefined
  onSelectCategory: (id: number) => void
}

export const CategoriesList = ({ selectedCategoryId, onSelectCategory }: Props) => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery()

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
