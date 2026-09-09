import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth.tsx'
import { ProgressProvider } from './hooks/useProgress.tsx'
import { ThemeProvider } from './hooks/useTheme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
