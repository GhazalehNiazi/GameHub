import { create } from 'zustand'

interface AppState {
  // Add your global state here
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))
