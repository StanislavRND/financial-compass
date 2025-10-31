import { useCallback, useState } from 'react'
import { TypingUserData } from '../../../shared/types/message'

export const useTypingUsers = () => {
  const [typingUsers, setTypingUsers] = useState<number[]>([])

  const handleUserTyping = useCallback((data: TypingUserData) => {
    setTypingUsers((prev) => {
      if (data.typing) {
        return [...prev.filter((id) => id !== data.userId), data.userId]
      } else {
        return prev.filter((id) => id !== data.userId)
      }
    })
  }, [])

  return {
    typingUsers,
    handleUserTyping,
  }
}
