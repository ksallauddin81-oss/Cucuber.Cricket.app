type Props = {
  title: string;
  description: string;
  image: string;
  source: string;
  time: string;
  url: string;
};

export default function NewsCard({
  title,
  description,
  image,
  source,
  time,
  url,
}: Props) {
  return (
    <div className="rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 hover:scale-[1.02] transition-all duration-300">
      {image ? (
        <div className="w-full aspect-[16/9] bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
          Cucuber News
        </div>
      )}

      <div className="p-4">
        <p className="text-xs text-pink-500 font-semibold mb-2 uppercase tracking-wide">
          {source}
        </p>

        <h2 className="text-lg font-bold text-black dark:text-white mb-2 line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-3 line-clamp-3">
          {description}
        </p>

        <p className="text-xs text-zinc-500 mb-4">
          {time ? new Date(time).toLocaleDateString() : ""}
        </p>

        <button
          onClick={() => {
            if (url) {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          }}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
        >
          Read More
        </button>
      </div>
    </div>
  );
}