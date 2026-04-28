import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdCard() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log("AdSense Error:", error);
    }
  }, []);

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-3 shadow-lg overflow-hidden">
      <p className="text-xs font-bold text-emerald-400 mb-2 px-2">
        Sponsored
      </p>

      <div className="rounded-2xl bg-white/10 dark:bg-black/30 p-3">
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            minHeight: "100px",
            width: "100%",
          }}
          data-ad-client="ca-pub-PASTE_YOUR_PUBLISHER_ID"
          data-ad-slot="PASTE_YOUR_AD_SLOT_ID"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}