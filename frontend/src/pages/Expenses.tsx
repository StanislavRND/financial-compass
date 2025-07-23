import { useState } from 'react'
import styles from '../shared/styles/global.module.scss'
import { Sidebar } from '../shared/ui/sidebar/sidebar'
import { BarChart } from '../widgets/bar-chart'
import { ListExpenses } from '../widgets/list-expenses'
import { PiaChartExpenses } from '../widgets/pia-chart-expenses'

export const Expenses = () => {
  const [filter, setFilter] = useState<'day' | 'week' | 'month' | 'year'>('day')

  return (
    <div className={styles.wrapperUser}>
      <Sidebar />
      <section className={styles.wrapperExpenses}>
        <div className={styles.chart}>
          <PiaChartExpenses filter={filter} setFilter={setFilter} />
        </div>
        <div className={styles.list}>
          <ListExpenses filter={filter} />
        </div>
        <div className={styles.graph}>
          <BarChart />
        </div>
      </section>
    </div>
  )
}
