import { Link, useNavigate } from 'react-router-dom'
import styles from './progress-item.module.scss'

type Props = {
  title: string
  subtitle: string
  image: string
}

export const ProgressItem = ({ title, subtitle, image }: Props) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/login')} className={styles.item}>
      <Link to="">
        <img src={image} alt={title} className={styles.image} />
        <h4 className={styles.title}>{title}</h4>
        <h5 className={styles.subtitle}>{subtitle}</h5>
      </Link>
    </div>
  )
}
