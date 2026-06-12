import React, { useState, useEffect, useRef } from "react";
import { convertPrice } from "../utils/country";
import { getApiUrl } from "../utils/api";
import Logo from "./shared/Logo";
import Header from "./shared/Header";
import FAQSection from "./shared/FAQSection";
import { 
  Sparkles, ArrowRight, Check, Eye, HelpCircle, MapPin, Phone, 
  MessageSquare, Star, CheckCircle2, Zap, X, Search, Award, 
  ShieldCheck, Send, Clock, Play, User, ExternalLink, ChevronDown, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LandingFormProps {
  onFormSubmitted: (data: {
    businessName: string;
    category: string;
    ownerName: string;
    address: string;
    phone: string;
    whatsapp: string;
    city: string;
    tagline: string;
  }) => void;
  navigateTo: (path: string) => void;
}

// Preset matching data mock to simulate immediate map extraction
const SAMPLE_PLACES = [
  { name: "Sri Balaji Restaurant", city: "Tirupati", category: "Restaurant", rating: 4.8, address: "Gandhi Road, Near Railway Station, Tirupati, Andhra Pradesh", reviewsCount: 312 },
  { name: "Royal Spa & Wellness", city: "Hyderabad", category: "Salon", rating: 4.7, address: "Road No. 12, Banjara Hills, Hyderabad, Telangana", reviewsCount: 184 },
  { name: "Sai Luxury Hotel", city: "Chennai", category: "Hotel", rating: 4.9, address: "G.N. Chetty Road, T. Nagar, Chennai, Tamil Nadu", reviewsCount: 540 },
  { name: "Apex Dental Clinic", city: "Noida", category: "Clinic", rating: 4.8, address: "Block C, Sector 62, Noida, Uttar Pradesh", reviewsCount: 142 },
  { name: "Gold's Fitness Arena", city: "Mumbai", category: "Gym", rating: 4.6, address: "Link Road, Andheri West, Mumbai, Maharashtra", reviewsCount: 228 },
  { name: "St. Mary Global School", city: "Pune", category: "School", rating: 4.8, address: "Senapati Bapat Road, Shivajinagar, Pune, Maharashtra", reviewsCount: 410 },
  { name: "Vanguard Realtors", city: "Bangalore", category: "Real Estate", rating: 4.7, address: "100 Feet Road, Indiranagar, Bangalore, Karnataka", reviewsCount: 165 },
];

export default function LandingForm({ onFormSubmitted, navigateTo }: LandingFormProps) {
  // Input states
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tirupati");
  const [selectedCategory, setSelectedCategory] = useState("Restaurant");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Customization modal (Google maps confirmed step)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form payload
  const [formData, setFormData] = useState({
    businessName: "",
    category: "Restaurant",
    ownerName: "",
    address: "",
    phone: "",
    whatsapp: "",
    city: "",
    tagline: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Simulated Maps search loader state
  const [isSearchingMaps, setIsSearchingMaps] = useState(false);
  const [simulatedSuggestions, setSimulatedSuggestions] = useState<typeof SAMPLE_PLACES>([]);

  // Local generator animation sequence (requested under point 2: ✓ Finding your business, etc.)
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [compilationStatus, setCompilationStatus] = useState("");
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);

  // FAQ expanded state list
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Book demo form state
  const [demoState, setDemoState] = useState({ name: "", email: "", biz: "", note: "" });
  const [demoSent, setDemoSent] = useState(false);

  // Parse claim queries from our-work links
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const claim = urlParams.get("claim");
    if (claim) {
      const name = urlParams.get("name") || "";
      const cat = urlParams.get("cat") || "Restaurant";
      const cityVal = urlParams.get("city") || "Tirupati";
      const owner = urlParams.get("owner") || "";
      const addressVal = urlParams.get("address") || "";
      const phoneVal = urlParams.get("phone") || "+918360824267";
      const whatsappVal = urlParams.get("whatsapp") || "+918360824267";
      const taglineVal = urlParams.get("tag") || "";

      setFormData({
        businessName: name,
        category: cat,
        ownerName: owner,
        address: addressVal,
        phone: phoneVal,
        whatsapp: whatsappVal,
        city: cityVal,
        tagline: taglineVal
      });

      setSelectedCategory(cat);
      setSelectedCity(cityVal);
      setIsModalOpen(true);

      // Instantly wipe query details from screen address line to look neat on reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (searchInput.trim().length > 1) {
      setIsSearchingMaps(true);
      const timer = setTimeout(() => {
        // Find presets that contain search context or generate a realistic procedural location
        const term = searchInput.toLowerCase();
        const matches = SAMPLE_PLACES.filter(p => p.name.toLowerCase().includes(term));
        
        // Always append a procedurally matched custom entry so there is always a Google Maps match found
        const customEntry = {
          name: searchInput,
          city: selectedCity,
          category: selectedCategory,
          rating: 4.8,
          address: `Main Road Circle, Near Hub, ${selectedCity}, India`,
          reviewsCount: Math.floor(Math.random() * 80) + 15
        };

        setSimulatedSuggestions([...matches, customEntry].slice(0, 4));
        setIsSearchingMaps(false);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setSimulatedSuggestions([]);
    }
  }, [searchInput, selectedCity, selectedCategory]);

  const handleSelectSuggestion = (place: typeof SAMPLE_PLACES[0]) => {
    setFormData({
      businessName: place.name,
      category: place.category,
      ownerName: "", // Ready for user entry
      address: place.address,
      phone: "", // Captures real phone
      whatsapp: "", // Captures real whatsapp for dynamic action
      city: place.city,
      tagline: `Premium choice top-rated ${place.category.toLowerCase()} in ${place.city}.`,
    });
    setErrors({});
    setShowSuggestions(false);
    setIsModalOpen(true);
  };

  const handleManualEntry = () => {
    setFormData({
      businessName: searchInput || "My Business",
      category: selectedCategory,
      ownerName: "",
      address: `123 Main Road, near center, ${selectedCity}`,
      phone: "",
      whatsapp: "",
      city: selectedCity,
      tagline: "",
    });
    setErrors({});
    setShowSuggestions(false);
    setIsModalOpen(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business Name is required";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner's Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    
    // Simple phone validation
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Must be a complete 10-digit phone number";
    }

    const cleanWhatsapp = formData.whatsapp.replace(/\D/g, "");
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (cleanWhatsapp.length < 10) {
      newErrors.whatsapp = "Must be a complete 10-digit WhatsApp number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLaunchCompilation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Track viewed pricing and viewed demo events beforehand to warm up state
    fetch(getApiUrl("/api/track-event"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: "warmup", event: "generate_demo" })
    }).catch(() => {});

    setIsModalOpen(false);
    setIsCompiling(true);
    setCompilationProgress(0);
    setCheckedSteps([]);

    // 5 progressive steps as requested under point 2
    const steps = [
      { msg: "Finding your business on Google Maps...", duration: 2500, key: "find" },
      { msg: "Loading client reviews & star ratings...", duration: 2200, key: "reviews" },
      { msg: "Creating custom layout & business services...", duration: 2500, key: "services" },
      { msg: "Designing gorgeous desktop/mobile web elements...", duration: 2400, key: "design" },
      { msg: "Your responsive business website is ready! 🎉", duration: 1500, key: "ready" }
    ];

    let currentStepIndex = 0;
    setCompilationStatus(steps[0].msg);

    const executeStep = () => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        
        // Progress bar smooth interval
        let stepProgressStart = (currentStepIndex / steps.length) * 100;
        let stepProgressEnd = ((currentStepIndex + 1) / steps.length) * 100;
        let progressTick = stepProgressStart;
        
        const tickInterval = setInterval(() => {
          progressTick += (stepProgressEnd - stepProgressStart) / 15;
          setCompilationProgress(Math.min(Math.round(progressTick), 100));
        }, step.duration / 15);

        setTimeout(() => {
          clearInterval(tickInterval);
          setCheckedSteps(prev => [...prev, step.key]);
          currentStepIndex++;
          
          if (currentStepIndex < steps.length) {
            setCompilationStatus(steps[currentStepIndex].msg);
            executeStep();
          } else {
            // Completed! Call main submission
            onFormSubmitted(formData);
          }
        }, step.duration);
      }
    };

    executeStep();
  };

  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoState.name || !demoState.email || !demoState.biz) return;
    setDemoSent(true);
    setTimeout(() => {
      setDemoState({ name: "", email: "", biz: "", note: "" });
    }, 4000);
  };

  // Pre-generate dynamic time markers for Feed (requested under point 5)
  const generatedFeed = [
    { business: "Sri Balaji Restaurant", city: "Tirupati", time: "2 minutes ago", category: "Restaurant", rating: "4.8 ⭐" },
    { business: "Royal Spa & Organic Wellness", city: "Hyderabad", time: "5 minutes ago", category: "Salon", rating: "4.7 ⭐" },
    { business: "Sai Luxury Hotel", city: "Chennai", time: "8 minutes ago", category: "Hotel", rating: "4.9 ⭐" },
    { business: "Apex Modern Clinic", city: "Noida", time: "11 minutes ago", category: "Clinic", rating: "4.8 ⭐" },
    { business: "Dravidian Palms Villa", city: "Tirupati", time: "16 minutes ago", category: "Real Estate", rating: "4.9 ⭐" },
    { business: "Gold Fitness Arena", city: "Hyderabad", time: "22 minutes ago", category: "Gym", rating: "4.6 ⭐" }
  ];

  return (
    <div className="w-full bg-[#050505] text-[#F3F4F6] relative overflow-hidden font-sans">
      
      {/* Reusable Professional Header */}
      <Header navigateTo={navigateTo} currentPath="/" />

      {/* Decorative ambient gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D97706]/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[25%] right-[-10%] w-[45%] h-[45%] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* --- HERO SECTION with Psychological Hook --- */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 border-b border-neutral-900 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Hook + Business Inputs) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Next-Gen AI Website Builder</span>
              </div>

              <div className="space-y-2">
                <p className="text-[15px] text-amber-500 font-extrabold tracking-widest uppercase font-mono">
                  We Already Designed Your Website.
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight font-sora">
                  Just Tell Us Your <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                    Business Name.
                  </span>
                </h1>
              </div>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                We crawl local listings, fetch active addresses, and assemble fully personalized customer-facing website demos complete with your real reviews and direct WhatsApp communication in under 15 seconds.
              </p>

              {/* Dynamic Interactive Input Bar */}
              <div className="bg-[#0A0A0A] border border-neutral-800 p-3 rounded-2xl md:rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-3 relative">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  
                  {/* Business Category select */}
                  <div className="md:col-span-4 relative border-b md:border-b-0 md:border-r border-neutral-800 pb-2 md:pb-0 md:pr-2 flex items-center">
                    <MapPin className="w-4.5 h-4.5 text-amber-500 ml-1.5 shrink-0" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#050505] text-xs font-semibold text-white focus:outline-none px-2 cursor-pointer outline-none border-none py-1"
                    >
                      <optgroup label="🇮🇳 INDIA" className="bg-[#0C0C0C] text-amber-500 font-bold">
                        <option value="Tirupati" className="bg-[#0C0C0C] text-white">Tirupati (AP)</option>
                        <option value="Hyderabad" className="bg-[#0C0C0C] text-white">Hyderabad</option>
                        <option value="Chennai" className="bg-[#0C0C0C] text-white">Chennai</option>
                        <option value="Noida" className="bg-[#0C0C0C] text-white">Noida (NCR)</option>
                        <option value="Bangalore" className="bg-[#0C0C0C] text-white">Bangalore</option>
                        <option value="Mumbai" className="bg-[#0C0C0C] text-white">Mumbai</option>
                        <option value="Pune" className="bg-[#0C0C0C] text-white">Pune</option>
                      </optgroup>
                      <optgroup label="🇺🇸 UNITED STATES" className="bg-[#0C0C0C] text-amber-500 font-bold">
                        <option value="New York" className="bg-[#0C0C0C] text-white">New York</option>
                        <option value="San Francisco" className="bg-[#0C0C0C] text-white">San Francisco</option>
                        <option value="Los Angeles" className="bg-[#0C0C0C] text-white">Los Angeles</option>
                        <option value="Seattle" className="bg-[#0C0C0C] text-white">Seattle</option>
                        <option value="Chicago" className="bg-[#0C0C0C] text-white">Chicago</option>
                        <option value="Austin" className="bg-[#0C0C0C] text-white">Austin</option>
                        <option value="Boston" className="bg-[#0C0C0C] text-white">Boston</option>
                        <option value="Miami" className="bg-[#0C0C0C] text-white">Miami</option>
                      </optgroup>
                      <optgroup label="🇬🇧 UNITED KINGDOM" className="bg-[#0C0C0C] text-amber-500 font-bold">
                        <option value="London" className="bg-[#0C0C0C] text-white">London</option>
                        <option value="Manchester" className="bg-[#0C0C0C] text-white">Manchester</option>
                        <option value="Birmingham" className="bg-[#0C0C0C] text-white">Birmingham</option>
                        <option value="Edinburgh" className="bg-[#0C0C0C] text-white">Edinburgh</option>
                        <option value="Glasgow" className="bg-[#0C0C0C] text-white">Glasgow</option>
                        <option value="Leeds" className="bg-[#0C0C0C] text-white">Leeds</option>
                        <option value="Liverpool" className="bg-[#0C0C0C] text-white">Liverpool</option>
                      </optgroup>
                      <optgroup label="🇦🇪 UNITED ARAB EMIRATES" className="bg-[#0C0C0C] text-amber-500 font-bold">
                        <option value="Dubai" className="bg-[#0C0C0C] text-white">Dubai</option>
                        <option value="Abu Dhabi" className="bg-[#0C0C0C] text-white">Abu Dhabi</option>
                        <option value="Sharjah" className="bg-[#0C0C0C] text-white">Sharjah</option>
                        <option value="Ajman" className="bg-[#0C0C0C] text-white">Ajman</option>
                      </optgroup>
                    </select>
                    <ChevronDown className="w-3 h-3 text-neutral-500 mr-1.5" />
                  </div>

                  {/* Search Input Box */}
                  <div className="md:col-span-8 flex items-center relative py-1">
                    <Search className="w-4.5 h-4.5 text-neutral-600 shrink-0 ml-1" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Enter business name, e.g. Sri Balaji Restaurant..."
                      className="w-full bg-transparent text-sm pl-2.5 pr-4 py-1 text-white placeholder-neutral-600 font-semibold focus:outline-none"
                    />
                    {searchInput && (
                      <button onClick={() => setSearchInput("")} className="text-neutral-500 hover:text-white p-1">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>

                {/* Live Suggestions Drops (Simulated Maps Scraper) */}
                <AnimatePresence>
                  {showSuggestions && (searchInput.trim().length > 1) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2.5 bg-[#0C0C0C] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl z-40"
                    >
                      <div className="p-2.5 bg-[#050505] border-b border-neutral-900 text-[10px] font-bold text-neutral-500 tracking-wider uppercase flex justify-between items-center">
                        <span>🛰️ Google Maps Quick Scraper matches found:</span>
                        {isSearchingMaps && <span className="text-amber-500 animate-pulse">scanning...</span>}
                      </div>

                      <div className="divide-y divide-neutral-900">
                        {simulatedSuggestions.map((place, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleSelectSuggestion(place)}
                            className="p-3 hover:bg-amber-500/5 cursor-pointer flex items-start gap-3 transition-colors text-left"
                          >
                            <div className="rounded-lg bg-amber-500/10 text-amber-500 p-2 shrink-0 mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white flex items-center justify-between">
                                <span className="truncate">{place.name}</span>
                                <span className="text-amber-400 font-mono text-[10px] font-bold shrink-0">{place.rating} ⭐</span>
                              </div>
                              <p className="text-[10px] text-neutral-500 truncate mt-0.5">{place.address}</p>
                              <div className="inline-flex gap-2 items-center text-[9px] font-semibold text-amber-500 uppercase mt-1 tracking-widest font-mono">
                                <span>{place.category}</span>
                                <span>•</span>
                                <span>{place.reviewsCount} Google reviews</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div 
                          onClick={handleManualEntry}
                          className="p-3 bg-[#080808] hover:bg-neutral-800/50 cursor-pointer flex items-center justify-between text-xs text-neutral-400 text-left font-medium border-t border-neutral-800"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Create procedurally from scratch (My business isn't here)
                          </span>
                          <ArrowRight className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub-inputs shortcut guides */}
                <div className="pt-2 border-t border-neutral-900 flex flex-wrap gap-x-4 gap-y-1.5 items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5 leading-none">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Selected Industry Template:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-[#050505] border border-neutral-800 text-[10px] py-1 px-2.5 rounded-md font-bold text-amber-500 outline-none cursor-pointer"
                    >
                      <option value="Restaurant" className="bg-[#0C0C0C] text-white">Restaurant</option>
                      <option value="Hotel" className="bg-[#0C0C0C] text-white">Hotel</option>
                      <option value="Salon" className="bg-[#0C0C0C] text-white">Salon & Spa</option>
                      <option value="Clinic" className="bg-[#0C0C0C] text-white">Clinic</option>
                      <option value="Real Estate" className="bg-[#0C0C0C] text-white">Real Estate</option>
                      <option value="Gym" className="bg-[#0C0C0C] text-white">Gym & Fitness</option>
                      <option value="School" className="bg-[#0C0C0C] text-white">School</option>
                    </select>
                  </span>
                  <span className="italic">Type above to instantly scrape details</span>
                </div>

              </div>

              {/* Badges footer */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Google Maps Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>No Setup Expenses</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Claimable Live Link</span>
                </div>
              </div>

            </div>

            {/* Right Content - Live Website Generation Simulation Widget (Requested under point 2!) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-3xl pointer-events-none"></div>

              <div className="bg-[#0B0B0B] border border-neutral-800 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden text-left font-mono">
                
                {/* Header status */}
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-500 uppercase tracking-widest">
                    SYSTEM STATUS
                  </span>
                </div>

                {isCompiling ? (
                  /* Generation Screen Progress (Requested under point 2) */
                  <div className="space-y-6 py-2.5">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        <span>COMPILING LIVE DEMO</span>
                        <span className="text-amber-500">{compilationProgress}%</span>
                      </div>
                      <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-neutral-850">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-150 rounded"
                          style={{ width: `${compilationProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Step lists with animations as requested under point 2 */}
                    <div className="space-y-2.5 text-xs">
                      
                      <div className="flex items-center gap-2.5">
                        <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full text-[10px] font-bold ${checkedSteps.includes("find") ? "bg-amber-500/10 text-amber-500 text-xs border border-amber-500/20" : "bg-neutral-950 text-neutral-600 border border-neutral-900"}`}>
                          {checkedSteps.includes("find") ? "✓" : "1"}
                        </span>
                        <span className={checkedSteps.includes("find") ? "text-neutral-300 font-bold" : "text-neutral-600 font-light"}>
                          Finding your business...
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full text-[10px] font-bold ${checkedSteps.includes("reviews") ? "bg-amber-500/10 text-amber-500 text-xs border border-amber-500/20" : "bg-neutral-950 text-neutral-600"}`}>
                          {checkedSteps.includes("reviews") ? "✓" : "2"}
                        </span>
                        <span className={checkedSteps.includes("reviews") ? "text-neutral-300 font-bold" : "text-neutral-600 font-light"}>
                          Loading client reviews & maps...
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full text-[10px] font-bold ${checkedSteps.includes("services") ? "bg-amber-500/10 text-amber-500 text-xs border border-amber-500/20" : "bg-neutral-950 text-neutral-600"}`}>
                          {checkedSteps.includes("services") ? "✓" : "3"}
                        </span>
                        <span className={checkedSteps.includes("services") ? "text-neutral-300 font-bold" : "text-neutral-600 font-light"}>
                          Creating specific trade services...
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full text-[10px] font-bold ${checkedSteps.includes("design") ? "bg-amber-500/10 text-amber-500 text-xs border border-amber-500/20" : "bg-neutral-950 text-neutral-600"}`}>
                          {checkedSteps.includes("design") ? "✓" : "4"}
                        </span>
                        <span className={checkedSteps.includes("design") ? "text-neutral-300 font-bold" : "text-neutral-600 font-light"}>
                          Designing tailored UI layout...
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full text-[10px] font-bold ${checkedSteps.includes("ready") ? "bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20" : "bg-neutral-950 text-neutral-600"}`}>
                          {checkedSteps.includes("ready") ? "✓" : "5"}
                        </span>
                        <span className={checkedSteps.includes("ready") ? "text-emerald-400 font-bold" : "text-neutral-600 font-light"}>
                          Website ready to deploy!
                        </span>
                      </div>

                    </div>

                    <div className="bg-[#050505] p-3 rounded-xl border border-neutral-900 text-[10px] text-amber-500 font-medium italic animate-pulse">
                      &gt; {compilationStatus}
                    </div>
                  </div>
                ) : (
                  /* Standby Card Representation of compilation */
                  <div className="space-y-5 text-xs py-2 scale-100 transition-all">
                    <p className="text-neutral-500 lowercase leading-relaxed">
                      // Launching digital business accelerator <br />
                      // Ready to sync with local registry.
                    </p>

                    <div className="bg-[#050505] border border-neutral-900 rounded-xl p-4 space-y-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shrink-0"></div>
                        <div className="font-bold text-neutral-300 uppercase tracking-wider text-[10px]">
                          Waiting for Business Name input
                        </div>
                      </div>

                      <p className="text-neutral-600 font-sans font-light leading-relaxed">
                        Input below or choose any listing to witness the auto-design mechanism load custom service cards, maps widgets, and claim banners in real time.
                      </p>
                    </div>

                    {/* Simple prompt mock visual */}
                    <div className="bg-[#020202] text-amber-500/60 p-3 rounded-lg flex items-center gap-2 font-mono text-[10px] select-none">
                      <span className="text-[#00FF00]">&gt;_</span>
                      <span>npm run generate-demo --name="Sri Balaji"</span>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-600 text-[10px] font-semibold uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Est. Execution timer: 12-15 seconds</span>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- INJECT PREVIEWS SECTION (Requested under Point 3!) --- */}
      <section id="our-work" className="scroll-mt-24 py-16 sm:py-24 border-b border-neutral-900 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto text-left space-y-12">
          
          <div className="max-w-3xl">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase font-mono mb-2">
              REAL WEBSITES IN CODESPACE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight font-sora">
              Interactive Design Previews
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Look at how our specialized framework renders various categories immediately. Click any preview card to instantly launch that custom preset configuration!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Restaurant Preview Card */}
            <div className="bg-[#0C0C0C] border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all hover:-translate-y-1 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    RESTAURANT
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 tracking-wider font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>4.8 Rating</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    Sri Balaji Restaurant
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Gandhi Road, Tirupati</span>
                  </div>
                </div>

                {/* Simulated screenshot layout */}
                <div className="bg-[#050505] p-3 rounded-xl border border-neutral-900 font-sans space-y-2">
                  <div className="h-2 bg-neutral-850 rounded w-1/3"></div>
                  <div className="h-2 bg-neutral-850 rounded w-2/3"></div>
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">⚡ Fast Delivery</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">🥗 Pure Veg</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">✨ Best Taste</div>
                  </div>
                </div>

                {/* Mock phone buttons */}
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest font-mono">
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <Phone className="w-3 h-3 text-neutral-500" /> Call
                  </span>
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <MessageSquare className="w-3 h-3 text-neutral-500" /> WhatsApp
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <button 
                  onClick={() => navigateTo("/sri-balaji-restaurant")}
                  className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold py-3 px-2 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all duration-300 shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" /> Live Demo
                </button>
                <button 
                  onClick={() => {
                    setFormData({
                      businessName: "Sri Balaji Restaurant",
                      category: "Restaurant",
                      ownerName: "Subramanyam K.",
                      address: "Gandhi Road, Near Station, Tirupati, Andhra Pradesh, India",
                      phone: "+918360824267",
                      whatsapp: "+918360824267",
                      city: "Tirupati",
                      tagline: "Authentic, high-rated South Indian culinary delight and pure veg specialties.",
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-[#121212] hover:bg-neutral-800 hover:text-white text-neutral-300 border border-neutral-800 font-bold py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Claim Site
                </button>
              </div>
            </div>

            {/* Salon / Spa Preview Card */}
            <div className="bg-[#0C0C0C] border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all hover:-translate-y-1 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    SALON & SPA
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 tracking-wider font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>4.7 Rating</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    Royal Spa & Premium Salon
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Banjara Hills, Hyderabad</span>
                  </div>
                </div>

                {/* Simulated screenshot layout */}
                <div className="bg-[#050505] p-3 rounded-xl border border-neutral-900 font-sans space-y-2">
                  <div className="h-2 bg-neutral-850 rounded w-1/2"></div>
                  <div className="h-2 bg-neutral-850 rounded w-5/6"></div>
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">✂️ Haircut</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">💆 Massage</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">💅 Facial</div>
                  </div>
                </div>

                {/* Mock phone buttons */}
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest font-mono">
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <Phone className="w-3 h-3 text-neutral-500" /> Call
                  </span>
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <MessageSquare className="w-3 h-3 text-neutral-500" /> WhatsApp
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <a 
                  href="/royal-spa-salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold py-3 px-2 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all duration-300 shadow-lg shadow-amber-500/10"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" /> Live Demo
                </a>
                <button 
                  onClick={() => {
                    setFormData({
                      businessName: "Royal Spa & Premium Salon",
                      category: "Salon",
                      ownerName: "Ayesha Malik",
                      address: "Road No. 12, Banjara Hills, Hyderabad, Telangana, India",
                      phone: "+918360824267",
                      whatsapp: "+918360824267",
                      city: "Hyderabad",
                      tagline: "Ultra premium relaxing body massage, aesthetic haircut and face styling.",
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-[#121212] hover:bg-neutral-800 hover:text-white text-neutral-300 border border-neutral-800 font-bold py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Claim Site
                </button>
              </div>
            </div>

            {/* Hotel Preview Card */}
            <div className="bg-[#0C0C0C] border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all hover:-translate-y-1 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    HOTEL & HOSTEL
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 tracking-wider font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>4.9 Rating</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    Sai Luxury Hotel
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>T. Nagar, Chennai</span>
                  </div>
                </div>

                {/* Simulated screenshot layout */}
                <div className="bg-[#050505] p-3 rounded-xl border border-neutral-900 font-sans space-y-2">
                  <div className="h-2 bg-neutral-850 rounded w-2/5"></div>
                  <div className="h-2 bg-neutral-850 rounded w-3/4"></div>
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">📶 Free Wifi</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">🛌 AC Rooms</div>
                    <div className="h-7 bg-neutral-900 rounded border border-neutral-850 flex items-center justify-center text-[9px] text-neutral-400">🍽️ Dining</div>
                  </div>
                </div>

                {/* Mock phone buttons */}
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest font-mono">
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <Phone className="w-3 h-3 text-neutral-500" /> Call
                  </span>
                  <span className="py-2.5 rounded-lg border border-neutral-800 bg-[#070707] flex items-center justify-center gap-1.5 text-neutral-400">
                    <MessageSquare className="w-3 h-3 text-neutral-500" /> WhatsApp
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <a 
                  href="/sai-luxury-hotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold py-3 px-2 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all duration-300 shadow-lg shadow-amber-500/10"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" /> Live Demo
                </a>
                <button 
                  onClick={() => {
                    setFormData({
                      businessName: "Sai Luxury Hotel",
                      category: "Hotel",
                      ownerName: "Kumar Swamy",
                      address: "G.N. Chetty Road, T. Nagar, Chennai, Tamil Nadu, India",
                      phone: "+918360824267",
                      whatsapp: "+918360824267",
                      city: "Chennai",
                      tagline: "Sophisticated luxury, modern comforts, high speed internet and premium suites.",
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-[#121212] hover:bg-neutral-800 hover:text-white text-neutral-300 border border-neutral-800 font-bold py-3 px-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Claim Site
                </button>
              </div>
            </div>

          </div>

          {/* CTA Link to Dedicated Our Work Page */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-amber-500/5 via-amber-600/[0.02] to-transparent border border-neutral-850/80 rounded-2xl p-6 sm:p-8 mt-12 gap-5 text-left">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white font-sora">
                Looking for other segments or deeper previews?
              </h4>
              <p className="text-neutral-450 text-xs sm:text-sm font-light">
                We have deployed fully responsive templates for Clinics, Real Estate, Gyms, and Schools as separate pages.
              </p>
            </div>
            <button
              onClick={() => navigateTo("/our-work")}
              className="bg-neutral-900 hover:bg-neutral-850 text-amber-500 border border-amber-500/10 border-amber-500/20 text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 hover:text-amber-400"
            >
              View All 7 Templates Page <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>

        </div>
      </section>


      {/* --- GENERATED TODAY FEED (Requested under Point 5!) --- */}
      <section className="py-8 bg-black border-b border-neutral-900 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-2 font-bold shrink-0 text-amber-500 text-xs sm:text-sm tracking-widest uppercase font-mono">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shrink-0"></span>
            <span>LIVE GENERATION TENSION FEED:</span>
          </div>

          {/* Scrolling tape */}
          <div className="flex-grow w-full overflow-hidden relative py-2 select-none">
            {/* Ambient vignette gradient fade on margins to look absolutely premium */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="animate-scroll gap-6 items-center flex whitespace-nowrap text-xs text-neutral-400">
              {/* Double arrays for seamless marquee infinite wrap */}
              {[...generatedFeed, ...generatedFeed, ...generatedFeed].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-850 px-3 py-2 rounded-xl font-medium shrink-0 hover:border-amber-500/20 transition-colors">
                  <span className="text-red-500 font-bold">🔥</span>
                  <span className="text-white font-bold text-[11px] font-sora">{item.business}</span>
                  <span className="text-neutral-400 text-[10px]">({item.category})</span>
                  <span className="text-neutral-500 font-light font-mono text-[10px]">• {item.city}</span>
                  <span className="text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[8px] font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* --- HOW IT WORKS SECTION (Slightly streamlined) --- */}
      <section className="py-16 sm:py-24 border-b border-neutral-900 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          
          <div className="max-w-xl mx-auto space-y-3">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase font-mono">
              3 SIMPLE PHASES
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sora">
              From Search To Live Demo
            </h2>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Our live compilation pipeline removes the drag and friction of building manual sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            
            {/* Phase 1 */}
            <div className="bg-[#0C0C0C] border border-neutral-800/80 p-8 rounded-[24px] relative text-left shadow-2xl transition-all duration-300 hover:border-amber-500/30 group">
              {/* Concentric Double-Ring Circular Badge Overlapping the top border */}
              <div className="absolute -top-6 right-10 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg shadow-black group-hover:border-amber-500/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold text-sm tracking-tight bg-neutral-950">
                  01
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-sora pt-2 tracking-tight">
                Type Your Business Name
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                Start typing above. Our integrated locator tool performs a search request to find matching details like your rating and industry category.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#0C0C0C] border border-neutral-800/80 p-8 rounded-[24px] relative text-left shadow-2xl transition-all duration-300 hover:border-amber-500/30 group">
              {/* Concentric Double-Ring Circular Badge Overlapping the top border */}
              <div className="absolute -top-6 right-10 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg shadow-black group-hover:border-amber-500/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold text-sm tracking-tight bg-neutral-950">
                  02
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-sora pt-2 tracking-tight">
                Verify Google Maps Info
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                Confirm your generated details and input your real phone and WhatsApp lines so our action triggers link directly to your pocket.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#0C0C0C] border border-neutral-800/80 p-8 rounded-[24px] relative text-left shadow-2xl transition-all duration-300 hover:border-amber-500/30 group">
              {/* Concentric Double-Ring Circular Badge Overlapping the top border */}
              <div className="absolute -top-6 right-10 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg shadow-black group-hover:border-amber-500/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold text-sm tracking-tight bg-neutral-950">
                  03
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-sora pt-2 tracking-tight">
                Claim Your Live Link
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                Review your high-converting demo website template immediately. Click Get It Live to claim your lifetime custom hosting!
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* --- CUSTOMER SUCCESS STORIES & TESTIMONIALS --- */}
      <section className="py-16 sm:py-24 border-b border-neutral-900 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="max-w-2xl text-left space-y-3">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase font-mono">
              REAL TESTIMONIALS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sora">
              Validated Success Stories
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              See how modern local businessmen get their operations live without the technical jargon or agency overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#0D0D0D] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs text-neutral-300 italic font-light leading-relaxed">
                  "I was completely shocked. I typed in 'Sri Balaji Restaurant' and within seconds it pulled my actual address and rating. When I saw my custom menu and working WhatsApp booking, I bought the live plan on the spot. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-900 mt-6 shrink-0">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Subramanyam K.</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Founder, Sri Balaji Restaurant</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs text-neutral-300 italic font-light leading-relaxed">
                  "Website agencies were quoted ₹15,000 to construct a standard catalog site. ProgVision's compiler designed our service card options and added mapped routes live. The ₹499 monthly fee is insanely accessible to keep operations sleek."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-900 mt-6 shrink-0">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ayesha Malik</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Owner, Royal Spa & Salon</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs text-neutral-300 italic font-light leading-relaxed">
                  "Having our direct call links and maps integrated keeps conversion high. My WhatsApp is constantly pinging with booking queries now. Best ROI and setup decision for our real estate catalogs."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-900 mt-6 shrink-0">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs">
                  J
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Joseph Fernandez</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Partner, Vanguard Realtors</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- PRICING SECTION (Below Testimonials - Requested under Point 4!) --- */}
      <section className="py-16 sm:py-24 border-b border-neutral-900 px-4" id="saas-pricing-tiers">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="max-w-xl mx-auto text-center space-y-3">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase font-mono">
              SIMPLE AFFORDABLE PLANS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sora">
              SaaS Pricing Made For Growth
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              No developer retainer fees or bloated server cost. Pick a plan to keep your demo live forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tier 1 */}
            <div className="bg-[#0C0C0C] border border-neutral-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
                  STARTER CODE
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Starter</h3>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-sora font-mono">{convertPrice("₹499", selectedCity)}</span>
                    <span className="text-xs text-neutral-500 font-light font-mono">/ month</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Perfect to launch your generated demo with a direct WhatsApp module.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs font-light text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Claim 1 Generated Demo Profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Direct WhatsApp Button</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Google Maps Integration</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-600 line-through">
                    <span>Custom Domain Address</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#landing-form-container"
                onClick={() => {
                  fetch(getApiUrl("/api/track-event"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ slug: "warmup", event: "view_pricing" })
                  }).catch(() => {});
                }}
                className="w-full mt-8 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 text-center rounded-xl text-xs uppercase tracking-wider block"
              >
                Claim Starter Free
              </a>
            </div>

            {/* Tier 2 - Popular */}
            <div className="bg-[#0D0D11] border-2 border-amber-500/70 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative shadow-[0_15px_45px_rgba(245,166,35,0.06)]">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-black font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-amber-600">
                RECOMMENDED BEST GROWTH
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono">
                  PROFESSIONAL DOMAIN
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Business Live</h3>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-sora font-mono">{convertPrice("₹999", selectedCity)}</span>
                    <span className="text-xs text-neutral-500 font-light font-mono">/ month</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs font-light leading-relaxed">
                  Map your own real custom domain like <span className="font-mono text-amber-500">myrestaurant.com</span> instantly.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs font-light text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Starter Features Included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Custom Domain Map Setup (.com / .in)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Unlimited Call & Route actions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Free Cloud Web Hosting Status</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#landing-form-container"
                onClick={() => {
                  fetch(getApiUrl("/api/track-event"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ slug: "warmup", event: "view_pricing" })
                  }).catch(() => {});
                }}
                className="w-full mt-8 bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3 text-center rounded-xl text-xs uppercase tracking-wider block"
              >
                Launch Professional Free
              </a>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#0C0C0C] border border-neutral-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
                  AGENCY CONTROL
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Full Agency</h3>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-sora font-mono">{convertPrice("₹2,499", selectedCity)}</span>
                    <span className="text-xs text-neutral-500 font-light font-mono">/ month</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Bulk control and multi-location listings for premium local networks.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs font-light text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Manage up to 10 active domains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Priority SEO submission</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Dedicated Support Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Weekly leads performance export</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#landing-form-container"
                onClick={() => {
                  fetch(getApiUrl("/api/track-event"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ slug: "warmup", event: "view_pricing" })
                  }).catch(() => {});
                }}
                className="w-full mt-8 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 text-center rounded-xl text-xs uppercase tracking-wider block"
              >
                Contact Agency Team
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 sm:py-24 border-b border-neutral-900 px-4 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* --- BOOK DEMO SECTION (Requested in V2 Layout!) --- */}
      <section id="contact-us" className="scroll-mt-24 py-16 sm:py-24 px-4 bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
        <div className="max-w-xl mx-auto space-y-8 text-center bg-[#0D0D0D] border border-neutral-800 rounded-3xl p-6 sm:p-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-amber-500/30"></div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono">
              PREMIUM PARTNER DEMO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sora">
              Book a Custom Agency Demo
            </h2>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Have specific multi-location needs or premium custom code requests? Leave your contact and our director will set up a live zoom demo.
            </p>
          </div>

          {demoSent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-emerald-400 text-xs leading-relaxed font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Thank you! We've registered your zoom slot request. We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleBookDemoSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5 font-mono">Name</label>
                <input 
                  type="text" 
                  required
                  value={demoState.name}
                  onChange={(e) => setDemoState({ ...demoState, name: e.target.value })}
                  placeholder="E.g. Sameer Patel"
                  className="w-full bg-[#050505] border border-neutral-800 focus:border-amber-500/60 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5 font-mono">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={demoState.email}
                    onChange={(e) => setDemoState({ ...demoState, email: e.target.value })}
                    placeholder="E.g. sameer@sribalaji.com"
                    className="w-full bg-[#050505] border border-neutral-800 focus:border-amber-500/60 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5 font-mono">Business Name</label>
                  <input 
                    type="text" 
                    required
                    value={demoState.biz}
                    onChange={(e) => setDemoState({ ...demoState, biz: e.target.value })}
                    placeholder="E.g. Sri Balaji Chain"
                    className="w-full bg-[#050505] border border-neutral-800 focus:border-amber-500/60 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Request Zoom Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </section>

      {/* --- HIGH CONTRAST BRANDED SaaS FOOTER --- */}
      <footer className="bg-black border-t border-neutral-900 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-neutral-900 text-left">
          
          {/* Column 1: Info & Brand */}
          <div className="md:col-span-5 space-y-5">
            <div className="select-none">
              <Logo />
            </div>
            
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light max-w-sm">
              InstaDemoX builds personalized, fully functional business websites within 15 seconds. By syncing map locations, business details, and reviews procedurally, we deliver production-ready local customer capture channels instantly.
            </p>

            <div className="space-y-2.5 text-xs font-mono text-neutral-400 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold min-w-[75px]">Phone:</span>
                <a href="tel:+918360824267" className="hover:text-amber-400 transition-colors">+91 83608 24267</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold min-w-[75px]">WhatsApp:</span>
                <a 
                  href="https://wa.me/918360824267?text=Hi!%20Hi!%20I'm%20interested%20in%2520a%2520website%2520demo%2520with%2520InstaDemoX." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 83608 24267
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold min-w-[75px]">Email:</span>
                <a href="mailto:instademox@zohomail.in" className="hover:text-amber-400 transition-colors">instademox@zohomail.in</a>
              </div>
            </div>
          </div>

          {/* Column 2: Our Work (Live Templates Demos) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white font-mono">Our Work</h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <a 
                href="/sri-balaji-restaurant" 
                onClick={(e) => { e.preventDefault(); navigateTo("/sri-balaji-restaurant"); }} 
                className="block hover:text-amber-500 transition-colors"
              >
                🍴 Restaurant Demo
              </a>
              <a 
                href="/royal-spa-salon" 
                onClick={(e) => { e.preventDefault(); navigateTo("/royal-spa-salon"); }} 
                className="block hover:text-amber-500 transition-colors"
              >
                💅 Salon Spa Demo
              </a>
              <a 
                href="/sai-luxury-hotel" 
                onClick={(e) => { e.preventDefault(); navigateTo("/sai-luxury-hotel"); }} 
                className="block hover:text-amber-500 transition-colors"
              >
                🏨 Luxury Hotel Demo
              </a>
              <p className="text-[10px] text-zinc-600 font-light italic leading-relaxed pt-2.5 border-t border-neutral-900 mt-2">
                Click any link to render standard template configurations with active maps & review models.
              </p>
            </div>
          </div>

          {/* Column 3: Contact Us options */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white font-mono">Contact Us</h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <a 
                href="#contact-us" 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact-us");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }} 
                className="block hover:text-amber-500 transition-colors"
              >
                Book Free Demo
              </a>
              <a 
                href="https://wa.me/918360824267?text=Hi!%20Hi!%20I'm%20interested%20in%2520a%2520website%2520demo%2520with%2520InstaDemoX." 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-amber-500 transition-colors"
              >
                Inquire on WhatsApp
              </a>
              <a href="mailto:instademox@zohomail.in" className="block hover:text-amber-500 transition-colors">Send Official Email</a>
            </div>
          </div>

          {/* Column 4: Legal / Policies */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white font-mono">Legal Policies</h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-medium border-t border-neutral-900/40 pt-1 md:border-t-0 md:pt-0">
              <a 
                href="/privacy-policy" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/privacy-policy");
                }} 
                className="block hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-conditions" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/terms-conditions");
                }} 
                className="block hover:text-amber-500 transition-colors"
              >
                Terms & Conditions
              </a>
              <a 
                href="/refund-policy" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/refund-policy");
                }} 
                className="block hover:text-amber-500 transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright footer */}
        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 font-mono text-[11px]">
          <p>© 2026 InstaDemoX. Developed in full-stack premium workspaces.</p>
          <p className="text-[10px] text-neutral-700 font-sans">All registered trademarks belong to respective local places.</p>
        </div>
      </footer>


      {/* --- CONFIRM MAPS PULL MODAL CORE --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-neutral-900 flex justify-between items-center bg-[#070707]">
                <div className="flex items-center gap-2">
                  <span className="text-base text-amber-500">🛰️</span>
                  <div>
                    <h3 className="font-bold text-sm text-white font-sora">Verify Dynamic Scraper Profile</h3>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Google Maps synchronized values</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-900"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Body form */}
              <form onSubmit={handleLaunchCompilation} className="p-5 sm:p-6 space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Business Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-[#050505] border border-neutral-800 text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Category Template</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#050505] border border-neutral-800 text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none select-none cursor-pointer"
                    >
                      <option value="Restaurant" className="bg-[#0C0C0C] text-white">Restaurant</option>
                      <option value="Hotel" className="bg-[#0C0C0C] text-white">Hotel</option>
                      <option value="Salon" className="bg-[#0C0C0C] text-white">Salon & Spa</option>
                      <option value="Clinic" className="bg-[#0C0C0C] text-white">Clinic</option>
                      <option value="Real Estate" className="bg-[#0C0C0C] text-white">Real Estate</option>
                      <option value="Gym" className="bg-[#0C0C0C] text-white">Gym & Fitness</option>
                      <option value="School" className="bg-[#0C0C0C] text-white">School</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Owner / Founder Name <span className="text-amber-500">*</span></label>
                    <input 
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="E.g. Sameer Patel"
                      className={`w-full bg-[#050505] border ${errors.ownerName ? "border-rose-500/60" : "border-neutral-800"} text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none`}
                    />
                    {errors.ownerName && <p className="text-rose-500 text-[10px] mt-1">{errors.ownerName}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Target City</label>
                    <input 
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#050505] border border-neutral-800 text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Direct Phone Line <span className="text-amber-500">*</span></label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, phone: val, whatsapp: formData.whatsapp || val });
                      }}
                      placeholder="E.g. 9876543210"
                      className={`w-full bg-[#050505] border ${errors.phone ? "border-rose-500/60" : "border-neutral-800"} text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none`}
                    />
                    {errors.phone && <p className="text-rose-500 text-[10px] mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">WhatsApp Line <span className="text-amber-500">*</span></label>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, whatsapp: formData.phone })}
                        className="text-[9px] text-amber-500 font-bold uppercase tracking-wider hover:underline"
                      >
                        Copy Phone
                      </button>
                    </div>
                    <input 
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="E.g. 9876543210"
                      className={`w-full bg-[#050505] border ${errors.whatsapp ? "border-rose-500/60" : "border-neutral-800"} text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none`}
                    />
                    {errors.whatsapp && <p className="text-rose-500 text-[10px] mt-1">{errors.whatsapp}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Scraped Listing Address</label>
                    <input 
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#050505] border border-neutral-800 text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                      <span>Business Hero Tagline</span>
                      <span className="text-neutral-600 normal-case italic font-light">Customizable</span>
                    </div>
                    <textarea 
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="A short punchy line representing your unique trade style..."
                      className="w-full bg-[#050505] border border-neutral-800 text-xs text-white rounded-xl px-3.5 py-3.5 focus:border-amber-500/50 outline-none h-16 resize-none"
                    />
                  </div>

                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl flex items-start gap-2.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                    By submitting, your demo subroute registration is locked. Real CTA phone anchors and WhatsApp message coordinates will be mapped securely.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Assemble Personalized Website
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
