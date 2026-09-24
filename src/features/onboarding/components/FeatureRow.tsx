import type { FeatureRowProps } from "../types";

export function FeatureRow({ icon, title, description }: FeatureRowProps) {
  return (
    <div className='flex items-start gap-4 py-3'>
      <div className='text-content-secondary flex-shrink-0 mt-0.5'>{icon}</div>
      <div className='flex-1 space-y-0.5'>
        <h3 className='font-semibold text-sm text-content tracking-tight'>
          {title}
        </h3>
        <p className='text-xs text-content-muted leading-normal'>{description}</p>
      </div>
    </div>
  );
}
