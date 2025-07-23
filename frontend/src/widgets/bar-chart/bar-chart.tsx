import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { BarChartUI } from '../../features/show-statistics-chart/ui/bar-chart'
import styles from './bar-chart.module.scss'

ChartJS.register(TimeScale, LinearScale, BarElement, Tooltip, Legend, CategoryScale)

export const BarChart = () => {
  // const filters = ['по годам', 'по месяцам', 'по неделям', 'по дням']
  const names = [
    {
      id: 1,
      name: 'расходы',
      color: '#63C96D',
    },
    {
      id: 2,
      name: 'доходы',
      color: '#E6E13F',
    },
    {
      id: 3,
      name: 'прибыль',
      color: '#46E8D3',
    },
    {
      id: 4,
      name: 'убыток',
      color: '#E16D56',
    },
  ]

  return (
    <section className={styles.barChart}>
      {/* <Filter filters={filters} /> */}
      <BarChartUI />
      <div className={styles.names}>
        {names.map((el) => (
          <div key={el.id} className={styles.name}>
            <div className={styles.circle} style={{ backgroundColor: `${el.color}` }}></div>
            <span>-</span>
            <span className={styles.text}>{el.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
