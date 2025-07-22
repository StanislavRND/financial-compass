const labels = ['2021', '2022', '2023', '2024', '2025']

const income = [1200, 900, 1500, 800, 1700]
const expenses = [800, 700, 1100, 600, 1000]
const profit = [400, 200, 400, 200, 700]
const loss = null

const datasets = [
  {
    label: 'Доходы',
    data: income,
    backgroundColor: '#63C96D',
    barThickness: 28,
    maxBarThickness: 20,
  },
  {
    label: 'Расходы',
    data: expenses,
    backgroundColor: '#E6E13F',
    barThickness: 28,
    maxBarThickness: 20,
  },
]

if (profit) {
  datasets.push({
    label: 'Прибыль',
    data: profit,
    backgroundColor: '#46E8D3',
    barThickness: 28,
    maxBarThickness: 20,
  })
} else if (loss) {
  datasets.push({
    label: 'Убыток',
    data: loss,
    backgroundColor: '#E16D56',
    barThickness: 28,
    maxBarThickness: 20,
  })
}

export const data = { labels, datasets }
