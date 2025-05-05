import { useNavigate } from 'react-router-dom'
import stylesGlobal from '../../shared/styles/global.module.scss'
import { Button } from '../../shared/ui/button'
import styles from './finance-philosophy.module.scss'

export const FinancePhilosophy = () => {
  const navigate = useNavigate()
  return (
    <section id="philosophy" className={styles.pholosophy}>
      <div className={stylesGlobal.container}>
        <div className={styles.pholosophyBlock}>
          <div className={styles.pholosophyLeft}>
            <img
              className={styles.pholosophyLeftPhone}
              src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/6754de565af65477ffcabd04_img_app_blob_firefly_realsimple%20(1).avif"
              alt="finance phone"
            />
          </div>
          <div className={styles.pholosophyRight}>
            <h3 className={styles.pholosophyRightTitle}>
              Ваши деньги — ваша жизнь. Тратьте их с пользой с YNAB.
            </h3>
            <p className={styles.pholosophyRightSubtitle}>
              Вы вкладываете так много усилий в зарабатывание денег, не должны ли вы вкладывать
              столько же времени, внимания и заботы в их трату? Сделайте свои деньги более значимыми
              с помощью намеренных трат.
            </p>
            <Button onClick={() => navigate('/login')} className={styles.pholosophyButton}>
              Попробовать бесплатно
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
