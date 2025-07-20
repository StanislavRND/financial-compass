import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import styles from './pie-chart.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

export const PieChart = () => {
  const data = {
    labels: ['День', 'Неделя', 'Месяц'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue', 'green'],
        borderWidth: 6,
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
      tooltip: { enabled: true },
    },
  }

  return (
    <div className={styles.doughnut}>
      <Doughnut data={data} options={options} />
      <div className={styles.summa}>20000 ₽</div>
    </div>
  )
}
