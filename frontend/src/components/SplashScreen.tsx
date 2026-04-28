import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);   // ball move
    const t2 = setTimeout(() => setStep(2), 2100);  // hit wickets
    const t3 = setTimeout(() => setStep(3), 2800);  // logo
    const t4 = setTimeout(() => setStep(4), 4200);  // names

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#050713] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,#22d3ee66,transparent_30%),radial-gradient(circle_at_80%_20%,#a855f766,transparent_30%),radial-gradient(circle_at_50%_90%,#22c55e55,transparent_38%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-green-600/50 to-transparent" />

      {/* Pitch */}
      <div className="absolute left-1/2 top-[18%] bottom-[18%] w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-200/10 via-lime-300/20 to-green-500/25 blur-sm" />

      {/* Wickets Only */}
      <div
        className={`absolute left-1/2 top-[56%] -translate-x-1/2 transition-all duration-500 ${
          step >= 2
            ? "opacity-0 scale-75 rotate-6"
            : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <div className="flex gap-2">
          <div className="w-3 h-24 rounded-full bg-yellow-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          <div className="w-3 h-24 rounded-full bg-yellow-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          <div className="w-3 h-24 rounded-full bg-yellow-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        </div>
      </div>

      {/* Ball */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 transition-all ${
          step === 0
            ? "top-[20%] scale-[0.25] opacity-0"
            : step === 1
            ? "top-[54%] scale-[1.25] opacity-100 duration-[1600ms] ease-in"
            : "top-[54%] scale-[2.2] opacity-0 duration-300"
        }`}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-[0_0_35px_rgba(239,68,68,0.9)]" />
      </div>

      {/* Impact Flash */}
      <div
        className={`absolute left-1/2 top-[54%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200 blur-3xl transition-all duration-500 ${
          step >= 2 ? "scale-100 opacity-80" : "scale-0 opacity-0"
        }`}
      />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`text-center transition-all duration-1000 ${
            step >= 3
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-75 opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
            CUCUBER
          </h1>

          <div className="mt-4 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs font-bold tracking-[0.35em] text-white/85">
            CRICKET INTELLIGENCE
          </div>
        </div>
      </div>

      {/* Developed By */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-6 text-center transition-all duration-1000 ${
          step >= 4 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-sm text-white/70">Developed by</p>

        <div className="mx-auto mt-3 max-w-md rounded-3xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
          <p className="text-lg font-bold bg-gradient-to-r from-lime-200 to-cyan-300 bg-clip-text text-transparent">
            Sallauddin Karamalla
          </p>
          <p className="text-lg font-bold bg-gradient-to-r from-cyan-200 to-violet-300 bg-clip-text text-transparent">
            Srinadh Kandula
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;