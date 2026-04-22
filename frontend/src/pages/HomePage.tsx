import Logo from "@/components/Logo";
import LiveMatchCard from "@/components/LiveMatchCard";
import StadiumAssistant from "@/components/StadiumAssistant";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type Score = {
  r?: number;
  w?: number;
  o?: number;
};

type Match = {
  id?: string;
  name?: string;
  status?: string;
  team1?: string;
  team2?: string;
  score?: Score[];
};

const HomePage = () => {
  const [pitchExpanded, setPitchExpanded] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingUpcoming, setShowingUpcoming] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const liveRes = await fetch("http://localhost:8000/api/live");
        const liveData = await liveRes.json();

        console.log("LIVE:", liveData);

        if (liveData.data && liveData.data.length > 0) {
          setMatches(liveData.data);
          setShowingUpcoming(false);
        } else {
          const upcomingRes = await fetch("http://localhost:8000/api/upcoming");
          const upcomingData = await upcomingRes.json();

          console.log("UPCOMING:", upcomingData);

          setMatches(upcomingData.data || []);
          setShowingUpcoming(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    const interval = setInterval(fetchMatches, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-float-up">
      <div className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-400/20 border border-red-400/30 shadow">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-red-500">
            {loading
              ? "Loading..."
              : showingUpcoming
              ? `${matches.length} Upcoming`
              : `${matches.length} Live`}
          </span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {showingUpcoming ? "Upcoming Matches" : "Live Matches"}
        </h2>

        {loading && (
          <p className="text-sm text-muted-foreground">Loading matches...</p>
        )}

        {!loading && matches.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No matches available
          </p>
        )}

        {!loading && matches.length > 0 && (
          <div className="space-y-4">
            {matches.map((match, index) => {
              const team1Score =
                match.score && match.score[0]
                  ? `${match.score[0].r ?? 0}/${match.score[0].w ?? 0} (${match.score[0].o ?? 0})`
                  : showingUpcoming
                  ? "Yet to Start"
                  : "-";

              const team2Score =
                match.score && match.score[1]
                  ? `${match.score[1].r ?? 0}/${match.score[1].w ?? 0} (${match.score[1].o ?? 0})`
                  : showingUpcoming
                  ? "Yet to Start"
                  : "-";

              return (
                <div
                  key={match.id || index}
                  className={`rounded-2xl p-[1px] ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500"
                  }`}
                >
                  <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl p-2">
                    <LiveMatchCard
                      team1={match.team1 || "Team 1"}
                      team1Score={team1Score}
                      team2={match.team2 || "Team 2"}
                      team2Score={team2Score}
                      status={
                        match.status ||
                        (showingUpcoming ? "Match yet to start" : "Live")
                      }
                      matchType={
                        showingUpcoming ? "Upcoming Match" : "Live Match"
                      }
                      progress={showingUpcoming ? 0 : 70}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 shadow-lg">
        <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl p-3">
          <StadiumAssistant />
        </div>
      </div>

      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl overflow-hidden">
          <button
            onClick={() => setPitchExpanded(!pitchExpanded)}
            className="w-full flex items-center justify-between p-4"
          >
            <span className="font-semibold text-sm">Detailed Pitch Report</span>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                pitchExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {pitchExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <p className="text-xs text-muted-foreground">
                The pitch offers even bounce. Spinners will get help later.
                Toss-winning team likely to bat first.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;