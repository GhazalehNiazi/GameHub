import type { Attendee } from "@/shared/types";
import type { MatchData, LeagueOverviewData, AnalysisData } from "@/features/league/types";

/** Generic API Response Contract */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

/** Auth API Data Contracts */
export interface AuthUser {
  id: string;
  name: string;
  username: string;
  phone: string;
  avatar: string;
  game?: string;
  createdAt: string;
}

export interface SendOtpPayload {
  phone: string;
  prefix?: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
  isExistingUser: boolean;
  user?: AuthUser;
}

export interface RegisterPayload {
  name: string;
  username: string;
  avatar?: string;
  game?: string;
  password?: string;
}

/** League API Data Contracts */
export interface LeagueItem {
  id: string;
  name: string;
  fifaVersion: string;
  status: "active" | "completed" | "waiting";
  createdAt: string;
  attendees: Attendee[];
  fixtures: MatchData[];
  overviewData?: LeagueOverviewData;
  analysisData?: AnalysisData;
}

export interface CreateLeaguePayload {
  leagueName: string;
  fifaVersion: string;
  attendees: Attendee[];
  gameFormat: "single" | "homeAway";
  priorityMethod: "goalDifference" | "faceToFace";
}

export interface UpdateScorePayload {
  leagueId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
}

/** User & Friends API Data Contracts */
export interface SearchUsersQuery {
  query: string;
}

/** Play API Data Contracts */
export interface PlayModeOption {
  id: "1v1" | "league" | "tournament";
  title: string;
  description: string;
  icon: string;
  badge?: string;
}
