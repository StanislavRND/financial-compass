import styles from './button.module.scss'

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateExpense = ({ setShowModal }: Props) => {
  return (
    <button onClick={() => setShowModal(true)} className={styles.createExpense}>
      <div className={styles.cross}>
        <span></span>
        <span></span>
      </div>
    </button>
  )
}
