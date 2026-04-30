import { Home, Trophy, Newspaper, Bell, Bot, BarChart3, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/matches", icon: Trophy, label: "Matches" },
  { to: "/news", icon: Newspaper, label: "News" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
  { to: "/chat", icon: Bot, label: "AI" },
  { to: "/stats", icon: BarChart3, label: "Stats" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="grid grid-cols-7 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-2xl py-2 text-[10px] font-semibold transition ${
                  isActive
                    ? "bg-emerald-500 text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span className="mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}