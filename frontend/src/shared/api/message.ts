import axiosBase from './instance'

export interface ApiMessage {
  id: string
  message: string
  timestamp: string
  userId: number
  familyId: number
  userName?: string
}

export interface MessagesResponse {
  messages: ApiMessage[]
  total: number
  page: number
  limit: number
}

export const messageApi = {
  async getFamilyMessages(
    familyId: number,
    page: number = 1,
    limit: number = 50,
  ): Promise<MessagesResponse> {
    try {
      console.log('🔄 Fetching messages for family:', familyId)
      const response = await axiosBase.get(`/messages/family/${familyId}`, {
        params: {
          page: page.toString(),
          limit: limit.toString(),
        },
      })

      // Бэкенд возвращает массив сообщений напрямую
      const messagesArray = response.data

      console.log('✅ Raw messages from API:', messagesArray)

      // Преобразуем в ожидаемую структуру
      return {
        messages: messagesArray.map((msg: any) => ({
          id: msg.id.toString(),
          message: msg.content, // content → message
          timestamp: msg.createdAt, // createdAt → timestamp
          userId: msg.userId,
          familyId: msg.familyId,
          userName: msg.user?.name, // имя пользователя
        })),
        total: messagesArray.length,
        page,
        limit,
      }
    } catch (error) {
      console.error('❌ Error fetching messages:', error)
      throw new Error('Не удалось загрузить сообщения')
    }
  },

  async sendMessage(userId: number, messageData: { message: string; familyId: number }) {
    try {
      const response = await axiosBase.post('/messages', {
        content: messageData.message, // message → content
        familyId: messageData.familyId,
        userId,
      })
      return response.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw new Error('Не удалось отправить сообщение')
    }
  },
}
