import { User } from './user'

export interface Family {
  id: number
  invite?: string
  members: User[]
}
