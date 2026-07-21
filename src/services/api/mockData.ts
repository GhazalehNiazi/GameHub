import type { AuthUser, LeagueItem } from "./types";
import type { Attendee } from "@/shared/types";

const MOCK_STORAGE_KEY_LEAGUES = "mock_api_leagues";
const MOCK_STORAGE_KEY_USERS = "mock_api_users";
const MOCK_STORAGE_KEY_FRIENDS = "mock_api_friends";

export const INITIAL_MOCK_USER: AuthUser = {
  id: "usr-1",
  name: "Mamrez",
  username: "Mamrez420",
  phone: "+1234567890",
  avatar: "🐵",
  game: "FIFA 24",
  createdAt: new Date().toISOString(),
};

export const INITIAL_MOCK_ATTENDEES: Attendee[] = [
  { id: "1", resolvedName: "Mamrez420", avatar: "🐵" },
  { id: "2", resolvedName: "Matrixforlife", avatar: "🐐" },
  { id: "3", resolvedName: "Ilialeftie", avatar: "🦥" },
  { id: "4", resolvedName: "CaptainRonaldo", avatar: "⚡" },
];

export const INITIAL_MOCK_LEAGUES: LeagueItem[] = [
  {
    id: "calciopoli-2026",
    name: "Calciopoli 2026",
    fifaVersion: "FC 24",
    status: "active",
    createdAt: new Date().toISOString(),
    attendees: INITIAL_MOCK_ATTENDEES,
    fixtures: [
      {
        id: "m-1",
        matchday: 1,
        homePlayer: "Mamrez420",
        homeAvatar: "🐵",
        awayPlayer: "Matrixforlife",
        awayAvatar: "🐐",
        homeScore: 2,
        awayScore: 1,
      },
      {
        id: "m-2",
        matchday: 1,
        homePlayer: "Ilialeftie",
        homeAvatar: "🦥",
        awayPlayer: "CaptainRonaldo",
        awayAvatar: "⚡",
        homeScore: null,
        awayScore: null,
      },
      {
        id: "m-3",
        matchday: 2,
        homePlayer: "Matrixforlife",
        homeAvatar: "🐐",
        awayPlayer: "Ilialeftie",
        awayAvatar: "🦥",
        homeScore: null,
        awayScore: null,
      },
    ],
    overviewData: {
      winnerName: "Mamrez420",
      winnerAvatar: "🐵",
      leagueName: "Calciopoli 2026",
      podium: [
        { username: "Mamrez420", avatar: "🐵", placement: 1 },
        { username: "Matrixforlife", avatar: "🐐", placement: 2 },
        { username: "Ilialeftie", avatar: "🦥", placement: 3 },
      ],
      tieBreakerText: "Goal Difference",
      highlights: {
        topScorer: "Mamrez420",
        topScorerStats: "8 Goals",
        bestDefence: "Matrixforlife",
        bestDefenceStats: "2 Goals Conceded",
        mostGoalsMatch: "Mamrez vs Ilialeftie (5-4)",
      },
      insights: [
        "Mamrez420 is currently leading with 100% win rate.",
        "Matrixforlife holds the best defensive record.",
      ],
    },
    analysisData: {
      hasData: true,
      lastFeaturedMatch: {
        homePlayer: "Mamrez420",
        homeAvatar: "🐵",
        homeScore: 2,
        awayPlayer: "Matrixforlife",
        awayAvatar: "🐐",
        awayScore: 1,
      },
      keyUpdates: [
        "Mamrez420 secured 3 points in Matchday 1.",
        "Matchday 2 upcoming fixtures scheduled.",
      ],
      titleRace: [
        {
          username: "Mamrez420",
          avatar: "🐵",
          probability: "65%",
          path: "Needs 2 wins out of 3",
          historicalEdge: "Dominant vs Matrixforlife",
        },
        {
          username: "Matrixforlife",
          avatar: "🐐",
          probability: "35%",
          path: "Must win all remaining matches",
        },
      ],
    },
  },
];

/** Persistence Loaders & Savers */
export function getStoredLeagues(): LeagueItem[] {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY_LEAGUES);
    return raw ? JSON.parse(raw) : INITIAL_MOCK_LEAGUES;
  } catch {
    return INITIAL_MOCK_LEAGUES;
  }
}

export function saveStoredLeagues(leagues: LeagueItem[]): void {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY_LEAGUES, JSON.stringify(leagues));
  } catch (err) {
    console.error("Failed to save mock leagues to localStorage", err);
  }
}

export function getStoredFriends(): Attendee[] {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY_FRIENDS);
    return raw ? JSON.parse(raw) : INITIAL_MOCK_ATTENDEES;
  } catch {
    return INITIAL_MOCK_ATTENDEES;
  }
}

export function saveStoredFriends(friends: Attendee[]): void {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY_FRIENDS, JSON.stringify(friends));
  } catch (err) {
    console.error("Failed to save mock friends to localStorage", err);
  }
}
