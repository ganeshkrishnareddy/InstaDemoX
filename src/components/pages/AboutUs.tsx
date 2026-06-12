import React from "react";
import Header from "../shared/Header";
import { Sparkles, Zap, ShieldCheck, Globe, Users, ChevronRight, MessageSquare } from "lucide-react";

interface PageProps {
  navigateTo: (path: string) => void;
}

export default function AboutUs({ navigateTo }: PageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/about-us" />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 sm:py-20 relative z-10 space-y-16">
        {/* Intro */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-35 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" /> The Core Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sora">
            About <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">InstaDemoX</span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            We are redefining how local businesses claim their digital presence. No mockups, no generic templates, and absolutely no waiting.
          </p>
        </div>

        {/* Our Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-[#0C0C0C] border border-neutral-900 p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-sora font-semibold">15-Second Generation</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              By directly tapping into localized Google maps and scraping address reviews, we procedurally generate beautiful template spaces optimized fully for conversions. We replace manual agencies with instantaneous high-fidelity demos.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-neutral-900 p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-sora font-semibold">Serving Local Entrepreneurs</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Whether you possess a local restaurant in Tirupati, a luxury spa in Hyderabad, or real estate in Bangalore — we curate your offerings, localize appropriate price lists, and launch direct customer-acquisition flows.
            </p>
          </div>
        </div>

        {/* Detail Story Section */}
        <div className="border-t border-neutral-900 pt-12 space-y-6">
          <h2 className="text-2xl font-bold font-sora text-white">How We Operate</h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            Conventional web development agencies charge upwards of thousands, demanding weeks of reviews and coordination. InstaDemoX is a self-serve compiler. Customers type in their registered place name, verify their coordinates, and the system automatically coordinates custom map overlays, live feedback feeds, reservation schedulers, and integrated WhatsApp actions.
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            When you claim a website, we handle deployment, custom visual setups, and allocate domain mappings seamlessly, ensuring your business stays accessible for standard interactions 24/7/365.
          </p>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-amber-500/5 to-yellow-600/5 border border-amber-500/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-sora">Ready to generate a live demo?</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">See your business transformed into a premium customer capture portal.</p>
          </div>
          <button
            onClick={() => navigateTo("/")}
            className="whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/10 flex items-center gap-1.5"
          >
            Generate Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-900 py-8 px-4 text-center text-xs text-neutral-600 font-mono mt-12">
        <p>© 2026 InstaDemoX. Developed in full-stack premium workspaces.</p>
      </footer>
    </div>
  );
}
