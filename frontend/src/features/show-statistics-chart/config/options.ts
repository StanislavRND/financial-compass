import { ChartOptions } from 'chart.js'

export const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      type: 'category',
      grid: {
        color: '#2a2c2f',
      },
      border: {
        color: 'rgba(255, 255, 255, 0.3)',
        display: true,
      },
      ticks: {
        color: 'white',
        font: {
          size: 20,
          weight: 'normal',
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#2a2c2f',
      },
      border: {
        color: '#2a2c2f',
        display: true,
      },
      ticks: {
        color: 'white',
        font: {
          size: 0,
        },
      },
    },
  },
}
