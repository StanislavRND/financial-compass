import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../shared/api/auth'
import { User } from '../../shared/types/user'

export function useAuth() {
  const { data: user, isLoading: loading } = useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  return { user: user ?? null, loading }
}
