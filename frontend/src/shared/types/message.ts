export interface Message {
  id: string
  message: string
  timestamp: Date
  userId: number
  familyId: number
  userName?: string
}

export interface WebSocketMessage {
  id: number
  content: string
  createdAt: string
  userId: number
  familyId: number
  user?: {
    name: string
  }
}

export interface TypingUserData {
  userId: number
  typing: boolean
}
