import React from "react";
import { MessageSquareCode } from "lucide-react";

interface FloatingWhatsAppProps {
  number: string;
  businessName: string;
}

export default function FloatingWhatsApp({ number, businessName }: FloatingWhatsAppProps) {
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

  const message = `Hi, I saw your business website demo for *${businessName}*! Can we talk?`;
  const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;

  // Procedural UI sound module: produces a beautiful, subtle, high-frequency 'pop' or chime
  const playHoverSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Create a premium, ultra-subtle 80ms tactile tick/pop
      osc.type = "sine";
      osc.frequency.setValueAtTime(1600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.012, ctx.currentTime); // Whisper quiet to remain non-intrusive
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
      
      // Keep DOM/browser clean from context leaks
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 150);
    } catch (e) {
      // Ignored gracefully (e.g. if autoplay/gesture policies block initial context startup)
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playHoverSound}
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group border border-emerald-400/30"
      id="floating-whatsapp-btn"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-sm">
        Chat with Us
      </span>
      {/* Lucide icon styled like whatsapp */}
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45 5.5 0 10-4.5 10-10C21.447 5.101 17.218 1 12 1 6.782 1 2.5 5.282 2.5 10.5c0 1.8.5 3.5 1.4 5l-.9 3.4 3.5-.95zM16.9 14c-.3-.15-1.6-.8-1.9-.9-.3-.1-.5-.15-.7.15-.2.3-.8 1-.9 1.15-.1.15-.3.15-.6 0-.3-.15-1.25-.45-2.4-1.45-.9-.8-1.5-1.75-1.7-2-.2-.3-.02-.45.13-.6.15-.15.3-.3.45-.45.15-.15.2-.25.3-.4.1-.15.05-.3 0-.45s-.7-1.7-1-2.4c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.45-.3.35-1.15 1.1-1.15 2.7 0 1.6 1.2 3.15 1.35 3.35.15.2 2.4 3.65 5.75 5.1.8.35 1.4.55 1.9.7.8.25 1.5.2 2.1.1.6-.1 1.6-.65 1.8-1.25.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.35z" />
      </svg>
    </a>
  );
}
