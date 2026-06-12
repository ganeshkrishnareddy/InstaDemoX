import React from "react";
import Header from "../shared/Header";
import { RefreshCcw, ShieldAlert, Calendar } from "lucide-react";

interface PageProps {
  navigateTo: (path: string) => void;
}

export default function RefundPolicy({ navigateTo }: PageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-[-10%] right-0 w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/refund-policy" />

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 sm:py-16 relative z-10 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <RefreshCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "14s" }} /> Purchase Guarantees
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sora tracking-tight">
            Refund Policy
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Calendar className="w-3.5 h-3.5" /> Last Updated: June 12, 2026
          </div>
        </div>

        <section className="space-y-6 text-sm sm:text-base text-neutral-450 leading-relaxed font-light">
          <p>
            At <strong>InstaDemoX</strong>, we build high-converting customer-capture templates and handle complete custom domain mapping dynamically. Our goal is full satisfaction with every claimed website.
          </p>

          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold text-white font-sora">1. 15-Day Satisfaction Guarantee</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              We provide a complete satisfaction window. If you wish to cancel your claimed custom website within 15 days of subscribing to any paid hosting plan, you may request a standard full refund.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">2. Custom Domain Limitations</h3>
            <p className="text-neutral-450 text-xs sm:text-sm">
              Please note that custom domain registration expenses paid to third-party registrar service layers (e.g. purchasing `yourbrand.com` directly) are independent and non-refundable. When a refund request is made within 15 days, we deduct registrar costs and transfer full ownership of the chosen domain address directly to you, refunding the remaining subscription balance completely.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">3. Continuous Optimization</h3>
            <p className="text-neutral-455 text-xs sm:text-sm">
              During active subscription runs, our team remains at standby. If you feel any section of your live template requires optimization, text correction, image swapping, or customized maps adjustment, we deliver complete support without demanding additional agency fees.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">4. Processing Refunds</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              To trigger a standard refund, submit your active account ID, business name, and mapped domain to <a href="mailto:instademox@zohomail.in" className="text-amber-500 hover:underline">instademox@zohomail.in</a> or through our official WhatsApp desk. Approved claims are processed and return to your source payment method within 5–7 banking days.
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
