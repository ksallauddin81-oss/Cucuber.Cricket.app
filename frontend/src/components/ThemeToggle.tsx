import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50"
    >
      <div
        className={`relative flex h-12 w-24 items-center rounded-full p-1 transition-all duration-500 shadow-lg border overflow-hidden ${
          isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white/90 border-slate-200 backdrop-blur-md"
        }`}
      >
        <div className="absolute inset-0 opacity-80">
          <div
            className={`h-full w-full transition-all duration-500 ${
              isDark
                ? "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900"
                : "bg-gradient-to-r from-sky-100 via-white to-amber-50"
            }`}
          />
        </div>

        <div className="relative z-10 flex w-full items-center justify-between px-2">
          <Sun
            size={16}
            className={`transition-all duration-300 ${
              isDark ? "text-slate-500" : "text-amber-500"
            }`}
          />
          <Moon
            size={16}
            className={`transition-all duration-300 ${
              isDark ? "text-cyan-300" : "text-slate-400"
            }`}
          />
        </div>

        <div
          className={`absolute top-1 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-500 ${
            isDark
              ? "translate-x-[48px] bg-gradient-to-br from-indigo-500 to-cyan-400 text-white"
              : "translate-x-0 bg-gradient-to-br from-amber-400 to-orange-500 text-white"
          }`}
        >
          {isDark ? <Moon size={17} /> : <Sun size={17} />}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;