import type { Attendee } from "@/shared/types";

export type LeagueTab = "fixtures" | "table" | "analysis" | "settings";

export interface MatchData {
  id: string;
  matchday: number;
  homePlayer: string;
  homeAvatar: string;
  awayPlayer: string;
  awayAvatar: string;
  homeScore: number | null;
  awayScore: number | null;
}

export interface FixtureMatchCardProps {
  match: MatchData;
  onEnterResults: (match: MatchData) => void;
}

export interface ScoreEntryModalProps {
  match: MatchData | null;
  onClose: () => void;
  onSave: (matchId: string, homeScore: number, awayScore: number) => void;
}

export interface TabSegmentControlProps {
  activeTab: LeagueTab;
  onTabChange: (tab: LeagueTab) => void;
}

export interface LeagueOverviewPodiumPlayer {
  username: string;
  avatar: string;
  placement: number;
}

export interface LeagueOverviewHighlights {
  topScorer: string;
  topScorerStats: string;
  bestDefence: string;
  bestDefenceStats: string;
  mostGoalsMatch: string;
}

export interface LeagueOverviewData {
  winnerName: string;
  winnerAvatar: string;
  leagueName: string;
  podium: LeagueOverviewPodiumPlayer[];
  tieBreakerText: string;
  highlights: LeagueOverviewHighlights;
  insights: string[];
}

export interface LeagueOverviewHeaderProps {
  overview: LeagueOverviewData;
}

export interface FixturesTabProps {
  matches: MatchData[];
  onSelectMatch: (match: MatchData) => void;
  overviewData?: LeagueOverviewData;
}

export interface TitleRacePlayer {
  username: string;
  avatar: string;
  probability: string;
  path: string;
  historicalEdge?: string;
  role?: string;
  mathematicallyEliminated?: string;
}

export interface AnalysisData {
  hasData: boolean;
  lastFeaturedMatch?: {
    homePlayer: string;
    homeAvatar: string;
    homeScore: number;
    awayPlayer: string;
    awayAvatar: string;
    awayScore: number;
  };
  keyUpdates?: string[];
  titleRace?: TitleRacePlayer[];
}

export interface AnalysisTabProps {
  data: AnalysisData;
}

export interface SettingsTabProps {
  attendees: Attendee[];
  onTerminateLeague: () => void;
}
