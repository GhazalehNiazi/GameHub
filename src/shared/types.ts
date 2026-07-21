import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import type { DBSchema } from "idb";

/** Global Domain Types */
export interface Attendee {
  id: string;
  resolvedName?: string;
  avatar?: string;
}

/** Global / Shared Layout Component Props */
export interface AppScreenLayoutProps {
  children: ReactNode;
  /** Main operational task execution actions (buttons) loaded above navigation bars */
  stickyFooter?: ReactNode;
  /** Toggle visibility of standard core shell tab systems */
  showNavigation?: boolean;
  /** Custom utility classes to append or overwrite the root layout container styles */
  className?: string;
}

export interface OnboardingLayoutProps {
  children: ReactNode;
  footerButton: ReactNode;
}

/** Global / Shared PWA Component Props & Events */
export interface InstallBannerProps {
  /** Optional callback when the banner is manually dismissed */
  onDismiss?: () => void;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Global / Shared UI Component Props */
export interface GridOptionCardProps {
  icon: ReactNode;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  options: SelectOption[];
}

export interface SelectableCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

/** Global / Shared Database & Store Types */
export interface AppDB extends DBSchema {
  drafts: {
    key: string;
    value: { id: string; content: string; updatedAt: number };
  };
}

export interface AppState {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}
