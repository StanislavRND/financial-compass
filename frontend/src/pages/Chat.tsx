import { useCallback } from 'react'

import { ChatCards } from '../features/chat-card/ui/chat-cards'
import { ChatFooter } from '../features/chat-write/ui/chat-footer'
import { useWebSocket } from '../features/chat/useWebsocket'

import { useFamilyMessages } from '../entities/message/model/userFamilyMessages'
import { useCurrentUser } from '../entities/user/model/useCurrentUser'
import { useTypingUsers } from '../entities/user/model/useTypingUser'
import { useChatActions } from '../shared/hooks/useChatActions'
import { useSocketError } from '../shared/hooks/useSocketError'
import styles2 from '../shared/styles/global.module.scss'
import { WebSocketMessage } from '../shared/types/message'
import { Sidebar } from '../shared/ui/sidebar/sidebar'
import { transformWebSocketMessage } from '../shared/utils/messageTransform'
import { ChatHeader } from '../widgets/chat'

export const Chat = () => {
  const { userData, familyData, loading: userLoading, error: userError } = useCurrentUser()
  const { messages, setMessages, error: messagesError } = useFamilyMessages(familyData?.familyId)

  const { typingUsers, handleUserTyping } = useTypingUsers()
  const { socketError, handleError, handleConnected } = useSocketError()

  const handleNewMessage = useCallback(
    (newMessage: WebSocketMessage) => {
      const transformedMessage = transformWebSocketMessage(newMessage)
      setMessages((prev) => [...prev, transformedMessage])
    },
    [setMessages],
  )

  const { sendMessage, startTyping, stopTyping, isConnected } = useWebSocket({
    userId: userData?.id || 0,
    id: familyData?.familyId || 0,
    onNewMessage: handleNewMessage,
    onUserTyping: handleUserTyping,
    onError: handleError,
    onConnected: handleConnected,
  })

  const { handleSendMessage, handleTypingStart, handleTypingStop } = useChatActions({
    familyId: familyData?.familyId,
    sendMessage,
    startTyping,
    stopTyping,
  })

  const error = socketError || messagesError || userError

  if (userLoading) {
    return <LoadingState />
  }

  if (!userData?.name) {
    return <ErrorState message="Пользователь не найден" />
  }

  if (!familyData?.familyId) {
    return <ErrorState message="Семья не найдена" />
  }

  return (
    <div className={styles2.wrapperChat}>
      <Sidebar />
      <div className={styles2.wrapperChats}>
        <section className={styles2.chat}>
          <ChatHeader typingUsers={typingUsers} />
          <div className={styles2.main}>
            {error && (
              <div className={styles2.error}>
                {error}
                {!isConnected && ' (переподключение...)'}
              </div>
            )}
            <ChatCards messages={messages} currentUserId={userData.id} />
          </div>
          <ChatFooter
            onSendMessage={handleSendMessage}
            onTypingStart={handleTypingStart}
            onTypingStop={handleTypingStop}
            disabled={!isConnected}
          />
        </section>
      </div>
    </div>
  )
}

const LoadingState = () => (
  <div className={styles2.wrapperChat}>
    <Sidebar />
    <div className={styles2.wrapper}>
      <div className={styles2.loading}>Загрузка...</div>
    </div>
  </div>
)

const ErrorState = ({ message }: { message: string }) => (
  <div className={styles2.wrapperChat}>
    <Sidebar />
    <div className={styles2.wrapper}>
      <div className={styles2.error}>{message}</div>
    </div>
  </div>
)
