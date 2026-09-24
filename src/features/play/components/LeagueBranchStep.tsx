import { useNavigate } from "react-router";
import { SelectableCard } from "@/shared/components/ui/SelectableCard";

export function LeagueBranchStep() {
  const navigate = useNavigate();

  return (
    <div className='space-y-6 animate-fade-in text-left'>
      <div className='space-y-4'>
        <p className='text-xs text-content-muted font-medium'>
          Select how you want to create a new leagues.
        </p>

        <SelectableCard
          icon='📉'
          title='Start a new league'
          description='If you want to start a completely new league and provide the results a you go on.'
          onClick={() => navigate("/play/new-league")}
        />

        {/* Disabled for now matching the grayed-out spec from our image asset */}
        <SelectableCard
          icon='🔄'
          title='Repeat the least played league'
          description='You can repeat the last league with the same teams and rules.'
          onClick={() => {}}
          disabled
        />
      </div>

      {/* Ongoing Leagues Subsection Section */}
      <div className='space-y-3 pt-2'>
        <h4 className='text-xs font-bold text-content tracking-tight'>
          Ongoing Leagues
        </h4>

        <div className='flex items-start gap-3 p-4 bg-surface-subtle border border-edge-subtle rounded-2xl'>
          <span className='text-content-muted text-sm mt-0.5'>ℹ️</span>
          <p className='text-xs text-content-muted leading-normal font-medium'>
            List of your ongoing leagues will be shown here, currently there is
            no open league
          </p>
        </div>
      </div>
    </div>
  );
}
