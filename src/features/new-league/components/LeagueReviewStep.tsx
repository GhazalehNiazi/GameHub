import React from "react";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { ReviewBasicsCard } from "./review/ReviewBasicsCard";
import { ReviewAttendeesCard } from "./review/ReviewAttendeesCard";
import { ReviewRulesCard } from "./review/ReviewRulesCard";

export function LeagueReviewStep() {
  const {
    leagueName,
    fifaVersion,
    attendees,
    gameFormat,
    priorityMethod,
    setStep,
  } = useNewLeagueStore();

  return (
    <div className='space-y-6 animate-fade-in text-left pb-4'>
      {/* 1. Basics Summary Data Segment */}
      <ReviewBasicsCard
        leagueName={leagueName}
        fifaVersion={fifaVersion}
        onEdit={() => setStep(1)}
      />

      {/* 2. Attendees Friends Verification List Segment */}
      <ReviewAttendeesCard attendees={attendees} onEdit={() => setStep(2)} />

      {/* 3. Competitive Game Settings Rules Segment */}
      <ReviewRulesCard
        gameFormat={gameFormat}
        priorityMethod={priorityMethod}
        onEdit={() => setStep(3)}
      />
    </div>
  );
}
