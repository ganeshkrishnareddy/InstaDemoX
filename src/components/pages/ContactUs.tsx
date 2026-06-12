import React, { useState } from "react";
import Header from "../shared/Header";
import FAQSection from "../shared/FAQSection";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  CheckCircle, Sparkles, AlertCircle, Building2, Globe
} from "lucide-react";

interface ContactUsProps {
  navigateTo: (path: string) => void;
}

export default function ContactUs({ navigateTo }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in required fields (Name, Email, and Message).");
      return;
    }
    
    setError("");
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      
      {/* Decorative Blur Ambient Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D97706]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[60%] h-[60%] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none"></div>

      {/* Reusable Header */}
      <Header navigateTo={navigateTo} currentPath="/contact-us" />

      {/* Main Container */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 space-y-20">
        
        {/* Intro */}
        <div className="space-y-4 max-w-3xl text-left border-l-2 border-amber-500 pl-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-amber-500" /> Dedicated Desk
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sora">
            Get in <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Touch with Us</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Have questions about specialized setups, custom domains, or lead telemetry? Our design and compilation desk is ready to answer questions and deploy production assets for you.
          </p>
        </div>

        {/* Contact Layout Grid: Forms & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side - Left / 7 cols */}
          <div className="lg:col-span-7 bg-[#0C0C0C] border border-neutral-900 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/[0.01] rounded-full blur-2xl pointer-events-none"></div>
            
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-sora">Message Dispatched!</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to InstaDemoX. Our development coordinators will respond to your registered business email link shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-amber-500 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send another inquiries
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5 text-left">
                  <h3 className="text-lg font-bold text-white font-sora">Send a Transmission</h3>
                  <p className="text-neutral-500 text-xs font-mono">Fill out the details to ping support and compilers instantly.</p>
                </div>

                {error && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-xl flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                      Your Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Subramanyam K."
                      className="w-full bg-[#050505] border border-neutral-850 focus:border-amber-500 rounded-xl px-4 py-3 text-neutral-200 text-xs focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                      Your Business Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      className="w-full bg-[#050505] border border-neutral-850 focus:border-amber-500 rounded-xl px-4 py-3 text-neutral-200 text-xs focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                      Business Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 83608 24267"
                      className="w-full bg-[#050505] border border-neutral-850 focus:border-amber-500 rounded-xl px-4 py-3 text-neutral-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                      Business Name / Domain
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Sri Balaji Restaurant"
                      className="w-full bg-[#050505] border border-neutral-850 focus:border-amber-500 rounded-xl px-4 py-3 text-neutral-200 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    Message Concerns <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Provide your design request, domain query, or customized widget request..."
                    className="w-full bg-[#050505] border border-neutral-850 focus:border-amber-500 rounded-xl p-4 text-neutral-200 text-xs focus:outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 px-6 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                >
                  {loading ? (
                    "Broadcasting..."
                  ) : (
                    <>
                      Transmit Inquiries <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Details & Map Side - Right / 5 cols */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-[#0C0C0C] border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
              <h3 className="text-lg font-bold text-white font-sora">Contact Information</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Connect directly through real-time WhatsApp or support routing addresses. Our systems process live coordination around the clock.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-center text-amber-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Support Email Address</p>
                    <a href="mailto:progvisionsite@gmail.com" className="text-xs hover:text-amber-500 transition-colors">
                      progvisionsite@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-center text-amber-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Helpline Desk</p>
                    <a href="tel:+918360824267" className="text-xs hover:text-amber-500 transition-colors">
                      +91 83608 24267
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-center text-amber-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Operations Address</p>
                    <p className="text-xs text-neutral-300 leading-tight">
                      Poonamallee High Road, Kilpauk, Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-900 flex gap-3">
                <a
                  href="https://wa.me/918360824267?text=Hi!%20I'm%20interested%20in%2520a%2520website%252520demo%2520with%2520InstaDemoX."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded interactive maps */}
            <div className="h-[210px] sm:h-[235px] rounded-3xl overflow-hidden border border-neutral-900 shadow-2xl">
              <GoogleMapsEmbed address="Poonamallee High Road, Kilpauk" city="Chennai" />
            </div>
          </div>

        </div>

        {/* Dedicated Frequently Asked Questions Section (in 2-columns!) */}
        <div className="border-t border-neutral-900/60 pt-20">
          <FAQSection />
        </div>

      </main>

      {/* Styled Footpad */}
      <footer className="bg-black border-t border-neutral-900 py-10 px-4 text-center text-xs text-neutral-600 font-mono mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 InstaDemoX. Made with premium performance workspaces.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo("/privacy-policy"); }} className="hover:text-amber-500 transition-colors">Privacy</a>
            <span className="text-neutral-800">•</span>
            <a href="/terms-conditions" onClick={(e) => { e.preventDefault(); navigateTo("/terms-conditions"); }} className="hover:text-amber-500 transition-colors">Terms</a>
            <span className="text-neutral-800">•</span>
            <a href="/refund-policy" onClick={(e) => { e.preventDefault(); navigateTo("/refund-policy"); }} className="hover:text-amber-500 transition-colors">Refunds</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
