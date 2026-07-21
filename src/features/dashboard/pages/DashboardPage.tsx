import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Primary task action buttons stacked on top of navigation
  const actionFooter = (
    <div className='flex flex-col gap-2.5 w-full'>
      <button
        onClick={() => navigate("/play")}
        className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.99] shadow-sm cursor-pointer text-center'
      >
        Play
      </button>

      <button
        onClick={() => navigate("/friends")}
        className='w-full py-3.5 bg-white border border-zinc-200 text-zinc-800 font-semibold text-sm rounded-xl transition-all active:scale-[0.99] hover:bg-zinc-50 cursor-pointer text-center'
      >
        Find Friends
      </button>
    </div>
  );

  return (
    <main className='page-content safe-top safe-bottom bg-white'>
      <AppScreenLayout stickyFooter={actionFooter} showNavigation>
        {/* Core Screen Top Global Header Block Row */}
        <div className='flex items-center justify-between w-full border-b border-zinc-50 pb-3'>
          {/* Logo Badge Asset UI Element */}
          <div className='w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center p-1 border'>
            <span className='font-black text-[9px] text-red-600 border border-zinc-800 p-0.5 uppercase leading-none rounded-sm'>
              LG
            </span>
          </div>

          {/* User Profile Context Row Right Controls */}
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xl shadow-sm border border-white'>
              🐵
            </div>

            <button className='w-9 h-9 rounded-full border border-zinc-200/80 flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-transform text-sm cursor-pointer'>
              🔔
            </button>
          </div>
        </div>

        {/* Primary Empty State Illustrative Section */}
        <div className='flex flex-col items-center justify-center mt-8 text-center px-2 animate-fade-in'>
          {/* Stylized Illustration Box matching your graphic canvas structure */}
          <div className='w-52 h-64 relative flex items-center justify-center select-none'>
            <div className='absolute inset-0 bg-radial from-zinc-100 to-transparent scale-125 opacity-40' />

            {/* Custom SVG mockup mimicking your structural soccer character illustration */}
            <div className='flex flex-col items-center relative z-10'>
              <span className='text-6xl animate-pulse'>🏃‍♂️</span>
              <div className='mt-4 font-black text-4xl italic tracking-tighter text-zinc-800 flex flex-col uppercase leading-none'>
                <span>SORRY</span>
                <span className='text-red-500 pl-4'>Y!</span>
              </div>
            </div>
          </div>

          {/* Informational Callout matching the copy text of Figma mocks */}
          <div className='flex items-start gap-3 mt-6 p-4 bg-zinc-50/80 border border-zinc-100 rounded-2xl text-left max-w-[320px]'>
            <span className='text-zinc-400 text-lg leading-none mt-0.5'>
              ℹ️
            </span>
            <p className='text-xs text-zinc-600 leading-relaxed font-medium'>
              You have not played any game till now, worse than that, you don't
              have any friends.
            </p>
          </div>
        </div>
      </AppScreenLayout>
    </main>
  );
}
