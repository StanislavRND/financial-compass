import styles from './button.module.scss'

type Props = {
  onClick: () => void
  loading: boolean
  success: boolean
  error: string
}

export const CreateFamilyButton = ({ onClick, loading, error }: Props) => {
  return (
    <>
      <button className={styles.createFamilyBtn} onClick={onClick} disabled={loading}>
        {loading ? 'Загрузка...' : 'Создать семью'}
      </button>
      {error && <p className={styles.userError}>{error}</p>}
    </>
  )
}
