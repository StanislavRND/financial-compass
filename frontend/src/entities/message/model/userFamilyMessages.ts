import { useEffect, useState } from 'react'

import { messageApi } from '../../../shared/api/message'
import { Message } from '../../../shared/types/message'

export const useFamilyMessages = (familyId?: number) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!familyId) {
      setMessages([])
      return
    }

    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const history = await messageApi.getFamilyMessages(familyId, 1, 50)
        setMessages(
          history.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        )
      } catch {
        setError('Ошибка загрузки сообщений')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [familyId])

  return { messages, setMessages, loading, error }
}
