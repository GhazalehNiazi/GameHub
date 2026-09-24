import { useEffect } from "react";
import { usePlayStore } from "../store/playStore";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { ModeSelectionStep } from "../components/ModeSelectionStep";
import { LeagueBranchStep } from "../components/LeagueBranchStep";

export default function PlayPage() {
  const { currentStep, selectedMode, setStep, resetPlayFlow } = usePlayStore();

  // Clear data states if navigating out of the tab frame unhindered
  useEffect(() => {
    return () => resetPlayFlow();
  }, [resetPlayFlow]);

  const handleBackNavigation = () => {
    if (currentStep === 2) {
      setStep(1);
    }
  };

  return (
    <main className='page-content safe-top safe-bottom bg-surface'>
      {/* Render with true global navigation shell bars active at the bottom */}
      <AppScreenLayout showNavigation>
        {/* Header Action Navigation Control Row */}
        <div className='flex items-center justify-between w-full border-b border-edge-subtle pb-3 mb-4'>
          <button
            onClick={handleBackNavigation}
            className={`p-1 -ml-1 text-content-secondary hover:text-content active:scale-90 transition-transform cursor-pointer ${
              currentStep === 1 ? "opacity-20 pointer-events-none" : ""
            }`}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>

          <h1 className='text-base font-bold text-content tracking-tight'>
            Play Page
          </h1>

          <div className='w-8 h-8 rounded-full bg-brand-subtle flex items-center justify-center text-base border border-edge-subtle'>
            🐵
          </div>
        </div>

        {/* Strategy Step Switch Execution Matrix */}
        <div className='mt-2'>
          {currentStep === 1 && <ModeSelectionStep />}

          {currentStep === 2 && selectedMode === "league" && (
            <LeagueBranchStep />
          )}

          {/* 
            Future Extensibility Zone: 
            When your UI design teams deliver alternative path specs, implement them cleanly here:
            currentStep === 2 && selectedMode === '1v1' && <OneVsOneBranchStep />
          */}
        </div>
      </AppScreenLayout>
    </main>
  );
}
