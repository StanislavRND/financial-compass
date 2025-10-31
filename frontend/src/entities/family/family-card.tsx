import { useNavigate } from 'react-router-dom'
import { logoutApi } from '../../shared/api/auth'
import { Family } from '../../shared/types/family'
import { Button } from '../../shared/ui/button/button'
import styles from './family-card.module.scss'

type Props = {
  family: Family
}

export const FamilyCard = ({ family }: Props) => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutApi()
    navigate('/login')
  }

  return (
    <>
      <div className={styles.userProfile__sectionTitle}>Семья</div>
      <div className={styles.userProfile__section}>
        <div className={styles.userProfile__familyCard}>
          <div className={styles.userProfile__invite}>{family.invite}</div>
          <div className={styles.userProfile__quantity}>
            <h3>Участников: </h3>
            <div>{family.members.length}</div>
          </div>
          <ul>
            {family.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>

        <Button onClick={handleLogout} className={styles.btn}>
          Выйти
        </Button>
      </div>
    </>
  )
}
