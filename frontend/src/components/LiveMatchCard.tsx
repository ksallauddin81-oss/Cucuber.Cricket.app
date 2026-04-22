import { ChevronRight } from "lucide-react";

interface LiveMatchProps {
  team1: string;
  team1Score: string;
  team2: string;
  team2Score: string;
  status: string;
  matchType: string;
  progress: number;
}

const LiveMatchCard = ({
  team1,
  team1Score,
  team2,
  team2Score,
  status,
  matchType,
  progress,
}: LiveMatchProps) => (
  <div className="rounded-[26px] p-5 text-white transition-all duration-300 hover:scale-[1.01]">
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
        {matchType}
      </span>

      <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-2.5 py-1">
        <div className="h-2 w-2 rounded-full bg-red-300 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-100">
          Live
        </span>
      </div>
    </div>

    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
            {team1.slice(0, 3).toUpperCase()}
          </div>
          <p className="text-base font-bold text-white">{team1}</p>
        </div>

        <span className="text-base font-extrabold text-white">{team1Score}</span>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
            {team2.slice(0, 3).toUpperCase()}
          </div>
          <p className="text-base font-bold text-white">{team2}</p>
        </div>

        <span className="text-base font-extrabold text-white">
          {team2Score || "—"}
        </span>
      </div>
    </div>

    <div className="mt-4 space-y-3">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-white">{status}</p>

        <button className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-1.5 text-[11px] font-bold text-white">
          View
        </button>
      </div>
    </div>
  </div>
);

export default LiveMatchCard;