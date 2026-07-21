import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { queryKeys } from "../api/queryKeys";
import type {
  SendOtpPayload,
  VerifyOtpPayload,
  RegisterPayload,
  AuthUser,
} from "../api/types";

/** Fetch current authenticated user */
export function useCurrentUser() {
  return useQuery<AuthUser>({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: async () => {
      const res = await authService.getCurrentUser();
      return res.data;
    },
  });
}

/** Send OTP mutation */
export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authService.sendOtp(payload),
  });
}

/** Verify OTP mutation */
export function useVerifyOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}

/** Register new user mutation */
export function useRegisterUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}

/** Logout current user mutation */
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
