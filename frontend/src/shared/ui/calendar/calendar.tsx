import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import styles from './calendar.module.scss'

interface CalendarProps {
  selected: Date
  onSelect: (date: Date) => void
  onClose: () => void
  disabledBefore?: Date
}

export const Calendar = ({ selected, onSelect, onClose, disabledBefore }: CalendarProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const modifiersClassNames = {
    selected: styles.mySelected,
    today: styles.myToday,
    disabled: styles.myDisabled,
    hover: styles.myHover,
  }

  const handleSelect = (date?: Date) => {
    if (date) onSelect(date)
    onClose()
  }

  return (
    <div ref={calendarRef} className={styles.calendarPopup}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        modifiers={{
          hover: hoveredDate ? [hoveredDate] : [],
        }}
        onDayMouseEnter={(date) => setHoveredDate(date)}
        onDayMouseLeave={() => setHoveredDate(undefined)}
        modifiersClassNames={modifiersClassNames}
        disabled={{ before: disabledBefore || new Date(2020, 0, 1) }}
      />
    </div>
  )
}
