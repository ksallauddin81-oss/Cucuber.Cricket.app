import { useEffect, useState } from "react";
import { Bell, Flame, CalendarDays, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdCard from "../components/AdCard";
import { translations } from "../translations";

const getTeamLogo = (team: string) => {
  return team
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
};

const isIPL = (match: any) => {
  const text = `${match.name || ""} ${match.team1 || ""} ${match.team2 || ""} ${
    match.teams?.join(" ") || ""
  }`.toLowerCase();

  return (
    text.includes("ipl") ||
    text.includes("indian premier league") ||
    text.includes("rcb") ||
    text.includes("csk") ||
    text.includes("mi") ||
    text.includes("pbks") ||
    text.includes("rr") ||
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

const HomePage = () => {
  const navigate = useNavigate();

  const [homeMatches, setHomeMatches] = useState<any[]>([]);
  const [hasLive, setHasLive] = useState(false);

  const language = localStorage.getItem("cucuber_language") || "English";
  const t = translations[language as keyof typeof translations];

  const isLiveMatch = (match: any) => {
    const status = match.status?.toLowerCase() || "";

    return (
      match.matchStarted === true ||
      status.includes("live") ||
      status.includes("innings") ||
      status.includes("need") ||
      status.includes("trail") ||
      status.includes("lead") ||
      status.includes("opt to") ||
      status.includes("toss") ||
      status.includes("elected") ||
      status.includes("choose")
    );
  };

  useEffect(() => {
    let interval: any;

    const fetchHomeMatches = () => {
      fetch(`http://127.0.0.1:8000/api/matches?t=${Date.now()}`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          const live = (data.live || [])
            .filter(isLiveMatch)
            .sort((a: any, b: any) => {
              const aIPL = isIPL(a) ? 1 : 0;
              const bIPL = isIPL(b) ? 1 : 0;
              return bIPL - aIPL;
            });

          const upcoming = (data.upcoming || []).sort((a: any, b: any) => {
            const aIPL = isIPL(a) ? 1 : 0;
            const bIPL = isIPL(b) ? 1 : 0;
            return bIPL - aIPL;
          });

          const recent = data.recent || [];
          const all = data.all || [];

          if (live.length > 0) {
            setHasLive(true);
            setHomeMatches(live.slice(0, 5));
          } else {
            setHasLive(false);
            setHomeMatches(
              upcoming.length > 0
                ? upcoming.slice(0, 5)
                : recent.length > 0
                ? recent.slice(0, 5)
                : all.slice(0, 5)
            );
          }
        })
        .catch((err) => console.error("HOME MATCH ERROR:", err));
    };

    fetchHomeMatches();

    // refresh every 10 seconds
    interval = setInterval(fetchHomeMatches, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white pb-28 bg-[radial-gradient(circle_at_top,#22c55e_0%,#0f172a_35%,#020617_100%)]">
      <div className="px-5 pt-8">
        <div className="rounded-[2rem] p-5 bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-semibold">
                Welcome to
              </p>

              <h1 className="text-4xl font-black tracking-tight">
                Cucuber 🏏
              </h1>

              <p className="text-gray-300 text-sm mt-1">
                Live cricket. Smart alerts. AI match vibes.
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center text-3xl shadow-lg">
              🏆
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 mt-5">
        <button
          onClick={() => navigate("/matches")}
          className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Flame className="mx-auto text-orange-300 mb-2" />
          <p className="text-xs font-semibold">{t.liveMatches}</p>
        </button>

        <button
          onClick={() => navigate("/alerts")}
          className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Bell className="mx-auto text-yellow-300 mb-2" />
          <p className="text-xs font-semibold">{t.alerts}</p>
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center hover:bg-white/15 transition"
        >
          <Zap className="mx-auto text-purple-300 mb-2" />
          <p className="text-xs font-semibold">{t.ai}</p>
        </button>
      </div>

      <div className="px-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black">
            {hasLive ? "Live Matches" : "Featured Matches"}
          </h2>

          <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/30">
            {hasLive ? "LIVE" : "MATCHES"}
          </span>
        </div>

        {homeMatches.length === 0 ? (
          <div className="rounded-[2rem] bg-white/10 border border-white/10 p-6 text-center">
            <Trophy className="mx-auto mb-3 text-gray-300" size={34} />
            <p className="text-gray-300">No matches found right now</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
            {homeMatches.map((match, index) => {
              const team1 = match.teams?.[0] || match.team1 || "Team 1";
              const team2 = match.teams?.[1] || match.team2 || "Team 2";

              const team1Logo = match.teamInfo?.[0]?.img;
              const team2Logo = match.teamInfo?.[1]?.img;

              const scoreText =
                match.score?.length > 0
                  ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})`
                  : "VS";

              return (
                <motion.div
                  key={match.id || index}
                  onClick={() =>
                    navigate(`/matches/${match.id || index}`, {
                      state: match,
                    })
                  }
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer min-w-[320px] snap-center rounded-[2rem] bg-[#2f2f2f] border border-white/15 p-6 shadow-2xl"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black">
                        {match.name || "Cricket Match"}
                      </h3>

                      <p className="text-sm text-gray-300 mt-1">
                        {match.venue || "Venue updating soon"}
                      </p>
                    </div>

                    {isIPL(match) && (
                      <span className="h-fit text-[10px] px-2 py-1 rounded-full bg-yellow-400 text-black font-black">
                        IPL
                      </span>
                    )}
                  </div>

                  <div className="h-px bg-white/15 my-5" />

                  <div className="flex items-center justify-between">
                    <div className="text-center w-[110px]">
                      {team1Logo ? (
                        <img
                          src={team1Logo}
                          alt={team1}
                          className="w-14 h-14 mx-auto rounded-full bg-white p-1 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center font-black">
                          {getTeamLogo(team1)}
                        </div>
                      )}

                      <p className="text-sm font-semibold mt-3">{team1}</p>
                    </div>

                    <div className="text-center px-2">
                      <p className="text-xs font-bold">
                        {hasLive ? "LIVE" : "VS"}
                      </p>

                      <p className="text-sm font-black text-green-300 mt-1">
                        {scoreText}
                      </p>
                    </div>

                    <div className="text-center w-[110px]">
                      {team2Logo ? (
                        <img
                          src={team2Logo}
                          alt={team2}
                          className="w-14 h-14 mx-auto rounded-full bg-white p-1 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center font-black">
                          {getTeamLogo(team2)}
                        </div>
                      )}

                      <p className="text-sm font-semibold mt-3">{team2}</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-3">
                    <p className="text-green-300 font-semibold text-sm">
                      {match.status || "Match status updating"}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-5 mt-8">
        <AdCard />
      </div>

      <div className="px-5 mt-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-white/20 p-5 shadow-xl">
          <div className="flex gap-3 items-center mb-3">
            <CalendarDays className="text-purple-200" />
            <h2 className="text-xl font-black">Stadium Assistant</h2>
          </div>

          <p className="text-sm text-gray-200">
            Pitch report, weather mood, crowd energy and AI match insights will
            appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;