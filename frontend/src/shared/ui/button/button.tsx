import cn from 'classnames'
import styles from './button.module.scss'

export const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className={cn(styles.button, className)} {...props} />
}
