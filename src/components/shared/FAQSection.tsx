import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Is there really no design coding or manual work needed?",
      a: "Absolutely. Our compiler processes your layouts instantly using specialized vertical category structures and populates your contact details and active localized widgets procedurally."
    },
    {
      q: "Can I use my own custom domain (.com, .co, .in, etc.)?",
      a: "Yes! In our Business tier, we map your website output to any live domain you register. Your custom generated demo website will render fully under your chosen corporate address."
    },
    {
      q: "How does the WhatsApp widget help my conversions?",
      a: "Indian local commerce is highly chat-driven. Our templates place active WhatsApp and voice call anchors visibly. Clicking them opens the app with a pre-written message to capture interest instantly."
    },
    {
      q: "Are ratings and reviews updated in real time?",
      a: "Yes! We extract live statistics and coordinate maps from public directory structures. The demo preserves these metrics to maximize professional credibility during client showcases."
    },
    {
      q: "Can I adjust categories and custom copy after generating?",
      a: "Absolutely. You can edit any details from the secure admin portal dashboard or contact our responsive support desk to recalibrate details, local tags, and specific hours."
    },
    {
      q: "Is there a setup fee or hidden hosting charges?",
      a: "None at all. Our flat, transparent subscription plans pack in secure cloud hosting, media compression pipelines, maps integration, and continuous uptime with zero auxiliary fees."
    }
  ];

  // Store active open states in an array of indices
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  const toggleFaq = (idx: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-3">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase font-mono flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> COMMON CONCERNS
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sora">
          Frequently Asked Questions
        </h2>
        <p className="text-neutral-400 text-sm font-light max-w-xl mx-auto">
          Review details on domain registration, automated triggers, and why high-performing pre-built verticals outperform blank canvases.
        </p>
      </div>

      {/* Grid of Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => {
          const isOpen = !!openStates[idx];
          return (
            <div 
              key={idx}
              id={`faq-item-${idx}`}
              className="bg-[#0C0C0C] border border-neutral-900 rounded-2xl overflow-hidden hover:border-neutral-800 transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-start justify-between p-6 text-left font-bold text-sm text-white focus:outline-none hover:bg-neutral-900/40 transition-colors gap-4"
              >
                <span className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-tight text-[13px] sm:text-sm font-sora text-neutral-100">{faq.q}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 mt-1 ${isOpen ? "rotate-180 text-amber-500" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs text-neutral-400 leading-relaxed font-light border-t border-neutral-900 mt-1">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
