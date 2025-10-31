import { useEffect, useRef, useState } from 'react'
import styles from './chat-footer.module.scss'

interface ChatFooterProps {
  onSendMessage: (message: string) => void
  onTypingStart: () => void
  onTypingStop: () => void
  disabled?: boolean
}

export const ChatFooter = ({
  onSendMessage,
  onTypingStart,
  onTypingStop,
  disabled = false,
}: ChatFooterProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState('')
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)
    handleInput()

    // Отправка события "печатает" с debounce
    if (value) {
      onTypingStart()
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        onTypingStop()
      }, 3000)
    } else {
      onTypingStop()
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }

  const sendMessage = () => {
    if (!message.trim() || disabled) return

    onSendMessage(message.trim())
    setMessage('')
    handleInput()

    onTypingStop()
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    handleInput()
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={`${styles.textarea} ${disabled ? styles.disabled : ''}`}
          placeholder={disabled ? 'Нет соединения...' : 'Введите сообщение...'}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />
      </div>
      <div className={styles.actions}>
        <button
          className={styles.btnCommit}
          onClick={sendMessage}
          disabled={!message.trim() || disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#37393c"
            stroke="#3cddef"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
            <path d="M6 12h16" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
