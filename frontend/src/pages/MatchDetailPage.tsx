import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Activity,
  Trophy,
  MapPin,
  CalendarDays,
  Radio,
  Sparkles,
  Users,
  CloudSun,
  Zap,
  Shield,
  Target,
  BarChart3,
  Flame,
  RefreshCw,
  Wind,
  Droplets,
  Gauge,
  Sun,
} from "lucide-react";

type Score = {
  inning?: string;
  r?: number;
  w?: number;
  o?: number;
};

type Tab =
  | "overview"
  | "scorecard"
  | "commentary"
  | "squads"
  | "stadium"
  | "matchups";

export default function MatchDetailPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState<any>(state || null);
  const [tab, setTab] = useState<Tab>("overview");
  const [lastUpdated, setLastUpdated] = useState("");

  const findFreshMatch = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/matches?t=${Date.now()}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      const allMatches = [
        ...(data.live || []),
        ...(data.upcoming || []),
        ...(data.recent || []),
        ...(data.all || []),
      ];

      const fresh =
        allMatches.find((m: any) => String(m.id) === String(id)) ||
        allMatches.find((m: any) => m.name === match?.name);

      if (fresh) {
        setMatch(fresh);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("MATCH DETAIL REFRESH ERROR:", err);
    }
  };

  useEffect(() => {
    findFreshMatch();
    const interval = setInterval(findFreshMatch, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (!match) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-black mb-2">No match data found</h2>
        <p className="text-white/60 text-center mb-5">
          Go back to matches and open any live, recent, or upcoming match.
        </p>
        <button
          onClick={() => navigate("/matches")}
          className="px-5 py-3 rounded-2xl bg-emerald-500 font-bold"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  const team1 = match.team1 || match.teams?.[0] || "Team A";
  const team2 = match.team2 || match.teams?.[1] || "Team B";
  const team1Info = match.teamInfo?.[0];
  const team2Info = match.teamInfo?.[1];

  const score: Score[] = Array.isArray(match.score) ? match.score : [];
  const hasScore = score.length > 0;

  const matchDate = match.dateTimeGMT
    ? new Date(match.dateTimeGMT).toLocaleString()
    : match.date || "Date not available";

  const status = match.status || "Match status updating";
  const currentScore = score[0];

  const runRate =
    currentScore?.r && currentScore?.o
      ? (Number(currentScore.r) / Number(currentScore.o)).toFixed(2)
      : "0.00";

  const isLive =
    match.matchStarted === true ||
    status.toLowerCase().includes("need") ||
    status.toLowerCase().includes("innings") ||
    status.toLowerCase().includes("live") ||
    hasScore;

  const aiSummary = hasScore
    ? `${currentScore?.inning || "Batting team"} is at ${currentScore?.r}/${
        currentScore?.w
      } after ${currentScore?.o} overs. Current run rate is ${runRate}. Cucuber AI says momentum depends on wickets in middle overs, death-over hitting, and bowling discipline.`
    : `This match is waiting for live score data. Cucuber AI will generate stronger prediction after toss, playing XI, pitch and first innings data are available.`;

  const commentary = useMemo(() => {
    if (hasScore) {
      return score.map((s, i) => ({
        over: `${s.o || 0}`,
        title: s.inning || `Innings ${i + 1}`,
        text: `${s.inning || "Team"} scored ${s.r || 0}/${s.w || 0} in ${
          s.o || 0
        } overs.`,
      }));
    }

    return [
      {
        over: "Toss",
        title: "Toss update",
        text: status || "Toss and match updates will appear here.",
      },
      {
        over: "AI",
        title: "Cucuber Assistant",
        text: "Live commentary will become richer when API commentary endpoint is connected.",
      },
    ];
  }, [score, hasScore, status]);

  const getLogo = (teamInfo: any, name: string) => {
    if (teamInfo?.img) {
      return (
        <img
          src={teamInfo.img}
          alt={name}
          className="w-20 h-20 rounded-full bg-white p-2 object-cover shadow-xl"
        />
      );
    }

    return (
      <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-black shadow-xl">
        {name.slice(0, 3).toUpperCase()}
      </div>
    );
  };

  const PremiumCard = ({ children, className = "" }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-3 rounded-2xl text-xs font-black whitespace-nowrap transition flex items-center gap-2 ${
        tab === id
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          : "bg-white/10 text-white/60 hover:bg-white/15"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );

  const Meter = ({ label, value, color }: any) => (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white/70">{label}</span>
        <span className="font-black text-white">{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white pb-28">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22c55e55,transparent_35%),radial-gradient(circle_at_top_right,#3b82f655,transparent_35%),radial-gradient(circle_at_bottom,#facc1550,transparent_35%)]" />

        <div className="relative px-4 pt-5 pb-8 max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 px-4 py-2 rounded-2xl bg-white/10 text-sm font-bold flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                Cucuber Live Match Center
              </p>
              <h1 className="text-3xl md:text-5xl font-black mt-1">
                {team1} vs {team2}
              </h1>
            </div>

            <div className="rounded-full bg-red-500/20 border border-red-400/40 px-4 py-2 text-red-200 text-xs font-black flex items-center gap-2">
              <Radio size={14} className={isLive ? "animate-pulse" : ""} />
              {isLive ? "LIVE" : "UPCOMING"}
            </div>
          </div>

          <PremiumCard className="bg-black/30">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="flex flex-col items-center text-center">
                {getLogo(team1Info, team1)}
                <h2 className="font-black mt-3 text-lg">{team1}</h2>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black text-yellow-300">
                  {currentScore ? `${currentScore.r}/${currentScore.w}` : "VS"}
                </div>
                <p className="text-white/60 text-sm mt-2">
                  {currentScore?.inning || status}
                </p>
                <p className="text-emerald-300 font-black mt-2">
                  Overs: {currentScore?.o || "--"}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                {getLogo(team2Info, team2)}
                <h2 className="font-black mt-3 text-lg">{team2}</h2>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-3">
                <Activity className="mx-auto text-emerald-300 mb-1" size={18} />
                <p className="text-xs text-white/50">Run Rate</p>
                <p className="font-black">{runRate}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <Shield className="mx-auto text-red-300 mb-1" size={18} />
                <p className="text-xs text-white/50">Wickets</p>
                <p className="font-black">{currentScore?.w ?? "--"}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <CalendarDays className="mx-auto text-blue-300 mb-1" size={18} />
                <p className="text-xs text-white/50">Date</p>
                <p className="font-black text-xs">{matchDate}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <RefreshCw className="mx-auto text-purple-300 mb-1" size={18} />
                <p className="text-xs text-white/50">Updated</p>
                <p className="font-black">{lastUpdated || "Now"}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-4">
              <p className="text-emerald-200 font-bold">{status}</p>
            </div>
          </PremiumCard>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-[#050816]/90 backdrop-blur-xl border-y border-white/10 px-4 py-3 overflow-x-auto">
        <div className="flex gap-3 max-w-6xl mx-auto">
          <TabButton id="overview" label="OVERVIEW" icon={Sparkles} />
          <TabButton id="scorecard" label="SCORECARD" icon={BarChart3} />
          <TabButton id="commentary" label="COMMENTARY" icon={Radio} />
          <TabButton id="squads" label="SQUADS" icon={Users} />
          <TabButton id="stadium" label="STADIUM AI" icon={CloudSun} />
          <TabButton id="matchups" label="MATCHUPS" icon={Zap} />
        </div>
      </div>

      <div className="px-4 py-6 space-y-5 max-w-6xl mx-auto">
        {tab === "overview" && (
          <>
            <PremiumCard>
              <h2 className="text-2xl font-black mb-4">Match Overview</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <Trophy className="text-yellow-300 mb-2" />
                  <p className="text-white/50 text-xs">Teams</p>
                  <p className="font-black">{team1} vs {team2}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <MapPin className="text-red-300 mb-2" />
                  <p className="text-white/50 text-xs">Venue</p>
                  <p className="font-black">
                    {match.venue || "Venue not available"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <Activity className="text-emerald-300 mb-2" />
                  <p className="text-white/50 text-xs">Status</p>
                  <p className="font-black">{status}</p>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard>
              <h2 className="text-2xl font-black mb-3 flex items-center gap-2">
                <Sparkles className="text-purple-300" /> AI Match Preview
              </h2>
              <p className="text-white/70 text-sm leading-7">{aiSummary}</p>
            </PremiumCard>
          </>
        )}

        {tab === "scorecard" && (
          <div className="space-y-4">
            {hasScore ? (
              score.map((s, i) => (
                <PremiumCard key={i}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="font-black text-xl">{s.inning}</h2>
                      <p className="text-white/50 text-xs">Innings {i + 1}</p>
                    </div>
                    <p className="text-4xl font-black text-yellow-300">
                      {s.r}/{s.w}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Runs</p>
                      <p className="font-black text-2xl">{s.r}</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Wickets</p>
                      <p className="font-black text-2xl">{s.w}</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Overs</p>
                      <p className="font-black text-2xl">{s.o}</p>
                    </div>
                  </div>
                </PremiumCard>
              ))
            ) : (
              <PremiumCard>
                <h2 className="font-black text-xl">Scorecard not available</h2>
                <p className="text-white/60 text-sm mt-2">
                  Scorecard will appear once the match starts.
                </p>
              </PremiumCard>
            )}
          </div>
        )}

        {tab === "commentary" && (
          <div className="space-y-3">
            {commentary.map((c, i) => (
              <PremiumCard key={i} className="flex gap-4">
                <div className="min-w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-sm">
                  {c.over}
                </div>
                <div>
                  <h3 className="font-black">{c.title}</h3>
                  <p className="text-white/70 text-sm mt-1 leading-6">
                    {c.text}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        )}

        {tab === "squads" && (
          <div className="grid md:grid-cols-2 gap-4">
            {[team1, team2].map((team) => (
              <PremiumCard key={team}>
                <h2 className="text-xl font-black mb-4">{team} Squad</h2>
                {[
                  "Captain",
                  "Opener",
                  "Top Order",
                  "Middle Order",
                  "All Rounder",
                  "Wicket Keeper",
                  "Fast Bowler",
                  "Spinner",
                ].map((role, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-white/10 py-3"
                  >
                    <span className="text-white/70">{role}</span>
                    <span className="font-bold">Updating</span>
                  </div>
                ))}
              </PremiumCard>
            ))}
          </div>
        )}

        {tab === "stadium" && (
          <div className="space-y-5">
            <PremiumCard className="relative overflow-hidden bg-gradient-to-br from-purple-600/25 via-emerald-600/10 to-blue-600/20">
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                  Cucuber AI Stadium Engine
                </p>
                <h2 className="text-3xl font-black mt-2">
                  🏟 Stadium Assistant
                </h2>
                <p className="text-white/70 text-sm mt-3 leading-6">
                  Smart stadium insights for pitch behavior, dew factor, crowd
                  energy, batting support and match momentum.
                </p>

                <div className="mt-5 grid md:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    <MapPin className="text-red-300 mb-2" />
                    <p className="text-xs text-white/50">Venue</p>
                    <p className="font-black text-emerald-300">
                      {match.venue || "Venue updating soon"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    <Activity className="text-yellow-300 mb-2" />
                    <p className="text-xs text-white/50">Match Mood</p>
                    <p className="font-black">
                      {isLive ? "High intensity live phase" : "Pre-match build up"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    <Sparkles className="text-purple-300 mb-2" />
                    <p className="text-xs text-white/50">AI Focus</p>
                    <p className="font-black">
                      Toss, pitch, powerplay and death overs
                    </p>
                  </div>
                </div>
              </div>
            </PremiumCard>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PremiumCard>
                <Sun className="text-emerald-300 mb-3" />
                <h3 className="font-black text-emerald-300">Pitch Report</h3>
                <p className="text-white/70 text-sm mt-2 leading-6">
                  Balanced surface. Batters may score freely after settling,
                  but slower balls and cutters can help bowlers.
                </p>
              </PremiumCard>

              <PremiumCard>
                <CloudSun className="text-blue-300 mb-3" />
                <h3 className="font-black text-blue-300">Weather Mood</h3>
                <p className="text-white/70 text-sm mt-2 leading-6">
                  Weather API can be connected later for rain, humidity, dew
                  and wind alerts.
                </p>
              </PremiumCard>

              <PremiumCard>
                <Flame className="text-yellow-300 mb-3" />
                <h3 className="font-black text-yellow-300">Crowd Energy</h3>
                <p className="text-white/70 text-sm mt-2 leading-6">
                  Crowd energy rises during wickets, boundaries and close chase
                  moments.
                </p>
              </PremiumCard>

              <PremiumCard>
                <Zap className="text-pink-300 mb-3" />
                <h3 className="font-black text-pink-300">AI Insight</h3>
                <p className="text-white/70 text-sm mt-2 leading-6">
                  Powerplay wickets and death-over execution can decide match
                  momentum.
                </p>
              </PremiumCard>
            </div>

            <PremiumCard>
              <h3 className="text-2xl font-black mb-5 flex items-center gap-2">
                <Gauge className="text-emerald-300" /> Stadium Conditions Meter
              </h3>

              <div className="space-y-5">
                <Meter
                  label="Batting Support"
                  value={78}
                  color="bg-gradient-to-r from-emerald-400 to-lime-300"
                />
                <Meter
                  label="Bowling Help"
                  value={52}
                  color="bg-gradient-to-r from-blue-400 to-cyan-300"
                />
                <Meter
                  label="Dew Factor"
                  value={65}
                  color="bg-gradient-to-r from-purple-400 to-pink-300"
                />
                <Meter
                  label="Crowd Impact"
                  value={88}
                  color="bg-gradient-to-r from-yellow-400 to-orange-400"
                />
              </div>
            </PremiumCard>

            <div className="grid md:grid-cols-3 gap-4">
              <PremiumCard>
                <Wind className="text-cyan-300 mb-3" />
                <h3 className="font-black">Wind & Swing</h3>
                <p className="text-white/60 text-sm mt-2">
                  Early overs may offer movement if conditions support swing.
                </p>
              </PremiumCard>

              <PremiumCard>
                <Droplets className="text-blue-300 mb-3" />
                <h3 className="font-black">Dew Impact</h3>
                <p className="text-white/60 text-sm mt-2">
                  Dew can make gripping the ball harder for spinners and
                  death-over bowlers.
                </p>
              </PremiumCard>

              <PremiumCard>
                <Target className="text-red-300 mb-3" />
                <h3 className="font-black">Chase Factor</h3>
                <p className="text-white/60 text-sm mt-2">
                  If dew increases, chasing team may get a slight advantage.
                </p>
              </PremiumCard>
            </div>
          </div>
        )}

        {tab === "matchups" && (
          <PremiumCard>
            <h2 className="text-2xl font-black mb-4">Key Matchups</h2>

            <div className="space-y-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-black flex gap-2 items-center">
                  <Flame className="text-orange-300" size={18} />
                  {team1} Powerplay vs {team2} Bowlers
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Early wickets can decide match momentum.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-black flex gap-2 items-center">
                  <Target className="text-red-300" size={18} />
                  {team2} Death Overs vs {team1} Pacers
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Final 5 overs may be the biggest game-changing phase.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-black flex gap-2 items-center">
                  <Sparkles className="text-purple-300" size={18} />
                  Toss Impact
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Toss decision can influence chase, dew factor and powerplay
                  planning.
                </p>
              </div>
            </div>
          </PremiumCard>
        )}
      </div>
    </div>
  );
}