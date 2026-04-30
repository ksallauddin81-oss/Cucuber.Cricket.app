import { useEffect, useState } from "react";
import {
  RefreshCw,
  Trophy,
  CalendarDays,
  Radio,
  Clock,
  MapPin,
} from "lucide-react";

type Score = {
  inning?: string;
  r?: number;
  w?: number;
  o?: number;
};

type Match = {
  id?: string;
  name?: string;
  team1?: string;
  team2?: string;
  teams?: string[];
  status?: string;
  venue?: string;
  dateTimeGMT?: string;
  matchType?: string;
  score?: Score[];
  matchStarted?: boolean;
  matchEnded?: boolean;
};

type TabType = "live" | "upcoming" | "recent";

const API_URL = "http://localhost:8000";
const CACHE_KEY = "cucuber_matches_cache";

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("live");

  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  function isIPL(match: Match) {
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
  }

  function isLiveMatch(match: Match) {
    const status = String(match.status || "").toLowerCase();

    if (match.matchEnded === true || status.includes("won by")) return false;

    return (
      match.matchStarted === true ||
      (match.score && match.score.length > 0) ||
      status.includes("live") ||
      status.includes("innings") ||
      status.includes("need") ||
      status.includes("trail") ||
      status.includes("lead") ||
      status.includes("opt to") ||
      status.includes("toss") ||
      status.includes("elected")
    );
  }

  function sortIPLFirst(matches: Match[]) {
    return [...matches].sort((a, b) => Number(isIPL(b)) - Number(isIPL(a)));
  }

  function processData(data: any) {
    const apiLive = Array.isArray(data.live) ? data.live : [];
    const apiUpcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
    const apiRecent = Array.isArray(data.recent) ? data.recent : [];
    const apiAll = Array.isArray(data.all) ? data.all : [];

    const live = apiLive.length > 0 ? apiLive : apiAll.filter(isLiveMatch);

    const recent =
      apiRecent.length > 0
        ? apiRecent
        : apiAll.filter(
            (m: Match) =>
              m.matchEnded === true ||
              String(m.status || "").toLowerCase().includes("won by") ||
              String(m.status || "").toLowerCase().includes("completed")
          );

    const finalLive = sortIPLFirst(live);
    const finalUpcoming = sortIPLFirst(apiUpcoming);
    const finalRecent = sortIPLFirst(recent);

    setLiveMatches(finalLive);
    setUpcomingMatches(finalUpcoming);
    setRecentMatches(finalRecent);

    return {
      live: finalLive,
      upcoming: finalUpcoming,
      recent: finalRecent,
      savedAt: new Date().toLocaleTimeString("en-IN"),
    };
  }

  function loadCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;

      const cached = JSON.parse(raw);

      setLiveMatches(cached.live || []);
      setUpcomingMatches(cached.upcoming || []);
      setRecentMatches(cached.recent || []);
      setLastUpdated(cached.savedAt || "");

      return true;
    } catch {
      return false;
    }
  }

  async function fetchMatches() {
    try {
      const res = await fetch(`${API_URL}/api/matches?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      console.log("MATCHES API DATA:", data);

      const cache = processData(data);

      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      setLastUpdated(cache.savedAt);
      setApiError(false);
    } catch (err) {
      console.error("Matches fetch error:", err);
      setApiError(true);

      if (
        liveMatches.length === 0 &&
        upcomingMatches.length === 0 &&
        recentMatches.length === 0
      ) {
        loadCache();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const hasCache = loadCache();
    if (hasCache) setLoading(false);

    fetchMatches();

    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentMatches =
    activeTab === "live"
      ? liveMatches
      : activeTab === "upcoming"
      ? upcomingMatches
      : recentMatches;

  function formatDate(date?: string) {
    if (!date) return "Time updating soon";

    try {
      return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return date;
    }
  }

  function getTeamName(match: Match, index: number) {
    if (index === 1) return match.team1 || match.teams?.[0] || "Team A";
    return match.team2 || match.teams?.[1] || "Team B";
  }

  function getScoreText(match: Match) {
    if (!match.score || match.score.length === 0) return "Score updating";

    return match.score
      .map((s) => `${s.inning || "Innings"}: ${s.r}/${s.w} (${s.o})`)
      .join(" • ");
  }

  const EmptyState = () => {
    const isLive = activeTab === "live";
    const isUpcoming = activeTab === "upcoming";

    return (
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
          {isLive ? (
            <Radio className="text-red-300" size={42} />
          ) : isUpcoming ? (
            <CalendarDays className="text-blue-300" size={42} />
          ) : (
            <Trophy className="text-yellow-300" size={42} />
          )}
        </div>

        <h3 className="text-2xl font-black">
          {isLive
            ? "No Live Matches Right Now"
            : isUpcoming
            ? "No Upcoming Matches Found"
            : "No Recent Results Found"}
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          {isLive
            ? "Live matches will appear here automatically when the cricket feed starts. Cucuber is checking for updates every 30 seconds."
            : isUpcoming
            ? "Upcoming fixtures will appear here when the provider sends new schedule data."
            : "Completed match results will appear here as soon as your cricket feed updates."}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
          <RefreshCw size={15} className="animate-spin" />
          Auto-refresh active
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2563eb_0%,#071120_35%,#020617_100%)] px-5 py-8 pb-28 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <p className="text-sm font-semibold text-blue-300">
            Cucuber Match Center
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Matches 🏏</h1>
              <p className="mt-2 text-sm text-white/70">
                Live, upcoming and recent cricket matches
              </p>
            </div>

            <button
              onClick={fetchMatches}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {apiError && (
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
            <RefreshCw size={16} className="animate-spin" />
            Live feed reconnecting... showing last available data.
          </div>
        )}

        {lastUpdated && (
          <p className="mt-3 text-xs text-white/50">
            Last updated: {lastUpdated}
          </p>
        )}

        <div className="mt-8 grid grid-cols-3 rounded-3xl bg-white/10 p-2">
          <button
            onClick={() => setActiveTab("live")}
            className={`rounded-2xl py-4 font-bold transition ${
              activeTab === "live"
                ? "bg-red-500 text-white shadow-lg"
                : "text-white/70"
            }`}
          >
            Live ({liveMatches.length})
          </button>

          <button
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-2xl py-4 font-bold transition ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white shadow-lg"
                : "text-white/70"
            }`}
          >
            Upcoming ({upcomingMatches.length})
          </button>

          <button
            onClick={() => setActiveTab("recent")}
            className={`rounded-2xl py-4 font-bold transition ${
              activeTab === "recent"
                ? "bg-green-500 text-white shadow-lg"
                : "text-white/70"
            }`}
          >
            Recent ({recentMatches.length})
          </button>
        </div>

        {loading && (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center">
            <RefreshCw className="mx-auto mb-4 animate-spin text-blue-300" />
            <p className="text-white/70">Loading matches...</p>
          </div>
        )}

        {!loading && currentMatches.length === 0 && <EmptyState />}

        <div className="mt-8 grid gap-5">
          {!loading &&
            currentMatches.map((match, index) => (
              <div
                key={match.id || index}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase text-blue-300">
                        {match.matchType || "Cricket"}
                      </p>

                      {isIPL(match) && (
                        <p className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                          IPL
                        </p>
                      )}
                    </div>

                    <h2 className="mt-3 text-xl font-black">
                      {match.name ||
                        `${getTeamName(match, 1)} vs ${getTeamName(match, 2)}`}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                      <MapPin size={15} />
                      {match.venue || "Venue not available"}
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm text-white/60">
                      <Clock size={15} />
                      {formatDate(match.dateTimeGMT)}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300">
                    {match.status || "Scheduled"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-xs text-white/50">Team 1</p>
                    <p className="mt-1 font-black">{getTeamName(match, 1)}</p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-xs text-white/50">Team 2</p>
                    <p className="mt-1 font-black">{getTeamName(match, 2)}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-black/25 p-4">
                  <p className="mb-2 text-sm font-bold text-white/70">
                    Scorecard
                  </p>

                  <p className="text-sm text-green-300">
                    {getScoreText(match)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}