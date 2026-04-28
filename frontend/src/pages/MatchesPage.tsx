import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Match = {
  id?: string;
  name?: string;
  matchType?: string;
  status?: string;
  venue?: string;
  date?: string;
  dateTimeGMT?: string;
  team1?: string;
  team2?: string;
  teams?: string[];
  teamInfo?: {
    name?: string;
    shortname?: string;
    img?: string;
  }[];
  score?: any[];
};

export default function MatchesPage() {
  const navigate = useNavigate();

  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "recent">(
    "upcoming"
  );

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);

        const res = await fetch("http://127.0.0.1:8000/api/matches");
        const data = await res.json();

        console.log("FULL MATCHES API DATA:", data);

        const live = data.live || [];
        const upcoming = data.upcoming || [];
        const recent = data.recent || [];

        const merged = [...live, ...upcoming, ...recent];

        const unique = Array.from(
          new Map(merged.map((m: Match) => [m.id || m.name, m])).values()
        );

        setAllMatches(unique);
      } catch (error) {
        console.error("MATCHES FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  const isLiveMatch = (match: Match) => {
    const status = match.status?.toLowerCase() || "";

    return (
      status.includes("live") ||
      status.includes("innings") ||
      status.includes("need") ||
      status.includes("trail") ||
      status.includes("lead") ||
      status.includes("opt to") ||
      status.includes("break")
    );
  };

  const isUpcomingMatch = (match: Match) => {
    if (isLiveMatch(match)) return false;

    const hasScore = match.score && match.score.length > 0;
    if (hasScore) return false;

    const status = match.status?.toLowerCase() || "";

    if (
      status.includes("won") ||
      status.includes("lost") ||
      status.includes("complete") ||
      status.includes("abandoned") ||
      status.includes("draw") ||
      status.includes("tied")
    ) {
      return false;
    }

    const dateValue = match.dateTimeGMT || match.date;
    if (!dateValue) return true;

    const matchTime = new Date(dateValue).getTime();

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setHours(23, 59, 59, 999);

    return matchTime >= start.getTime() && matchTime <= end.getTime();
  };

  const isIPLMatch = (match: Match) => {
    const text = `${match.name || ""} ${match.teams?.join(" ") || ""}`.toLowerCase();

    return (
      text.includes("ipl") ||
      text.includes("indian premier league") ||
      text.includes("pbks") ||
      text.includes("rr") ||
      text.includes("rcb") ||
      text.includes("csk") ||
      text.includes("mi") ||
      text.includes("gt") ||
      text.includes("dc") ||
      text.includes("kkr") ||
      text.includes("srh") ||
      text.includes("lsg") ||
      text.includes("punjab kings") ||
      text.includes("rajasthan royals") ||
      text.includes("royal challengers") ||
      text.includes("chennai super kings") ||
      text.includes("mumbai indians") ||
      text.includes("gujarat titans") ||
      text.includes("delhi capitals") ||
      text.includes("kolkata knight riders") ||
      text.includes("sunrisers hyderabad") ||
      text.includes("lucknow super giants")
    );
  };

  const sortMatches = (matches: Match[]) => {
    return [...matches].sort((a, b) => {
      const aIPL = isIPLMatch(a) ? 1 : 0;
      const bIPL = isIPLMatch(b) ? 1 : 0;

      if (aIPL !== bIPL) return bIPL - aIPL;

      const aTime = new Date(a.dateTimeGMT || a.date || "").getTime() || 0;
      const bTime = new Date(b.dateTimeGMT || b.date || "").getTime() || 0;

      return aTime - bTime;
    });
  };

  const liveMatches = useMemo(
    () => sortMatches(allMatches.filter(isLiveMatch)),
    [allMatches]
  );

  const upcomingMatches = useMemo(
    () => sortMatches(allMatches.filter(isUpcomingMatch)),
    [allMatches]
  );

  const recentMatches = useMemo(
    () =>
      sortMatches(
        allMatches.filter((m) => !isLiveMatch(m) && !isUpcomingMatch(m))
      ).reverse(),
    [allMatches]
  );

  const currentMatches =
    activeTab === "live"
      ? liveMatches
      : activeTab === "upcoming"
      ? upcomingMatches
      : recentMatches;

  const teamBlock = (match: Match, index: number) => {
    const team = match.teamInfo?.[index];
    const fallback =
      match.teams?.[index] ||
      (index === 0 ? match.team1 : match.team2) ||
      "Team";

    return (
      <div className="flex flex-col items-center w-24 text-center">
        {team?.img ? (
          <img
            src={team.img}
            alt={team.name || fallback}
            className="w-14 h-14 rounded-full bg-white p-1 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold">
            {fallback.slice(0, 3).toUpperCase()}
          </div>
        )}

        <p className="text-sm mt-2 font-semibold line-clamp-2">
          {team?.shortname || team?.name || fallback}
        </p>
      </div>
    );
  };

  const getMatchDate = (match: Match) => {
    const value = match.dateTimeGMT || match.date;
    if (!value) return "Date not available";

    const date = new Date(value);
    if (isNaN(date.getTime())) return value;

    return date.toLocaleString();
  };

  const renderCard = (match: Match, index: number) => (
    <div
      key={match.id || index}
      onClick={() =>
        navigate(`/matches/${match.id || index}`, {
          state: match,
        })
      }
      className="group rounded-3xl bg-white/10 border border-white/10 p-5 cursor-pointer hover:scale-[1.02] hover:bg-white/15 hover:border-emerald-400/40 transition-all duration-300 shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-bold ${
            activeTab === "live"
              ? "bg-red-500"
              : activeTab === "upcoming"
              ? "bg-blue-500"
              : "bg-emerald-500"
          }`}
        >
          {isIPLMatch(match) ? "IPL" : match.matchType || "MATCH"}
        </span>

        <span className="text-xs text-white/60 text-right max-w-[150px]">
          {getMatchDate(match)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        {teamBlock(match, 0)}

        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black shadow-lg group-hover:rotate-12 transition">
            VS
          </div>
          <p className="text-[10px] text-white/50 mt-1">Tap details</p>
        </div>

        {teamBlock(match, 1)}
      </div>

      <p className="text-center text-cyan-300 mt-4 text-sm font-semibold">
        {match.status || "Match scheduled"}
      </p>

      <p className="text-center text-white/60 text-xs mt-2">
        📍 {match.venue || "Venue not available"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b16] text-white px-4 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black">Matches</h1>
        <p className="text-white/60 text-sm mt-1">
          Live, upcoming and recent cricket matches
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6 mb-6 bg-white/10 p-2 rounded-3xl">
          <button
            onClick={() => setActiveTab("live")}
            className={`py-3 rounded-2xl font-bold text-sm ${
              activeTab === "live" ? "bg-red-500 text-white" : "text-white/60"
            }`}
          >
            Live ({liveMatches.length})
          </button>

          <button
            onClick={() => setActiveTab("upcoming")}
            className={`py-3 rounded-2xl font-bold text-sm ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white"
                : "text-white/60"
            }`}
          >
            Upcoming ({upcomingMatches.length})
          </button>

          <button
            onClick={() => setActiveTab("recent")}
            className={`py-3 rounded-2xl font-bold text-sm ${
              activeTab === "recent"
                ? "bg-green-500 text-white"
                : "text-white/60"
            }`}
          >
            Recent ({recentMatches.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-20 text-white/60">Loading...</div>
        ) : currentMatches.length === 0 ? (
          <div className="text-center mt-20 text-white/60">
            No matches found
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {currentMatches.map(renderCard)}
          </div>
        )}
      </div>
    </div>
  );
}