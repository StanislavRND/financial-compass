import { Compass } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../features/auth/useAuth'
import chatIcon from '../../assets/sidebar/message-circle-more.svg'
import expensesIcon from '../../assets/sidebar/square-minus.svg'
import incomeIcon from '../../assets/sidebar/square-plus.svg'
import profileIcon from '../../assets/sidebar/user-cog.svg'
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const user = useAuth()
  const location = useLocation()

  const toggleSidebar = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const shouldToggle = !target.closest('a, button, svg, img, li, span')

    if (shouldToggle) {
      setIsOpen((prev) => !prev)
    }
  }

  const collapsedClass = !isOpen ? styles.collapsed : ''

  return (
    <>
      <aside
        onClick={toggleSidebar}
        className={`${styles.sidebar} ${collapsedClass} ${styles.desktopSidebar}`}
      >
        <Link to="/home" className={`${styles.logo} ${collapsedClass}`}>
          <Compass size={40} color="#3cddef" />
          <div>Финанс Компас</div>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.items}>
            <Link
              to="/user-expenses"
              className={`${styles.link} ${collapsedClass} ${location.pathname === '/user-expenses' ? styles.active : ''}`}
            >
              <img src={expensesIcon} alt="Расходы" className={styles.icon} />
              <li className={`${styles.item} ${collapsedClass}`}>Расходы</li>
            </Link>
            <Link
              to="/user-income"
              className={`${styles.link} ${collapsedClass} ${location.pathname === '/user-income' ? styles.active : ''}`}
            >
              <img src={incomeIcon} alt="Доходы" className={styles.icon} />
              <li className={`${styles.item} ${collapsedClass}`}>Доходы</li>
            </Link>
            {user.user?.familyId !== null && (
              <Link
                to="/user-chat"
                className={`${styles.link} ${collapsedClass} ${location.pathname === '/user-chat' ? styles.active : ''}`}
              >
                <img src={chatIcon} alt="Чат" className={styles.icon} />
                <li className={`${styles.item} ${collapsedClass}`}>Чат</li>
              </Link>
            )}
            <Link
              to="/user-profile"
              className={`${styles.link} ${collapsedClass} ${location.pathname === '/user-profile' ? styles.active : ''}`}
            >
              <img src={profileIcon} alt="Профиль" className={styles.icon} />
              <li className={`${styles.item} ${collapsedClass}`}>Профиль</li>
            </Link>
          </ul>
        </nav>
      </aside>

      <nav className={styles.mobileBottomNav}>
        <Link
          to="/user-expenses"
          className={`${styles.mobileBottomLink} ${location.pathname === '/user-expenses' ? styles.mobileBottomActive : ''}`}
        >
          <img src={expensesIcon} alt="Расходы" className={styles.mobileBottomIcon} />
          <span className={styles.mobileBottomText}>Расходы</span>
        </Link>
        <Link
          to="/user-income"
          className={`${styles.mobileBottomLink} ${location.pathname === '/user-income' ? styles.mobileBottomActive : ''}`}
        >
          <img src={incomeIcon} alt="Доходы" className={styles.mobileBottomIcon} />
          <span className={styles.mobileBottomText}>Доходы</span>
        </Link>
        {user.user?.familyId !== null && (
          <Link
            to="/user-chat"
            className={`${styles.mobileBottomLink} ${location.pathname === '/user-chat' ? styles.mobileBottomActive : ''}`}
          >
            <img src={chatIcon} alt="Чат" className={styles.mobileBottomIcon} />
            <span className={styles.mobileBottomText}>Чат</span>
          </Link>
        )}
        <Link
          to="/user-profile"
          className={`${styles.mobileBottomLink} ${location.pathname === '/user-profile' ? styles.mobileBottomActive : ''}`}
        >
          <img src={profileIcon} alt="Профиль" className={styles.mobileBottomIcon} />
          <span className={styles.mobileBottomText}>Профиль</span>
        </Link>
      </nav>
    </>
  )
}
