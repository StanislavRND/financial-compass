import { useNavigate } from 'react-router-dom'
import stylesGlobal from '../../shared/styles/global.module.scss'
import { Button } from '../../shared/ui/button'
import styles from './intro.module.scss'

export const Intro = () => {
  const navigate = useNavigate()
  return (
    <section id="intro" className={styles.intro}>
      <div className={stylesGlobal.container}>
        <div className={styles.introBlock}>
          <div className={styles.introLeft}>
            <h1 className={styles.introLeftTitle}>На что вы тратите свои деньги в жизни?</h1>
            <h3 className={styles.introLeftSubtitle}>
              Создайте удобный и гибкий финансовый план вместе с Финансовым Компасом.
            </h3>
            <Button onClick={() => navigate('/login')} className={styles.introButton}>
              Попробовать бесплатно
            </Button>
            <h6 className={styles.introLeftText}>Это просто! Банковская карта не требуется.</h6>
          </div>
          <div className={styles.introRight}>
            <img
              className={styles.introRightDollars}
              src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/672188c512264aa81f920114_flying_money_narrow_firefly_hero.svg"
              alt="dollars"
            />
            <img
              className={styles.introRightPhone}
              src="image-removebg-preview.png"
              alt="finance phone"
            />
            <div className={styles.introRightShadow}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
