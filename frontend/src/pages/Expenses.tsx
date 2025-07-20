import styles from '../shared/styles/global.module.scss'
import { Sidebar } from '../shared/ui/sidebar/sidebar'
import { ListExpenses } from '../widgets/list-expenses'
import { PiaChartExpenses } from '../widgets/pia-chart-expenses'

export const Expenses = () => {
  return (
    <div className={styles.wrapperUser}>
      <Sidebar />
      <section className={styles.wrapperExpenses}>
        <div className={styles.chart}>
          <PiaChartExpenses />
        </div>
        <div className={styles.list}>
          <ListExpenses />
        </div>
        <div className={styles.graph}>
          <PiaChartExpenses />
        </div>
      </section>
    </div>
  )
}
