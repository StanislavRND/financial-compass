import styles from './button.module.scss'

export const CreateExpense = () => {
  return (
    <button className={styles.createExpense}>
      <div className={styles.cross}>
        <span></span>
        <span></span>
      </div>
    </button>
  )
}
