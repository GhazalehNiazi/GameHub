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
import { TabSegmentControl } from "@/features/league/components/TabSegmentControl";
import { BellIcon } from "@/shared/components/icons/LeagueIcons";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useCreateLeague } from "@/services/hooks";

export default function NewLeagueWizardPage() {
  const navigate = useNavigate();
  const store = useNewLeagueStore();
  const { step, setStep, resetStore } = store;
  const [createdLeagueId, setCreatedLeagueId] = useState<string | null>(null);

  const createLeagueMutation = useCreateLeague();

  // Clear data safely when the wizard component unmounts completely
  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  const handleBack = () => {
    if (step === 1) navigate("/play");
    else setStep(step - 1);
  };

  // Step 4 trigger: Calls useCreateLeague hook and moves to step 5
  const handleCreateLeagueSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    createLeagueMutation.mutate(
      {
        leagueName: store.leagueName || "Name of the league",
        fifaVersion: store.fifaVersion || "fc25",
        attendees: store.attendees,
        gameFormat: store.gameFormat,
        priorityMethod: store.priorityMethod,
      },
      {
        onSuccess: (res) => {
          setCreatedLeagueId(res.data.id);
          setStep(5);
        },
      }
    );
  };

  // Step 5 trigger: Clears store data and redirects to final league dashboard
  const handleStartLeagueFinal = () => {
    const targetId = createdLeagueId || "calciopoli-2026";
    resetStore();
    navigate(`/league/${targetId}`);
  };

  // Build the layout action footers
  const getFooterAction = () => {
    if (step === 4) {
      return (
        <button
          type='button'
          onClick={handleCreateLeagueSubmit}
          disabled={createLeagueMutation.isPending}
          className='w-full py-3.5 bg-action-primary hover:bg-action-primary-hover disabled:opacity-50 text-action-primary-fg font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center block'
        >
          {createLeagueMutation.isPending
            ? "Creating League..."
            : "Create the League"}
        </button>
      );
    }

    if (step === 5) {
      return (
        <button
          type='button'
          onClick={handleStartLeagueFinal}
          className='w-full py-3.5 bg-action-primary hover:bg-action-primary-hover text-action-primary-fg font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center block'
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
          className='flex-1 py-3.5 border border-edge text-content-secondary font-semibold text-sm rounded-xl active:scale-[0.99] transition-all cursor-pointer text-center'
        >
          Previous Step
        </button>
        <button
          type='submit'
          form={`new-league-form-${step}`}
          className='flex-[1.3] py-3.5 bg-action-primary hover:bg-action-primary-hover text-action-primary-fg font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5'
        >
          Continue <span className='text-xs'>›</span>
        </button>
      </div>
    );
  };

  const getPageTitle = () => {
    if (step === 4) {
      return store.leagueName || "Name of the league";
    }
    if (step === 5) {
      return "Waiting for members";
    }
    return "Create a new league";
  };

  return (
    <main className='page-content safe-top safe-bottom bg-surface'>
      <AppScreenLayout stickyFooter={getFooterAction()}>
        {/* Navigation Action Header matching Figma Mockup */}
        <div className='flex items-center justify-between w-full pt-1 pb-1'>
          <button
            type='button'
            onClick={handleBack}
            className='p-1 -ml-1 text-content hover:opacity-75 active:scale-90 transition-transform cursor-pointer'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <div className='flex items-center gap-2'>
            <Avatar name='monster' avatar='monster' size='sm' />
            <div className='w-7 h-7 rounded-full border border-edge flex items-center justify-center text-content-secondary hover:text-content hover:border-edge-strong transition-colors cursor-pointer'>
              <BellIcon className='w-3.5 h-3.5' />
            </div>
          </div>
        </div>

        {/* Centered League Title */}
        <h1 className='text-xl font-bold text-center text-content my-3 tracking-tight'>
          {getPageTitle()}
        </h1>

        {/* Form progress bars during steps 1-3 */}
        {step < 4 && (
          <div className='mb-4'>
            <StepProgressBar currentStep={step as 1 | 2 | 3} />
          </div>
        )}

        {/* Tab pill bar on Review Step (Android Large - 262) */}
        {step === 4 && (
          <div className='mb-5'>
            <TabSegmentControl activeTab='fixtures' onTabChange={() => {}} />
          </div>
        )}

        {/* Active Step Content */}
        <div className='mt-2'>
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
