import { useEffect, useState } from "react";
import LiveMatchCard from "@/components/LiveMatchCard";

type Score = {
  r?: number;
  w?: number;
  o?: number;
};

type Match = {
  id?: string;
  team1?: string;
  team2?: string;
  status?: string;
  score?: Score[];
};

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/recent");
        const data = await response.json();

        console.log("RECENT:", data);

        setMatches(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="space-y-5 p-4 pb-24">
      <div>
        <h1 className="text-2xl font-bold">Recent Matches</h1>
        <p className="text-sm text-muted-foreground">
          Completed matches
        </p>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">
          Loading recent matches...
        </p>
      )}

      {!loading && matches.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No completed matches found
        </p>
      )}

      {!loading && matches.length > 0 && (
        <div className="space-y-4">
          {matches.map((match, index) => {
            const team1Score =
              match.score && match.score[0]
                ? `${match.score[0].r ?? 0}/${match.score[0].w ?? 0} (${match.score[0].o ?? 0})`
                : "-";

            const team2Score =
              match.score && match.score[1]
                ? `${match.score[1].r ?? 0}/${match.score[1].w ?? 0} (${match.score[1].o ?? 0})`
                : "-";

            return (
              <div
                key={match.id || index}
                className={`rounded-2xl p-[1px] ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                    : "bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"
                }`}
              >
                <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl p-2">
                  <LiveMatchCard
                    team1={match.team1 || "Team 1"}
                    team1Score={team1Score}
                    team2={match.team2 || "Team 2"}
                    team2Score={team2Score}
                    status={match.status || "Completed"}
                    matchType="Completed Match"
                    progress={100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchesPage;