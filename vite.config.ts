import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

// Resolve __dirname replacement for Node 22+ ESM environments
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt', // Prompt user to update via main.tsx flow
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'My PWA App',
        short_name: 'MyApp',
        description: 'My awesome PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { 
            src: 'pwa-512x512.png', 
            sizes: '512x512', 
            type: 'image/png', 
            purpose: 'any maskable' 
          },
        ],
      },
      workbox: {
        // Core caching strategy rules matching architectural intent
        runtimeCaching: [
          {
            // API calls — Network first, fall back to offline storage / cache
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { 
                maxEntries: 100, 
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Static assets — Cache first for rapid mobile shell loads
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff2?)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: { 
                maxEntries: 200, 
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
            },
          },
          {
            // Typography / External CDN Assets
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { 
                maxEntries: 20, 
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // Crucial for locally testing offline behavior in 390px mobile simulation
        type: 'module',
      },
    }),
  ],
})