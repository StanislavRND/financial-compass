import { useEffect, useState } from 'react'
import { createFamily, getInfoFamilyForUser } from '../../shared/api/user'
import { Family } from '../../shared/types/family'
import { useAuth } from '../auth/useAuth'

export const useFamily = () => {
  const { user } = useAuth()
  const userId = user?.id

  const [family, setFamily] = useState<Family>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const hasFamily = !!family

  const handleCreateClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmCreate = async () => {
    if (!userId) return
    setShowConfirm(false)
    setLoading(true)
    setError('')
    try {
      await createFamily(userId)
      setSuccess(true)
      fetchFamily()
      window.location.reload()
    } catch {
      setError('Ошибка создания семьи')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelCreate = () => {
    setShowConfirm(false)
  }

  const fetchFamily = async () => {
    if (!userId) return
    try {
      const res = await getInfoFamilyForUser()
      setFamily(res)
    } catch (e) {
      console.log('Ошибка получения семьи')
    }
  }

  useEffect(() => {
    fetchFamily()
  }, [userId])

  return {
    family,
    hasFamily,
    loading,
    error,
    success,
    handleCreate: handleCreateClick,
    showConfirm,
    handleConfirmCreate,
    handleCancelCreate,
  }
}
