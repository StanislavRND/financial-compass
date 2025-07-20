import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

type Props = {
  children: JSX.Element
}

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return <div>Загрузка...</div>

  if (!user) return <Navigate to="/login" replace />

  return children
}
