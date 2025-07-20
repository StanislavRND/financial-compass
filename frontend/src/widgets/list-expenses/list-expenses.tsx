import styles from './list-expenses.module.scss'

export const ListExpenses = () => {
  const mockData = [
    {
      id: 1,
      color: 'red',
      name: 'Здоровье',
      percent: 47,
      price: 970,
    },
    {
      id: 2,
      color: 'blue',
      name: 'Досуг',
      percent: 100,
      price: 1200,
    },
    {
      id: 3,
      color: 'green',
      name: 'Еда',
      percent: 100,
      price: 470,
    },
    {
      id: 4,
      color: 'green',
      name: 'Еда',
      percent: 100,
      price: 470,
    },
    {
      id: 5,
      color: 'green',
      name: 'Еда',
      percent: 100,
      price: 470,
    },
    {
      id: 6,
      color: 'green',
      name: 'Еда',
      percent: 100,
      price: 470,
    },
  ]
  return (
    <section className={styles.listExpenses}>
      <div className={styles.list}>
        {mockData.map((el, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.left}>
              <div className={styles.color}></div>
              <div className={styles.name}>{el.name}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.percent}>{el.percent} %</div>
              <div className={styles.price}>{el.price} ₽</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
