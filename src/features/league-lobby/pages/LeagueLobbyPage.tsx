import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";

export default function LeagueLobbyPage() {
  return (
    <main className='page-content safe-bottom bg-white'>
      <AppScreenLayout>
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
          <h1 className='text-xl font-bold text-zinc-900'>League Lobby</h1>
        </div>
      </AppScreenLayout>
    </main>
  );
}
