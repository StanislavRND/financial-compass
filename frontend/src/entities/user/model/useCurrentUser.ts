import { useEffect, useState } from 'react'
import { getCurrentUser } from '../../../shared/api/auth'
import { FamilyData } from '../../../shared/types/family'
import { User } from '../../../shared/types/user'

export const useCurrentUser = () => {
  const [userData, setUserData] = useState<Pick<User, 'id' | 'name'> | null>(null)
  const [familyData, setFamilyData] = useState<FamilyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const user = await getCurrentUser()
        setUserData({ id: user.id, name: user.name })
        setFamilyData({ familyId: user.familyId })
      } catch {
        setError('Ошибка загрузки данных пользователя')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { userData, familyData, loading, error }
}
