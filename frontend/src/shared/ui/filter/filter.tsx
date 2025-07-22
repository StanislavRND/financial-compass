import { useState } from 'react'
import styles from './filter.module.scss'

type Props = {
  filters: string[]
}

export const Filter = ({ filters }: Props) => {
  const [active, setActive] = useState(0)
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
