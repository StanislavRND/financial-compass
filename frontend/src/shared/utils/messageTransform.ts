import { Message, WebSocketMessage } from '../types/message'

export const transformWebSocketMessage = (newMessage: WebSocketMessage): Message => ({
  id: newMessage.id.toString(),
  message: newMessage.content,
  timestamp: new Date(newMessage.createdAt),
  userId: newMessage.userId,
  familyId: newMessage.familyId,
  userName: newMessage.user?.name,
})
