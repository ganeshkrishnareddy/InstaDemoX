import React, { useEffect, useState } from "react";
import { Sparkles, MessageCircle } from "lucide-react";
import { getApiUrl } from "../../utils/api";

interface StickyCTABannerProps {
  slug: string;
  agencyWhatsapp?: string;
  businessName: string;
  createdAt?: string;
}

export default function StickyCTABanner({ slug, agencyWhatsapp, businessName, createdAt }: StickyCTABannerProps) {
  const [timeRemainingText, setTimeRemainingText] = useState("72h 00m 00s");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const createdTime = createdAt ? new Date(createdAt).getTime() : Date.now();
      const expirationTime = createdTime + 72 * 60 * 60 * 1000; // 72 hours
      const now = Date.now();
      const diff = expirationTime - now;

      if (diff <= 0) {
        setTimeRemainingText("Offer Expired (Active Permanent Demo Model)");
        return false;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const hStr = hours < 10 ? `0${hours}` : `${hours}`;
      const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const sStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

      setTimeRemainingText(`${hStr}h ${mStr}m ${sStr}s`);
      return true;
    };

    calculateTimeLeft();
    const intervalId = setInterval(() => {
      const active = calculateTimeLeft();
      if (!active) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  const number = agencyWhatsapp || "918123456789"; // Default ProgVision WhatsApp if env not specified
  
  // Format WhatsApp Link
  let cleanNum = number.replace(/\D/g, "");
  if (cleanNum.startsWith("0")) {
    cleanNum = cleanNum.substring(1);
  }
  if (cleanNum.startsWith("91") && cleanNum.length > 10) {
    // Already has country code
  } else if (cleanNum.length === 10) {
    cleanNum = "91" + cleanNum;
  }

  const appUrl = window.location.origin;
  const demoUrl = `${appUrl}/${slug}`;
  const textMessage = `Hi ProgVision, I just saw my demo website for *${businessName}* at ${demoUrl} and I'm interested in getting it live!`;
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(textMessage)}`;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-t border-neutral-800 px-4 py-3.5 sm:py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.85)]"
      id="sticky-cta-banner"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg animate-pulse border border-amber-500/20">
            <Sparkles className="w-5 h-5 animate-float" id="cta-sparkles" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base tracking-tight font-sora">
              Love your website? Get it live on your own domain!
            </p>
            <p className="text-[#AEB2B7] text-[11px] sm:text-xs mt-0.5 font-light">
              ⏳ Special Offer Countdown: <span className="text-amber-500 font-bold font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">{timeRemainingText}</span> remaining · Launch at just <span className="text-amber-500 font-bold font-mono">₹499/month</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              fetch(getApiUrl("/api/track-event"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, event: "click_whatsapp" })
              }).catch(() => {});
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10 active:scale-98"
            id="cta-whatsapp-agency"
          >
            <MessageCircle className="w-4.5 h-4.5 fill-current text-black" />
            Get It Live Now
          </a>
        </div>
      </div>
    </div>
  );
}
