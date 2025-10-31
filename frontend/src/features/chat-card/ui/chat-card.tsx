import { Message } from '../../../shared/types/message'
import styles from './chat-card-cards.module.scss'

interface ChatCardProps {
  message: Message
  isOwn: boolean
}

export const ChatCard = ({ message, isOwn }: ChatCardProps) => {
  const formatTime = (date?: Date) => {
    if (!date || isNaN(date.getTime())) return ''
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`${styles.card} ${isOwn ? styles.ownCard : ''}`}>
      <div
        className={styles.avatarSmall}
        style={{ backgroundColor: isOwn ? 'var(--bg-light-blue)' : '#555' }}
      >
        {message.userName?.[0]?.toUpperCase() || '?'}
      </div>
      <div className={`${styles.content} ${isOwn ? styles.own : styles.other}`}>
        <p className={styles.text}>{message.message}</p>
        <span className={styles.time}>{formatTime(message.timestamp)}</span>
        <div
          className={`${styles.triangle} ${isOwn ? styles.triangleOwn : styles.triangleOther}`}
        ></div>
      </div>
    </div>
  )
}
