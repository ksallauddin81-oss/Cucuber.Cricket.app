import GoogleAd from "./GoogleAd";

export default function AdCard() {
  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-5 shadow-lg">
      <p className="text-xs font-bold text-emerald-400 mb-3">
        Sponsored
      </p>

      <div className="rounded-2xl bg-white/10 dark:bg-black/30 p-3 min-h-[140px]">
        <GoogleAd />
      </div>
    </div>
  );
}