import { useState, useEffect } from "react";
import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

export function OfflineBanner() {
  const isOnline = useNetworkStatus();
  const [wasOffline, setWasOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline) {
    return (
      <div className='bg-amber-500/15 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 px-4 py-2 text-xs font-medium flex items-center justify-between animate-fade-in shrink-0'>
        <div className='flex items-center gap-2'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-amber-500'></span>
          </span>
          <span>You are offline. Showing cached app data.</span>
        </div>
        <span className='text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300'>
          Offline Mode
        </span>
      </div>
    );
  }

  if (showRestored) {
    return (
      <div className='bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-900 dark:text-emerald-200 px-4 py-2 text-xs font-medium flex items-center gap-2 animate-fade-in shrink-0'>
        <span className='inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
        <span>Network connection restored. Syncing data...</span>
      </div>
    );
  }

  return null;
}
