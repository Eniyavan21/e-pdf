"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "rectangle";
  className?: string;
}

export default function AdBanner({ slot, format = "horizontal", className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
      if (!publisherId) return;
      // @ts-expect-error — adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet or blocked by ad blocker
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!publisherId) {
    // Placeholder in development when no publisher ID is set
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs ${
          format === "rectangle" ? "ad-banner-rectangle" : "ad-banner-leaderboard"
        } ${className}`}
      >
        Ad Banner ({format})
      </div>
    );
  }

  return (
    <div
      className={`${format === "rectangle" ? "ad-banner-rectangle" : "ad-banner-leaderboard"} ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format === "rectangle" ? "rectangle" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
