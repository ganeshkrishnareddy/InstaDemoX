import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Calendar, Clock, Users, ArrowRight, Star } from "lucide-react";
import { convertPrice } from "../../utils/country";

interface TemplateProps {
  lead: Lead;
}

export default function RestaurantTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Delivering rich flavors and memorable experiences since 2012.";
  const cleanPhone = phone.replace(/\D/g, "");
  
  // Format WhatsApp URL
  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20place%20an%20order!`;

  return (
    <div className="restaurant-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora flex items-center gap-2">
            <span className="text-amber-500">🍷</span> {business_name}
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
              Order Online
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-amber-500 text-xs sm:text-sm uppercase tracking-widest font-extrabold mb-4 font-mono">
            Welcome to {city}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight text-white drop-shadow-lg">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10 active:scale-98"
            >
              Book Table
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 relative group">
            <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
            <img 
              src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600`} 
              alt="Restaurant Interior"
              className="w-full object-cover aspect-4/3 hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              An Exquisite Dining Experience in {city}
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6 text-sm sm:text-base font-light">
              Welcome to <strong className="text-white font-bold">{business_name}</strong>, located in the heart of {city}. {displayTagline} Our master chefs use only the freshest premium ingredients to handcraft authentic recipes passed down through generations.
            </p>
            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base mb-6 font-light">
              Founded by passion and driven by excellence, we offer a cozy ambient dine-in, perfect for group lunches, family get-togethers, or elegant dinner dates. Stop by today and discover the true meaning of local fine dining.
            </p>
            <div className="flex items-center gap-3 border-t border-neutral-900 pt-6">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-500">Managing Director:</span>
              <span className="text-sm italic font-medium text-amber-500">{owner_name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-[#0A0A0A] py-24 px-6 border-y border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">Handcrafted Delicacies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Our Signature Menu</h2>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dal Makhani", desc: "Creamy whole black lentils slow-cooked overnight with traditional spices and fresh butter.", price: "₹180", tag: "Best Seller", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400" },
              { name: "Paneer Butter Masala", desc: "Fresh cottage cheese cubes cooked in rich tomato-cream cashew curry gravy.", price: "₹220", tag: "Must Try", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
              { name: "Chicken Biryani", desc: "Premium basmati rice layered with marinated tender chicken and cooked on Dum.", price: "₹280", tag: "Chef's Special", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400" },
              { name: "Masala Dosa", desc: "Crispy rice-lentil crepe filled with potato masala, served with organic coconut chutney.", price: "₹120", tag: "", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=400" },
              { name: "Veg Thali", desc: "Full-course platter featuring paneer, mix veg, dal, raita, rice, naan, and sweets.", price: "₹160", tag: "Value Meal", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400" },
              { name: "Gulab Jamun", desc: "Soft golden milk-solid dumplings dipped in warm cardamom-infused honey syrup.", price: "₹60", tag: "", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400" },
            ].map((dish, i) => (
              <div 
                key={i} 
                className="bg-[#0D0D0D] rounded-2xl p-5 shadow-lg border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-4 aspect-16/10 border border-neutral-900">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {dish.tag && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded">
                        {dish.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-2 mb-2">
                    <h3 className="font-bold text-lg sm:text-xl text-white font-sora">{dish.name}</h3>
                    <span className="text-base sm:text-lg font-bold text-amber-500 font-mono whitespace-nowrap">{convertPrice(dish.price, city)}</span>
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">{dish.desc}</p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20order%20the%20${encodeURIComponent(dish.name)}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  Order on WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Booking Form */}
      <section id="booking" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">Reserve</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Book Your Table</h2>
            <p className="text-neutral-400 text-sm mt-3 font-light">Book instant premium seating. Perfect for special moments and milestones.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Your Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Jayesh Patel" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 98765 43210" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Select Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Select Time</label>
                <input 
                  type="time" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Number of Guests</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>1 Person</option>
                  <option defaultValue="2">2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                  <option>8+ People</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg shadow-amber-500/10 transition-transform active:scale-99 focus:outline-none text-xs uppercase tracking-widest cursor-pointer"
            >
              Request Table Booking
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#0A0A0A] py-24 px-6 text-white text-center border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">Atmosphere</span>
          <h2 className="text-3xl font-black mb-12 tracking-tight font-sora">Visual Dining Journey</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="rounded-2xl overflow-hidden aspect-square border border-neutral-900 shadow-xl group relative">
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={`https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400&h=400&q=80`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-3 font-mono">Visit Us</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora tracking-tight">Locate & Connect</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/25">
                  <MapPin className="w-6 h-6 animate-float" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-wide text-neutral-300">Our Address</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/25">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-wide text-neutral-300">Get in Touch</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Phone: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">WhatsApp: {whatsapp}</p>
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-neutral-900 p-5 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500"></div>
                <div>
                  <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest font-mono">Open Daily</p>
                  <p className="text-neutral-300 text-xs sm:text-sm mt-1">11:00 AM - 11:30 PM (IST)</p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all"
                >
                  Message Us
                </a>
              </div>
            </div>
          </div>

          <div>
            <GoogleMapsEmbed address={address} city={city} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-neutral-900 py-16 px-6 text-neutral-400 text-center text-sm">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora">🍷 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
            Providing delicious memories and premium fine dining. Located at {address}, {city}, India.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-light">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call {phone}</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Order</a>
            <span>•</span>
            <span>Owner: {owner_name}</span>
          </div>
          <div className="h-px bg-neutral-900/60 max-w-sm mx-auto my-4"></div>
          <p className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} {business_name}. Developed in Cloud Native Environment.
          </p>
        </div>
      </footer>
    </div>
  );
}
