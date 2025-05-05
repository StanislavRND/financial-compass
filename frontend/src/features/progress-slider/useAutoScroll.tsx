import { useEffect } from 'react'

export const useAutoScroll = (isMobile: boolean, containerClass: string) => {
  useEffect(() => {
    if (!isMobile) return

    const container = document.querySelector(`.${containerClass}`)
    if (!container) return

    let scrollAmount = 0

    const interval = setInterval(() => {
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      })

      scrollAmount += 300

      if (scrollAmount >= container.scrollWidth) {
        scrollAmount = 0
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [isMobile, containerClass])
}
