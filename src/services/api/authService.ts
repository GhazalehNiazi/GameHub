import { apiClient, mockApiResponse, USE_MOCK_API } from "./axiosClient";
import type {
  ApiResponse,
  AuthUser,
  SendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
  RegisterPayload,
} from "./types";
import { INITIAL_MOCK_USER } from "./mockData";

export const authService = {
  /** Send OTP code to user's phone number */
  async sendOtp(payload: SendOtpPayload): Promise<ApiResponse<{ message: string }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<{ message: string }>>("/auth/send-otp", payload);
      return res.data;
    }

    return mockApiResponse({
      message: `OTP code sent successfully to ${payload.prefix || ""}${payload.phone}`,
    });
  },

  /** Verify OTP code */
  async verifyOtp(payload: VerifyOtpPayload): Promise<ApiResponse<VerifyOtpResponse>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<VerifyOtpResponse>>("/auth/verify-otp", payload);
      return res.data;
    }

    const isExistingUser = payload.phone === "000" || payload.phone.slice(-3) === "000";
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem("auth_token", token);

    return mockApiResponse({
      token,
      isExistingUser,
      user: isExistingUser ? INITIAL_MOCK_USER : undefined,
    });
  },

  /** Register user profile */
  async register(payload: RegisterPayload): Promise<ApiResponse<{ token: string; user: AuthUser }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<{ token: string; user: AuthUser }>>("/auth/register", payload);
      return res.data;
    }

    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: payload.name,
      username: payload.username,
      avatar: payload.avatar || "🐵",
      game: payload.game || "FIFA 24",
      phone: "+1234567890",
      createdAt: new Date().toISOString(),
    };

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem("auth_token", token);
    localStorage.setItem("current_user", JSON.stringify(newUser));

    return mockApiResponse({ token, user: newUser });
  },

  /** Get current authenticated user profile */
  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<AuthUser>>("/auth/me");
      return res.data;
    }

    const saved = localStorage.getItem("current_user");
    const user: AuthUser = saved ? JSON.parse(saved) : INITIAL_MOCK_USER;
    return mockApiResponse(user);
  },

  /** Logout current user */
  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<{ success: boolean }>>("/auth/logout");
      return res.data;
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user");
    return mockApiResponse({ success: true });
  },
};
