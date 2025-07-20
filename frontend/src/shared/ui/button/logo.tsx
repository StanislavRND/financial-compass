import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './button.module.scss'
import clsx from 'clsx'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/home" className={clsx(styles.headerLogo, className)}>
      <Compass size={40} color="white" />
      <div>Финансовый Компас</div>
    </Link>
  )
}
