import { apiClient, mockApiResponse, USE_MOCK_API } from "./axiosClient";
import type { ApiResponse, PlayModeOption } from "./types";

export const playService = {
  /** Fetch available play modes */
  async getPlayModes(): Promise<ApiResponse<PlayModeOption[]>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<PlayModeOption[]>>("/play/modes");
      return res.data;
    }

    const modes: PlayModeOption[] = [
      {
        id: "1v1",
        title: "1v1 Match",
        description: "Quick single match between two players",
        icon: "⚔️",
      },
      {
        id: "league",
        title: "League",
        description: "Create or continue a multi-player round robin league",
        icon: "🏆",
        badge: "Popular",
      },
      {
        id: "tournament",
        title: "Tournament",
        description: "Knockout cup competition for group events",
        icon: "🏅",
      },
    ];

    return mockApiResponse(modes);
  },

  /** Start a quick match session */
  async startMatch(mode: "1v1" | "league" | "tournament", config?: Record<string, unknown>): Promise<ApiResponse<{ matchSessionId: string; mode: string }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<{ matchSessionId: string; mode: string }>>("/play/start", { mode, config });
      return res.data;
    }

    return mockApiResponse({
      matchSessionId: `session-${Date.now()}`,
      mode,
    });
  },
};
