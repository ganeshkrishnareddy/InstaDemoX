import React from "react";
import Header from "../shared/Header";
import { Scale, Shield, Calendar } from "lucide-react";

interface PageProps {
  navigateTo: (path: string) => void;
}

export default function TermsConditions({ navigateTo }: PageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-[-10%] left-0 w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/terms-conditions" />

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 sm:py-16 relative z-10 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <Scale className="w-3.5 h-3.5" /> Agreements & Rules
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sora tracking-tight">
            Terms & Conditions
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Calendar className="w-3.5 h-3.5" /> Last Updated: June 12, 2026
          </div>
        </div>

        <section className="space-y-6 text-sm sm:text-base text-neutral-450 leading-relaxed font-light">
          <p>
            Welcome to <strong>InstaDemoX</strong>! These terms and conditions outline the rules and regulations for the use of our website-generator system and compiled domains.
          </p>

          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold text-white font-sora">1. Implicit Consent & Map Exploration</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              By typing and selecting a local establishment (such as 'Sri Balaji Restaurant' or 'Sai Luxury Hotel') into the compiler search query, you grant InstaDemoX implicit consent to fetch and assemble publicly indexable Google Maps coordinates, rating factors, addresses, and listed details purely to generate a private-access digital template preview.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">2. Claiming Generated Demonstrations</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Only authorized owners, managers, or accredited stakeholders of a local setup hold the absolute right to claim, modify, subscribe, or allocate custom domains to respective template paths. InstaDemoX reserves the right to immediately suspend or reclaim a deployed domain route if an authentic local owner demands it.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">3. Fair Usage of Live Templates</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Customers are strictly prohibited from utilizing generated layouts, WhatsApp schedulers, and integrated routes for malicious actions, spamming, listing unverified inventory pricing, or misrepresenting competitor brands. Discovered violations of this nature will trigger immediate server-side termination.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">4. Intellectual Property Disclaimer</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              All proprietary brand markers, logos, design templates, and compiler scripts belong strictly to InstaDemoX. Registered trademarks, specific titles, and customer-generated graphic assets belong directly to their respective local enterprise establishments.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-900 py-8 px-4 text-center text-xs text-neutral-600 font-mono mt-12">
        <p>© 2026 InstaDemoX. Developed in full-stack premium workspaces.</p>
      </footer>
    </div>
  );
}
