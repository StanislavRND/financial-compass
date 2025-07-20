import { useEffect, useState } from 'react'
import { getCurrentUser } from '../../shared/api/auth'
import { UserProps } from '../../shared/types/user'

export function useAuth() {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser()
        setUser(res)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentUser()
  }, [])

  return { user, loading }
}
