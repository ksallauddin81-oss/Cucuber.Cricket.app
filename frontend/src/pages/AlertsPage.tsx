import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Bell,
  BellRing,
  Trophy,
  PlayCircle,
  PauseCircle,
  CloudRain,
  Zap,
  Flame,
  ShieldAlert,
  Timer,
  Target,
  RefreshCw,
  CheckCircle2,
  Clock3,
  Lightbulb,
} from "lucide-react";

type AlertItem = {
  id: number;
  title: string;
  desc: string;
  icon: any;
  color: string;
};

export default function AlertsPage() {
  const language = localStorage.getItem("cucuber_language") || "English";

  const alertItems: AlertItem[] = [
    { id: 1, title: language === "తెలుగు" ? "టాస్ అలర్ట్" : language === "हिन्दी" ? "टॉस अलर्ट" : "Toss Alert", desc: language === "తెలుగు" ? "టాస్ ప్రారంభానికి ముందు తెలియజేస్తుంది." : language === "हिन्दी" ? "टॉस शुरू होने से पहले बताएगा." : "Notify before toss starts.", icon: Trophy, color: "from-yellow-400 to-orange-500" },
    { id: 2, title: language === "తెలుగు" ? "మ్యాచ్ స్టార్ట్ రిమైండర్" : language === "हिन्दी" ? "मैच स्टार्ट रिमाइंडर" : "Match Start Reminder", desc: language === "తెలుగు" ? "మ్యాచ్ ప్రారంభానికి ముందు అలర్ట్." : language === "हिन्दी" ? "मैच शुरू होने से पहले अलर्ट." : "Alert when match is about to begin.", icon: Timer, color: "from-emerald-400 to-cyan-400" },
    { id: 3, title: language === "తెలుగు" ? "వికెట్ అలర్ట్" : language === "हिन्दी" ? "विकेट अलर्ट" : "Wicket Alert", desc: language === "తెలుగు" ? "వికెట్ పడగానే వెంటనే అలర్ట్." : language === "हिन्दी" ? "विकेट गिरते ही तुरंत अलर्ट." : "Instant alert when a wicket falls.", icon: ShieldAlert, color: "from-red-400 to-pink-500" },
    { id: 4, title: language === "తెలుగు" ? "సిక్స్ అలర్ట్" : language === "हिन्दी" ? "सिक्स अलर्ट" : "Six Alert", desc: language === "తెలుగు" ? "సిక్స్ కొట్టినప్పుడు తెలియజేస్తుంది." : language === "हिन्दी" ? "छक्का लगने पर बताएगा." : "Notify when a big six is hit.", icon: Flame, color: "from-orange-400 to-red-500" },
    { id: 5, title: language === "తెలుగు" ? "ఫోర్ అలర్ట్" : language === "हिन्दी" ? "फोर अलर्ट" : "Four Alert", desc: language === "తెలుగు" ? "బౌండరీ వచ్చినప్పుడు అలర్ట్." : language === "हिन्दी" ? "चौका लगने पर अलर्ट." : "Alert when a boundary is scored.", icon: Zap, color: "from-purple-400 to-indigo-500" },
    { id: 6, title: language === "తెలుగు" ? "వర్షం ఆలస్యం అలర్ట్" : language === "हिन्दी" ? "बारिश देरी अलर्ट" : "Rain Delay Alert", desc: language === "తెలుగు" ? "వర్షం వల్ల ఆట ఆగితే తెలియజేస్తుంది." : language === "हिन्दी" ? "बारिश से खेल रुके तो बताएगा." : "Notify when rain stops play.", icon: CloudRain, color: "from-sky-400 to-blue-500" },
    { id: 7, title: language === "తెలుగు" ? "ఆట మళ్లీ ప్రారంభం అలర్ట్" : language === "हिन्दी" ? "खेल फिर शुरू अलर्ट" : "Play Resume Alert", desc: language === "తెలుగు" ? "మ్యాచ్ మళ్లీ ప్రారంభమైనప్పుడు తెలియజేస్తుంది." : language === "हिन्दी" ? "मैच फिर शुरू होने पर बताएगा." : "Notify when match resumes again.", icon: PlayCircle, color: "from-green-400 to-emerald-500" },
    { id: 8, title: language === "తెలుగు" ? "డ్రింక్స్ బ్రేక్ అలర్ట్" : language === "हिन्दी" ? "ड्रिंक्स ब्रेक अलर्ट" : "Drinks Break Alert", desc: language === "తెలుగు" ? "డ్రింక్స్ బ్రేక్ సమయంలో అలర్ట్." : language === "हिन्दी" ? "ड्रिंक्स ब्रेक के दौरान अलर्ट." : "Alert during drinks break.", icon: PauseCircle, color: "from-cyan-400 to-blue-500" },
    { id: 9, title: language === "తెలుగు" ? "ఇన్నింగ్స్ పూర్తయిన అలర్ట్" : language === "हिन्दी" ? "इनिंग्स पूरी अलर्ट" : "Innings Completed Alert", desc: language === "తెలుగు" ? "ఇన్నింగ్స్ పూర్తయినప్పుడు తెలియజేస్తుంది." : language === "हिन्दी" ? "इनिंग्स पूरी होने पर बताएगा." : "Notify when innings is completed.", icon: CheckCircle2, color: "from-lime-400 to-green-500" },
    { id: 10, title: language === "తెలుగు" ? "టార్గెట్ అలర్ట్" : language === "हिन्दी" ? "टारगेट अलर्ट" : "Target Alert", desc: language === "తెలుగు" ? "టార్గెట్ అప్‌డేట్ అయినప్పుడు తెలియజేస్తుంది." : language === "हिन्दी" ? "टारगेट अपडेट होने पर बताएगा." : "Notify when target is updated.", icon: Target, color: "from-pink-400 to-rose-500" },
    { id: 11, title: language === "తెలుగు" ? "స్కోర్ అప్‌డేట్ అలర్ట్" : language === "हिन्दी" ? "स्कोर अपडेट अलर्ट" : "Score Update Alert", desc: language === "తెలుగు" ? "రెగ్యులర్ స్కోర్ అప్‌డేట్ నోటిఫికేషన్స్." : language === "हिन्दी" ? "रेगुलर स्कोर अपडेट नोटिफिकेशन." : "Regular score update notifications.", icon: RefreshCw, color: "from-indigo-400 to-purple-500" },
    { id: 12, title: language === "తెలుగు" ? "ఓవర్ పూర్తయిన అలర్ట్" : language === "हिन्दी" ? "ओवर पूरा अलर्ट" : "Over Completion Alert", desc: language === "తెలుగు" ? "ప్రతి ఓవర్ పూర్తయిన తర్వాత తెలియజేస్తుంది." : language === "हिन्दी" ? "हर ओवर पूरा होने के बाद बताएगा." : "Notify after every over completion.", icon: Clock3, color: "from-orange-400 to-amber-500" },
  ];

  const [enabled, setEnabled] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem("cucuber_alerts");
    return saved
      ? JSON.parse(saved)
      : { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 9: true, 10: true, 11: true };
  });

  const lastRunsRef = useRef<number | null>(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    localStorage.setItem("cucuber_alerts", JSON.stringify(enabled));
  }, [enabled]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const showPopup = (title: string, message: string) => {
    toast.success(message, {
      description: title,
      duration: 5000,
    });

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico",
      });
    }
  };

  const getRuns = (match: any) => {
    const text = JSON.stringify(match);
    const scoreMatch = text.match(/(\d+)\s*\/\s*\d+/);
    if (scoreMatch) return Number(scoreMatch[1]);

    const runsMatch = text.match(/"r"\s*:\s*(\d+)/);
    if (runsMatch) return Number(runsMatch[1]);

    return null;
  };

  useEffect(() => {
    const checkLiveScore = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/matches");
        const data = await res.json();

        const liveMatch = data?.live?.[0];
        if (!liveMatch) return;

        const currentRuns = getRuns(liveMatch);
        if (currentRuns === null) return;

        if (lastRunsRef.current === null) {
          lastRunsRef.current = currentRuns;
          return;
        }

        const diff = currentRuns - lastRunsRef.current;

        if (diff === 4 && enabledRef.current[5]) {
          showPopup("🏏 Four Alert", "Boundary! A FOUR has been hit.");
        }

        if (diff === 6 && enabledRef.current[4]) {
          showPopup("🔥 Six Alert", "Massive SIX! Ball goes out of the park.");
        }

        if (diff > 0 && enabledRef.current[11]) {
          toast.info(`Score updated: +${diff} runs`);
        }

        lastRunsRef.current = currentRuns;
      } catch (err) {
        console.log("Alert polling error:", err);
      }
    };

    checkLiveScore();
    const interval = setInterval(checkLiveScore, 15000);

    return () => clearInterval(interval);
  }, []);

  const toggleAlert = (id: number) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCount = Object.values(enabled).filter(Boolean).length;

  const pageText = {
    smart: language === "తెలుగు" ? "కుక్యూబర్ స్మార్ట్ నోటిఫికేషన్స్" : language === "हिन्दी" ? "कुक्यूबर स्मार्ट नोटिफिकेशन" : "Cucuber Smart Notifications",
    title: language === "తెలుగు" ? "మ్యాచ్ అలర్ట్స్" : language === "हिन्दी" ? "मैच अलर्ट" : "Match Alerts",
    desc: language === "తెలుగు" ? "టాస్, వికెట్లు, సిక్సులు, వర్షం ఆలస్యం, ఆట మళ్లీ ప్రారంభం మరియు మరిన్ని అలర్ట్స్ ఆన్ చేయండి." : language === "हिन्दी" ? "टॉस, विकेट, सिक्स, बारिश देरी, खेल फिर शुरू और अन्य अलर्ट चालू करें." : "Turn on alerts for toss, wickets, sixes, rain delay, play resume and more.",
    active: language === "తెలుగు" ? "యాక్టివ్ అలర్ట్స్" : language === "हिन्दी" ? "सक्रिय अलर्ट" : "Active alerts",
    on: language === "తెలుగు" ? "నోటిఫికేషన్ ఆన్" : language === "हिन्दी" ? "नोटिफिकेशन चालू" : "Notification ON",
    off: language === "తెలుగు" ? "నోటిఫికేషన్ ఆఫ్" : language === "हिन्दी" ? "नोटिफिकेशन बंद" : "Notification OFF",
    tip: language === "తెలుగు" ? "మీరు ఈ సెట్టింగ్స్ ఎప్పుడైనా మార్చవచ్చు." : language === "हिन्दी" ? "आप ये सेटिंग्स कभी भी बदल सकते हैं." : "You can change these settings anytime.",
  };

  return (
    <div className="min-h-screen px-4 py-5 pb-32 text-white bg-[radial-gradient(circle_at_top,#251056_0%,#07111f_45%,#020617_100%)]">
      <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 rounded-3xl border border-purple-500/40 bg-[#0b1024]/70 p-5 shadow-2xl shadow-purple-900/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-3xl bg-purple-500/20 border border-purple-300/30 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.7)]">
              <BellRing className="text-purple-300" size={30} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-extrabold text-purple-300">{pageText.smart}</p>
              <h1 className="text-3xl font-extrabold">{pageText.title}</h1>
              <p className="mt-2 text-sm text-zinc-300">{pageText.desc}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="rounded-full border border-purple-400 bg-purple-500/20 px-4 py-2 text-sm font-extrabold text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.6)]">
              🔔 {activeCount}/{alertItems.length} ON
            </div>
            <p className="mt-2 text-xs text-zinc-300">{pageText.active}</p>
          </div>
        </div>

        <button
          onClick={() => showPopup("🏏 Test Four Alert", "Popup working! Boundary alert is ready.")}
          className="mt-4 rounded-2xl bg-purple-500 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-purple-900/40"
        >
          Test Popup
        </button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {alertItems.map((item, index) => {
          const Icon = item.icon;
          const isOn = !!enabled[item.id];

          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.035 }} whileHover={{ scale: 1.015, y: -3 }} className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#0b1227]/80 p-5 shadow-xl">
              <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-2xl`} />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={25} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-extrabold leading-tight">{item.title}</h2>
                    <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Bell size={15} className={isOn ? "text-emerald-300" : "text-zinc-500"} />
                      <span className={`text-xs font-extrabold ${isOn ? "text-emerald-300" : "text-zinc-500"}`}>
                        {isOn ? pageText.on : pageText.off}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-5 border-l border-purple-500/40">
                  <button type="button" onClick={() => toggleAlert(item.id)} className={`relative h-8 w-[62px] rounded-full border transition-all duration-300 ${isOn ? "bg-emerald-500 border-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.6)]" : "bg-zinc-700 border-zinc-500"}`}>
                    <motion.span animate={{ left: isOn ? "31px" : "4px" }} transition={{ type: "spring", stiffness: 450, damping: 28 }} className="absolute top-[3px] h-6 w-6 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 flex items-center gap-3">
        <Lightbulb className="text-purple-300" size={24} />
        <p className="text-sm text-zinc-300">
          <span className="font-bold text-white">Tip:</span> {pageText.tip}
        </p>
      </div>
    </div>
  );
}