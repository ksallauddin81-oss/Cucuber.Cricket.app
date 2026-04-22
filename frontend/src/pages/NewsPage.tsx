import { useState } from "react";
import { TrendingUp } from "lucide-react";

const categories = ["All", "International", "Domestic", "Leagues"];

const articles = [
  {
    title: "Kohli smashes century in crucial ODI against Australia",
    category: "International",
    time: "2h ago",
    trending: true,
  },
  {
    title: "IPL 2026: New auction rules announced by BCCI",
    category: "Leagues",
    time: "4h ago",
    trending: true,
  },
  {
    title: "Bumrah returns to Test squad for NZ series",
    category: "International",
    time: "6h ago",
    trending: false,
  },
  {
    title: "Ranji Trophy final set for Wankhede Stadium",
    category: "Domestic",
    time: "8h ago",
    trending: false,
  },
  {
    title: "England announce squad for Ashes preparation tour",
    category: "International",
    time: "12h ago",
    trending: false,
  },
];

const NewsPage = () => {
  const [cat, setCat] = useState("All");
  const filtered =
    cat === "All" ? articles : articles.filter((a) => a.category === cat);

  return (
    <div className="min-h-screen space-y-5 animate-float-up bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:from-black dark:via-slate-900 dark:to-black p-3 rounded-2xl">
      <h2 className="font-display font-bold text-lg text-foreground">
        Cricket News 📰
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-300 ${
              cat === c
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                : "bg-white/20 dark:bg-white/10 backdrop-blur text-muted-foreground hover:bg-primary/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((a, i) => (
          <div
            key={i}
            className={`rounded-2xl p-[1px] ${
              a.trending
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                : "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            }`}
          >
            <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl p-4 space-y-2 cursor-pointer transition-all hover:scale-[1.02]">
              {a.trending && (
                <div className="flex items-center gap-1 text-xs text-orange-400 font-semibold">
                  <TrendingUp size={12} /> Trending
                </div>
              )}

              <h3 className="text-sm font-bold leading-snug text-foreground">
                {a.title}
              </h3>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="px-2 py-0.5 rounded bg-white/20 dark:bg-white/10">
                  {a.category}
                </span>
                <span>{a.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;