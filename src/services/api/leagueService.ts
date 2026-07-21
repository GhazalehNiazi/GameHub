import { apiClient, mockApiResponse, USE_MOCK_API } from "./axiosClient";
import type {
  ApiResponse,
  LeagueItem,
  CreateLeaguePayload,
  UpdateScorePayload,
} from "./types";
import type { MatchData, AnalysisData } from "@/features/league/types";
import { getStoredLeagues, saveStoredLeagues } from "./mockData";

export const leagueService = {
  /** Fetch all leagues for current user */
  async getLeagues(): Promise<ApiResponse<LeagueItem[]>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<LeagueItem[]>>("/leagues");
      return res.data;
    }

    const leagues = getStoredLeagues();
    return mockApiResponse(leagues);
  },

  /** Fetch single league by ID */
  async getLeagueById(id: string): Promise<ApiResponse<LeagueItem>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<LeagueItem>>(`/leagues/${id}`);
      return res.data;
    }

    const leagues = getStoredLeagues();
    const target = leagues.find((l) => l.id === id) || leagues[0];

    if (!target) {
      throw new Error(`League with ID "${id}" not found`);
    }

    return mockApiResponse(target);
  },

  /** Create a new league with generated round-robin fixtures */
  async createLeague(payload: CreateLeaguePayload): Promise<ApiResponse<LeagueItem>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<LeagueItem>>("/leagues", payload);
      return res.data;
    }

    const generatedId = `${payload.leagueName.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-4)}`;
    
    // Generate mock round robin fixtures
    const fixtures: MatchData[] = [];
    const attendees = payload.attendees;
    let matchIdCount = 1;

    for (let i = 0; i < attendees.length; i++) {
      for (let j = i + 1; j < attendees.length; j++) {
        fixtures.push({
          id: `match-${matchIdCount++}`,
          matchday: Math.floor((matchIdCount - 1) / 2) + 1,
          homePlayer: attendees[i].resolvedName || `Player ${i + 1}`,
          homeAvatar: attendees[i].avatar || "⚽",
          awayPlayer: attendees[j].resolvedName || `Player ${j + 1}`,
          awayAvatar: attendees[j].avatar || "🎮",
          homeScore: null,
          awayScore: null,
        });

        // Add return fixture if home & away format
        if (payload.gameFormat === "homeAway") {
          fixtures.push({
            id: `match-${matchIdCount++}`,
            matchday: Math.floor((matchIdCount - 1) / 2) + 1,
            homePlayer: attendees[j].resolvedName || `Player ${j + 1}`,
            homeAvatar: attendees[j].avatar || "🎮",
            awayPlayer: attendees[i].resolvedName || `Player ${i + 1}`,
            awayAvatar: attendees[i].avatar || "⚽",
            homeScore: null,
            awayScore: null,
          });
        }
      }
    }

    const newLeague: LeagueItem = {
      id: generatedId,
      name: payload.leagueName,
      fifaVersion: payload.fifaVersion,
      status: "active",
      createdAt: new Date().toISOString(),
      attendees: payload.attendees,
      fixtures,
      overviewData: {
        winnerName: attendees[0]?.resolvedName || "TBD",
        winnerAvatar: attendees[0]?.avatar || "🏆",
        leagueName: payload.leagueName,
        podium: attendees.slice(0, 3).map((att, idx) => ({
          username: att.resolvedName || `Player ${idx + 1}`,
          avatar: att.avatar || "👤",
          placement: idx + 1,
        })),
        tieBreakerText: payload.priorityMethod === "goalDifference" ? "Goal Difference" : "Head to Head",
        highlights: {
          topScorer: "TBD",
          topScorerStats: "0 Goals",
          bestDefence: "TBD",
          bestDefenceStats: "0 Goals Conceded",
          mostGoalsMatch: "N/A",
        },
        insights: ["League initialized. Ready for Matchday 1."],
      },
      analysisData: {
        hasData: false,
      },
    };

    const leagues = getStoredLeagues();
    leagues.unshift(newLeague);
    saveStoredLeagues(leagues);

    return mockApiResponse(newLeague);
  },

  /** Update match score in a league */
  async updateMatchScore(payload: UpdateScorePayload): Promise<ApiResponse<MatchData>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.patch<ApiResponse<MatchData>>(
        `/leagues/${payload.leagueId}/matches/${payload.matchId}`,
        { homeScore: payload.homeScore, awayScore: payload.awayScore }
      );
      return res.data;
    }

    const leagues = getStoredLeagues();
    const league = leagues.find((l) => l.id === payload.leagueId) || leagues[0];

    if (!league) {
      throw new Error(`League "${payload.leagueId}" not found`);
    }

    const matchIndex = league.fixtures.findIndex((m) => m.id === payload.matchId);
    if (matchIndex === -1) {
      throw new Error(`Match "${payload.matchId}" not found`);
    }

    league.fixtures[matchIndex].homeScore = payload.homeScore;
    league.fixtures[matchIndex].awayScore = payload.awayScore;

    // Update analysis state if scores are recorded
    league.analysisData = {
      hasData: true,
      lastFeaturedMatch: {
        homePlayer: league.fixtures[matchIndex].homePlayer,
        homeAvatar: league.fixtures[matchIndex].homeAvatar,
        homeScore: payload.homeScore,
        awayPlayer: league.fixtures[matchIndex].awayPlayer,
        awayAvatar: league.fixtures[matchIndex].awayAvatar,
        awayScore: payload.awayScore,
      },
      keyUpdates: [
        `Result recorded: ${league.fixtures[matchIndex].homePlayer} ${payload.homeScore} - ${payload.awayScore} ${league.fixtures[matchIndex].awayPlayer}`,
      ],
      titleRace: league.attendees.slice(0, 2).map((a, idx) => ({
        username: a.resolvedName || `Player ${idx + 1}`,
        avatar: a.avatar || "⚽",
        probability: idx === 0 ? "60%" : "40%",
        path: "In contention for title",
      })),
    };

    saveStoredLeagues(leagues);

    return mockApiResponse(league.fixtures[matchIndex]);
  },

  /** Terminate / Delete a league */
  async terminateLeague(leagueId: string): Promise<ApiResponse<{ success: boolean }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.delete<ApiResponse<{ success: boolean }>>(`/leagues/${leagueId}`);
      return res.data;
    }

    let leagues = getStoredLeagues();
    leagues = leagues.filter((l) => l.id !== leagueId);
    saveStoredLeagues(leagues);

    return mockApiResponse({ success: true });
  },

  /** Fetch league title race analysis data */
  async getLeagueAnalysis(leagueId: string): Promise<ApiResponse<AnalysisData>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<AnalysisData>>(`/leagues/${leagueId}/analysis`);
      return res.data;
    }

    const leagues = getStoredLeagues();
    const league = leagues.find((l) => l.id === leagueId) || leagues[0];

    return mockApiResponse(league?.analysisData || { hasData: false });
  },
};
