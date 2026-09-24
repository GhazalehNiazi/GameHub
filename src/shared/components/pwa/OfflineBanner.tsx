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
      <div className='bg-warning-subtle border-b border-warning-border text-warning-text px-4 py-2 text-xs font-medium flex items-center justify-between animate-fade-in shrink-0'>
        <div className='flex items-center gap-2'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-warning'></span>
          </span>
          <span>You are offline. Showing cached app data.</span>
        </div>
        <span className='text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-warning-subtle text-warning-text'>
          Offline Mode
        </span>
      </div>
    );
  }

  if (showRestored) {
    return (
      <div className='bg-success-subtle border-b border-success-border text-success-text px-4 py-2 text-xs font-medium flex items-center gap-2 animate-fade-in shrink-0'>
        <span className='inline-flex rounded-full h-2 w-2 bg-success'></span>
        <span>Network connection restored. Syncing data...</span>
      </div>
    );
  }

  return null;
}
