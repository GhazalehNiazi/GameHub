import React from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { FeatureRow } from "../components/FeatureRow";
import logo from "@/../public/assets/images/logo.png";
import aiStars from "@/../public/assets/icons/ai-stars.svg";
import personHeart from "@/../public/assets/icons/person-heart.svg";
import save from "@/../public/assets/icons/save.svg";

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
          <div className='w-32 h-32  flex items-center justify-center '>
            <img src={logo} className='rounded-2xl' />
          </div>

          <h1 className='text-[18px] font-bold text-[rgba(33, 33, 33, 1)] tracking-tight mt-6'>
            /UJ Game Hub
          </h1>
          <p className='text-xs text-zinc-500 max-w-[280px] mt-2 leading-relaxed'>
            Manage your gaming habits here with friends
          </p>
        </div>

        {/* This content segment will scroll internally if it runs long on tiny devices */}
        <div className='mt-8 space-y-4'>
          <FeatureRow
            icon={<img src={personHeart} />}
            title='Connect with friends'
            description='Find your friends and connect with them to keep scores.'
          />
          <FeatureRow
            icon={<img src={save} />}
            title='Keep scores'
            description='Play in competitive games and enter the results to have a history.'
          />
          <FeatureRow
            icon={<img src={aiStars} />}
            title='AI takeaways'
            description='Analyze your games and history with friends using AI.'
          />
        </div>
      </AppScreenLayout>
    </main>
  );
}
