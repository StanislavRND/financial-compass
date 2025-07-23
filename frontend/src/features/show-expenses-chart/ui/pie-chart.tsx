import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import styles from './pie-chart.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

type PropsData = {
  labels?: string[]
  data?: number[]
  colors?: string[]
}

export const PieChart = ({ labels = [], data = [], colors = [] }: PropsData) => {
  const isEmpty = !data.length || data.every((v) => v === 0)

  const chartData = {
    labels: isEmpty ? ['Нет данных'] : labels,
    datasets: [
      {
        data: isEmpty ? [1] : data,
        backgroundColor: isEmpty ? ['#ccc'] : colors,
        borderWidth: 4,
        borderColor: '#2a2c2f',
        borderRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: !isEmpty },
    },
  }

  const sum = data.reduce((acc, val) => acc + val, 0)

  return (
    <div className={styles.doughnut}>
      <Doughnut data={chartData} options={options} />

      {isEmpty ? (
        <div className={`${styles.empty} ${styles.summa}`}>Расходов не было</div>
      ) : (
        <div className={styles.summa}>{sum} ₽</div>
      )}
    </div>
  )
}
