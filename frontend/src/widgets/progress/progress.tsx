import 'keen-slider/keen-slider.min.css'

import { useState } from 'react'
import { BENEFITS_TEXT } from '../../entities/progress/const/benefits'
import { ProgressItem } from '../../entities/progress/ui/progress-item'
import { useAutoScroll } from '../../features/progress-slider/useAutoScroll'
import { useProgressSlider } from '../../features/progress-slider/useProgressSlider'
import stylesGlobal from '../../shared/styles/global.module.scss'
import { SliderArrows } from '../../shared/ui/slider-arrow/slider-arrow'
import styles from './progress.module.scss'

export const Progress = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = BENEFITS_TEXT.length

  const { isMobile, sliderRef, slider } = useProgressSlider(setCurrentSlide)

  const goToNext = () => slider.current?.next()
  const goToPrev = () => slider.current?.prev()

  useAutoScroll(isMobile, styles['progress-scroll-container'])

  return (
    <section id="features" className={styles.progress}>
      <div className={styles['progress-wave-top']}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#fdf9ed" d="M0,100 C480,-50 960,-50 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className={stylesGlobal.container}>
        <h2 className={styles['progress-title']}>
          Чего вы достигнете с помощью Финансового Компаса?
        </h2>
        <h3 className={styles['progress-subtitle']}>Я хочу…</h3>

        {isMobile ? (
          <div className={styles['progress-scroll-container']}>
            {BENEFITS_TEXT.map((el, index) => (
              <div key={`scroll-${index}`} className={styles['progress-scroll-item']}>
                <ProgressItem image={el.image} title={el.title} subtitle={el.subtitle} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div ref={sliderRef} className="keen-slider">
              {BENEFITS_TEXT.map((el, index) => (
                <div key={`slide-${index}`} className="keen-slider__slide">
                  <ProgressItem image={el.image} title={el.title} subtitle={el.subtitle} />
                </div>
              ))}
            </div>

            <SliderArrows onPrev={goToPrev} onNext={goToNext} />

            <div className={styles['progress-dots']}>
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles['progress-dot']} ${
                    currentSlide === idx ? styles.active : ''
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles['progress-wave-bottom']}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#fdf9ed" d="M0,100 C480,20 960,100 1440,20 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  )
}
