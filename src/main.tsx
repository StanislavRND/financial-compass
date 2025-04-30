import { AppRouter, Providers } from './application'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <AppRouter />
  </Providers>,
)
