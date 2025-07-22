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
import { Bar } from 'react-chartjs-2'
import { data } from '../config/data'
import { options } from '../config/options'
import styles from './bar-chart.module.scss'

ChartJS.register(TimeScale, LinearScale, BarElement, Tooltip, Legend, CategoryScale)

export const BarChartUI = () => {
  return (
    <div className={styles.chart}>
      <Bar data={data} options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
