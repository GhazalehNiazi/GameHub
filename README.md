# PWA Base

Mobile-first PWA scaffold — Vite + React + TypeScript + Tailwind + vite-plugin-pwa.

## Stack

| Layer | Package |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router 6 |
| State | Zustand |
| Offline DB | idb (IndexedDB) |
| PWA | vite-plugin-pwa + Workbox |

## Quick start

```bash
npm install
npm run dev
```

## Key concepts

### Mobile frame layout
`index.css` caps the app to 390 px wide (your Figma frame) on desktop with a
decorative background visible on the sides. On real mobile (<430 px) the frame
fills the screen edge-to-edge automatically.

Change `--app-max-width` in `:root` to match your Figma artboard width.
Change `--desktop-bg` to set the side-panel color/pattern.

### Offline support
- `src/lib/db.ts` — IndexedDB via `idb`; define your stores here
- `src/hooks/useNetworkStatus.ts` — detect online/offline
- Workbox strategies in `vite.config.ts` — API: NetworkFirst, assets: CacheFirst

### Install prompt
`src/hooks/useInstallPrompt.ts` captures `beforeinstallprompt` so you can show
a custom "Add to Home Screen" button anywhere in your UI.

### Service worker updates
`main.tsx` uses `registerSW({ onNeedRefresh })` — shows a confirm dialog when a
new SW is ready. Replace with a toast or banner component to match your design.

## Adding a new page

1. Create `src/pages/MyPage.tsx`
2. Add a `<Route>` in `App.tsx`
3. Use `<main className="page-content safe-top safe-bottom">` as the root

## Figma → code workflow

- Mirror Figma colour styles into `tailwind.config.js` under `theme.extend.colors`
- Mirror spacing/font tokens into `tailwind.config.js` accordingly
- Use `--app-max-width` CSS variable if the artboard size changes
# GameHub
