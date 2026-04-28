export default function LiveMatchCard({
  team1,
  team1Score,
  team2,
  team2Score,
  status,
  matchType,
}) {
  return (
    <div className="min-w-[320px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white shadow-2xl">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-[1px]">
        <div className="bg-zinc-900 rounded-t-3xl px-4 py-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
            {matchType}
          </span>

          <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Team 1</p>
            <h3 className="text-lg font-bold text-white">{team1}</h3>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-400">
              {team1Score}
            </p>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Team 2</p>
            <h3 className="text-lg font-bold text-white">{team2}</h3>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-cyan-400">
              {team2Score}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
          <p className="text-xs text-zinc-300 leading-relaxed">{status}</p>
        </div>
      </div>
    </div>
  );
}