import { useEffect, useState } from "react";
import {
  Bell,
  Flame,
  Trophy,
  Zap,
  RefreshCw,
  Radio,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdCard from "../components/AdCard";
import { translations } from "../translations";

const API_URL = "http://localhost:8000";
const CACHE_KEY = "cucuber_home_matches_cache";

const getTeamLogo = (team: string) =>
  team
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const isIPL = (match: any) => {
  const text = `${match.name || ""} ${match.team1 || ""} ${match.team2 || ""} ${
    match.teams?.join(" ") || ""
  }`.toLowerCase();

  return (
    text.includes("ipl") ||
    text.includes("indian premier league") ||
    text.includes("royal challengers") ||
    text.includes("chennai super kings") ||
    text.includes("mumbai indians") ||
    text.includes("gujarat titans") ||
    text.includes("delhi capitals") ||
    text.includes("kolkata knight riders") ||
    text.includes("sunrisers hyderabad") ||
    text.includes("lucknow super giants") ||
    text.includes("punjab kings") ||
    text.includes("rajasthan royals")
  );
};

const isLiveMatch = (match: any) => {
  const status = String(match.status || "").toLowerCase();

  if (
    match.matchEnded === true ||
    status.includes("won by") ||
    status.includes("completed")
  ) {
    return false;
  }

  return (
    match.matchStarted === true ||
    status.includes("live") ||
    status.includes("innings") ||
    status.includes("need") ||
    status.includes("trail") ||
    status.includes("lead") ||
    status.includes("toss") ||
    status.includes("opt to") ||
    status.includes("elected")
  );
};

const isRecentMatch = (match: any) => {
  const status = String(match.status || "").toLowerCase();

  return (
    match.matchEnded === true ||
    status.includes("won by") ||
    status.includes("completed") ||
    status.includes("result")
  );
};

const sortIPLFirst = (matches: any[]) =>
  [...matches].sort((a, b) => Number(isIPL(b)) - Number(isIPL(a)));

const formatDateTime = (match: any) => {
  const rawDate = match.dateTimeGMT || match.date;
  if (!rawDate) return "Time updating soon";

  try {
    return new Date(rawDate).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return rawDate;
  }
};

const getScoreText = (match: any) => {
  if (!match.score || match.score.length === 0) return "VS";

  return match.score
    .map((s: any) => `${s.inning}: ${s.r}/${s.w} (${s.o})`)
    .join(" • ");
};

export default function HomePage() {
  const navigate = useNavigate();

  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const language = localStorage.getItem("cucuber_language") || "English";
  const t = translations[language as keyof typeof translations];

  const saveCache = (live: any[], recent: any[], upcoming: any[]) => {
    const payload = {
      live,
      recent,
      upcoming,
      savedAt: new Date().toLocaleTimeString("en-IN"),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    setLastUpdated(payload.savedAt);
  };

  const loadCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;

      const data = JSON.parse(raw);

      setLiveMatches(data.live || []);
      setRecentMatches(data.recent || []);
      setUpcomingMatches(data.upcoming || []);
      setLastUpdated(data.savedAt || "");

      return true;
    } catch {
      return false;
    }
  };

  const fetchHomeMatches = async () => {
    try {
      const res = await fetch(`${API_URL}/api/matches?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      console.log("HOME MATCH DATA:", data);

      const apiLive = Array.isArray(data.live) ? data.live : [];
      const apiRecent = Array.isArray(data.recent) ? data.recent : [];
      const apiUpcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
      const apiAll = Array.isArray(data.all) ? data.all : [];

      const finalLive = sortIPLFirst(
        apiLive.length > 0 ? apiLive : apiAll.filter(isLiveMatch)
      ).slice(0, 5);

      const finalRecent = sortIPLFirst(
        apiRecent.length > 0 ? apiRecent : apiAll.filter(isRecentMatch)
      ).slice(0, 5);

      const finalUpcoming = sortIPLFirst(apiUpcoming).slice(0, 5);

      setLiveMatches(finalLive);
      setRecentMatches(finalRecent);
      setUpcomingMatches(finalUpcoming);

      saveCache(finalLive, finalRecent, finalUpcoming);
      setApiError(false);
    } catch (err) {
      console.error("HOME MATCH ERROR:", err);
      setApiError(true);

      if (
        liveMatches.length === 0 &&
        recentMatches.length === 0 &&
        upcomingMatches.length === 0
      ) {
        loadCache();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCache();
    fetchHomeMatches();

    const interval = setInterval(fetchHomeMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderCard = (
    match: any,
    type: "live" | "recent" | "upcoming",
    index: number
  ) => {
    const team1 = match.team1 || match.teams?.[0] || "Team 1";
    const team2 = match.team2 || match.teams?.[1] || "Team 2";

    return (
      <motion.div
        key={`${type}-${match.id || index}`}
        whileHover={{ scale: 1.02 }}
        onClick={() =>
          navigate(`/matches/${match.id || index}`, { state: match })
        }
        className="cursor-pointer min-w-[320px] snap-center rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl"
      >
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="text-xl font-black">
              {match.name || `${team1} vs ${team2}`}
            </h3>

            <p className="mt-1 text-sm text-white/60">
              {match.venue || "Venue updating soon"}
            </p>

            <p className="mt-1 text-xs text-white/50">
              {formatDateTime(match)}
            </p>
          </div>

          {isIPL(match) && (
            <span className="h-fit rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
              IPL
            </span>
          )}
        </div>

        <div className="my-5 h-px bg-white/10" />

        <div className="grid grid-cols-3 items-center gap-3 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-black">
              {getTeamLogo(team1)}
            </div>
            <p className="mt-2 text-sm font-semibold">{team1}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase">{type}</p>
            <p className="mt-2 text-xs font-black text-green-300">
              {getScoreText(match)}
            </p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-black">
              {getTeamLogo(team2)}
            </div>
            <p className="mt-2 text-sm font-semibold">{team2}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-black/25 p-3">
          <p className="text-sm text-green-300">
            {match.status || "Status updating"}
          </p>
        </div>
      </motion.div>
    );
  };

  const EmptyCard = ({
    title,
    desc,
    type,
  }: {
    title: string;
    desc: string;
    type: "live" | "recent" | "upcoming";
  }) => (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
        {type === "live" ? (
          <Radio className="text-red-300" size={34} />
        ) : type === "upcoming" ? (
          <CalendarDays className="text-blue-300" size={34} />
        ) : (
          <Trophy className="text-yellow-300" size={34} />
        )}
      </div>

      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{desc}</p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
        <RefreshCw size={15} className="animate-spin" />
        Auto-refresh active
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#22c55e_0%,#0f172a_35%,#020617_100%)] pb-28 text-white">
      <div className="px-5 pt-8">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-300">
                Welcome to
              </p>
              <h1 className="text-4xl font-black">Cucuber 🏏</h1>
              <p className="mt-1 text-sm text-white/70">
                Live cricket. Smart alerts. AI match vibes.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-400 to-yellow-400 text-3xl">
              🏆
            </div>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="mx-5 mt-4 flex items-center gap-2 rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
          <RefreshCw size={16} className="animate-spin" />
          Live feed reconnecting... showing last available data.
        </div>
      )}

      {lastUpdated && (
        <p className="px-5 mt-2 text-xs text-white/50">
          Last updated: {lastUpdated}
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 px-5 mt-5">
        <button
          onClick={() => navigate("/matches")}
          className="rounded-2xl bg-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Flame className="mx-auto mb-2 text-orange-300" />
          <p className="text-xs font-semibold">{t.liveMatches}</p>
        </button>

        <button
          onClick={() => navigate("/alerts")}
          className="rounded-2xl bg-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Bell className="mx-auto mb-2 text-yellow-300" />
          <p className="text-xs font-semibold">{t.alerts}</p>
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="rounded-2xl bg-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Zap className="mx-auto mb-2 text-purple-300" />
          <p className="text-xs font-semibold">{t.ai}</p>
        </button>
      </div>

      {/* LIVE */}
      <div className="px-5 mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Live Matches</h2>

          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
            LIVE
          </span>
        </div>

        {loading ? (
          <p className="text-white/70">Loading matches...</p>
        ) : liveMatches.length === 0 ? (
          <EmptyCard
            type="live"
            title="No Live Matches Right Now"
            desc="Live cricket feed will appear automatically when matches begin."
          />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {liveMatches.map((m, i) => renderCard(m, "live", i))}
          </div>
        )}
      </div>

      {/* RECENT */}
      <div className="px-5 mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Recent Matches</h2>

          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
            RECENT
          </span>
        </div>

        {loading ? (
          <p className="text-white/70">Loading recent matches...</p>
        ) : recentMatches.length === 0 ? (
          <EmptyCard
            type="recent"
            title="No Recent Results Found"
            desc="Completed match results will appear here shortly."
          />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {recentMatches.map((m, i) => renderCard(m, "recent", i))}
          </div>
        )}
      </div>

      {/* UPCOMING */}
      <div className="px-5 mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Upcoming Matches</h2>

          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
            UPCOMING
          </span>
        </div>

        {loading ? (
          <p className="text-white/70">Loading upcoming matches...</p>
        ) : upcomingMatches.length === 0 ? (
          <EmptyCard
            type="upcoming"
            title="No Upcoming Matches Found"
            desc="New fixtures will appear here shortly."
          />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {upcomingMatches.map((m, i) => renderCard(m, "upcoming", i))}
          </div>
        )}
      </div>

      <div className="px-5 mt-8">
        <AdCard />
      </div>
    </div>
  );
}