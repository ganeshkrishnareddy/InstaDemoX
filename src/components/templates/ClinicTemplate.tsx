import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Star, Heart, Activity, ShieldAlert, CheckCircle2, User } from "lucide-react";

interface TemplateProps {
  lead: Lead;
}

export default function ClinicTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Providing holistic healthcare solutions and compassionate nursing since 2015.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20schedule%20a%20clinical%20consultation%20at%20${encodeURIComponent(business_name)}!`;

  return (
    <div className="clinic-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            🏥 {business_name}
          </span>
          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-amber-500 text-neutral-300 transition-colors">
              <Phone className="w-4 h-4 text-amber-500" /> {phone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/10"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded-full mb-5 font-mono">
            Certified Clinical Services
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight text-white font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>

          {/* Trust badge row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-neutral-300 mb-10 max-w-lg mx-auto font-medium font-inter">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Certified Labs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>24/7 Support Desk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Sanitized Environment</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#appointment"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10 active:scale-98"
            >
              Book an Appointment
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Consult on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-905 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-lg bg-neutral-900 p-1">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350&h=450" 
                alt="Doctor Profile"
                className="w-full h-72 md:h-80 object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-1 font-mono">CLINIC FOUNDER</span>
            <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight font-sora">
              Dr. {owner_name}
            </h2>
            <p className="text-amber-400 text-sm font-semibold mb-6">General Physician | MBBS, MD (Clinical Medicine)</p>
            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base mb-6 font-light">
              Dr. {owner_name} is an esteemed primary health consultant in {city} with over 15 years of active practitioner experience. Dedicated to bridging clinical expert service with warm personal touch, they ensure your health, comfort, and safety is prioritized at every stage of diagnostic treatment.
            </p>
            <div className="flex gap-4 p-4.5 bg-[#050505] rounded-xl border border-neutral-900">
              <div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Registration Code</p>
                <p className="text-neutral-300 text-xs sm:text-sm mt-1">MCI-28714-A (Registered Local Council)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#0A0A0A] py-24 px-6 border-y border-neutral-900 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">OUR EXPERTISE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-sora">Complete Health Solutions</h2>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "General Consultation", desc: "Holistic treatment for fever, joint pains, diabetes, and blood pressure monitoring panels.", icon: <User className="w-8 h-8 text-amber-500" /> },
              { title: "Diagnostic Lab Tests", desc: "Express clinical tests, blood group typing, urine profiling, and sugar monitoring.", icon: <Activity className="w-8 h-8 text-amber-500" /> },
              { title: "Care & Vaccines", desc: "Seasonal child immunization, flu vaccine schedules, and wellness booster injects.", icon: <Heart className="w-8 h-8 text-amber-500" /> },
              { title: "Master Health Checkup", desc: "Comprehensive full body checks, heart health profiling, and diet consulting advice.", icon: <Star className="w-8 h-8 text-amber-500" /> },
            ].map((service, i) => (
              <div key={i} className="bg-[#0D0D0D] rounded-2xl p-6 border border-neutral-900 flex flex-col justify-between group hover:border-neutral-800 transition-all h-full">
                <div>
                  <div className="mb-4 bg-amber-500/10 p-3 rounded-xl inline-block border border-amber-500/20">{service.icon}</div>
                  <h3 className="font-bold text-lg text-white mb-2 font-sora">{service.title}</h3>
                  <p className="text-neutral-405 text-xs sm:text-sm leading-relaxed mb-4 font-light text-neutral-400">{service.desc}</p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20know%2520more%2520about%2520${encodeURIComponent(service.title)}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  Consult on WhatsApp →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Form */}
      <section id="appointment" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">SECURE PRE-BOOKING</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Schedule Appointment</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2.5">Patient's Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Jayesh Rawal" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2.5">Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 91234 56789" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2.5">Appointment Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2.5">Core Health Complaint / Reason</label>
                <input 
                  type="text" 
                  placeholder="E.g. Routine Checkup, Seasonal Fever" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Submit Appointment Booking
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="bg-black py-24 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-extrabold text-[#009688] text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">TESTIMONIALS</span>
            <h2 className="text-3xl font-extrabold text-white mb-2 font-sora">Patient Feedback</h2>
            <div className="flex items-center justify-center gap-2 text-amber-500 mt-2 font-mono">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-neutral-300 font-bold text-xs ml-2">4.9/5 Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Extremely hygienic clinic space! Dr. sameer took the time to check my mother's continuous blood pressure issues. Very helpful diagnostics.", author: "Amit K. (Local Guide)", date: "2 weeks ago" },
              { text: "Highly professional service. I pre-booked via WhatsApp and there was zero waiting queue. Got lab reports on email in under 3 hours.", author: "Sunitha R.", date: "1 month ago" },
              { text: "Great family practitioner. Explains things clearly instead of just prescribing heavy pills. Highly recommended in the region.", author: "Rohan J.", date: "3 weeks ago" },
            ].map((review, i) => (
              <div key={i} className="bg-[#0D0D0D] p-6 rounded-2xl border border-neutral-900 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-500 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-neutral-300 text-sm italic leading-relaxed mb-6">"{review.text}"</p>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500 border-t border-neutral-900 pt-4">
                  <span className="font-extrabold text-neutral-400 font-mono text-[10px] uppercase tracking-wider">{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">HOW TO REACH</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora">Locate Our Clinic</h2>
            
            <div className="space-y-6 font-inter">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <MapPin className="w-6 h-6 animate-float" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Clinic Address</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora font-semibold">Contact Helpline</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Desk Phone: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Owner Medical Board: {owner_name}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <GoogleMapsEmbed address={address} city={city} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-16 px-6 text-neutral-400 text-center text-sm border-t border-neutral-900">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora">🏥 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light font-inter">
            Providing empathetic, leading-edge healthcare. Certified medical registry. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center gap-6 text-xs text-neutral-500 font-light font-inter">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call Clinic</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Help</a>
            <span>•</span>
            <span>Founder Practitioner: Dr. {owner_name}</span>
          </div>
          <div className="h-px bg-neutral-900 max-w-sm mx-auto my-4 font-mono"></div>
          <p className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} {business_name}. Developed in Cloud Native Environment.
          </p>
        </div>
      </footer>
    </div>
  );
}
