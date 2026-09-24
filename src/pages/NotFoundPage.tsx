export default function NotFoundPage() {
  return (
    <main className="page-content safe-top safe-bottom flex flex-col items-center justify-center h-full p-6 text-center bg-surface">
      <span className="text-6xl mb-4">🔍</span>
      <h1 className="text-xl font-semibold mb-1 text-content">Page not found</h1>
      <p className="text-content-muted text-sm">The page you are looking for does not exist.</p>
    </main>
  )
}
