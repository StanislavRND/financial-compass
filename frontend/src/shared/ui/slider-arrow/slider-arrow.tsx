import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './slider-arrow.module.scss'

type Props = {
  onPrev: () => void
  onNext: () => void
}

export const SliderArrows = ({ onPrev, onNext }: Props) => {
  return (
    <div className={styles.arrows}>
      <button className={styles.left} onClick={onPrev}>
        <ChevronLeft size={50} color="#545bfe" />
      </button>
      <button className={styles.right} onClick={onNext}>
        <ChevronRight size={50} color="#545bfe" />
      </button>
    </div>
  )
}
