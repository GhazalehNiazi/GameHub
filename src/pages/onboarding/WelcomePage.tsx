import React from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/components/shared/AppScreenLayout";
import { FeatureRow } from "./components/FeatureRow";

export default function WelcomePage() {
  const navigate = useNavigate();

  const footerAction = (
    <button
      onClick={() => navigate("/login")}
      className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center'
    >
      Continue
    </button>
  );

  return (
    <main className='page-content safe-top safe-bottom'>
      <AppScreenLayout stickyFooter={footerAction}>
        {/* Header Graphics Section */}
        <div className='flex flex-col items-center mt-6 text-center'>
          <div className='w-32 h-32 bg-zinc-100 rounded-2xl flex items-center justify-center p-4 border border-zinc-200/50 shadow-inner'>
            <span className='font-black text-2xl tracking-tighter text-red-600 border-4 border-zinc-800 p-1.5 uppercase rounded'>
              League
            </span>
          </div>

          <h1 className='text-xl font-bold text-zinc-900 tracking-tight mt-6'>
            /UJ Game Hub
          </h1>
          <p className='text-xs text-zinc-500 max-w-[280px] mt-2 leading-relaxed'>
            Manage your gaming habits here with friends
          </p>
        </div>

        {/* This content segment will scroll internally if it runs long on tiny devices */}
        <div className='mt-8 space-y-4'>
          <FeatureRow
            icon={<span className='text-xl'>👤</span>}
            title='Connect with friends'
            description='Find your friends and connect with them to keep scores.'
          />
          <FeatureRow
            icon={<span className='text-xl'>💾</span>}
            title='Keep scores'
            description='Play in competitive games and enter the results to have a history.'
          />
          <FeatureRow
            icon={<span className='text-xl'>✨</span>}
            title='AI takeaways'
            description='Analyze your games and history with friends using AI.'
          />
        </div>
      </AppScreenLayout>
    </main>
  );
}
