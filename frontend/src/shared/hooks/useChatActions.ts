import { useCallback } from 'react'

interface UseChatActionsProps {
  familyId?: number
  sendMessage: (messageData: { content: string; familyId: number }) => void
  startTyping: () => void
  stopTyping: () => void
}

export const useChatActions = ({
  familyId,
  sendMessage,
  startTyping,
  stopTyping,
}: UseChatActionsProps) => {
  const handleSendMessage = useCallback(
    (messageText: string) => {
      if (!messageText.trim() || !familyId) return

      sendMessage({
        content: messageText.trim(),
        familyId: familyId,
      })
    },
    [familyId, sendMessage],
  )

  const handleTypingStart = useCallback(() => {
    if (familyId) {
      startTyping()
    }
  }, [familyId, startTyping])

  const handleTypingStop = useCallback(() => {
    if (familyId) {
      stopTyping()
    }
  }, [familyId, stopTyping])

  return {
    handleSendMessage,
    handleTypingStart,
    handleTypingStop,
  }
}
