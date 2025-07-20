import { UserInfo } from '../entities/user'
import styles from '../shared/styles/global.module.scss'
import { Sidebar } from '../shared/ui/sidebar/sidebar'
import { Profile } from '../widgets/profile'

export const UserProfile = () => {
  return (
    <div className={styles.wrapperUser}>
      <Sidebar />
      <section className={styles.userProfile}>
        <UserInfo />
        <Profile />
      </section>
    </div>
  )
}
