import React, { useEffect, useState } from "react";
import { Sparkles, Loader2, Cpu, CheckCircle } from "lucide-react";

interface ProgressLoaderProps {
  businessName: string;
  onCompleted: () => void;
}

export default function ProgressLoader({ businessName, onCompleted }: ProgressLoaderProps) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("Initializing your website...");

  useEffect(() => {
    // Total duration: 12000 ms (12 seconds)
    const totalDuration = 12000;
    const intervalTime = 100; // update state every 100ms
    const totalSteps = totalDuration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentPercent = Math.min(Math.round((step / totalSteps) * 100), 100);
      setPercent(currentPercent);

      // Status messages based on progress percentage
      if (currentPercent < 25) {
        setStatus("Initializing your website...");
      } else if (currentPercent < 50) {
        setStatus("Applying your business name...");
      } else if (currentPercent < 75) {
        setStatus("Loading your location on the map...");
      } else if (currentPercent < 90) {
        setStatus("Adding your contact details...");
      } else if (currentPercent < 100) {
        setStatus("Finalizing your design...");
      } else {
        setStatus("Your website is ready! 🎉");
      }

      if (step >= totalSteps) {
        clearInterval(timer);
        // Delay callback slightly to allow viewing of "Your website is ready!"
        setTimeout(() => {
          onCompleted();
        }, 1000);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onCompleted]);

  return (
    <div className="fixed inset-0 z-50 bg-[#060606] flex flex-col items-center justify-center p-6 text-white font-inter">
      <div className="w-full max-w-lg bg-[#0D0D0D] border border-neutral-800 rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center relative overflow-hidden">
        
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Loading Spinner / Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full animate-pulse relative border border-amber-500/20">
            {percent < 100 ? (
              <Cpu className="w-10 h-10 animate-float text-amber-500" id="cpu-loader" />
            ) : (
              <CheckCircle className="w-10 h-10 text-emerald-500" id="completed-loader" />
            )}
            <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-125 animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Loading Lead Heading */}
        <p className="text-amber-500 font-semibold text-[11px] uppercase tracking-widest mb-2 font-mono">
          InstaDemoX AI Studio Compiler
        </p>
        <h2 className="text-xl sm:text-2xl font-bold font-sora text-white max-w-sm mx-auto mb-6 leading-relaxed">
          Assembling <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 block sm:inline">
            "{businessName}"
          </span>{" "}
          website...
        </h2>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#050505] h-3 rounded-full overflow-hidden mb-5 border border-neutral-800">
          <div 
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 h-full rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(245,166,35,0.5)]"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* Stats / Numbers info */}
        <div className="flex justify-between items-center text-[11px] tracking-widest text-neutral-500 font-mono mb-6 uppercase">
          <span>PROGRESS ENGINE</span>
          <span className="text-amber-500 font-bold text-sm">{percent}%</span>
        </div>

        {/* Status Messages */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-sm text-neutral-300 font-light italic flex items-center gap-2">
            {percent < 100 && <Loader2 className="w-4 h-4 animate-spin text-amber-500" />}
            {status}
          </p>
        </div>
      </div>
      
      {/* Dynamic footer quote built to pass anticipation time */}
      <div className="mt-8 text-xs text-neutral-500 max-w-sm text-center italic leading-relaxed">
        Our compiler integrates interactive WhatsApp links, contact helpline forms, responsive imagery, and embedded maps into a mobile-first premium layout.
      </div>
    </div>
  );
}
