import { useState } from "react";
import {
  BarChart3,
  Trophy,
  CalendarDays,
  TrendingUp,
  Crown,
  Flame,
  Activity,
  Target,
  Zap,
} from "lucide-react";

const tabs = ["Rankings", "Points Table", "Schedule"];

const teamRankings = [
  { rank: 1, team: "India", rating: 121, change: "up", power: 92 },
  { rank: 2, team: "Australia", rating: 116, change: "same", power: 86 },
  { rank: 3, team: "England", rating: 112, change: "down", power: 79 },
  { rank: 4, team: "South Africa", rating: 108, change: "up", power: 74 },
];

const pointsTable = [
  { team: "India", m: 8, w: 6, l: 1, nr: 1, pts: 13, nrr: "+1.245" },
  { team: "Australia", m: 8, w: 5, l: 2, nr: 1, pts: 11, nrr: "+0.876" },
  { team: "England", m: 8, w: 4, l: 3, nr: 1, pts: 9, nrr: "+0.342" },
  { team: "South Africa", m: 8, w: 3, l: 4, nr: 1, pts: 7, nrr: "-0.123" },
];

const schedules = [
  "Apr 18 • India vs NZ • Test",
  "Apr 20 • Aus vs Eng • ODI",
  "Apr 25 • SA vs Pak • T20I",
];

export default function StatsPage() {
  const [tab, setTab] = useState("Rankings");

  return (
    <div className="min-h-screen pb-28 bg-[#050713] text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,#22d3ee66,transparent_28%),radial-gradient(circle_at_85%_20%,#a855f766,transparent_30%),radial-gradient(circle_at_50%_90%,#ec489955,transparent_35%)] animate-pulse" />
      <div className="absolute top-20 left-6 w-32 h-32 bg-cyan-400/25 blur-3xl rounded-full animate-bounce" />
      <div className="absolute top-64 right-4 w-28 h-28 bg-purple-500/25 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-36 h-36 bg-pink-500/20 blur-3xl rounded-full animate-bounce" />

      <div className="relative z-10 px-5 pt-8">
        {/* Header */}
        <div className="animate-[fadeIn_0.7s_ease]">
          <p className="text-xs text-cyan-300 font-semibold tracking-widest">
            CUCUBER ANALYTICS HUB
          </p>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Stats Center
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Rankings, points table, team momentum and match schedule.
          </p>
        </div>

        {/* Hero Analytics Card */}
        <div className="mt-6 rounded-[34px] bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-2xl animate-[slideUp_0.7s_ease]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">India Momentum</h2>
              <p className="text-sm text-gray-300 mt-1">
                Current cricket power index
              </p>
            </div>

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center animate-float">
              <BarChart3 size={32} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Power Score</span>
              <span className="font-bold text-cyan-300">92%</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-[growWidth_1.2s_ease]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-2xl bg-cyan-400/10 border border-cyan-300/20 p-3 text-center">
              <Trophy className="mx-auto text-yellow-300 mb-1" size={20} />
              <p className="font-bold">#1</p>
              <p className="text-[11px] text-gray-400">Rank</p>
            </div>

            <div className="rounded-2xl bg-purple-400/10 border border-purple-300/20 p-3 text-center">
              <Activity className="mx-auto text-purple-300 mb-1" size={20} />
              <p className="font-bold">121</p>
              <p className="text-[11px] text-gray-400">Rating</p>
            </div>

            <div className="rounded-2xl bg-pink-400/10 border border-pink-300/20 p-3 text-center">
              <Flame className="mx-auto text-orange-300 mb-1" size={20} />
              <p className="font-bold">Hot</p>
              <p className="text-[11px] text-gray-400">Form</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-6 mb-5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition hover:scale-105 active:scale-95 ${
                tab === t
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/10 border border-white/15 text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Rankings */}
        {tab === "Rankings" && (
          <div className="space-y-4 animate-[slideUp_0.5s_ease]">
            {teamRankings.map((t) => (
              <div
                key={t.rank}
                className="rounded-[28px] bg-white/10 border border-white/15 backdrop-blur-xl p-4 shadow-xl hover:scale-[1.02] transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold ${
                      t.rank === 1
                        ? "bg-gradient-to-br from-yellow-300 to-orange-500"
                        : "bg-gradient-to-br from-cyan-400 to-purple-500"
                    }`}
                  >
                    {t.rank === 1 ? <Crown size={24} /> : t.rank}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{t.team}</p>
                    <p className="text-xs text-gray-400">Rating {t.rating}</p>

                    <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-500"
                        style={{ width: `${t.power}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`text-lg font-bold ${
                      t.change === "up"
                        ? "text-green-400"
                        : t.change === "down"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {t.change === "up" ? "▲" : t.change === "down" ? "▼" : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Points Table */}
        {tab === "Points Table" && (
          <div className="rounded-[28px] bg-white/10 border border-white/15 backdrop-blur-xl overflow-hidden animate-[slideUp_0.5s_ease]">
            <div className="grid grid-cols-8 px-4 py-3 text-[10px] font-bold uppercase text-gray-400 border-b border-white/10">
              <span className="col-span-2">Team</span>
              <span>M</span>
              <span>W</span>
              <span>L</span>
              <span>NR</span>
              <span>Pts</span>
              <span>NRR</span>
            </div>

            {pointsTable.map((t, i) => (
              <div
                key={t.team}
                className={`grid grid-cols-8 px-4 py-4 text-xs ${
                  i % 2 === 0 ? "bg-white/5" : ""
                }`}
              >
                <span className="col-span-2 font-bold">{t.team}</span>
                <span>{t.m}</span>
                <span className="text-green-400 font-bold">{t.w}</span>
                <span className="text-red-400 font-bold">{t.l}</span>
                <span>{t.nr}</span>
                <span className="font-bold">{t.pts}</span>
                <span
                  className={
                    t.nrr.startsWith("+")
                      ? "text-green-400 font-bold"
                      : "text-red-400 font-bold"
                  }
                >
                  {t.nrr}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Schedule */}
        {tab === "Schedule" && (
          <div className="space-y-4 animate-[slideUp_0.5s_ease]">
            {schedules.map((s, i) => (
              <div
                key={i}
                className="rounded-[28px] bg-white/10 border border-white/15 backdrop-blur-xl p-4 shadow-xl hover:scale-[1.02] transition flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <CalendarDays size={22} />
                </div>
                <p className="text-sm font-semibold">{s}</p>
              </div>
            ))}
          </div>
        )}

        {/* Insight Card */}
        <div className="mt-6 rounded-[28px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/15 backdrop-blur-xl p-5 animate-[slideUp_0.8s_ease]">
          <div className="flex items-center gap-3">
            <Target className="text-cyan-300" />
            <div>
              <h3 className="font-bold">Cucuber Smart Insight</h3>
              <p className="text-xs text-gray-300 mt-1">
                India is currently showing strong form with high rating, positive
                momentum and balanced performance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white/10 border border-white/15 p-4 flex items-center gap-3">
          <Zap className="text-pink-300 animate-pulse" />
          <p className="text-sm text-gray-300">
            Live API stats can be connected later for real rankings and IPL tables.
          </p>
        </div>
      </div>
    </div>
  );
}