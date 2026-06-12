import React from "react";
import Header from "../shared/Header";
import { 
  Star, MapPin, Eye, Utensils, Scissors, Bed, 
  Stethoscope, Building, Dumbbell, GraduationCap, 
  Sparkles, ShieldCheck, ChevronRight, MessageSquare 
} from "lucide-react";

interface OurWorkProps {
  navigateTo: (path: string) => void;
}

const TEMPLATE_SHOWCASE = [
  {
    name: "Sri Balaji Restaurant",
    category: "Restaurant",
    slug: "sri-balaji-restaurant",
    rating: 4.8,
    reviews: 312,
    city: "Tirupati",
    address: "Gandhi Road, Near Station, Tirupati, Andhra Pradesh, India",
    tagline: "Authentic, high-rated South Indian culinary delight and pure veg specialties.",
    icon: Utensils,
    badgeColor: "from-amber-500 to-yellow-600",
    tags: ["⚡ Fast Delivery", "🥗 Pure Veg", "✨ Best Taste"],
    fields: {
      ownerName: "Subramanyam K.",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "Royal Spa & Premium Salon",
    category: "Salon",
    slug: "royal-spa-salon",
    rating: 4.7,
    reviews: 184,
    city: "Hyderabad",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana, India",
    tagline: "Ultra premium relaxing body massage, aesthetic haircut and face styling.",
    icon: Scissors,
    badgeColor: "from-rose-500 to-amber-500",
    tags: ["✂️ Haircut", "💆 Massage", "💅 Facial"],
    fields: {
      ownerName: "Ayesha Malik",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "Sai Luxury Hotel",
    category: "Hotel",
    slug: "sai-luxury-hotel",
    rating: 4.9,
    reviews: 540,
    city: "Chennai",
    address: "G.N. Chetty Road, T. Nagar, Chennai, Tamil Nadu, India",
    tagline: "Sophisticated luxury, modern comforts, high speed internet and premium suites.",
    icon: Bed,
    badgeColor: "from-blue-500 to-amber-500",
    tags: ["📶 Free Wifi", "🛌 AC Rooms", "🍽️ Dining"],
    fields: {
      ownerName: "Kumar Swamy",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "Apollo Dental Clinic",
    category: "Clinic",
    slug: "apollo-dental-clinic",
    rating: 4.8,
    reviews: 165,
    city: "Chennai",
    address: "Poonamallee High Road, Kilpauk, Chennai, Tamil Nadu, India",
    tagline: "Comprehensive specialized dental care, advanced root canal treatments, and teeth whitening.",
    icon: Stethoscope,
    badgeColor: "from-emerald-500 to-teal-600",
    tags: ["🦷 Dental Care", "🦷 Root Canal", "✨ Aesthetic"],
    fields: {
      ownerName: "Dr. Sandeep Prasad",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "Vanguard Realtors",
    category: "Real Estate",
    slug: "vanguard-realtors",
    rating: 4.7,
    reviews: 198,
    city: "Bangalore",
    address: "100 Feet Road, Indiranagar, Bangalore, Karnataka, India",
    tagline: "Premium residential apartments, prime commercial sites, and customized villa layouts.",
    icon: Building,
    badgeColor: "from-violet-500 to-amber-500",
    tags: ["🏢 Luxury Flats", "🔑 Site Visits", "📜 Legal Care"],
    fields: {
      ownerName: "Vikram Sen",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "Fitness One Gym & CrossFit",
    category: "Gym",
    slug: "fitness-one-gym",
    rating: 4.6,
    reviews: 215,
    city: "Pune",
    address: "M.G. Road, Near Central Mall, Pune, Maharashtra, India",
    tagline: "State-of-the-art heavy lifting gear, certified professional trainers, and specialized diets.",
    icon: Dumbbell,
    badgeColor: "from-amber-600 to-red-600",
    tags: ["🏋️ CrossFit", "💪 Fat Loss", "🥗 Diet Advice"],
    fields: {
      ownerName: "Rohan Khanna",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  },
  {
    name: "St. Mary's School & Junior College",
    category: "School",
    slug: "st-marys-school",
    rating: 4.8,
    reviews: 420,
    city: "Bangalore",
    address: "St. Mark's Road, Shivaji Nagar, Bangalore, Karnataka, India",
    tagline: "Fostering academic excellence, holistic science labs, and future-ready minds.",
    icon: GraduationCap,
    badgeColor: "from-cyan-500 to-blue-600",
    tags: ["🔬 Sci-Labs", "⚽ Sports Hub", "📚 Digital Bio"],
    fields: {
      ownerName: "Brother Thomas",
      phone: "+918360824267",
      whatsapp: "+918360824267",
    }
  }
];

export default function OurWork({ navigateTo }: OurWorkProps) {
  
  const handleClaimTemplate = (item: typeof TEMPLATE_SHOWCASE[0]) => {
    // Navigate home with query strings that LandingForm can read and auto-fill
    const params = new URLSearchParams({
      claim: item.slug,
      name: item.name,
      cat: item.category,
      city: item.city,
      owner: item.fields.ownerName,
      address: item.address,
      phone: item.fields.phone,
      whatsapp: item.fields.whatsapp,
      tag: item.tagline
    });
    navigateTo(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex flex-col justify-between overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#D97706]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/our-work" />

      {/* Main Content Showcase */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 space-y-16">
        
        {/* Intro */}
        <div className="space-y-4 max-w-3xl text-left border-l-2 border-amber-500 pl-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" /> Deployed Live Previews
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sora">
            Explore Our <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Vertical Templates</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            All template files are deployed with high-converting localized modules and active mock components. Review the live demo structures below and claim any outline for your business in seconds.
          </p>
        </div>

        {/* Templates Grid displaying all 7 templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATE_SHOWCASE.map((item) => {
            const IconComponent = item.icon;
            
            return (
              <div 
                key={item.slug} 
                className="bg-[#0C0C0C] border border-neutral-900 rounded-[20px] p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-2xl"
              >
                {/* Visual Accent gradient from category */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="space-y-4">
                  
                  {/* Category Badge & Live score */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1.5 bg-neutral-950 border border-neutral-850 text-neutral-300 rounded-lg text-[9px] font-bold uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-neutral-500 font-light">({item.reviews})</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-amber-500 group-hover:border-amber-500/20 group-hover:bg-amber-500/5 transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300 tracking-tight font-sora">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-start gap-1 text-xs text-neutral-500 text-left">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>
                  </div>

                  {/* Description tagline */}
                  <p className="text-neutral-400 text-xs font-light leading-relaxed text-left line-clamp-3">
                    "{item.tagline}"
                  </p>

                  {/* Specialized tags layout */}
                  <div className="bg-[#050505] p-3 rounded-xl border border-neutral-855/65">
                    <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                      {item.tags.map((tag) => (
                        <div 
                          key={tag} 
                          className="h-7 bg-neutral-950 rounded-lg border border-neutral-900 flex items-center justify-center text-[9px] text-neutral-400 font-mono tracking-tight shrink-0 px-1"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Operations Buttons */}
                <div className="grid grid-cols-2 gap-3.5 mt-6 pt-2 border-t border-neutral-900/60">
                  <button 
                    onClick={() => navigateTo(`/${item.slug}`)}
                    className="bg-neutral-950 border border-neutral-850 hover:bg-neutral-900 text-neutral-300 font-bold py-3 px-2 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" /> Live Demo
                  </button>
                  <button 
                    onClick={() => handleClaimTemplate(item)}
                    className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    Claim Template
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Highlight summary card */}
        <div className="bg-gradient-to-r from-neutral-950 to-[#0A0A0A] border border-neutral-900 rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3.5 max-w-xl">
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[9px] font-bold uppercase tracking-widest font-mono">
              Custom Domain Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sora">
              Needs custom categories or real domains?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              We deploy custom business templates on custom sub-domains with fully working customer reservation forms, active maps, and automated notification webhooks for your precise address.
            </p>
          </div>
          <a
            href="https://wa.me/918360824267?text=Hi!%20I'm%20interested%20in%20a%20fully%20custom%20website%20domain%20with%20InstaDemoX."
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold uppercase tracking-wider px-7 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            Ask on WhatsApp <ChevronRight className="w-4 h-4 text-black" />
          </a>
        </div>

      </main>

      {/* Footer */}
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
