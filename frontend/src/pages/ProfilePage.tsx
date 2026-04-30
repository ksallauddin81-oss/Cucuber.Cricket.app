import { useEffect, useState } from "react";
import { LogOut, Globe, User, Bell, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { translations } from "../translations";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(
    localStorage.getItem("cucuber_language") || "English"
  );

  const t =
    translations[language as keyof typeof translations] ||
    translations.English;

  useEffect(() => {
    localStorage.setItem("cucuber_language", language);
    window.dispatchEvent(new Event("languageChanged"));
  }, [language]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cucuber_user");
    localStorage.removeItem("cucuber_token");
    localStorage.removeItem("cucuber_phone");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  const languages = ["English", "తెలుగు", "हिन्दी"];

  return (
    <div className="min-h-screen px-4 pt-5 pb-28 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-md mx-auto space-y-5">
        {/* Header */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-black" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                {t?.profile || "Profile"}
              </h1>
              <p className="text-sm text-white/60">Cucuber User</p>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-cyan-300" />
            <h2 className="text-lg font-bold">Language</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-2xl py-3 text-sm font-bold transition-all ${
                  language === lang
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-300" />
            <span className="font-semibold">AI Alerts Enabled</span>
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-300" />
            <span className="font-semibold">Secure Account</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full rounded-3xl py-4 bg-gradient-to-r from-red-500 to-pink-500 font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}