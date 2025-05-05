import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

export const useProgressSlider = (onSlideChange: (idx: number) => void) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 3,
      spacing: 25,
    },
    breakpoints: {
      '(max-width: 978px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      '(max-width: 640px)': {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
    drag: true,
    created(slider) {
      setInterval(() => {
        slider.next()
      }, 3500)
    },
    slideChanged(slider) {
      onSlideChange(slider.track.details.rel)
    },
  })

  return {
    isMobile,
    sliderRef,
    slider,
  }
}
