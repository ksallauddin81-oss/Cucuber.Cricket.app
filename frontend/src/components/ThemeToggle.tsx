import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const selectedTheme = savedTheme || "dark";

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(selectedTheme);
    setTheme(selectedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-3 right-3 z-[9999] h-8 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md flex items-center px-1 transition-all duration-300"
    >
      <div
        className={`h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-300 ${
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