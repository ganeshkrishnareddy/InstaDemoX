import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Scissors, Heart, Sparkles, Smile, Star, Calendar } from "lucide-react";
import { convertPrice } from "../../utils/country";

interface TemplateProps {
  lead: Lead;
}

export default function SalonTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Your ultimate luxury hair & styling sanctuary. Relax, renew, and glow.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20book%20a%20salon%20session%20at%20${encodeURIComponent(business_name)}!`;

  return (
    <div className="salon-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            💅 {business_name}
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
              Book Premium Seat
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded-full mb-5 font-mono">
            PREMIUM SALON & SKIN CLINIC
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight text-white font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#appointment"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10 active:scale-98 animate-glow"
            >
              Book Appointment
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Inquire Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-1 font-mono">LOOK GORGEOUS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-sora">Our Styling Menu</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Hair Cut & Styling", price: "₹200", tag: "Essential", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400" },
            { name: "Custom Facial Glow", price: "₹500", tag: "Organic", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" },
            { name: "Full Body Spa", price: "₹1,200", tag: "Relaxing", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
            { name: "Bridal Package", price: "₹5,000", tag: "Luxury", image: "https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?auto=format&fit=crop&q=80&w=400" },
          ].map((service, i) => (
            <div key={i} className="bg-[#0D0D0D] rounded-2xl p-5 shadow-lg border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between group h-full">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-square border border-neutral-900">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-black/90 border border-neutral-800 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    {service.tag}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mb-1 font-sora">{service.name}</h3>
                <span className="text-amber-500 font-bold font-mono text-lg block mb-2">{convertPrice(service.price, city)}</span>
              </div>
              <a
                href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20reserve%20a%20${encodeURIComponent(service.name)}%20session!`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Book on WhatsApp →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-24 px-6 text-white text-center border-y border-neutral-950">
        <div className="max-w-6xl mx-auto">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">WHY US</span>
          <h2 className="text-3xl font-extrabold mb-12 font-sora text-white">Experience Salon Excellence</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Scissors className="w-8 h-8 text-amber-500 animate-float" />, title: "Expert Stylists", desc: "Our certified master team is highly trained in modern styling, detailing & cosmetic therapies." },
              { icon: <Heart className="w-8 h-8 text-amber-500" />, title: "Premium Products", desc: "We use only 100% skin-safe, certified organic and luxury brand premium cosmetic lines." },
              { icon: <Sparkles className="w-8 h-8 text-amber-500" />, title: "Hygienic Lounge", desc: "A cozy, thoroughly sterilized luxury setting prioritizing safety, health & relaxation." },
            ].map((card, i) => (
              <div key={i} className="bg-[#0D0D0D] p-8 rounded-2xl border border-neutral-900 flex flex-col items-center">
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-bold text-xl text-white mb-2 font-sora">{card.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">{card.desc}</p>
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
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">APPOINTMENT</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Reserve Your Chair</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Priya Sharma" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 XXXXX XXXXX" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Select Service</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>Hair Cut & Styling</option>
                  <option defaultValue="glow">Custom Facial Glow</option>
                  <option>Full Body Spa</option>
                  <option>Bridal Package</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Confirm Appointment Request
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-black py-24 px-6 text-white text-center border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">PORTFOLIO</span>
          <h2 className="text-3xl font-extrabold mb-10 font-sora">See Our Work</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="rounded-2xl overflow-hidden aspect-square border border-neutral-900 shadow-lg group relative">
                <img 
                  src={`https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=350&h=350`} 
                  alt="Styling work" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">VISIT US</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora">Our Styling Station</h2>
            
            <div className="space-y-6 font-inter">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Salon Location</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Booking Desk</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Helpline: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Owner: {owner_name}</p>
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
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora">💅 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
            Luxury grooming and premium skin therapies. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center gap-6 text-xs text-neutral-500 font-light">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call Salon</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Appointment</a>
            <span>•</span>
            <span>Director: {owner_name}</span>
          </div>
          <div className="h-px bg-neutral-900 max-w-sm mx-auto my-4"></div>
          <p className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} {business_name}. Developed in Cloud Native Environment.
          </p>
        </div>
      </footer>
    </div>
  );
}
