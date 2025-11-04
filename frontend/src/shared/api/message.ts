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
      const response = await axiosBase.get(`/messages/family/${familyId}`, {
        params: {
          page: page.toString(),
          limit: limit.toString(),
        },
      })

      const messagesArray = response.data

      return {
        messages: messagesArray.map((msg: any) => ({
          id: msg.id.toString(),
          message: msg.content,
          timestamp: msg.createdAt,
          userId: msg.userId,
          familyId: msg.familyId,
          userName: msg.user?.name,
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
        content: messageData.message,
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
