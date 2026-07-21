import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { StepProgressBar } from "@/features/auth/components/StepProgressBar";
import { LeagueSetupStep } from "../components/LeagueSetupStep";
import { AttendeesListStep } from "../components/AttendeesListStep";
import { LeagueRulesStep } from "../components/LeagueRulesStep";
import { LeagueReviewStep } from "../components/LeagueReviewStep";
import { LeagueWaitingStep } from "../components/LeagueWaitingStep";
import { leagueService } from "@/services/api";

export default function NewLeagueWizardPage() {
  const navigate = useNavigate();
  const store = useNewLeagueStore();
  const { step, setStep, resetStore } = store;
  const [createdLeagueId, setCreatedLeagueId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear data safely when the wizard component unmounts completely
  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  const handleBack = () => {
    if (step === 1) navigate("/play");
    else setStep(step - 1);
  };

  // Step 4 trigger: Calls leagueService.createLeague and moves to step 5
  const handleCreateLeagueSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    try {
      const res = await leagueService.createLeague({
        leagueName: store.leagueName || "New League",
        fifaVersion: store.fifaVersion || "FC 24",
        attendees: store.attendees,
        gameFormat: store.gameFormat,
        priorityMethod: store.priorityMethod,
      });
      setCreatedLeagueId(res.data.id);
      setStep(5);
    } catch (err) {
      console.error("Failed to create league:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 5 trigger: Clears store data and redirects to final league dashboard
  const handleStartLeagueFinal = () => {
    const targetId = createdLeagueId || "calciopoli-2026";
    resetStore();
    navigate(`/league/${targetId}`);
  };

  // Build the explicit layout actions footers safely
  const getFooterAction = () => {
    if (step === 4) {
      return (
        <button
          type='button'
          onClick={handleCreateLeagueSubmit}
          disabled={isSubmitting}
          className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center block'
        >
          {isSubmitting ? "Creating League..." : "Create the League"}
        </button>
      );
    }

    if (step === 5) {
      return (
        <button
          type='button' // ← CRITICAL: Keeps this safe from accidental HTML form bubbles
          onClick={handleStartLeagueFinal}
          className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center block'
        >
          Start the League
        </button>
      );
    }

    return (
      <div className='flex items-center gap-3 w-full'>
        <button
          type='button'
          onClick={handleBack}
          className='flex-1 py-3.5 border border-zinc-200 text-zinc-700 font-semibold text-sm rounded-xl active:scale-[0.99] transition-all cursor-pointer text-center'
        >
          Previous Step
        </button>
        <button
          type='submit'
          form={`new-league-form-${step}`}
          className='flex-[1.3] py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5'
        >
          Continue <span className='text-xs'>›</span>
        </button>
      </div>
    );
  };

  return (
    <main className='page-content safe-top safe-bottom bg-white'>
      <AppScreenLayout stickyFooter={getFooterAction()}>
        {/* Navigation Action Header */}
        <div className='flex items-center justify-between w-full border-b border-zinc-50 pb-3 mb-4'>
          <button
            type='button'
            onClick={handleBack}
            className='p-1 -ml-1 text-zinc-600 hover:text-zinc-900 active:scale-90 transition-transform cursor-pointer'
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

          <h1 className='text-base font-bold text-zinc-900 tracking-tight'>
            {step === 5
              ? "Waiting for members"
              : step === 4
                ? "Review the league"
                : "Create a new league"}
          </h1>

          <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-base border'>
            🐵
          </div>
        </div>

        {/* Form progress bars only show during active inputs compilation phases */}
        {step < 4 && <StepProgressBar currentStep={step as 1 | 2 | 3} />}

        <div className='mt-4'>
          {step === 1 && <LeagueSetupStep />}
          {step === 2 && <AttendeesListStep />}
          {step === 3 && <LeagueRulesStep />}
          {step === 4 && <LeagueReviewStep />}
          {step === 5 && <LeagueWaitingStep onStart={handleStartLeagueFinal} />}
        </div>
      </AppScreenLayout>
    </main>
  );
}
