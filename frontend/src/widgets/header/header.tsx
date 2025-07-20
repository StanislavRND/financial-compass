import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { Logo } from '../../shared/ui/button'
import { Button } from '../../shared/ui/button/button'
import { navLinks } from './config/navLinks'
import styles from './header.module.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />

        <nav className={clsx(styles.headerNav, { [styles.open]: isOpen })}>
          <ul className={styles.headerItems}>
            {navLinks.map(({ label, path }) => (
              <li key={label} className={styles.headerItem}>
                <ScrollLink
                  to={path}
                  smooth={true}
                  duration={500}
                  offset={-75}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/login')} className={styles.headerButton}>
            Попробовать бесплатно
          </Button>
        </nav>

        <button className={styles.burger} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={36} />}
        </button>
      </div>
    </header>
  )
}
