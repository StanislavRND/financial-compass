import { Message } from '../../../shared/types/message'
import { ChatCard } from './chat-card'
import styles from './chat-card-cards.module.scss'

interface ChatCardsProps {
  messages: Message[]
  currentUserId: number
}

export const ChatCards = ({ messages, currentUserId }: ChatCardsProps) => {
  return (
    <div className={styles.cards}>
      {messages.map((message) => (
        <ChatCard message={message} key={message.id} isOwn={message.userId === currentUserId} />
      ))}
    </div>
  )
}
