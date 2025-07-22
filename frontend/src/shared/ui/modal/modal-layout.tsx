import { ReactNode, useEffect } from 'react'
import styles from './modal-layout.module.scss'

type Props = {
  children: ReactNode
  onClose: () => void
}

export const ModalLayout = ({ children, onClose }: Props) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.btn}>
          <div className={styles.cross}>
            <span></span>
            <span></span>
          </div>
        </button>
        {children}
      </div>
    </div>
  )
}
