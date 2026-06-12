import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Dumbbell, Award, Flame, Users, CheckCircle, Star } from "lucide-react";
import { convertPrice } from "../../utils/country";

interface TemplateProps {
  lead: Lead;
}

export default function GymTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Unleash your strength. Break boundaries, lift heavy, and build your dream body.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%20to%20register%2520for%2520a%2520free%2520trial%2520at%2520${encodeURIComponent(business_name)}!`;

  return (
    <div className="gym-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            ⚡ {business_name}
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
              Get Free Pass
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded mb-5 font-mono">
            NO EXCUSES · {city}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-5 leading-none uppercase font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#trial"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/10 uppercase tracking-widest text-xs cursor-pointer animate-glow"
            >
              Start Fitness Journey →
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Get Membership Details
            </a>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">OUR CLASSES</span>
          <h2 className="text-4xl font-extrabold text-white mb-4 uppercase font-sora tracking-tight">High Octane Training</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Zumba Aerobics", desc: "Express dynamic cardiovascular dance sessions designed to torch fat and elevate joy.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400" },
            { title: "CrossFit Circuit", desc: "Military grade high intensity circuit workouts containing tire flips, ropes and rowers.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400" },
            { title: "Power Yoga Flow", desc: "Revitalize metabolic processes, stretch locked tissue and calm nervous exhaustion.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" },
            { title: "Strength Sculpting", desc: "Classic barbell curls, deadlifts, and structural isolation routines to gain dry muscle.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400" },
          ].map((item, i) => (
            <div key={i} className="bg-[#0D0D0D] rounded-2xl overflow-hidden border border-neutral-900 flex flex-col justify-between group hover:border-neutral-800 transition-all">
              <div>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-amber-500 mb-2 uppercase font-sora">{item.title}</h3>
                  <p className="text-[#AEB2B7] text-xs sm:text-sm leading-relaxed mb-4 font-light">{item.desc}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20know%20more%20about%20the%20${encodeURIComponent(item.title)}%20batch%20timings!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-white hover:text-amber-500 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Join Batch →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section className="bg-black py-24 px-6 border-y border-neutral-950 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">SUBSCRIPTIONS</span>
            <h2 className="text-4xl font-extrabold text-white mb-4 uppercase font-sora">Affordable Membership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Basic Membership", price: "₹699", perks: ["Dine-in general gym access", "Lockers & basic showers", "Standard cardiovascular desk", "1 trainer consulting / month"] },
              { title: "Professional Power", price: "₹999", popular: true, perks: ["Full 24/7 key-fob access", "Steam bath + private showers", "Interactive steam sauna access", "Weekly trainer assessment", "Zumba & CrossFit classes"] },
              { title: "Elite VIP Club", price: "₹1,499", perks: ["Private full workstation desk", "1-on-1 certified dietitian diet", "Weekly bio-impedance profiling", "Juice bar complementary shake", "Priority slot reservation"] },
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-3xl p-8 flex flex-col justify-between relative ${plan.popular ? "bg-[#0D0D0D] border-2 border-amber-500 shadow-2xl" : "bg-[#0A0A0A] border border-neutral-900"}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-extrabold uppercase px-3 py-1.5 tracking-wider rounded-full shadow">
                    Most Popular Choice
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-lg text-white mb-2 uppercase font-sora">{plan.title}</h3>
                  <p className="text-neutral-500 text-xs mb-6">Gain full premium metabolic activation.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-mono">{convertPrice(plan.price, city)}</span>
                  </div>

                  <ul className="space-y-4 mb-8 font-inter">
                    {plan.perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                        <CheckCircle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%2520subscribe%2520to%2520the%2520${encodeURIComponent(plan.title)}%20plan!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl text-center font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${plan.popular ? "bg-[#060606] border border-[#111111] hover:border-amber-500 hover:text-amber-500 text-white" : "bg-neutral-900 override hover:bg-neutral-850 text-neutral-305 text-white"}`}
                >
                  Join This Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">FITNESS SQUAD</span>
          <h2 className="text-4xl font-extrabold uppercase text-white font-sora">Elite Strength Mentors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Vikram Malhotra", specialty: "Classic Bodybuilding & Physique Prep", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=350&h=350" },
            { name: "Karan Singh", specialty: "Inter-State Powerlifting & Strength Training", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=350&h=350" },
            { name: "Ananya Mehta", specialty: "Kettlebell Movement & Power Yoga Flow", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=350&h=350" },
          ].map((trainer, i) => (
            <div key={i} className="bg-[#0D0D0D] p-6 rounded-2xl border border-neutral-900 shadow-lg group">
              <div className="rounded-xl overflow-hidden aspect-square mb-4 border border-neutral-905">
                <img 
                  src={trainer.image} 
                  alt="Trainer" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-extrabold text-lg uppercase text-white font-sora">{trainer.name}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1 font-light">{trainer.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free Trial Form */}
      <section id="trial" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">CLAIM PASS</span>
            <h2 className="text-3xl font-extrabold uppercase text-white font-sora">Get 3 Days Free Trial</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Siddharth Shah" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 90000 12345" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Primary Fitness Goal</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>Fat Loss & Muscle Building</option>
                  <option defaultValue="hyper">Dry Hypertrophy Gain</option>
                  <option>Aerobics & Flexibility Cardio</option>
                  <option>Inter-State Powerlifting Preparation</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Request Free Trial Pass
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">DIRECTIONS</span>
            <h2 className="text-3xl font-extrabold uppercase text-white font-sora">Reach Our Power Station</h2>
            
            <div className="space-y-6 mt-6 font-inter">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora animate-float">Powerhouse Address</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Helpline Desk</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Helpline: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Managing Director: {owner_name}</p>
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
          <p className="text-amber-500 text-lg font-black tracking-tight font-sora">⚡ {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light font-inter">
            Certified elite health coaching and high-octane physical metrics. No excuses. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500 font-light font-inter">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call Gym Desk</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Pass</a>
            <span>•</span>
            <span>Owner Admin: {owner_name}</span>
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
