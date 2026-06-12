import React, { useEffect, useState } from "react";
import LandingForm from "./components/LandingForm";
import ProgressLoader from "./components/ProgressLoader";
import AdminPanel from "./components/AdminPanel";

// Custom Dedicated Pages
import AboutUs from "./components/pages/AboutUs";
import OurWork from "./components/pages/OurWork";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsConditions from "./components/pages/TermsConditions";
import RefundPolicy from "./components/pages/RefundPolicy";
import ContactUs from "./components/pages/ContactUs";

// Dynamic Template Imports
import RestaurantTemplate from "./components/templates/RestaurantTemplate";
import HotelTemplate from "./components/templates/HotelTemplate";
import SalonTemplate from "./components/templates/SalonTemplate";
import ClinicTemplate from "./components/templates/ClinicTemplate";
import RealEstateTemplate from "./components/templates/RealEstateTemplate";
import GymTemplate from "./components/templates/GymTemplate";
import SchoolTemplate from "./components/templates/SchoolTemplate";

// Shared Elements
import FloatingWhatsApp from "./components/shared/FloatingWhatsApp";
import StickyCTABanner from "./components/shared/StickyCTABanner";
import TimeTracker from "./components/shared/TimeTracker";

// API Helpers
import { getApiUrl } from "./utils/api";

import { Lead } from "./types";
import { Loader2, ArrowLeft, Globe, BadgeAlert } from "lucide-react";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [leadCode, setLeadCode] = useState<Lead | null>(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState("");

  useEffect(() => {
    // Listen to forward/back browser history events
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Helper routine to change routes gracefully
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Triggered when a new lead details are saved
  const handleGenerateWebsite = async (formData: any) => {
    try {
      const response = await fetch(getApiUrl("/api/generate"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to progress loading screen passing slug and name to survive reload
        navigateTo(`/generating?slug=${result.slug}&name=${encodeURIComponent(formData.businessName)}`);
      } else {
        const errorData = await response.json();
        alert(`Server Error: ${errorData.error || "Failed to generate website demo."}`);
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Network Error: ${err.message || "Failed to connect to template generator server."}`);
      window.location.reload();
    }
  };

  // Parse generating parameters
  const queryParams = new URLSearchParams(window.location.search);
  const generatingSlug = queryParams.get("slug") || "";
  const generatingName = queryParams.get("name") || "Your Business";

  // Watch route path transitions and fetch lead dynamically if on a slug route
  useEffect(() => {
    const slug = currentPath.substring(1); // remove leading slash
    const staticPages = ["/about-us", "/our-work", "/contact-us", "/privacy-policy", "/terms-conditions", "/refund-policy"];
    
    // Skip if root, admin, generating or our static brand pages
    if (currentPath === "/" || currentPath === "/admin" || currentPath.startsWith("/generating") || staticPages.includes(currentPath)) {
      setLeadCode(null);
      setLeadError("");
      
      // Update Tab Titles
      if (currentPath === "/") {
        document.title = "ProgVision InstaDemoX | Instant Personalized Website Demo Generator";
      } else if (currentPath === "/admin") {
        document.title = "InstaDemoX Admin Core Workspace";
      } else if (currentPath.startsWith("/generating")) {
        document.title = "Assembling Your Website... | InstaDemoX";
      } else if (currentPath === "/about-us") {
        document.title = "About Us | InstaDemoX - Instant Web Performance Core";
      } else if (currentPath === "/our-work") {
        document.title = "Our Work | InstaDemoX - Interactive Core Previews";
      } else if (currentPath === "/privacy-policy") {
        document.title = "Privacy Policy | InstaDemoX Platform";
      } else if (currentPath === "/terms-conditions") {
        document.title = "Terms & Conditions | InstaDemoX Terms";
      } else if (currentPath === "/refund-policy") {
        document.title = "Refund Policy | InstaDemoX Guarantees";
      } else if (currentPath === "/contact-us") {
        document.title = "Contact Us | InstaDemoX - Dedicated Assistance Desk";
      }
      return;
    }

    // Otherwise, we treat the slug as a lead demo website
    const loadDemoDetails = async () => {
      setLeadLoading(true);
      setLeadError("");
      try {
        const response = await fetch(getApiUrl(`/api/leads/by-slug/${slug}`));
        if (response.ok) {
          const fetchedLead = await response.json();
          setLeadCode(fetchedLead);
          document.title = `${fetchedLead.business_name} | Official Website`;
        } else {
          setLeadError("Demo website not found. It may have expired or been removed.");
          document.title = "Demo Not Found | InstaDemoX";
        }
      } catch (err) {
        setLeadError("Network anomaly loading custom website demo.");
        document.title = "System Error | InstaDemoX";
      } finally {
        setLeadLoading(false);
      }
    };

    loadDemoDetails();
  }, [currentPath]);

  // Route: /generating page
  if (currentPath.startsWith("/generating")) {
    return (
      <ProgressLoader
        businessName={generatingName}
        onCompleted={() => {
          // Replace state so they can't go back into loader
          window.history.replaceState({}, "", `/${generatingSlug}`);
          setCurrentPath(`/${generatingSlug}`);
        }}
      />
    );
  }

  // Route: /admin page
  if (currentPath === "/admin") {
    return <AdminPanel />;
  }

  // Route: Custom Static Info Pages
  if (currentPath === "/about-us") {
    return <AboutUs navigateTo={navigateTo} />;
  }
  if (currentPath === "/our-work") {
    return <OurWork navigateTo={navigateTo} />;
  }
  if (currentPath === "/privacy-policy") {
    return <PrivacyPolicy navigateTo={navigateTo} />;
  }
  if (currentPath === "/terms-conditions") {
    return <TermsConditions navigateTo={navigateTo} />;
  }
  if (currentPath === "/refund-policy") {
    return <RefundPolicy navigateTo={navigateTo} />;
  }
  if (currentPath === "/contact-us") {
    return <ContactUs navigateTo={navigateTo} />;
  }

  // Route: / /[slug] (Personalized generated demo website)
  if (currentPath !== "/") {
    if (leadLoading) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            <p className="font-medium tracking-tight text-neutral-400">Loading personalized business website template...</p>
            <p className="text-xs text-neutral-600 italic">Reading assets, maps, and direct WhatsApp modules</p>
          </div>
        </div>
      );
    }

    if (leadError || !leadCode) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 font-inter text-center">
          <div className="max-w-md bg-[#161616] border border-[#2D2D2D] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="p-4 bg-rose-500/10 text-rose-500 rounded-full inline-block mb-5">
              <BadgeAlert className="w-8 h-8" />
            </div>
            
            <h1 className="text-2xl font-bold font-sora text-white mb-2">Website Demo Expired</h1>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {leadError || "The personalized demonstration link you accessed could not be fetched by our compilers. It is possible it was cleaned or never generated."}
            </p>

            <button
              onClick={() => navigateTo("/")}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Go Generate Website
            </button>
          </div>
        </div>
      );
    }

    // Select category template based on lead category (case-insensitive)
    const categoryLower = leadCode.category.toLowerCase();
    
    // Choose specific template container class based on category for appropriate styling
    let themeClass = "restaurant-theme";
    if (categoryLower === "hotel") themeClass = "hotel-theme";
    else if (categoryLower === "salon") themeClass = "salon-theme";
    else if (categoryLower === "clinic") themeClass = "clinic-theme";
    else if (categoryLower === "real estate") themeClass = "real-estate-theme";
    else if (categoryLower === "gym") themeClass = "gym-theme";
    else if (categoryLower === "school") themeClass = "school-theme";

    return (
      <div className={`w-full min-h-screen ${themeClass} pb-24`} id="dynamic-demo-site">
        
        {/* Render Category Specific Template */}
        {categoryLower === "restaurant" && <RestaurantTemplate lead={leadCode} />}
        {categoryLower === "hotel" && <HotelTemplate lead={leadCode} />}
        {categoryLower === "salon" && <SalonTemplate lead={leadCode} />}
        {categoryLower === "clinic" && <ClinicTemplate lead={leadCode} />}
        {categoryLower === "real estate" && <RealEstateTemplate lead={leadCode} />}
        {categoryLower === "gym" && <GymTemplate lead={leadCode} />}
        {categoryLower === "school" && <SchoolTemplate lead={leadCode} />}

        {/* Floating elements */}
        <FloatingWhatsApp number={leadCode.whatsapp} businessName={leadCode.business_name} />
        <StickyCTABanner slug={leadCode.slug} businessName={leadCode.business_name} createdAt={leadCode.created_at} />
        
        {/* Invisible telemetry tracker */}
        <TimeTracker slug={leadCode.slug} />
      </div>
    );
  }

  // Fallback / Default Route: `/` (Landing Page & form)
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white">
      {/* Mini Brand Banner */}
      <span className="sr-only">InstaDemoX Website Generator Panel</span>
      <LandingForm onFormSubmitted={handleGenerateWebsite} navigateTo={navigateTo} />
    </div>
  );
}
