import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";

    setTheme(savedTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="fixed top-4 right-4 z-[10000] h-8 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl flex items-center px-1 transition-all duration-300"
    >
      <div
        className={`h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 ${
          theme === "light"
            ? "translate-x-6 text-yellow-500"
            : "translate-x-0 text-indigo-600"
        }`}
      >
        {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
      </div>
    </button>
  );
}