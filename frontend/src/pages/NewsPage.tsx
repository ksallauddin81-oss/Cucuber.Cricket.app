import { useEffect, useState } from "react";
import NewsCard from "../components/TempNewsCard";
import AdCard from "../components/AdCard";
import { translations } from "../translations";

type Article = {
  title?: string;
  description?: string;
  image?: string;
  source?: any;
  publishedAt?: string;
  time?: string;
  url?: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const language = localStorage.getItem("cucuber_language") || "English";
  const t = translations[language as keyof typeof translations];

  const text = {
    loading:
      language === "తెలుగు"
        ? "వార్తలు లోడ్ అవుతున్నాయి..."
        : language === "हिन्दी"
        ? "समाचार लोड हो रहे हैं..."
        : "Loading news...",

    error:
      language === "తెలుగు"
        ? "వార్తల లోపం"
        : language === "हिन्दी"
        ? "समाचार त्रुटि"
        : "News error",

    noNews:
      language === "తెలుగు"
        ? "బ్యాకెండ్ నుండి వార్తలు దొరకలేదు."
        : language === "हिन्दी"
        ? "बैकएंड से कोई समाचार नहीं मिला."
        : "No news found from backend.",

    noTitle:
      language === "తెలుగు"
        ? "శీర్షిక లేదు"
        : language === "हिन्दी"
        ? "कोई शीर्षक नहीं"
        : "No title",

    noDescription:
      language === "తెలుగు"
        ? "వివరణ అందుబాటులో లేదు"
        : language === "हिन्दी"
        ? "विवरण उपलब्ध नहीं है"
        : "No description available",
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/news");
        const data = await res.json();

        console.log("NEWS API DATA:", data);

        if (data.status === "error" || data.error) {
          setError(data.message || data.error || "News API error");
        }

        const articles = Array.isArray(data.articles)
          ? data.articles
          : Array.isArray(data.data)
          ? data.data
          : [];

        setNews(articles);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Unable to fetch news from backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#070b16] dark:text-white px-4 py-5 pb-24 transition-all duration-300">
      <h1 className="text-xl font-bold mb-5">{t.latestNews}</h1>

      {loading && (
        <p className="text-zinc-600 dark:text-zinc-400">{text.loading}</p>
      )}

      {!loading && error && (
        <p className="text-red-500 dark:text-red-400 mb-4">
          {text.error}: {error}
        </p>
      )}

      {!loading && news.length === 0 && (
        <p className="text-zinc-600 dark:text-zinc-400">{text.noNews}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <div key={index}>
            <NewsCard
              title={article.title || text.noTitle}
              description={article.description || text.noDescription}
              image={article.image || ""}
              source={
                typeof article.source === "string"
                  ? article.source
                  : article.source?.name || "News"
              }
              time={article.time || article.publishedAt || ""}
              url={article.url || ""}
            />

            {(index + 1) % 4 === 0 && <AdCard />}
          </div>
        ))}
      </div>
    </div>
  );
}