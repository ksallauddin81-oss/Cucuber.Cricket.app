import { User, Heart, Bell, Settings, ChevronRight, Crown, Sparkles } from "lucide-react";

const favoriteTeams = [
  { name: "India", following: true },
  { name: "Australia", following: false },
  { name: "England", following: true },
];

const menuItems = [
  { icon: Bell, label: "Alert History", desc: "View past alerts", color: "from-pink-500 to-rose-500" },
  { icon: Heart, label: "Personalized Insights", desc: "AI-curated for you", color: "from-red-500 to-orange-500" },
  { icon: Settings, label: "Settings", desc: "Notifications & preferences", color: "from-cyan-500 to-blue-500" },
];

const ProfilePage = () => (
  <div className="space-y-6 animate-float-up pb-4">
    {/* Header */}
    <div className="rounded-[30px] bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 p-[1px] shadow-[0_18px_45px_rgba(139,92,246,0.24)]">
      <div className="rounded-[30px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              My Profile
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white">Your Space</h1>
            <p className="mt-1 text-sm text-white/85">
              Manage favorite teams, alerts and personalized cricket insights.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-3">
            <Sparkles className="h-6 w-6 text-yellow-200" />
          </div>
        </div>
      </div>
    </div>

    {/* Profile card */}
    <div className="rounded-[28px] bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-[0_18px_40px_rgba(59,130,246,0.22)]">
      <div className="rounded-[28px] bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-5 flex items-center gap-4 text-white">
        <div className="w-16 h-16 rounded-[22px] bg-white/15 flex items-center justify-center shadow-lg">
          <User size={30} className="text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold">Cricket Fan</h3>
          <div className="mt-1 flex items-center gap-2">
            <Crown className="h-4 w-4 text-yellow-200" />
            <p className="text-sm text-white/85">Premium Member</p>
          </div>
        </div>
      </div>
    </div>

    {/* Favorite Teams */}
    <section className="space-y-3">
      <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Favorite Teams
      </h3>

      {favoriteTeams.map((t, index) => (
        <div
          key={t.name}
          className={`rounded-[28px] p-[1px] ${
            index === 0
              ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500"
              : index === 1
              ? "bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400"
              : "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500"
          } shadow-[0_15px_35px_rgba(15,23,42,0.08)]`}
        >
          <div className="rounded-[28px] bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white shadow-sm">
                {t.name.slice(0, 3).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {t.name}
              </span>
            </div>

            <button
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                t.following
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200"
              }`}
            >
              {t.following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </section>

    {/* Menu Items */}
    <section className="space-y-4">
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-[28px] bg-gradient-to-br ${item.color} p-[1px] shadow-[0_15px_35px_rgba(15,23,42,0.08)]`}
        >
          <div className="rounded-[28px] bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
              <item.icon size={18} />
            </div>

            <div className="flex-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {item.label}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {item.desc}
              </p>
            </div>

            <ChevronRight size={16} className="text-slate-400" />
          </div>
        </div>
      ))}
    </section>

    {/* Bottom card */}
    <div className="rounded-[28px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-[0_15px_35px_rgba(16,185,129,0.22)]">
      <div className="rounded-[28px] bg-white/20 dark:bg-slate-900/35 backdrop-blur-xl p-4 text-white">
        <h3 className="text-sm font-bold">Cucuber Personalization</h3>
        <p className="mt-1 text-xs text-white/85">
          Follow your favorite teams and get smarter alerts, predictions and insights tailored just for you.
        </p>
      </div>
    </div>
  </div>
);

export default ProfilePage;