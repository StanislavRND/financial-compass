import { useEffect } from 'react'
import styles from '../shared/styles/global.module.scss'
import { Advantages } from '../widgets/advantages'
import { FinancePhilosophy } from '../widgets/finance-philosophy'
import { Footer } from '../widgets/footer'
import { Header } from '../widgets/header/header'
import { Intro } from '../widgets/intro'
import { Progress } from '../widgets/progress'

export const LandingPage = () => {
  useEffect(() => {
    if (sessionStorage.getItem('scrollToBottom') === 'true') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      sessionStorage.removeItem('scrollToBottom')
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Header />
      <Intro />
      <Advantages />
      <Progress />
      <FinancePhilosophy />
      <Footer />
    </div>
  )
}
