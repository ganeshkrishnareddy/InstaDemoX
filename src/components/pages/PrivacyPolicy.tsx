import React from "react";
import Header from "../shared/Header";
import { ShieldCheck, Lock, Eye, Calendar } from "lucide-react";

interface PageProps {
  navigateTo: (path: string) => void;
}

export default function PrivacyPolicy({ navigateTo }: PageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-[-10%] y-0 w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/privacy-policy" />

      {/* Main content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 sm:py-16 relative z-10 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <ShieldCheck className="w-3 h-3" /> Privacy & Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sora tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Calendar className="w-3.5 h-3.5" /> Last Updated: June 12, 2026
          </div>
        </div>

        <section className="space-y-6 text-sm sm:text-base text-neutral-450 leading-relaxed font-light">
          <p>
            At <strong>InstaDemoX</strong>, accessible from our live demo domains, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy document contains types of information that is collected and recorded by InstaDemoX and how we use it.
          </p>

          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold text-white font-sora">1. Information We Collect</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              When you use our generator, we collect parameters specifically entered into the forms, such as your business name, coordinates, owner details, active phone numbers, and WhatsApp line numbers. This data is utilized solely to compile your customized, localized template.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">2. Public Map Integrations</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Our compiler references publicly available coordinates and details associated with registered Google Places to pre-populate relevant locations, map elements, and placeholder images to represent your brand authentically in demo setups. No private database configurations or internal registries are accessed without explicit request.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">3. WhatsApp and Call Routing</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Any user interactions originating from the static reservation structures on generated templates route directly via deep links to the specific phone and WhatsApp coordinates provided by the domain owner. We do not inspect, intercept, or log message details moving across these communication methods.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">4. Cookies and Sessions</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Like any other website, InstaDemoX utilizes standard browser 'cookies'. These cookies are used to store details including visitors' regional choice, category, last generated demo, and preferences to improve efficiency during consecutive compiles.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-sora">5. Data Deletion & Inquiry</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              If you wish to have your generated records or active demo templates permanently deleted from our servers, you can instantly prompt us by contacting <a href="mailto:instademox@zohomail.in" className="text-amber-500 hover:underline">instademox@zohomail.in</a> or signaling directly on WhatsApp.
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
