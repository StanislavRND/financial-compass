import { useState } from 'react'
import styles from './filter.module.scss'

export const Filter = () => {
  const [active, setActive] = useState(0)
  const filters = ['День', 'Неделя', 'Месяц', 'Год']
  return (
    <div className={styles.filter}>
      {filters.map((el, index) => (
        <div
          onClick={() => setActive(index)}
          key={index}
          className={`${styles.name} ${active === index ? styles.active : ''}`}
        >
          {el}
        </div>
      ))}
    </div>
  )
}
