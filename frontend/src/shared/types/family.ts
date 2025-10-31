import { User } from './user'

export interface Family {
  id: number
  invite?: string
  members: User[]
}

export type FamilyData = Partial<Omit<Family, 'id'>> & {
  familyId?: number
}
