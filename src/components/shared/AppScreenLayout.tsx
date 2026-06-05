import React from "react";
import { BottomNavBar } from "./BottomNavBar";

interface AppScreenLayoutProps {
  children: React.ReactNode;
  /** Main operational task execution actions (buttons) loaded above navigation bars */
  stickyFooter?: React.ReactNode;
  /** Toggle visibility of standard core shell tab systems */
  showNavigation?: boolean;
}

export function AppScreenLayout({
  children,
  stickyFooter,
  showNavigation = false,
}: AppScreenLayoutProps) {
  return (
    <div className='flex flex-col flex-1 h-full w-full overflow-hidden'>
      {/* 1. Internal Independent Scroll Engine Area */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden px-6 pt-4 pb-4'>
        {children}
      </div>

      {/* 2. Rigid Pinned System Bottom Zone */}
      {(stickyFooter || showNavigation) && (
        <div className='flex-shrink-0 px-6 pb-4 pt-2 bg-white space-y-4'>
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
