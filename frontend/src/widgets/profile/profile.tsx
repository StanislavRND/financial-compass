import { useNavigate } from 'react-router-dom'
import { FamilyCard } from '../../entities/family'
import { useFamily } from '../../features/family-card/useFamily'
import { logoutApi } from '../../shared/api/auth'
import { Button } from '../../shared/ui/button/button'
import { CreateFamilyButton } from '../../shared/ui/button/createFamily'
import styles from './profile.module.scss'

export const Profile = () => {
  const { family, hasFamily, loading, error, success, handleCreate } = useFamily()

  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutApi()
    navigate('/login')
  }

  return (
    <section className={styles.userProfile}>
      {hasFamily ? (
        <>
          {' '}
          <FamilyCard family={family!} />{' '}
          <Button onClick={handleLogout} className={styles.btn}>
            Выйти
          </Button>
        </>
      ) : (
        <div className={styles.userProfile__section}>
          <CreateFamilyButton
            onClick={handleCreate}
            loading={loading}
            success={success}
            error={error}
          />
          <Button onClick={handleLogout} className={styles.btn}>
            Выйти
          </Button>
          {error && <p className={styles.userProfile__error}>{error}</p>}
        </div>
      )}
    </section>
  )
}
