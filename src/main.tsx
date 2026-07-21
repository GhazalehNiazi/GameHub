import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App'

// Register service worker — prompts user when a new version is available
const updateSW = registerSW({
  onNeedRefresh() {
    // You can replace this with a custom toast/banner component
    if (confirm('New version available. Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.info('App is ready to work offline')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
