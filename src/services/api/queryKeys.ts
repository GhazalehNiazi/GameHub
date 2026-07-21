/**
 /**
 * Centralized Query Key Factory for TanStack React Query.
 * Ensures consistent key management across all custom hooks & components.
 */
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    currentUser: () => ["auth", "user"] as const,
  },
  leagues: {
    all: ["leagues"] as const,
    list: () => ["leagues", "list"] as const,
    detail: (id: string) => ["leagues", "detail", id] as const,
    analysis: (id: string) => ["leagues", "analysis", id] as const,
  },
  users: {
    all: ["users"] as const,
    friends: () => ["users", "friends"] as const,
    search: (query: string) => ["users", "search", query] as const,
  },
  play: {
    all: ["play"] as const,
    modes: () => ["play", "modes"] as const,
  },
} as const;
