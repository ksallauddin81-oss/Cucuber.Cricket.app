export default function AdCard() {
  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-5 shadow-lg">
      <p className="text-xs font-bold text-emerald-400 mb-2">Sponsored</p>

      <div className="rounded-2xl bg-white/10 dark:bg-black/30 p-5 text-center">
        <h3 className="text-lg font-black text-black dark:text-white">
          Cucuber Partner Ad
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          Ads will appear here after AdMob integration.
        </p>
      </div>
    </div>
  );
}