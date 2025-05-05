import { createRoot } from 'react-dom/client'
import { AppRouter, Providers } from './application'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <AppRouter />
  </Providers>,
)
