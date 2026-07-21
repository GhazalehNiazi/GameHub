import { apiClient, mockApiResponse, USE_MOCK_API } from "./axiosClient";
import type { ApiResponse } from "./types";
import type { Attendee } from "@/shared/types";
import { getStoredFriends, saveStoredFriends } from "./mockData";

export const userService = {
  /** Get friends / attendees list for user */
  async getFriends(): Promise<ApiResponse<Attendee[]>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<Attendee[]>>("/users/friends");
      return res.data;
    }

    const friends = getStoredFriends();
    return mockApiResponse(friends);
  },

  /** Search platform users by username or name */
  async searchUsers(query: string): Promise<ApiResponse<Attendee[]>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<Attendee[]>>(`/users/search?q=${encodeURIComponent(query)}`);
      return res.data;
    }

    const friends = getStoredFriends();
    const filtered = friends.filter((f) =>
      (f.resolvedName || "").toLowerCase().includes(query.toLowerCase())
    );
    return mockApiResponse(filtered);
  },

  /** Add a new friend by username/name */
  async addFriend(resolvedName: string, avatar: string = "⚽"): Promise<ApiResponse<Attendee>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<Attendee>>("/users/friends", { resolvedName, avatar });
      return res.data;
    }

    const friends = getStoredFriends();
    const newFriend: Attendee = {
      id: `att-${Date.now()}`,
      resolvedName,
      avatar,
    };

    friends.push(newFriend);
    saveStoredFriends(friends);

    return mockApiResponse(newFriend);
  },
};
