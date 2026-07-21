import { useQuery, useMutation } from "@tanstack/react-query";
import { playService } from "../api/playService";
import { queryKeys } from "../api/queryKeys";
import type { PlayModeOption } from "../api/types";

/** Fetch available play mode options */
export function usePlayModes() {
  return useQuery<PlayModeOption[]>({
    queryKey: queryKeys.play.modes(),
    queryFn: async () => {
      const res = await playService.getPlayModes();
      return res.data;
    },
  });
}

/** Start match mutation */
export function useStartMatch() {
  return useMutation({
    mutationFn: ({ mode, config }: { mode: "1v1" | "league" | "tournament"; config?: Record<string, unknown> }) =>
      playService.startMatch(mode, config),
  });
}
