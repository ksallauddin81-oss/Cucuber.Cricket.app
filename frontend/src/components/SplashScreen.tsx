import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 950);
    const t3 = setTimeout(() => setStep(3), 1500);
    const t4 = setTimeout(() => setStep(4), 2200);
    const t5 = setTimeout(() => setStep(5), 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const letters = ["u", "c", "u", "b", "e", "r"];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* bright cartoon background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-green-200" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-lime-300 to-green-400" />

      {/* soft clouds */}
      <div className="absolute left-[8%] top-[12%] h-16 w-28 rounded-full bg-white/70 blur-sm" />
      <div className="absolute left-[14%] top-[10%] h-12 w-20 rounded-full bg-white/70 blur-sm" />
      <div className="absolute right-[10%] top-[14%] h-16 w-28 rounded-full bg-white/70 blur-sm" />
      <div className="absolute right-[16%] top-[11%] h-12 w-20 rounded-full bg-white/70 blur-sm" />

      <div className="relative h-full w-full">
        {/* hit flash */}
        <div
          className={`absolute left-[46.2%] top-[55.4%] h-16 w-16 rounded-full bg-yellow-100 blur-2xl transition-all duration-300 ${
            step === 2 ? "scale-100 opacity-90" : "scale-0 opacity-0"
          }`}
        />

        {/* bat */}
        <div
          className={`absolute left-[36%] top-[50%] origin-[85%_90%] transition-all ${
            step === 0
              ? "rotate-[-48deg] scale-95 opacity-100 duration-500"
              : step === 1
              ? "rotate-[-18deg] scale-100 opacity-100 duration-500"
              : step === 2
              ? "rotate-[22deg] scale-105 opacity-100 duration-200"
              : "rotate-[22deg] scale-90 opacity-0 duration-500"
          }`}
        >
          <div className="relative h-36 w-10 rounded-b-2xl rounded-t-md bg-gradient-to-b from-amber-200 via-orange-300 to-orange-500 shadow-[0_10px_28px_rgba(249,115,22,0.35)]">
            <div className="absolute left-1/2 top-3 h-16 w-[2px] -translate-x-1/2 bg-white/20" />
            <div className="absolute left-1/2 top-8 h-14 w-[2px] -translate-x-1/2 bg-white/10" />
            <div className="absolute -top-6 left-1/2 h-7 w-4 -translate-x-1/2 rounded-t-md bg-red-500" />
            <div className="absolute -top-9 left-1/2 h-3 w-2 -translate-x-1/2 rounded-t-sm bg-red-700" />
          </div>
        </div>

        {/* soft trail */}
        <div
          className={`absolute left-[46%] top-[56%] h-2 rounded-full bg-gradient-to-r from-white/0 via-white/80 to-white/0 blur-sm transition-all duration-500 ${
            step >= 3 ? "w-44 opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* ball */}
        <div
          className={`absolute transition-all ${
            step === 0
              ? "left-[43%] top-[56.5%] scale-100 opacity-100 duration-500"
              : step === 1
              ? "left-[46.1%] top-[55.7%] scale-100 opacity-100 duration-500"
              : step === 2
              ? "left-[46.4%] top-[55.5%] scale-110 opacity-100 duration-150"
              : step === 3
              ? "left-[49%] top-[43%] scale-[2.3] opacity-100 duration-500"
              : "left-[49%] top-[43%] scale-0 opacity-0 duration-400"
          }`}
        >
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 shadow-[0_10px_24px_rgba(239,68,68,0.35)]">
            <div className="absolute left-[22%] top-[18%] h-[62%] w-[10%] rotate-[20deg] rounded-full bg-white/85" />
            <div className="absolute left-[50%] top-[18%] h-[62%] w-[10%] rotate-[20deg] rounded-full bg-white/85" />
          </div>
        </div>

        {/* logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center">
            <div
              className={`relative text-[160px] font-black leading-none transition-all duration-700 ${
                step >= 4 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <span className="bg-gradient-to-b from-white via-slate-50 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.18)]">
                C
              </span>
            </div>

            <div
              className={`absolute left-1/2 top-1/2 transition-all duration-700 ${
                step >= 4
                  ? "translate-x-[20%] -translate-y-[42%] opacity-100"
                  : "translate-x-24 -translate-y-[42%] opacity-0"
              }`}
            >
              <div className="flex gap-1.5">
                {letters.map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className={`text-[48px] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent transition-all duration-500 ${
                      step >= 4 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`-mt-3 text-xs tracking-[0.35em] text-white/80 transition-all duration-700 ${
                step >= 4 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              CRICKET INTELLIGENCE
            </div>
          </div>
        </div>

        {/* developed by */}
        <div
          className={`absolute bottom-10 right-8 text-right transition-all duration-700 ${
            step >= 5 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-lg font-bold text-white">Developed by</p>
          <p className="mt-2 text-lg font-extrabold bg-gradient-to-r from-lime-200 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Sallauddin Karamalla
          </p>
          <p className="text-lg font-extrabold bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Srinadh Kandula
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;