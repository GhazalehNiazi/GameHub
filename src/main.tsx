import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/lib/queryClient'
import { registerSW } from 'virtual:pwa-register'
import { UpdateToast } from './shared/components/pwa/UpdateToast'
import './index.css'
import App from './App'

function MainApp() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [updateSWHandler, setUpdateSWHandler] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null)

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true)
      },
      onOfflineReady() {
        console.info('GameHub is ready to work offline')
      },
    })
    setUpdateSWHandler(() => updateSW)
  }, [])

  const handleUpdate = () => {
    if (updateSWHandler) {
      updateSWHandler(true)
    }
  }

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UpdateToast
          needRefresh={needRefresh}
          onUpdate={handleUpdate}
          onDismiss={() => setNeedRefresh(false)}
        />
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<MainApp />)
