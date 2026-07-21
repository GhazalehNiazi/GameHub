import React from "react";

interface FeatureRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureRow({ icon, title, description }: FeatureRowProps) {
  return (
    <div className='flex items-start gap-4 py-3'>
      <div className='text-zinc-700 flex-shrink-0 mt-0.5'>{icon}</div>
      <div className='flex-1 space-y-0.5'>
        <h3 className='font-semibold text-sm text-zinc-900 tracking-tight'>
          {title}
        </h3>
        <p className='text-xs text-zinc-500 leading-normal'>{description}</p>
      </div>
    </div>
  );
}
