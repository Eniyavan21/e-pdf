"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent_accepted");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent_accepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-900/95 text-white p-5 rounded-2xl shadow-2xl backdrop-blur-md z-50 border border-slate-700/80 transition-all animate-fade-in text-sm"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-slate-100 text-base mb-1">🍪 Cookie & Privacy Notice</p>
          <p className="text-slate-300 text-xs leading-relaxed">
            We use cookies and Google AdSense to personalize ads and analyze site traffic. Your PDF files stay 100% on your device and are never uploaded to any server. Learn more in our{" "}
            <Link href="/privacy-policy" className="text-blue-400 underline hover:text-blue-300">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </aside>
  );
}
