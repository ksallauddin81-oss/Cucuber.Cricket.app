import { useState } from "react";
import { BarChart3, Trophy, CalendarDays, TrendingUp } from "lucide-react";

const tabs = ["Rankings", "Points Table", "Schedule"];

const teamRankings = [
  { rank: 1, team: "India", rating: 121, change: "up" },
  { rank: 2, team: "Australia", rating: 116, change: "same" },
  { rank: 3, team: "England", rating: 112, change: "down" },
  { rank: 4, team: "South Africa", rating: 108, change: "up" },
  { rank: 5, team: "New Zealand", rating: 105, change: "down" },
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

const StatsPage = () => {
  const [tab, setTab] = useState("Rankings");

  const tabBase =
    "px-3 py-2 rounded-2xl text-[11px] font-semibold transition-all duration-300";

  return (
    <div className="space-y-6 animate-float-up pb-4">
      {/* Header */}
      <div className="rounded-[30px] bg-gradient-to-r from-violet-500 via-indigo-600 to-sky-500 p-[1px] shadow-[0_18px_45px_rgba(99,102,241,0.24)]">
        <div className="rounded-[30px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                Analytics Hub
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white">
                Stats & Rankings
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Explore rankings, tournament tables and upcoming schedules in one place.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-3">
              <BarChart3 className="h-6 w-6 text-cyan-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${tabBase} ${
              tab === t
                ? t === "Rankings"
                  ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg"
                  : t === "Points Table"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "bg-white/70 text-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rankings */}
      {tab === "Rankings" && (
        <div className="space-y-4">
          <div className="rounded-[26px] bg-gradient-to-r from-violet-500 via-indigo-600 to-blue-600 p-[1px] shadow-[0_15px_35px_rgba(99,102,241,0.22)]">
            <div className="rounded-[26px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 text-white">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-200" />
                <span className="text-sm font-bold">ICC ODI Team Rankings</span>
              </div>
            </div>
          </div>

          {teamRankings.map((t) => (
            <div
              key={t.rank}
              className="rounded-[28px] bg-gradient-to-br from-violet-400 via-indigo-500 to-blue-600 p-[1px] shadow-[0_15px_35px_rgba(79,70,229,0.18)]"
            >
              <div className="rounded-[28px] bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-4 flex items-center gap-4">
                <div
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center text-sm font-extrabold ${
                    t.rank === 1
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white"
                  }`}
                >
                  {t.rank}
                </div>

                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {t.team}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    Rating: {t.rating}
                  </p>
                </div>

                <div
                  className={`text-sm font-bold ${
                    t.change === "up"
                      ? "text-emerald-500"
                      : t.change === "down"
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  {t.change === "up" ? "▲" : t.change === "down" ? "▼" : "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Points Table */}
      {tab === "Points Table" && (
        <div className="space-y-4">
          <div className="rounded-[26px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-[0_15px_35px_rgba(16,185,129,0.22)]">
            <div className="rounded-[26px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 text-white">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-100" />
                <span className="text-sm font-bold">Tournament Points Table</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-[1px] shadow-[0_15px_35px_rgba(16,185,129,0.18)]">
            <div className="rounded-[28px] bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden">
              <div className="grid grid-cols-8 gap-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 border-b border-white/10">
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
                  className={`grid grid-cols-8 gap-1 px-4 py-3 text-xs ${
                    i % 2 === 0 ? "bg-white/40 dark:bg-white/5" : ""
                  }`}
                >
                  <span className="col-span-2 font-bold text-slate-900 dark:text-white">
                    {t.team}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{t.m}</span>
                  <span className="font-semibold text-emerald-500">{t.w}</span>
                  <span className="font-semibold text-rose-500">{t.l}</span>
                  <span className="text-slate-600 dark:text-slate-300">{t.nr}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{t.pts}</span>
                  <span
                    className={`text-[11px] font-semibold ${
                      t.nrr.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {t.nrr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule */}
      {tab === "Schedule" && (
        <div className="space-y-4">
          <div className="rounded-[26px] bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 p-[1px] shadow-[0_15px_35px_rgba(59,130,246,0.22)]">
            <div className="rounded-[26px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 text-white">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-cyan-100" />
                <span className="text-sm font-bold">Upcoming Schedule</span>
              </div>
            </div>
          </div>

          {schedules.map((s, i) => (
            <div
              key={i}
              className="rounded-[28px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1px] shadow-[0_15px_35px_rgba(59,130,246,0.18)]"
            >
              <div className="rounded-[28px] bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {s}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom insight card */}
      <div className="rounded-[28px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-600 p-[1px] shadow-[0_15px_35px_rgba(139,92,246,0.22)]">
        <div className="rounded-[28px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 text-white">
          <h3 className="text-sm font-bold">Cucuber Analytics</h3>
          <p className="mt-1 text-xs text-white/85">
            Follow rankings, point swings and team momentum through a colorful cricket analytics dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;