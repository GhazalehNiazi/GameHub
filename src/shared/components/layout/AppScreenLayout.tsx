import { BottomNavBar } from "./BottomNavBar";
import { OfflineBanner } from "@/shared/components/pwa/OfflineBanner";
import { InstallBanner } from "@/shared/components/pwa/InstallBanner";
import { cn } from "@/shared/utils/cn";
import type { AppScreenLayoutProps } from "@/shared/types";

export function AppScreenLayout({
  children,
  stickyFooter,
  showNavigation = false,
  className = "",
}: AppScreenLayoutProps) {
  return (
    // The className prop is placed at the end so your custom overrides take priority
    <div className='flex flex-col flex-1 h-full w-full overflow-hidden relative'>
      {/* PWA Offline Banner */}
      <OfflineBanner />

      {/* 1. Internal Independent Scroll Engine Area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden px-6 pt-4 pb-4",
          className,
        )}
      >
        {children}
      </div>

      {/* PWA Install Banner */}
      <InstallBanner />

      {/* 2. Rigid Pinned System Bottom Zone */}
      {(stickyFooter || showNavigation) && (
        <div className='flex-shrink-0 px-6 pb-4 pt-2 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 space-y-4'>
          {/* Top operational row for custom task buttons */}
          {stickyFooter && <div>{stickyFooter}</div>}

          {/* Global platform routing layer component */}
          {showNavigation && (
            <div className='pb-1 animate-slide-up'>
              <BottomNavBar />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
