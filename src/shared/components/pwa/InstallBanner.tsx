import { useState, useEffect } from "react";
import { useInstallPrompt } from "@/shared/hooks/useInstallPrompt";

export interface InstallBannerProps {
  /** Optional callback when the banner is manually dismissed */
  onDismiss?: () => void;
}

export function InstallBanner({ onDismiss }: InstallBannerProps) {
  const { canInstall, triggerInstall } = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(true);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect if the user is on an iOS device
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);

    // Detect if the app is already running as an installed PWA standalone window
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    setIsIOS(isAppleDevice && !isStandalone);
  }, []);

  // Completely hide the banner if dismissed, already installed, or unsupported
  if (!isVisible || (!canInstall && !isIOS)) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div className='mx-4 my-3 p-4 bg-zinc-900 text-white rounded-xl shadow-xl border border-zinc-800 transition-all duration-200 animate-fade-in'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1'>
          <h4 className='font-semibold text-sm tracking-tight text-zinc-100'>
            Install Our App
          </h4>

          {isIOS ? (
            <p className='text-xs text-zinc-400 mt-1 leading-relaxed'>
              Tap the{" "}
              <span className='font-bold text-zinc-200 text-sm'>⎋ Share</span>{" "}
              button below and select{" "}
              <span className='font-bold text-zinc-200'>
                "Add to Home Screen"
              </span>{" "}
              to enjoy full offline access.
            </p>
          ) : (
            <p className='text-xs text-zinc-400 mt-1 leading-relaxed'>
              Add this app to your home screen for rapid loading, offline
              access, and a clean full-screen experience.
            </p>
          )}
        </div>

        {/* Dismiss Close Button */}
        <button
          onClick={handleDismiss}
          className='text-zinc-500 hover:text-zinc-300 p-1 rounded-lg active:scale-90 transition-transform'
          aria-label='Close banner'
        >
          ✕
        </button>
      </div>

      {/* Render native install button only if Android/Desktop prompt is primed and available */}
      {canInstall && !isIOS && (
        <div className='mt-3 flex justify-end'>
          <button
            onClick={triggerInstall}
            className='w-full sm:w-auto px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-lg active:scale-95 transition-all shadow-sm cursor-pointer hover:bg-zinc-100 text-center'
          >
            Install Now
          </button>
        </div>
      )}
    </div>
  );
}
