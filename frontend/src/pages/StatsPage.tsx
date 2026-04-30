import { useEffect, useState } from "react";
import {
  Trophy,
  Flame,
  Shield,
  Target,
  Zap,
  Medal,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/api/stats";

const pointsTable = [
  { team: "GT", full: "Gujarat Titans", p: 8, w: 6, l: 2, pts: 12, nrr: "+1.15" },
  { team: "RCB", full: "Royal Challengers Bengaluru", p: 8, w: 5, l: 3, pts: 10, nrr: "+0.72" },
  { team: "MI", full: "Mumbai Indians", p: 8, w: 5, l: 3, pts: 10, nrr: "+0.48" },
  { team: "CSK", full: "Chennai Super Kings", p: 8, w: 4, l: 4, pts: 8, nrr: "+0.21" },
  { team: "KKR", full: "Kolkata Knight Riders", p: 8, w: 4, l: 4, pts: 8, nrr: "-0.10" },
  { team: "SRH", full: "Sunrisers Hyderabad", p: 8, w: 4, l: 4, pts: 8, nrr: "-0.22" },
  { team: "RR", full: "Rajasthan Royals", p: 8, w: 3, l: 5, pts: 6, nrr: "-0.35" },
  { team: "DC", full: "Delhi Capitals", p: 8, w: 3, l: 5, pts: 6, nrr: "-0.51" },
  { team: "PBKS", full: "Punjab Kings", p: 8, w: 3, l: 5, pts: 6, nrr: "-0.70" },
  { team: "LSG", full: "Lucknow Super Giants", p: 8, w: 3, l: 5, pts: 6, nrr: "-0.82" },
];

const orangeCap = [
  { player: "Virat Kohli", team: "RCB", runs: 425, sr: "148.2" },
  { player: "Shubman Gill", team: "GT", runs: 398, sr: "142.7" },
  { player: "Ruturaj Gaikwad", team: "CSK", runs: 372, sr: "139.5" },
  { player: "Sanju Samson", team: "RR", runs: 350, sr: "145.1" },
  { player: "Suryakumar Yadav", team: "MI", runs: 331, sr: "166.4" },
];

const purpleCap = [
  { player: "Jasprit Bumrah", team: "MI", wkts: 16, eco: "6.8" },
  { player: "Rashid Khan", team: "GT", wkts: 15, eco: "7.1" },
  { player: "Yuzvendra Chahal", team: "PBKS", wkts: 14, eco: "7.9" },
  { player: "Mohammed Siraj", team: "RCB", wkts: 13, eco: "8.0" },
  { player: "Varun Chakravarthy", team: "KKR", wkts: 12, eco: "7.5" },
];

const sixes = [
  { player: "Heinrich Klaasen", team: "SRH", sixes: 28 },
  { player: "Suryakumar Yadav", team: "MI", sixes: 25 },
  { player: "Andre Russell", team: "KKR", sixes: 23 },
  { player: "Rishabh Pant", team: "DC", sixes: 21 },
  { player: "Glenn Maxwell", team: "RCB", sixes: 19 },
];

const isIPL = (match: any) => {
  const text = `${match.name || ""} ${match.team1 || ""} ${match.team2 || ""} ${
    match.teams?.join(" ") || ""
  }`.toLowerCase();

  return (
    text.includes("ipl") ||
    text.includes("indian premier league") ||
    text.includes("royal challengers") ||
    text.includes("mumbai indians") ||
    text.includes("chennai super kings") ||
    text.includes("gujarat titans") ||
    text.includes("rajasthan royals") ||
    text.includes("delhi capitals") ||
    text.includes("kolkata knight riders") ||
    text.includes("sunrisers hyderabad") ||
    text.includes("punjab kings") ||
    text.includes("lucknow super giants")
  );
};

const teamLogo = (team: string) =>
  team
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const StatCard = ({ title, value, icon, sub }: any) => (
  <div className="rounded-[2rem] bg-white/10 border border-white/15 p-5 shadow-xl backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <h2 className="text-3xl font-black mt-1">{value}</h2>
        <p className="text-xs text-gray-400 mt-1">{sub}</p>
      </div>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-yellow-400 text-black flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

export default function StatsPage() {
  const [recentIPL, setRecentIPL] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();

      const recent = data.recentResults || [];
      setRecentIPL(recent.filter(isIPL).slice(0, 6));
    } catch (err) {
      console.error("STATS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen text-white pb-28 bg-[radial-gradient(circle_at_top,#22c55e_0%,#0f172a_35%,#020617_100%)]">
      <div className="px-5 pt-8">
        <div className="rounded-[2rem] p-6 bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-semibold">
                Premium IPL Analytics
              </p>
              <h1 className="text-4xl font-black tracking-tight">
                Stats Center 🏏
              </h1>
              <p className="text-gray-300 text-sm mt-2">
                Points table, orange cap, purple cap and power hitters.
              </p>
            </div>

            <button
              onClick={fetchStats}
              className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 mt-5">
        <StatCard
          title="Top Team"
          value={pointsTable[0].team}
          sub={`${pointsTable[0].pts} points`}
          icon={<Trophy />}
        />
        <StatCard
          title="Orange Cap"
          value={orangeCap[0].runs}
          sub={orangeCap[0].player}
          icon={<Flame />}
        />
        <StatCard
          title="Purple Cap"
          value={purpleCap[0].wkts}
          sub={purpleCap[0].player}
          icon={<Target />}
        />
        <StatCard
          title="Most Sixes"
          value={sixes[0].sixes}
          sub={sixes[0].player}
          icon={<Zap />}
        />
      </div>

      <section className="px-5 mt-8">
        <h2 className="text-2xl font-black mb-4">IPL Points Table</h2>

        <div className="rounded-[2rem] bg-white/10 border border-white/15 overflow-hidden shadow-xl">
          <div className="grid grid-cols-7 text-xs text-gray-300 bg-black/30 px-4 py-3 font-bold">
            <p>Team</p>
            <p className="text-center">P</p>
            <p className="text-center">W</p>
            <p className="text-center">L</p>
            <p className="text-center">Pts</p>
            <p className="text-center col-span-2">NRR</p>
          </div>

          {pointsTable.map((row, index) => (
            <motion.div
              key={row.team}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-7 items-center px-4 py-4 border-t border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 text-black flex items-center justify-center text-xs font-black">
                  {row.team}
                </div>
                <div>
                  <p className="font-black">{row.team}</p>
                  <p className="text-[10px] text-gray-400">{row.full}</p>
                </div>
              </div>
              <p className="text-center">{row.p}</p>
              <p className="text-center text-green-300">{row.w}</p>
              <p className="text-center text-red-300">{row.l}</p>
              <p className="text-center font-black">{row.pts}</p>
              <p className="text-center col-span-2 text-yellow-300">{row.nrr}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-2xl font-black mb-4">Orange Cap</h2>

        <div className="space-y-3">
          {orangeCap.map((p, i) => (
            <div
              key={p.player}
              className="rounded-3xl bg-orange-500/10 border border-orange-400/20 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Medal className="text-orange-300" />
                <div>
                  <p className="font-black">{p.player}</p>
                  <p className="text-xs text-gray-300">{p.team} • SR {p.sr}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-orange-300">{p.runs}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-2xl font-black mb-4">Purple Cap</h2>

        <div className="space-y-3">
          {purpleCap.map((p) => (
            <div
              key={p.player}
              className="rounded-3xl bg-purple-500/10 border border-purple-400/20 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Shield className="text-purple-300" />
                <div>
                  <p className="font-black">{p.player}</p>
                  <p className="text-xs text-gray-300">{p.team} • ECO {p.eco}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-purple-300">{p.wkts}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-2xl font-black mb-4">Most Sixes</h2>

        <div className="grid grid-cols-1 gap-3">
          {sixes.map((p) => (
            <div
              key={p.player}
              className="rounded-3xl bg-yellow-500/10 border border-yellow-400/20 p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-black">{p.player}</p>
                <p className="text-xs text-gray-300">{p.team}</p>
              </div>
              <p className="text-2xl font-black text-yellow-300">
                {p.sixes} sixes
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-2xl font-black mb-4">Recent IPL Results</h2>

        {recentIPL.length === 0 ? (
          <div className="rounded-[2rem] bg-white/10 border border-white/10 p-6 text-center">
            <Trophy className="mx-auto mb-3 text-gray-300" size={34} />
            <p className="text-gray-300">
              IPL recent results will appear when your API provides IPL completed matches.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentIPL.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl bg-white/10 border border-white/15 p-4"
              >
                <p className="font-black">{m.name}</p>
                <p className="text-sm text-green-300 mt-1">{m.status}</p>
                <p className="text-xs text-gray-400 mt-1">{m.venue}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}