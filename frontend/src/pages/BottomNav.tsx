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

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, path: "/" },
    { icon: Calendar, path: "/matches" },
    { icon: Newspaper, path: "/news" },
    { icon: Bell, path: "/alerts" },
    { icon: Bot, path: "/chat" },
    { icon: BarChart3, path: "/stats" },
    { icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3 z-50">
      {navItems.map(({ icon: Icon, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-emerald-400" : "text-gray-400"
            }`}
          >
            <Icon size={22} />
          </button>
        );
      })}
    </div>
  );
}