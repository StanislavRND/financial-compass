import { Navigate, Route, Routes } from 'react-router-dom'
import { Income, LandingPage, Login, Register } from '../pages'
import { Chat } from '../pages/Chat'
import { Expenses } from '../pages/Expenses'
import { PrivacyPolicy } from '../pages/privaty-policy/PrivatyPolicy'
import { UserAgreement } from '../pages/user-agreement/UserAgreeMent'
import { UserProfile } from '../pages/UserProfile'
import '../shared/styles/base.scss'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
  return (
    <Routes>
      <Route key={''} element={<Navigate to={'/home'} />} path="/" />
      <Route key={'home page'} element={<LandingPage />} path="/home" />
      <Route key={'auth page'} element={<Login />} path="/login" />
      <Route key={'auth page'} element={<Register />} path="/register" />
      <Route key={'privaty police'} element={<UserAgreement />} path="/user-agreement" />
      <Route key={'privaty police'} element={<PrivacyPolicy />} path="/privacy-policy" />
      <Route
        path="/user-profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-income"
        element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
