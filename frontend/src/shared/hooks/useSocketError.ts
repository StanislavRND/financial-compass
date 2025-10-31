import { useCallback, useState } from 'react'

export const useSocketError = () => {
  const [socketError, setSocketError] = useState('')

  const handleError = useCallback((errorMsg: string) => {
    setSocketError(errorMsg)
    setTimeout(() => setSocketError(''), 5000)
  }, [])

  const handleConnected = useCallback(() => {
    setSocketError('')
  }, [])

  return {
    socketError,
    handleError,
    handleConnected,
  }
}
