import { motion } from "framer-motion";
import {
  Crown,
  Medal,
  Flame,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function LeaderboardPage() {
  const myName =
    localStorage.getItem("username") ||
    localStorage.getItem("cucuber_phone") ||
    "You";

  const myPoints = Number(localStorage.getItem("quiz_points") || 0);
  const myStreak = Number(localStorage.getItem("quiz_streak") || 0);

  const players = [
    { name: myName, points: myPoints, streak: myStreak, me: true },
    { name: "Cucuber King", points: myPoints + 120, streak: 12 },
    { name: "Six Master", points: myPoints + 80, streak: 9 },
    { name: "Cricket Genius", points: myPoints + 45, streak: 7 },
    { name: "Boundary Boss", points: Math.max(0, myPoints - 25), streak: 6 },
    { name: "Wicket Wizard", points: Math.max(0, myPoints - 60), streak: 5 },
  ]
    .sort((a, b) => b.points - a.points)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  const myRank = players.find((p) => p.me)?.rank || "-";

  const rankStyle = (rank: number) => {
    if (rank === 1) return "from-yellow-300 to-orange-400 text-black";
    if (rank === 2) return "from-slate-200 to-slate-400 text-black";
    if (rank === 3) return "from-orange-300 to-amber-500 text-black";
    return "from-white/10 to-white/5 text-white";
  };

  return (
    <div className="min-h-screen px-4 pt-5 pb-28 bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white overflow-hidden">
      <div className="max-w-md mx-auto space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/20 via-orange-500/10 to-purple-500/10 p-5 shadow-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute right-3 top-3 opacity-20"
          >
            <Sparkles className="h-16 w-16 text-yellow-300" />
          </motion.div>

          <h1 className="text-3xl font-black flex items-center gap-2">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Crown className="h-8 w-8 text-yellow-300" />
            </motion.div>
            Leaderboard
          </h1>

          <p className="text-sm text-white/60 mt-1">
            Dynamic rankings based on quiz points & streaks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-emerald-500/10 p-4 shadow-xl"
        >
          <p className="text-xs text-cyan-300 font-bold">YOUR STATUS</p>

          <h2 className="text-2xl font-black mt-1">{myName}</h2>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-2xl bg-white/10 p-3 text-center">
              <p className="text-xs text-white/50">Rank</p>
              <p className="text-xl font-black text-yellow-300">#{myRank}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 text-center">
              <p className="text-xs text-white/50">Points</p>
              <p className="text-xl font-black text-cyan-300">{myPoints}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 text-center">
              <p className="text-xs text-white/50">Streak</p>
              <p className="text-xl font-black text-orange-300">{myStreak}</p>
            </div>
          </div>
        </motion.div>

        {players.map((player, index) => (
          <motion.div
            key={`${player.name}-${player.rank}`}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-3xl border p-4 flex items-center justify-between shadow-xl ${
              player.me
                ? "border-emerald-400/50 bg-emerald-500/15"
                : "border-white/10 bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={
                  player.rank === 1
                    ? { y: [0, -4, 0], rotate: [0, 4, -4, 0] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.6 }}
                className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${rankStyle(
                  player.rank
                )} flex items-center justify-center font-black shadow-lg`}
              >
                {player.rank <= 3 ? (
                  <Medal className="h-6 w-6" />
                ) : (
                  `#${player.rank}`
                )}
              </motion.div>

              <div>
                <h2 className="font-black">
                  {player.me ? "You" : player.name}
                </h2>

                <p className="text-xs text-white/50 flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-300" />
                  {player.streak} day streak
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-black text-cyan-300">
                {player.points}
              </p>

              <p className="text-xs text-white/50 flex items-center gap-1 justify-end">
                <Star className="h-3 w-3 text-yellow-300" />
                points
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-4"
        >
          <div className="flex items-center gap-2 font-black text-yellow-300">
            <Trophy className="h-5 w-5" />
            Rewards Rules
          </div>

          <p className="text-sm text-white/70 mt-2">
            Correct answer = +10 points • Wrong answer = -4 points • Daily 10
            Questions
          </p>
        </motion.div>
      </div>
    </div>
  );
}