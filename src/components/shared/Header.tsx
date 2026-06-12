import React, { useState } from "react";
import Logo from "./Logo";
import { MessageSquare, Menu, X, ArrowLeft, ExternalLink } from "lucide-react";

interface HeaderProps {
  navigateTo: (path: string) => void;
  currentPath?: string;
}

export default function Header({ navigateTo, currentPath = window.location.pathname }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-neutral-900 py-4 px-4 sm:px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo element clickable to go home */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="flex items-center hover:opacity-90 transition-opacity shrink-0 mr-2"
          >
            <Logo />
          </a>

          {/* Professional Navigation Links in Header (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest font-mono">
            <a
              href="/about-us"
              onClick={(e) => handleLinkClick(e, "/about-us")}
              className={`transition-colors duration-300 flex flex-col items-center group relative py-1 ${
                currentPath === "/about-us" 
                  ? "text-amber-500" 
                  : "text-neutral-400 hover:text-amber-400"
              }`}
            >
              <span>About Us</span>
              {currentPath === "/about-us" && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              )}
            </a>
            <a
              href="/our-work"
              onClick={(e) => handleLinkClick(e, "/our-work")}
              className={`transition-colors duration-300 flex flex-col items-center group relative py-1 ${
                currentPath === "/our-work" 
                  ? "text-amber-500" 
                  : "text-neutral-400 hover:text-amber-400"
              }`}
            >
              <span>Our Work</span>
              {currentPath === "/our-work" && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              )}
            </a>
            <a
              href="/contact-us"
              onClick={(e) => handleLinkClick(e, "/contact-us")}
              className={`transition-colors duration-300 flex flex-col items-center group relative py-1 ${
                currentPath === "/contact-us" 
                  ? "text-amber-500" 
                  : "text-neutral-400 hover:text-amber-400"
              }`}
            >
              <span>Contact Us</span>
              {currentPath === "/contact-us" && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              )}
            </a>
          </nav>

          {/* Quick WA CTA Header Shortcut & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href="https://wa.me/918360824267?text=Hi!%20I'm%20interested%20in%20a%20website%20demo%20with%2520InstaDemoX."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="hidden min-[360px]:inline">WhatsApp</span>
            </a>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-850 hover:border-neutral-700 bg-neutral-950 md:hidden transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col pt-24 px-6 space-y-6 animate-fade-in text-left">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-amber-500 tracking-widest uppercase font-mono border-b border-neutral-900 pb-2">
              Navigation Menu
            </p>
            <div className="flex flex-col gap-5 text-sm font-semibold tracking-wide">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className={`py-2 border-b border-neutral-900/60 block ${
                  currentPath === "/" ? "text-amber-500" : "text-neutral-300 hover:text-white"
                }`}
              >
                Home Panel
              </a>
              <a
                href="/about-us"
                onClick={(e) => handleLinkClick(e, "/about-us")}
                className={`py-2 border-b border-neutral-900/60 block ${
                  currentPath === "/about-us" ? "text-amber-500" : "text-neutral-300 hover:text-white"
                }`}
              >
                About Us Story
              </a>
              <a
                href="/our-work"
                onClick={(e) => handleLinkClick(e, "/our-work")}
                className={`py-2 border-b border-neutral-900/60 block ${
                  currentPath === "/our-work" ? "text-amber-500" : "text-neutral-300 hover:text-white"
                }`}
              >
                Our Work Previews
              </a>
              <a
                href="/contact-us"
                onClick={(e) => handleLinkClick(e, "/contact-us")}
                className={`py-2 border-b border-neutral-900/60 block ${
                  currentPath === "/contact-us" ? "text-amber-500" : "text-neutral-300 hover:text-white"
                }`}
              >
                Contact Us Page
              </a>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <p className="text-[9px] text-neutral-500 font-mono tracking-widest">
              SECURED PORTAL • INSTADEMOX
            </p>
          </div>
        </div>
      )}
    </>
  );
}
