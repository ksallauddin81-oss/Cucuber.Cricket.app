import { useEffect, useState } from "react";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/live");
        const data = await response.json();

        console.log("LIVE DATA:", data);

        setMatches(data.data || []);
      } catch (error) {
        console.error("Error fetching live matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    const interval = setInterval(fetchMatches, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Live Matches</h1>

      {matches.length === 0 ? (
        <p>No live matches found</p>
      ) : (
        matches.map((match, index) => {
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
              className="rounded-2xl border border-zinc-700 bg-zinc-900 p-4"
            >
              <h2 className="mb-2 text-lg font-semibold">
                {match.name || "Live Match"}
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{match.team1 || "Team 1"}</span>
                  <span>{team1Score}</span>
                </div>

                <div className="flex justify-between">
                  <span>{match.team2 || "Team 2"}</span>
                  <span>{team2Score}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-red-400">
                {match.status || "Live"}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}