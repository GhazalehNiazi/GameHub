import { Avatar } from "@/shared/components/ui/Avatar";

interface TableRowData {
  position: number;
  team: string;
  avatar: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

const DEFAULT_STANDINGS: TableRowData[] = [
  {
    position: 1,
    team: "Farshad69420",
    avatar: "cat",
    played: 4,
    won: 3,
    drawn: 1,
    lost: 0,
    points: 10,
  },
  {
    position: 2,
    team: "Mohammad Reza",
    avatar: "monster",
    played: 4,
    won: 2,
    drawn: 1,
    lost: 1,
    points: 7,
  },
  {
    position: 3,
    team: "Matrixforlife",
    avatar: "dog",
    played: 4,
    won: 1,
    drawn: 1,
    lost: 2,
    points: 4,
  },
  {
    position: 4,
    team: "Ilialeftie",
    avatar: "sloth",
    played: 4,
    won: 0,
    drawn: 1,
    lost: 3,
    points: 1,
  },
];

interface TableTabProps {
  standings?: TableRowData[];
}

export function TableTab({ standings = DEFAULT_STANDINGS }: TableTabProps) {
  return (
    <div className='animate-fade-in text-left pb-4'>
      {/* Table Container Card */}
      <div className='bg-surface border border-edge rounded-2xl overflow-hidden shadow-2xs'>
        {/* Table Header Row */}
        <div className='grid grid-cols-[28px_1fr_32px_28px_28px_28px_36px] items-center px-4 py-3 text-[11px] font-bold text-content border-b border-edge-subtle'>
          <span>P</span>
          <span>Team</span>
          <span className='text-center'>PLD</span>
          <span className='text-center'>W</span>
          <span className='text-center'>D</span>
          <span className='text-center'>L</span>
          <span className='text-center font-bold'>PTS</span>
        </div>

        {/* Table Data Rows */}
        <div className='divide-y divide-edge-subtle'>
          {standings.map((row, idx) => (
            <div
              key={idx}
              className='grid grid-cols-[28px_1fr_32px_28px_28px_28px_36px] items-center px-4 py-3 text-xs text-content hover:bg-surface-subtle transition-colors'
            >
              <span className='font-medium text-content-secondary'>
                {row.position}
              </span>

              <div className='flex items-center gap-2 truncate pr-2'>
                <Avatar name={row.team} avatar={row.avatar} size='xs' />
                <span className='truncate font-medium text-xs text-content'>
                  {row.team}
                </span>
              </div>

              <span className='text-center font-normal text-content-secondary'>
                {row.played}
              </span>
              <span className='text-center font-normal text-content-secondary'>
                {row.won}
              </span>
              <span className='text-center font-normal text-content-secondary'>
                {row.drawn}
              </span>
              <span className='text-center font-normal text-content-secondary'>
                {row.lost}
              </span>
              <span className='text-center font-semibold text-content'>
                {row.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
