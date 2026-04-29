import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type GoogleAdProps = {
  slot?: string;
};

export default function GoogleAd({
  slot = "1570740764",
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      const loaded =
        adRef.current?.getAttribute(
          "data-adsbygoogle-status"
        );

      if (!loaded) {
        (window.adsbygoogle =
          window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("AdSense Error:", error);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: "block",
        width: "100%",
        minHeight: "120px",
      }}
      data-ad-client="ca-pub-9073998988181078"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}