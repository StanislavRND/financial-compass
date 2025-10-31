import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Bar } from 'react-chartjs-2'
import styles from './bar-chart.module.scss'

ChartJS.register(TimeScale, LinearScale, BarElement, Tooltip, Legend, CategoryScale)

type Dataset = {
  label: string
  data: number[]
  backgroundColor: string | string[]
  barThickness?: number
  maxBarThickness?: number
}

type Props = {
  labels: string[]
  datasets: Dataset[]
}

export const BarChartUI = ({ labels, datasets }: Props) => {
  const data = { labels, datasets }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        type: 'category',
        grid: { color: '#2a2c2f' },
        border: { color: 'rgba(255, 255, 255, 0.3)', display: true },
        ticks: {
          color: 'white',
          font: {
            size: isMobile ? 12 : 20,
            weight: 'normal',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#2a2c2f' },
        border: { color: '#2a2c2f', display: true },
        ticks: { color: 'white', font: { size: 0 } },
      },
    },
  }

  return (
    <div className={styles.chart}>
      <Bar data={data} options={options} />
    </div>
  )
}
