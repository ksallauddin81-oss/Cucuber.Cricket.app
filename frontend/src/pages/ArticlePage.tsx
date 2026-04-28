import { useLocation, useNavigate } from "react-router-dom";

export default function ArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const url = new URLSearchParams(location.search).get("url");

  if (!url) {
    return <div className="text-white p-6">Invalid article</div>;
  }

  return (
    <div className="h-screen w-full bg-black">
      <div className="flex items-center justify-between p-3 bg-zinc-900 text-white">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-zinc-700 rounded-lg"
        >
          ← Back
        </button>

        <span className="text-sm">Reading Article</span>

        <button
          onClick={() => window.open(url, "_blank")}
          className="px-3 py-1 bg-purple-600 rounded-lg text-sm"
        >
          Browser
        </button>
      </div>

      <div className="h-[calc(100%-50px)] bg-zinc-950">
        <iframe
          src={url}
          title="news"
          className="w-full h-full"
        />

        <div className="absolute inset-0 top-[50px] pointer-events-none flex items-end justify-center pb-6">
          <div className="pointer-events-auto bg-zinc-900/90 text-white rounded-2xl p-4 mx-4 text-center border border-white/10">
            <p className="text-sm mb-3">
              If this article refuses to load, open it in browser.
            </p>
            <button
              onClick={() => window.open(url, "_blank")}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-xl"
            >
              Open in Browser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}