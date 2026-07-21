import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { queryKeys } from "../api/queryKeys";
import type { Attendee } from "@/shared/types";

/** Fetch friends list */
export function useFriends() {
  return useQuery<Attendee[]>({
    queryKey: queryKeys.users.friends(),
    queryFn: async () => {
      const res = await userService.getFriends();
      return res.data;
    },
  });
}

/** Search users by query */
export function useSearchUsers(query: string) {
  return useQuery<Attendee[]>({
    queryKey: queryKeys.users.search(query),
    queryFn: async () => {
      const res = await userService.searchUsers(query);
      return res.data;
    },
    enabled: query.trim().length > 0,
  });
}

/** Add a friend mutation */
export function useAddFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resolvedName, avatar }: { resolvedName: string; avatar?: string }) =>
      userService.addFriend(resolvedName, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.friends() });
    },
  });
}
