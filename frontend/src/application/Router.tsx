import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '../pages'
import '../shared/styles/base.scss'

export const AppRouter = () => {
  return (
    <Routes>
      <Route key={''} element={<Navigate to={'/home'} />} path="/" />
      <Route key={'home page'} element={<LandingPage />} path="/home" />
    </Routes>
  )
}
