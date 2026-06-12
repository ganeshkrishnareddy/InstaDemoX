import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Star, Calendar, Users, Briefcase, Shield, Anchor, Coffee } from "lucide-react";
import { convertPrice } from "../../utils/country";

interface TemplateProps {
  lead: Lead;
}

export default function HotelTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Experience premium comfort and unmatched luxury in the city center.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20inquire%20about%20booking%20a%20room%20at%20${encodeURIComponent(business_name)}!`;

  return (
    <div className="hotel-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            🏨 {business_name}
          </span>
          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-amber-500 text-neutral-300 transition-colors">
              <Phone className="w-4 h-4 text-amber-500" /> {phone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/10"
            >
              Order Instant Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-5 animate-pulse">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#AEB2B7] ml-2 font-mono">LUXURY HOTEL & SUITES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight text-white font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10 active:scale-98"
            >
              Reserve a Room
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Contact Frontdesk
            </a>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">OUR SUITES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-sora">Premium Accommodation</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Standard Room", price: "₹1,800", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600", desc: "Cozy king bed with high-speed internet, smart LED TV, dedicated workspace, and 24/7 dining access." },
            { name: "Deluxe Suite", price: "₹2,800", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400", desc: "Spacious private balcony overlooking glorious cityscapes, premium lounge area, and fully stocked minibar." },
            { name: "Presidential Suite", price: "₹4,500", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400", desc: "Ultimate luxury split-floor villa including executive office table, private jacuzzi, and 24h Butler service." },
          ].map((room, i) => (
            <div key={i} className="bg-[#0D0D0D] rounded-2xl p-5 shadow-lg border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between group h-full">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-4/3 border border-neutral-900">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 bg-black/90 border border-neutral-800 text-amber-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg font-mono">
                    {convertPrice(room.price, city)}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-white mb-2 font-sora">{room.name}</h3>
                <p className="text-[#AEB2B7] text-xs sm:text-sm leading-relaxed mb-4 font-light">{room.desc}</p>
              </div>
              <a
                href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20reserve%20a%20${encodeURIComponent(room.name)}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
              >
                Inquire via WhatsApp →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-black py-24 px-6 text-white border-y border-neutral-955">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">HOTEL PERKS</span>
            <h2 className="text-3xl font-extrabold mb-4 font-sora text-white">World-Class Amenities</h2>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Coffee className="w-8 h-8 text-amber-500" />, title: "Free Breakfast", desc: "Continental & Indian menu" },
              { icon: <Anchor className="w-8 h-8 text-amber-500" />, title: "Private Pool", desc: "Temperature regulated baths" },
              { icon: <Shield className="w-8 h-8 text-amber-500" />, title: "24/7 Security", desc: "Fully secure premise" },
              { icon: <Briefcase className="w-8 h-8 text-amber-500" />, title: "Business Lounge", desc: "Co-working friendly setup" },
            ].map((perk, i) => (
              <div key={i} className="bg-[#0D0D0D] p-6 rounded-2xl border border-neutral-900 shadow-md">
                <div className="mx-auto flex justify-center mb-4">{perk.icon}</div>
                <h3 className="font-bold text-base text-white mb-1 font-sora">{perk.title}</h3>
                <p className="text-xs text-neutral-400 font-light">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">RESERVATION</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Book Rooms Instantly</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Check-In Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Check-Out Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Room Preference</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>Standard Room</option>
                  <option defaultValue="deluxe">Deluxe Suite</option>
                  <option>Presidential Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Total Guests</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>1 Adult</option>
                  <option defaultValue="2">2 Adults</option>
                  <option>3 Adults</option>
                  <option>4+ Adults / Families</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Check Room Availability
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Contact & Maps */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">OUR LOCATION</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora">Directions & Contacts</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Hotel Address</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Reservations Helpline</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Frontdesk Phone: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Owner Desk: {owner_name}</p>
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
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora">🏨 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
            Luxury suites, premium comfort. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center gap-6 text-xs text-neutral-500 font-light">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call Hotel</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Desk</a>
            <span>•</span>
            <span>Managing Board: {owner_name}</span>
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
