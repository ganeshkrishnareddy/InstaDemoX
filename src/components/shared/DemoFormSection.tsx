import React from "react";
import { Info } from "lucide-react";

export default function DemoFormSection() {
  return (
    <div className="bg-amber-500/5 border border-amber-500/10 text-amber-500 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm mt-5 select-none font-inter">
      <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" id="info-icon" />
      <div>
        <p className="font-bold tracking-wider uppercase text-[10px] text-amber-500 font-mono">Live Demo Mode Active</p>
        <p className="text-neutral-400 mt-1 leading-relaxed font-light">
          This form is formatted for display. Real submissions, direct auto-responders, and business notifications will route directly to your inbox on your custom domain.
        </p>
      </div>
    </div>
  );
}
