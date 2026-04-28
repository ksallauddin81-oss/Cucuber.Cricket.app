import {
  Home,
  Calendar,
  Newspaper,
  Bell,
  Bot,
  BarChart3,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "../translations";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const language =
    localStorage.getItem("cucuber_language") || "English";

  const t =
    translations[language as keyof typeof translations];

  const tabs = [
    { icon: Home, label: t.home, path: "/" },
    { icon: Calendar, label: t.matches, path: "/matches" },
    { icon: Newspaper, label: t.news, path: "/news" },
    { icon: Bell, label: t.alerts, path: "/alerts" },
    { icon: Bot, label: t.ai, path: "/chat" },
    { icon: BarChart3, label: t.stats, path: "/stats" },
    { icon: User, label: t.profile, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-50">
      <nav
        className="
        w-[95%] max-w-md
        backdrop-blur-xl
        bg-white/30 dark:bg-black/40
        border border-white/20 dark:border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        rounded-2xl px-2 py-2
      "
      >
        <div className="flex items-center justify-between">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                      : "text-muted-foreground"
                  }`}
                >
                  <tab.icon size={18} />
                </div>

                <span
                  className={`text-[10px] font-medium text-center ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
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