import { useState, useEffect } from "react";
import { useInstallPrompt } from "@/shared/hooks/useInstallPrompt";
import type { InstallBannerProps } from "@/shared/types";

const DISMISS_KEY = "gamehub_pwa_install_dismissed_time";
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours cooldown for manual close

export function InstallBanner({ onDismiss }: InstallBannerProps) {
  const { canInstall, triggerInstall } = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect standalone mode (running as installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsVisible(false);
      return;
    }

    // Check if user manually dismissed banner within cooldown period
    const dismissedTime = localStorage.getItem(DISMISS_KEY);
    if (dismissedTime) {
      const elapsed = Date.now() - parseInt(dismissedTime, 10);
      if (elapsed < DISMISS_COOLDOWN_MS) {
        setIsVisible(false);
        return;
      } else {
        // Cooldown expired, clear stored timestamp
        localStorage.removeItem(DISMISS_KEY);
      }
    }

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isAppleDevice);

    setIsVisible(true);
  }, [canInstall]);

  // Completely hide banner if user is in standalone mode or dismissed within cooldown,
  // OR if browser hasn't fired beforeinstallprompt yet (except on iOS where prompt event never fires)
  if (!isVisible || (!canInstall && !isIOS)) return null;

  const handleManualDismiss = () => {
    setIsVisible(false);
    // Set 24h dismissal cooldown only when user explicitly taps '✕'
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    if (onDismiss) onDismiss();
  };

  const handleInstallClick = async () => {
    // Clear any dismissal key so if user uninstalls later, banner can appear again
    localStorage.removeItem(DISMISS_KEY);
    await triggerInstall();
  };

  return (
    <div className='mx-4 my-3 p-4 bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 text-white rounded-2xl shadow-2xl border border-indigo-500/20 backdrop-blur-md transition-all duration-300 animate-fade-in'>
      <div className='flex items-center gap-3'>
        {/* App Icon Badge */}
        <div className='w-12 h-12 rounded-xl bg-indigo-600 p-0.5 shadow-md shrink-0 overflow-hidden'>
          <img
            src='/pwa-192x192.png'
            alt='GameHub App Icon'
            className='w-full h-full object-cover rounded-[10px]'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <h4 className='font-bold text-sm tracking-tight text-white flex items-center gap-1.5'>
            Install GameHub
            <span className='text-[10px] font-medium px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30'>
              App
            </span>
          </h4>

          {isIOS ? (
            <p className='text-xs text-zinc-300 mt-0.5 leading-tight'>
              Tap <span className='font-semibold text-white'>Share ⎋</span> then{" "}
              <span className='font-semibold text-white'>"Add to Home Screen"</span>
            </p>
          ) : (
            <p className='text-xs text-zinc-300 mt-0.5 leading-tight truncate'>
              Fast loading, offline access & full screen.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 shrink-0'>
          {canInstall && !isIOS && (
            <button
              onClick={handleInstallClick}
              className='px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer'
            >
              Install
            </button>
          )}
          <button
            onClick={handleManualDismiss}
            className='p-1.5 text-zinc-400 hover:text-white rounded-lg active:scale-90 transition-transform'
            aria-label='Close install banner'
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
