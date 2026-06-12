import React from "react";
import { Lead } from "../../types";
import GoogleMapsEmbed from "../shared/GoogleMapsEmbed";
import DemoFormSection from "../shared/DemoFormSection";
import { Phone, MapPin, Award, BookOpen, GraduationCap, Trophy, Globe, Sparkles } from "lucide-react";

interface TemplateProps {
  lead: Lead;
}

export default function SchoolTemplate({ lead }: TemplateProps) {
  const { business_name, owner_name, address, phone, whatsapp, city, tagline } = lead;

  const displayTagline = tagline || "Nurturing logical minds, academic excellence, and ethical values since 2008.";

  const whatsappCode = whatsapp.replace(/\D/g, "");
  const whatsappNum = whatsappCode.startsWith("91") ? whatsappCode : `91${whatsappCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20there,%20I'd%20like%2520to%2520know%2520more%2520about%2520admissions%2520at%2520${encodeURIComponent(business_name)}!`;

  return (
    <div className="school-theme min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900 py-4.5 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white select-none font-sora">
            🏫 {business_name}
          </span>
          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-amber-500 text-neutral-300 transition-colors font-mono">
              <Phone className="w-4 h-4 text-amber-500" /> {phone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/10"
            >
              Admission Info
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded mb-5 font-mono">
            ADMISSIONS OPEN: 2026-27
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight font-sora">
            {business_name}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 mt-2 italic max-w-xl mx-auto mb-10 font-light leading-relaxed">
            "{displayTagline}"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/10 uppercase tracking-widest text-xs cursor-pointer animate-glow font-mono"
            >
              Apply Online Now →
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              Prospectus on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">CURRICULUM</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-sora">Educational Programs</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { grade: "Nursery / Playgroup", age: "Ages 2.5 - 3 Years", desc: "Interactive play, visual identification, kinetic motor development, and color palettes." },
            { grade: "Kindergarten (KG)", age: "Ages 4 - 5 Years", desc: "Introductory phonic reading, standard number arithmetic, logical blocks and coloring." },
            { grade: "Primary Grade 1 - 5", age: "Nurturing fundamental concepts", desc: "Scientific studies, Indian grammar linguistics, computational arithmetic, and moral science code." },
            { grade: "Middle School 6 - 8", age: "Building logical capability", desc: "Introductory algebraic formulas, physics experiments, and state level historic literature studies." },
            { grade: "Secondary School 9 - 10", age: "ICSE / CBSE Board prep", desc: "Detailed physics, organic chemistry equations, geography charting and computer programming drafts." },
            { grade: "Higher Secondary (+2)", age: "Science / Commerce stream", desc: "Specialist coaching for competitive physics/math panels or corporate accounts structures." },
          ].map((prog, i) => (
            <div key={i} className="bg-[#0D0D0D] rounded-2xl p-6 border border-neutral-900 flex flex-col justify-between group h-full">
              <div>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded font-mono">
                  {prog.age}
                </span>
                <h3 className="font-bold text-xl text-white mt-4 mb-2 font-sora">{prog.grade}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">{prog.desc}</p>
              </div>
              <a
                href={`https://wa.me/${whatsappNum}?text=Hi,%20I'd%20like%20to%20know%20more%2520about%2520the%2520${encodeURIComponent(prog.grade)}%252520curriculum!`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs sm:text-sm font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1.5"
              >
                Inquire Admission →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-24 px-6 text-white text-center border-y border-neutral-950">
        <div className="max-w-6xl mx-auto">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">CORE VALUES</span>
          <h2 className="text-3xl font-extrabold mb-12 font-sora h-title tracking-tight">Nurturing Holistic Development</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-inter">
            {[
              { icon: <GraduationCap className="w-8 h-8 text-amber-500 animate-float" />, title: "Exquisite Faculty", desc: "Our teachers hold certified degrees in pediatric counseling and advanced subject disciplines." },
              { icon: <BookOpen className="w-8 h-8 text-amber-500" />, title: "Digital Smartlabs", desc: "All classrooms are fortified with smart screens, projectors, and digital sound structures." },
              { icon: <Trophy className="w-8 h-8 text-amber-500" />, title: "Sports & Cultural Elite", desc: "Indoor tennis courts, cricket pitches, swimming pools, and dedicated visual arts labs." },
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

      {/* Faculty */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">OUR MENTORS</span>
          <h2 className="text-3xl font-extrabold text-white font-sora tracking-tight">Meet Academic Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Dr. Arundhati Bose", role: "Principal Director, Former HoD Physics (Presidency)", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350&h=350" },
            { name: "Mrs. Meenakshi Iyer", role: "Vice Principal, Pediatric Counselor (M.Ed, B.Ed)", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350&h=350" },
            { name: "Mr. Rajinder Chawla", role: "Specialist Mathematics Board Counselor (M.Sc IIT)", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350&h=350" },
          ].map((teacher, i) => (
            <div key={i} className="bg-[#0D0D0D] p-6 rounded-2xl border border-neutral-900 shadow-md group">
              <div className="rounded-xl overflow-hidden aspect-square mb-4 border border-neutral-905">
                <img 
                  src={teacher.image} 
                  alt="Teacher" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-extrabold text-lg text-white font-sora">{teacher.name}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1 font-light leading-relaxed">{teacher.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admission Inquiry Form */}
      <section id="inquiry" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative">
          <div className="absolute top-0 left-10 w-32 h-px bg-amber-500/30"></div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">ADMISSIONS PANEL</span>
            <h2 className="text-3xl font-extrabold text-white font-sora">Admission Inquiry</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Guardian's Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Jayanti Prasad" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Primary Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g. +91 99990 XXXXX" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Student Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Aarav Prasad" 
                  className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">Target Grade / Class</label>
                <select className="w-full bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 text-neutral-300">
                  <option>Nursery / Playgroup</option>
                  <option>Kindergarten (KG)</option>
                  <option defaultValue="primary">Primary Grade 1 - 5</option>
                  <option>Middle School 6 - 8</option>
                  <option>Secondary School 9 - 10</option>
                  <option>Higher Secondary (+2)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl shadow-lg transition-transform focus:outline-none uppercase tracking-widest text-xs cursor-pointer"
            >
              Request Prospectus Package
            </button>

            <DemoFormSection />
          </form>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-wrap">
          <div>
            <span className="text-amber-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2 font-mono">HOW TO FIND US</span>
            <h2 className="text-3xl font-extrabold text-white mb-6 font-sora">Our School Campus</h2>
            
            <div className="space-y-6 font-inter">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/25">
                  <MapPin className="w-6 h-6 animate-float" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Education Premise</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base leading-relaxed">{address}</p>
                  <p className="text-amber-500 mt-0.5 font-bold text-sm tracking-wider uppercase font-mono">{city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/25">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-300 font-sora">Help Registry</h3>
                  <p className="text-neutral-400 font-light mt-1 text-sm sm:text-base">Administration Phone: {phone}</p>
                  <p className="text-neutral-400 font-light mt-0.5 text-sm">Principal Desk: {owner_name}</p>
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
          <p className="text-amber-505 text-lg font-black tracking-tight font-sora text-amber-500">🏫 {business_name}</p>
          <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-500 font-light font-inter">
            Empowering the future generation with logic and morality. Certified modern pedagogy. Located at {address}, {city}, India.
          </p>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500 font-light font-inter">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors">Call Admin</a>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Desk</a>
            <span>•</span>
            <span>Principal Core: {owner_name}</span>
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
