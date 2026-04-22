import { useState, useEffect } from "react";

const alertTypes = [
  { label: "Toss Alert" },
  { label: "Match Start" },
  { label: "Wicket Alert" },
  { label: "Six Alert" },
];

// ⭐ Favorite teams
const teams = ["India", "Australia", "England", "Pakistan"];

const AlertsPage = () => {
  const [enabled, setEnabled] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [popup, setPopup] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle alerts
  const toggle = (label: string) => {
    if (enabled.includes(label)) {
      setEnabled(enabled.filter((e) => e !== label));
    } else {
      setEnabled([...enabled, label]);
    }
  };

  // Toggle favorite teams ⭐
  const toggleTeam = (team: string) => {
    if (favorites.includes(team)) {
      setFavorites(favorites.filter((t) => t !== team));
    } else {
      setFavorites([...favorites, team]);
    }
  };

  // 🔊 Sound
  const playSound = () => {
    const audio = new Audio(
      "https://www.soundjay.com/buttons/sounds/button-3.mp3"
    );
    audio.play();
  };

  // 🤖 Smart Alerts (only favorite teams)
  useEffect(() => {
    const interval = setInterval(() => {
      if (enabled.length === 0 || favorites.length === 0) return;

      const randomAlert =
        enabled[Math.floor(Math.random() * enabled.length)];

      const randomTeam =
        favorites[Math.floor(Math.random() * favorites.length)];

      const message = `${randomTeam}: ${randomAlert} 🚨`;

      setLogs((prev) => [message, ...prev.slice(0, 5)]);
      setPopup(message);
      playSound();

      setTimeout(() => setPopup(null), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, [enabled, favorites]);

  return (
    <div className="min-h-screen p-3 space-y-5">

      <h2 className="text-lg font-bold">🔔 Smart Alerts</h2>

      {/* ⭐ Favorite Teams */}
      <div>
        <h3 className="font-semibold mb-2">⭐ Select Favorite Teams</h3>

        <div className="flex gap-2 flex-wrap">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => toggleTeam(team)}
              className={`px-3 py-1 rounded-full text-sm ${
                favorites.includes(team)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      {/* 🔔 Alert toggles */}
      <div className="space-y-3">
        {alertTypes.map((a) => (
          <div
            key={a.label}
            className="flex justify-between items-center p-3 rounded-xl bg-gray-100 dark:bg-gray-800"
          >
            <span>{a.label}</span>

            <button
              onClick={() => toggle(a.label)}
              className={`px-3 py-1 rounded-full text-sm ${
                enabled.includes(a.label)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              {enabled.includes(a.label) ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>

      {/* 📡 Feed */}
      <div>
        <h3 className="font-semibold mb-2">📡 Live Alerts Feed</h3>

        {logs.length === 0 && <p>No alerts yet...</p>}

        {logs.map((log, i) => (
          <div
            key={i}
            className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-sm mb-2"
          >
            {log}
          </div>
        ))}
      </div>

      {/* 📱 Popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow-lg animate-bounce">
          {popup}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;