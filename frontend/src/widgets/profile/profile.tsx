import { FamilyCard } from '../../entities/family'
import { useFamily } from '../../features/family-card/useFamily'
import { CreateFamilyButton } from '../../shared/ui/button/createFamily'
import styles from './profile.module.scss'

export const Profile = () => {
  const { family, hasFamily, loading, error, success, handleCreate } = useFamily()

  return (
    <section className={styles.userProfile}>
      {hasFamily ? (
        <FamilyCard family={family!} />
      ) : (
        <div className={styles.userProfile__section}>
          <CreateFamilyButton
            onClick={handleCreate}
            loading={loading}
            success={success}
            error={error}
          />
          {error && <p className={styles.userProfile__error}>{error}</p>}
        </div>
      )}
    </section>
  )
}
