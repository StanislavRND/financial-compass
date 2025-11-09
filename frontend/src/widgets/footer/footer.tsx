import { Link } from 'react-router-dom'
import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.block}>
        <div className={styles.text}>Авторские права © 2025 </div>
        <div className={styles.text}>
          <Link to="/privacy-policy">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  )
}
