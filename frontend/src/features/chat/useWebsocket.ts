import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message, WebSocketMessage } from '../../shared/types/message'

interface UseWebSocketProps {
  userId: number
  id: number
  onNewMessage: (message: WebSocketMessage) => void
  onUserTyping: (data: { userId: number; typing: boolean }) => void
  onError: (error: string) => void
  onConnected?: () => void
  onDisconnected?: () => void
}

export const useWebSocket = ({
  userId,
  id,
  onNewMessage,
  onUserTyping,
  onError,
  onConnected,
  onDisconnected,
}: UseWebSocketProps) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    if (!userId || !id) return

    const socket = io('ws://localhost:3000', {
      auth: {
        userId: userId,
      },
      transports: ['websocket', 'polling'],
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      onConnected?.()

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }

      socket.emit('join_family', id)
    })

    socket.on('disconnect', (reason) => {
      setIsConnected(false)
      onDisconnected?.()

      if (reason !== 'io client disconnect') {
        reconnectTimeoutRef.current = setTimeout(() => {
          connect()
        }, 3000)
      }
    })

    socket.on('connect_error', () => {
      onError('Ошибка подключения к чату')
    })

    socket.on('new_message', onNewMessage)
    socket.on('user_typing', onUserTyping)
    socket.on('error', onError)
    socket.on('message_sent', (message) => {
      console.log('Message sent successfully:', message)
    })
  }, [userId, id, onNewMessage, onUserTyping, onError, onConnected, onDisconnected])

  useEffect(() => {
    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }

      if (socketRef.current) {
        socketRef.current.off('connect')
        socketRef.current.off('disconnect')
        socketRef.current.off('connect_error')
        socketRef.current.off('new_message', onNewMessage)
        socketRef.current.off('user_typing', onUserTyping)
        socketRef.current.off('error', onError)
        socketRef.current.off('message_sent')

        if (id) {
          socketRef.current.emit('leave_family', id)
        }
        socketRef.current.disconnect()
      }
    }
  }, [connect])

  const sendMessage = useCallback(
    (messageData: { content: string; familyId: number }) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit('send_message', {
          content: messageData.content,
          familyId: messageData.familyId,
        })
      } else {
        onError('Нет подключения к серверу. Сообщение не отправлено.')
      }
    },
    [isConnected, onError],
  )

  const startTyping = useCallback(() => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('typing_start', id)
    }
  }, [isConnected, id])

  const stopTyping = useCallback(() => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('typing_stop', id)
    }
  }, [isConnected, id])

  return {
    isConnected,
    sendMessage,
    startTyping,
    stopTyping,
    socket: socketRef.current,
  }
}
