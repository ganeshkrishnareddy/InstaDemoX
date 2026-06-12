import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Building, Key, Sparkles, Scale } from "lucide-react";
import { convertPrice, convertPriceRange } from "../../utils/country";

interface TemplateProps {
  lead: Lead;
}

export default function RealEstateTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Your trusted guide to premium rentals, luxury plots, and commercial deals.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20inquire%20about%20featured%20properties%2520at%2520${encodeURIComponent(business_name)}!`;

  return (
    <div className="real-estate-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            🏡 {business_name}
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
              Consult Broker
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded mb-5 font-mono">
            Licensed Agency in {city}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>

          {/* Static Search Bar */}
          <div className="max-w-xl mx-auto bg-black/70 backdrop-blur-md p-3 rounded-2xl flex flex-col sm:flex-row items-center gap-3 shadow-2xl border border-neutral-800">
            <input 
              type="text" 
              placeholder="Search BHK, Location or Budget..." 
              className="w-full bg-transparent text-white text-sm px-4 py-2 select-none pointer-events-none focus:outline-none placeholder-neutral-500"
              readOnly
            />
            <button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl uppercase tracking-wider whitespace-nowrap cursor-pointer">
              Search Property
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">HANDPICKED DEALS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-sora">Featured Listings</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "2BHK Luxury Apartment", price: "₹45 Lakhs", area: "1,250 sqft", type: "Residential Space", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400" },
            { title: "3BHK Royal Garden Villa", price: "₹85 Lakhs", area: "2,200 sqft", type: "Independent House", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400" },
            { title: "Premium Commercial Shop", price: "₹30 Lakhs", area: "450 sqft", type: "Market Hub Complex", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400" },
          ].map((item, i) => (
            <div key={i} className="bg-[#0D0D0D] rounded-2xl p-5 shadow-lg border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between group h-full">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-16/10 border border-neutral-900">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 bg-black/90 border border-neutral-800 text-amber-400 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow font-mono">
                    {convertPrice(item.price, city)}
                  </span>
                </div>
                <p className="text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">{item.type}</p>
                <h3 className="font-bold text-lg text-white mt-1 mb-2 font-sora">{item.title}</h3>
                
                <div className="flex items-center gap-4 text-xs text-neutral-400 font-light mb-4 font-inter">
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-amber-500" /> {item.area}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-500" /> {city}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20know%20more%20details%20about%20${encodeURIComponent(item.title)}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Inquire Property on WhatsApp →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-24 px-6 text-white text-center border-y border-neutral-950">
        <div className="max-w-6xl mx-auto">
          <span className="text-amber-400 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">WHY CHOOSE US</span>
          <h2 className="text-3xl font-extrabold mb-12 font-sora text-white">Trust, Legality & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Key className="w-8 h-8 text-amber-500 animate-float" />, title: "Instant Possession", desc: "No complex registration waits. We provide thoroughly verified paperwork and rapid possession deals." },
              { icon: <Scale className="w-8 h-8 text-amber-500" />, title: "100% Verified Titles", desc: "Strict RERA registered properties only. No disputes or pending bank hypothecation files." },
              { icon: <Sparkles className="w-8 h-8 text-amber-500" />, title: "Zero Brokerage Perks", desc: "Pure owner-direct rentals and subsidized commission structures for fully transparent buying." },
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

      {/* Inquiry Form */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">PROMPT SERVICE</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Express Property Inquiry</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Jinal Shah" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 9988776655" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Your Property Budget</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>{convertPriceRange("Below ₹30 Lakhs", city)}</option>
                  <option defaultValue="30-60">{convertPriceRange("₹30 Lakhs - ₹60 Lakhs", city)}</option>
                  <option>{convertPriceRange("₹60 Lakhs - ₹1 Crore", city)}</option>
                  <option>{convertPriceRange("Above ₹1 Crore", city)}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Property Type Preference</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>Residential Apartment</option>
                  <option>Luxury Villa / Independent House</option>
                  <option>Commercial Space</option>
                  <option>Agriculture Plot / Land</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Submit Property Request
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Contact & Maps */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-905">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">VISIT BROKERAGE</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora">Directions & Office</h2>
            
            <div className="space-y-6 font-inter">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <MapPin className="w-6 h-6 animate-float" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Corporate Address</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Agent Connection</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base font-light">Broker Helpline: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Managing Partner: {owner_name}</p>
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
        <div className="max-w-6xl mx-auto space-y-6 flex-col">
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora font-bold">🏡 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light font-inter">
            Guiding high-value property acquisitions. Registered authorized brokerage house. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500 font-light font-inter">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors animate-float">Call Agency</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Listing</a>
            <span>•</span>
            <span>Real Estate Partner: {owner_name}</span>
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
