import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leagueService } from "../api/leagueService";
import { queryKeys } from "../api/queryKeys";
import type {
  LeagueItem,
  CreateLeaguePayload,
  UpdateScorePayload,
} from "../api/types";
import type { AnalysisData } from "@/features/league/types";

/** Fetch all user leagues */
export function useLeagues() {
  return useQuery<LeagueItem[]>({
    queryKey: queryKeys.leagues.list(),
    queryFn: async () => {
      const res = await leagueService.getLeagues();
      return res.data;
    },
  });
}

/** Fetch details for a specific league */
export function useLeagueDetail(leagueId: string) {
  return useQuery<LeagueItem>({
    queryKey: queryKeys.leagues.detail(leagueId),
    queryFn: async () => {
      const res = await leagueService.getLeagueById(leagueId);
      return res.data;
    },
    enabled: Boolean(leagueId),
  });
}

/** Fetch league title race analysis data */
export function useLeagueAnalysis(leagueId: string) {
  return useQuery<AnalysisData>({
    queryKey: queryKeys.leagues.analysis(leagueId),
    queryFn: async () => {
      const res = await leagueService.getLeagueAnalysis(leagueId);
      return res.data;
    },
    enabled: Boolean(leagueId),
  });
}

/** Create a new league mutation */
export function useCreateLeague() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLeaguePayload) => leagueService.createLeague(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leagues.all });
      queryClient.setQueryData(queryKeys.leagues.detail(res.data.id), res.data);
    },
  });
}

/** Update match score mutation */
export function useUpdateMatchScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateScorePayload) => leagueService.updateMatchScore(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leagues.detail(variables.leagueId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.leagues.list() });
    },
  });
}

/** Terminate a league mutation */
export function useTerminateLeague() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (leagueId: string) => leagueService.terminateLeague(leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leagues.all });
    },
  });
}
