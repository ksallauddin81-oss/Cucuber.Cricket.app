import { useEffect, useState } from "react";

const ads = [
  {
    tag: "Sponsored",
    brand: "FreshGold Atta",
    title: "Soft Rotis. Happy Family.",
    text: "Premium wheat flour for everyday healthy meals.",
    emoji: "🌾",
    cta: "Shop Now",
  },
  {
    tag: "Sponsored",
    brand: "ShieldPlus Soap",
    title: "Protection That Stays",
    text: "Freshness and hygiene for your daily routine.",
    emoji: "🧼",
    cta: "Learn More",
  },
  {
    tag: "Sponsored",
    brand: "PowerSip Energy",
    title: "Fuel Your Match Day",
    text: "Stay refreshed while cheering for your team.",
    emoji: "🥤",
    cta: "Try Today",
  },
  {
    tag: "Sponsored",
    brand: "SafePay UPI",
    title: "Fast. Simple. Secure.",
    text: "Pay bills, recharge and transfer money instantly.",
    emoji: "💳",
    cta: "Open App",
  },
];

export default function AdCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const ad = ads[index];

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 p-5 shadow-lg overflow-hidden">
      <p className="mb-3 text-xs font-bold tracking-wide text-emerald-400">
        {ad.tag}
      </p>

      <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-950 p-5 flex flex-col justify-between">

        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl animate-pulse" />
        <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl animate-pulse" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-emerald-300">
              {ad.brand}
            </div>

            <h3 className="mt-5 text-2xl font-black leading-tight text-white">
              {ad.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {ad.text}
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-5xl shadow-xl animate-bounce">
            {ad.emoji}
          </div>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg">⭐</p>
            <p className="mt-1 text-[11px] text-zinc-300">Trusted</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg">🚚</p>
            <p className="mt-1 text-[11px] text-zinc-300">Fast Delivery</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg">🔥</p>
            <p className="mt-1 text-[11px] text-zinc-300">Trending</p>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Advertisement placeholder
          </p>

          <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-400">
            {ad.cta}
          </button>
        </div>
      </div>
    </div>
  );
}