import { useEffect, useState } from "react";
import { Globe, User, Trophy } from "lucide-react";
import { translations } from "../translations";

export default function ProfilePage() {
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

  const languages = ["English", "తెలుగు", "हिन्दी"];

  return (
    <div className="min-h-screen px-4 pt-6 pb-24">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User /> {t.profile || "Profile"}
      </h1>

      {/* User Info */}
      <div className="bg-white/10 dark:bg-black/30 p-4 rounded-2xl mb-6">
        <p className="text-lg font-semibold">Cucuber User</p>
        <p className="text-sm opacity-70">Welcome to Cucuber 🚀</p>
      </div>

      {/* Language Selector */}
      <div className="bg-white/10 dark:bg-black/30 p-4 rounded-2xl mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe />
          <p className="font-semibold">{t.language || "Language"}</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-xl border ${
                language === lang
                  ? "bg-emerald-500 text-white"
                  : "bg-white/10"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white/10 dark:bg-black/30 p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Trophy />
          <p className="font-semibold">Leaderboard</p>
        </div>

        <p className="text-sm opacity-70">
          Compete in quizzes and climb rankings 🔥
        </p>
      </div>
    </div>
  );
}