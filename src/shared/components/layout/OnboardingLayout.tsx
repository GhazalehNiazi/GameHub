import React from "react";
import type { OnboardingLayoutProps } from "@/shared/types";

export function OnboardingLayout({
  children,
  footerButton,
}: OnboardingLayoutProps) {
  return (
    <div className='flex flex-col h-full min-h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]'>
      {/* Scrollable body content */}
      <div className='flex-1 overflow-y-auto pb-6'>{children}</div>

      {/* Sticky Bottom Footer Zone */}
      <div className='sticky bottom-0 bg-white pt-4 pb-2 border-t border-zinc-100'>
        {footerButton}
      </div>
    </div>
  );
}
