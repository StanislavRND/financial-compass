import { Compass } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/useAuth'
import { logoutApi } from '../../api/auth'
import chatIcon from '../../assets/sidebar/message-circle-more.svg'
import expensesIcon from '../../assets/sidebar/square-minus.svg'
import incomeIcon from '../../assets/sidebar/square-plus.svg'
import profileIcon from '../../assets/sidebar/user-cog.svg'
import { Button } from '../button'
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuth()

  const toggleSidebar = (
    e: React.MouseEvent<HTMLElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const target = e.target as HTMLElement
    const shouldToggle = !target.closest('a, button, svg, img, li, span')

    if (shouldToggle) {
      setIsOpen((prev) => !prev)
    }
  }
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logoutApi()
    navigate('/login')
  }

  const collapsedClass = !isOpen ? styles.collapsed : ''

  return (
    <aside
      onClick={(e) => toggleSidebar(e, setIsOpen)}
      className={`${styles.sidebar} ${collapsedClass}`}
    >
      <Link to="/home" className={`${styles.logo} ${collapsedClass}`}>
        <Compass size={40} color="#3cddef" />
        <div> Финанс Компас</div>
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
      <Button onClick={handleLogout} className={`${styles.btn} ${collapsedClass}`}>
        Выйти
      </Button>
    </aside>
  )
}
