import { useState } from "react";
import {
  User,
  Mail,
  Trophy,
  Bell,
  Settings,
  LogOut,
  Star,
  Edit3,
  Languages,
} from "lucide-react";
import { translations } from "../translations";

export default function ProfilePage() {
  const savedUser = localStorage.getItem("cucuber_user");

  const initialUser = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "Cucuber User",
        email: "user@cucuber.com",
        internationalTeam: "India",
        iplTeam: "CSK",
        language: "English",
      };

  const [user, setUser] = useState(initialUser);
  const [isEditingTeams, setIsEditingTeams] = useState(false);

  const [internationalTeam, setInternationalTeam] = useState(
    user.internationalTeam || "India"
  );
  const [iplTeam, setIplTeam] = useState(user.iplTeam || "CSK");
  const [language, setLanguage] = useState(user.language || "English");

  const t =
    translations[(localStorage.getItem("cucuber_language") || "English") as keyof typeof translations];

  const internationalTeams = [
    "India", "Australia", "England", "Pakistan", "South Africa",
    "New Zealand", "Sri Lanka", "Bangladesh", "Afghanistan",
    "West Indies", "Ireland", "Zimbabwe",
  ];

  const iplTeams = ["CSK", "MI", "RCB", "KKR", "SRH", "RR", "DC", "PBKS", "GT", "LSG"];

  const languages = ["English", "తెలుగు", "हिन्दी"];

  const stats = [
    { label: "Saved Matches", value: "12" },
    { label: "Alerts", value: "8" },
    { label: "Wins Tracked", value: "24" },
  ];

  function saveProfileOptions() {
    const updatedUser = {
      ...user,
      internationalTeam,
      iplTeam,
      language,
    };

    localStorage.setItem("cucuber_user", JSON.stringify(updatedUser));
    localStorage.setItem("cucuber_language", language);

    setUser(updatedUser);
    setIsEditingTeams(false);

    window.location.reload();
  }

  function handleLogout() {
    localStorage.removeItem("cucuber_logged_in");
    localStorage.removeItem("cucuber_user");
    window.location.reload();
  }

  return (
    <div className="min-h-screen pb-28 bg-[#050713] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22d3ee55,transparent_30%),radial-gradient(circle_at_top_right,#a855f755,transparent_30%),radial-gradient(circle_at_bottom,#ec489944,transparent_35%)] animate-pulse" />

      <div className="relative z-10 px-5 pt-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          {t.profile}
        </h1>

        <div className="mt-6 rounded-[32px] bg-white/10 border border-white/15 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-[#101827] flex items-center justify-center">
                <User size={28} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <Mail size={14} /> {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center backdrop-blur-xl"
            >
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-[11px] text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/15 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-300" />
              <div>
                <h3 className="font-bold">{t.favoriteTeams}</h3>
                <p className="text-sm text-gray-300">
                  {t.international}: {user.internationalTeam}
                </p>
                <p className="text-sm text-gray-300">
                  {t.ipl}: {user.iplTeam}
                </p>
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <Languages size={14} /> {t.language}: {user.language}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingTeams(true)}
              className="rounded-xl bg-white/10 border border-white/15 p-2"
            >
              <Edit3 size={16} />
            </button>
          </div>

          {isEditingTeams && (
            <div className="mt-4 space-y-3">
              <select
                value={internationalTeam}
                onChange={(e) => setInternationalTeam(e.target.value)}
                className="w-full rounded-2xl bg-[#101827] border border-white/15 px-4 py-3 text-white"
              >
                {internationalTeams.map((team) => (
                  <option key={team}>{team}</option>
                ))}
              </select>

              <select
                value={iplTeam}
                onChange={(e) => setIplTeam(e.target.value)}
                className="w-full rounded-2xl bg-[#101827] border border-white/15 px-4 py-3 text-white"
              >
                {iplTeams.map((team) => (
                  <option key={team}>{team}</option>
                ))}
              </select>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl bg-[#101827] border border-white/15 px-4 py-3 text-white"
              >
                {languages.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>

              <button
                onClick={saveProfileOptions}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 py-3 font-bold"
              >
                {t.saveChanges}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full rounded-2xl bg-white/10 border border-white/15 p-4">
            <span className="flex items-center gap-2">
              <Bell size={18} /> {t.notifications}
            </span>
          </button>

          <button className="w-full rounded-2xl bg-white/10 border border-white/15 p-4">
            <span className="flex items-center gap-2">
              <Settings size={18} /> {t.settings}
            </span>
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/15 p-4 flex items-center gap-3">
          <Star className="text-yellow-300" />
          <p className="text-sm">Premium Cricket Experience Enabled</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-2xl bg-red-500/15 border border-red-400/20 p-4 flex items-center justify-center gap-2 text-red-300"
        >
          <LogOut size={18} />
          {t.logout}
        </button>
      </div>
    </div>
  );
}