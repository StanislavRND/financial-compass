import { FilterItem, FilterValue } from '../../types/filter'
import styles from './filter.module.scss'

type Props = {
  filters: FilterItem[]
  selectedFilter: FilterValue
  onChange: (value: FilterValue) => void
}

export const Filter = ({ filters, onChange, selectedFilter }: Props) => {
  const activeIndex = filters.findIndex((f) => f.value === selectedFilter)

  const handleClick = (index: number) => {
    onChange(filters[index].value)
  }

  return (
    <div className={styles.filter}>
      {filters.map((el, index) => (
        <div
          onClick={() => handleClick(index)}
          key={index}
          className={`${styles.name} ${activeIndex === index ? styles.active : ''}`}
        >
          {el.label}
        </div>
      ))}
    </div>
  )
}
