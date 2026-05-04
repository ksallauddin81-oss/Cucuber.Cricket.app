import {
  Home,
  Calendar,
  Newspaper,
  Bot,
  User,
  Trophy,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { translations } from "../translations";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const language = localStorage.getItem("cucuber_language") || "English";
  const t = translations[language as keyof typeof translations];

  const tabs = [
    { icon: Home, label: t?.home || "Home", path: "/" },
    { icon: Calendar, label: t?.matches || "Matches", path: "/matches" },
    { icon: Newspaper, label: t?.news || "News", path: "/news" },
    { icon: Bot, label: t?.ai || "AI", path: "/chat" },
    { icon: Trophy, label: "Board", path: "/leaderboard" },
    { icon: User, label: t?.profile || "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-50">
      <nav className="w-[95%] max-w-md rounded-3xl border border-white/20 bg-black/60 backdrop-blur-2xl px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-between">
          {tabs.map((tab) => {
            const isActive =
              location.pathname === tab.path ||
              (tab.path !== "/" && location.pathname.startsWith(tab.path));

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center gap-1 flex-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-active-pill"
                    className="absolute -top-1 h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-emerald-400 shadow-lg"
                  />
                )}

                <motion.div
                  whileTap={{ scale: 0.85 }}
                  animate={isActive ? { y: -5, scale: 1.08 } : { y: 0 }}
                  className={`relative z-10 p-2 rounded-2xl transition-all ${
                    isActive ? "text-black" : "text-white/55"
                  }`}
                >
                  <tab.icon size={19} />
                </motion.div>

                <span
                  className={`relative z-10 text-[10px] font-black text-center ${
                    isActive ? "text-yellow-300" : "text-white/45"
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 h-1 w-1 rounded-full bg-yellow-300"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;