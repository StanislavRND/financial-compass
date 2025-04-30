import '../assets/styles/base.scss'
import { Home } from '../pages'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
  return (
    <Routes>
      <Route key={'home page'} element={<Home />} path="/" />
    </Routes>
  )
}
