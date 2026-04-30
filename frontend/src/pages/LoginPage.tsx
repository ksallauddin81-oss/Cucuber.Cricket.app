import { useState } from "react";

type LoginPageProps = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [internationalTeam, setInternationalTeam] = useState("India");
  const [iplTeam, setIplTeam] = useState("CSK");
  const [language, setLanguage] = useState("English");

  const internationalTeams = [
    "India", "Australia", "England", "Pakistan", "South Africa",
    "New Zealand", "Sri Lanka", "Bangladesh", "Afghanistan",
    "West Indies", "Ireland", "Zimbabwe",
  ];

  const iplTeams = ["CSK", "MI", "RCB", "KKR", "SRH", "RR", "DC", "PBKS", "GT", "LSG"];

  const languages = ["English", "తెలుగు", "हिन्दी"];

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("cucuber_logged_in", "true");
    localStorage.setItem("cucuber_language", language);

    localStorage.setItem(
      "cucuber_user",
      JSON.stringify({
        name: name || "Cucuber User",
        email: email || "user@cucuber.com",
        internationalTeam,
        iplTeam,
        language,
      })
    );

    window.dispatchEvent(new Event("authChanged"));
    onLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050713] text-white px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22d3ee55,transparent_30%),radial-gradient(circle_at_top_right,#9333ea55,transparent_30%),radial-gradient(circle_at_bottom,#ec489944,transparent_35%)] animate-pulse" />

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-[3px]">
            <div className="w-full h-full rounded-full bg-[#050713] flex items-center justify-center text-2xl font-black">
              C
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Welcome to Cucuber
        </h1>

        <p className="text-center text-white/60 mt-2">
          Choose teams, language and continue
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={internationalTeam}
            onChange={(e) => setInternationalTeam(e.target.value)}
            className="w-full rounded-2xl bg-[#101827] border border-white/10 px-4 py-3 text-white"
          >
            {internationalTeams.map((team) => (
              <option key={team} value={team}>
                International: {team}
              </option>
            ))}
          </select>

          <select
            value={iplTeam}
            onChange={(e) => setIplTeam(e.target.value)}
            className="w-full rounded-2xl bg-[#101827] border border-white/10 px-4 py-3 text-white"
          >
            {iplTeams.map((team) => (
              <option key={team} value={team}>
                IPL: {team}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-2xl bg-[#101827] border border-white/10 px-4 py-3 text-white"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                Language: {lang}
              </option>
            ))}
          </select>

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 py-3 font-bold"
          >
            Login
          </button>

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-white/10 py-3 font-bold border border-white/10"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-center text-xs text-white/40 mt-5">
          Live Scores • AI Alerts • Smart Cricket Updates
        </p>
      </div>
    </div>
  );
}