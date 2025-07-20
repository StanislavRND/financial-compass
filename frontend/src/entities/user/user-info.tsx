import { useAuth } from '../../features/auth/useAuth'
import styles from './user-info.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()

  if (!user) return null

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <>
      <div className={styles.userProfile__info}>
        <div className={styles.userProfile__avatar}>{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <div className={styles.userProfile__name}>{user.name}</div>
          <h2 className={styles.userProfile__subtitle}>Личный профиль</h2>
        </div>
      </div>

      <div className={styles.userProfile__sectionTitle}>Информация</div>
      <div className={styles.userProfile__section}>
        <div className={styles.userProfile__infoGrid}>
          <div className={styles.userProfile__infoItem}>
            <h3>Логин</h3>
            <h4>{user.login}</h4>
          </div>
          <div className={styles.userProfile__infoItem}>
            <h3>Дата создания</h3>
            <h4>{formatDate(user.createdAt)}</h4>
          </div>
        </div>
      </div>
    </>
  )
}
