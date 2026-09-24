import { useNavigate } from "react";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { useCurrentUser, useLeagues } from "@/services/hooks";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();
  const { data: leagues = [] } = useLeagues();

  // Primary task action buttons stacked on top of navigation
  const actionFooter = (
    <div className='flex flex-col gap-2.5 w-full'>
      <button
        onClick={() => navigate("/play")}
        className='w-full py-3.5 bg-action-primary hover:bg-action-primary-hover text-action-primary-fg font-semibold text-sm rounded-xl transition-all active:scale-[0.99] shadow-sm cursor-pointer text-center'
      >
        Play
      </button>

      <button
        onClick={() => navigate("/friends")}
        className='w-full py-3.5 bg-surface border border-edge text-content font-semibold text-sm rounded-xl transition-all active:scale-[0.99] hover:bg-surface-subtle cursor-pointer text-center'
      >
        Find Friends
      </button>
    </div>
  );

  return (
    <main className='page-content safe-top safe-bottom bg-surface'>
      <AppScreenLayout stickyFooter={actionFooter} showNavigation>
        {/* Core Screen Top Global Header Block Row */}
        <div className='flex items-center justify-between w-full border-b border-edge-subtle pb-3'>
          {/* Logo Badge Asset UI Element */}
          <div className='w-9 h-9 bg-surface-subtle rounded-lg flex items-center justify-center p-1 border border-edge'>
            <span className='font-black text-[9px] text-danger border border-edge-strong p-0.5 uppercase leading-none rounded-sm'>
              LG
            </span>
          </div>

          {/* User Profile Context Row Right Controls */}
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-full bg-brand-subtle flex items-center justify-center text-xl shadow-sm border border-edge'>
              {user?.avatar || "🐵"}
            </div>

            <button className='w-9 h-9 rounded-full border border-edge flex items-center justify-center hover:bg-surface-subtle active:scale-95 transition-transform text-sm cursor-pointer text-content'>
              🔔
            </button>
          </div>
        </div>

        {/* Primary Content / Active Leagues Section */}
        {leagues.length > 0 ? (
          <div className='mt-6 animate-fade-in'>
            <h2 className='text-xs font-bold text-content-subtle uppercase tracking-wider mb-3 text-left'>
              Active Leagues ({leagues.length})
            </h2>
            <div className='space-y-3'>
              {leagues.map((league) => (
                <div
                  key={league.id}
                  onClick={() => navigate(`/league/${league.id}`)}
                  className='p-4 bg-surface-subtle border border-edge rounded-2xl flex items-center justify-between hover:bg-surface-muted transition-colors cursor-pointer'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-warning-subtle border border-warning-border flex items-center justify-center text-lg'>
                      🏆
                    </div>
                    <div className='text-left'>
                      <h3 className='font-bold text-sm text-content'>
                        {league.name}
                      </h3>
                      <p className='text-xs text-content-muted'>
                        {league.fifaVersion} • {league.attendees.length} Members
                      </p>
                    </div>
                  </div>
                  <span className='text-xs text-brand font-semibold'>
                    View ›
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Primary Empty State Illustrative Section */
          <div className='flex flex-col items-center justify-center mt-8 text-center px-2 animate-fade-in'>
            {/* Stylized Illustration Box matching your graphic canvas structure */}
            <div className='w-52 h-64 relative flex items-center justify-center select-none'>
              <div className='absolute inset-0 bg-radial from-surface-muted to-transparent scale-125 opacity-40' />

              {/* Custom SVG mockup mimicking your structural soccer character illustration */}
              <div className='flex flex-col items-center relative z-10'>
                <span className='text-6xl animate-pulse'>🏃‍♂️</span>
                <div className='mt-4 font-black text-4xl italic tracking-tighter text-content flex flex-col uppercase leading-none'>
                  <span>SORRY</span>
                  <span className='text-danger pl-4'>Y!</span>
                </div>
              </div>
            </div>

            {/* Informational Callout matching the copy text of Figma mocks */}
            <div className='flex items-start gap-3 mt-6 p-4 bg-surface-subtle border border-edge-subtle rounded-2xl text-left max-w-[320px]'>
              <span className='text-content-subtle text-lg leading-none mt-0.5'>
                ℹ️
              </span>
              <p className='text-xs text-content-secondary leading-relaxed font-medium'>
                You have not played any game till now, worse than that, you don't
                have any friends.
              </p>
            </div>
          </div>
        )}
      </AppScreenLayout>
    </main>
  );
}
