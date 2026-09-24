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

    // Save phone to temporary mock storage for subsequent registration
    localStorage.setItem("pending_auth_phone", payload.phone);
    console.info(
      `%c[Mock API] OTP Code dispatched for ${payload.prefix || ""}${payload.phone}. Use code: 12345 (or any 5 digits; use 00000 to test failure)`,
      "color: var(--color-success); font-weight: bold;"
    );

    return mockApiResponse({
      message: `OTP code sent successfully to ${payload.prefix || ""}${payload.phone}`,
    });
  },

  /** Verify OTP code */
  async verifyOtp(payload: VerifyOtpPayload): Promise<ApiResponse<VerifyOtpResponse>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<VerifyOtpResponse>>("/auth/verify-otp", payload);
      if (res.data?.data?.token) {
        localStorage.setItem("auth_token", res.data.data.token);
        if (res.data.data.user) {
          localStorage.setItem("current_user", JSON.stringify(res.data.data.user));
        }
      }
      return res.data;
    }

    // Allow testing wrong OTP with 00000
    if (payload.otp === "00000") {
      return mockApiResponse(
        null as unknown as VerifyOtpResponse,
        400,
        true,
        "Invalid verification code. Please check your SMS and try again."
      );
    }

    const isExistingUser = payload.phone === "000" || payload.phone.slice(-3) === "000";
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem("auth_token", token);

    const user = isExistingUser ? INITIAL_MOCK_USER : undefined;
    if (user) {
      localStorage.setItem("current_user", JSON.stringify(user));
    }

    return mockApiResponse({
      token,
      isExistingUser,
      user,
    });
  },

  /** Register user profile */
  async register(payload: RegisterPayload): Promise<ApiResponse<{ token: string; user: AuthUser }>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.post<ApiResponse<{ token: string; user: AuthUser }>>("/auth/register", payload);
      if (res.data?.data?.token) {
        localStorage.setItem("auth_token", res.data.data.token);
        if (res.data.data.user) {
          localStorage.setItem("current_user", JSON.stringify(res.data.data.user));
        }
      }
      localStorage.removeItem("pending_auth_phone");
      return res.data;
    }

    const savedPhone = localStorage.getItem("pending_auth_phone") || "+1234567890";
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: payload.name,
      username: payload.username,
      avatar: payload.avatar || "🐵",
      game: payload.game || "FIFA 24",
      phone: savedPhone,
      createdAt: new Date().toISOString(),
    };

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem("auth_token", token);
    localStorage.setItem("current_user", JSON.stringify(newUser));
    localStorage.removeItem("pending_auth_phone");

    return mockApiResponse({ token, user: newUser });
  },

  /** Get current authenticated user profile */
  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    if (!USE_MOCK_API) {
      const res = await apiClient.get<ApiResponse<AuthUser>>("/auth/me");
      if (res.data?.data) {
        localStorage.setItem("current_user", JSON.stringify(res.data.data));
      }
      return res.data;
    }

    const saved = localStorage.getItem("current_user");
    const user: AuthUser = saved ? JSON.parse(saved) : INITIAL_MOCK_USER;
    return mockApiResponse(user);
  },

  /** Logout current user */
  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    if (!USE_MOCK_API) {
      try {
        const res = await apiClient.post<ApiResponse<{ success: boolean }>>("/auth/logout");
        return res.data;
      } finally {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("current_user");
        localStorage.removeItem("pending_auth_phone");
      }
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("pending_auth_phone");
    return mockApiResponse({ success: true });
  },
};
