import stylesGlobal from '../../shared/styles/global.module.scss'
import styles from './advantages.module.scss'
import { ADVANTAGES_TEXT } from './constants'

export const Advantages = () => {
  return (
    <section id="benefits" className={styles.advantages}>
      <div className={stylesGlobal.container}>
        <div className={styles['advantages__advantage']}>
          {' '}
          <h3 className={styles['advantages__title']}>
            «<span>Финансовый Компас</span> — это не просто инструмент для управления деньгами. Это
            инструмент для самореализации. Кем вы хотите быть, и как заработанные вами деньги могут
            помочь вам этого достичь?»
          </h3>
          <img src="advantage.jpg" alt="advantage" />
        </div>

        <div className={styles['advantages__block']}>
          <div className={styles['advantages__left']}>
            <h2 className={styles['advantages__left-title']}>Мы №1 не просто так…</h2>
            <h4 className={styles['advantages__left-text']}>
              (и не только потому, что так сказала наша мама.)
            </h4>
            <p className={styles['advantages__left-info']}>
              Метод Финансового Компаса упрощает решения о расходах, проясняет приоритеты и приносит
              больше радости каждому дню и каждому рублю. И это легко! Просто дайте каждому рублю
              работу.
            </p>
          </div>
          <div className={styles['advantages__right']}>
            <div className={styles['advantages__right-items']}>
              {ADVANTAGES_TEXT.map((el) => (
                <div key={el.id} className={styles['advantages__right-item']}>
                  <div className={styles['advantages__right-item-percent']}>{el.percent}%</div>
                  <div className={styles['advantages__right-item-text']}>{el.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
