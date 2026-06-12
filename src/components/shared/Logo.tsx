import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <div className="relative group shrink-0">
        {/* Subtle Ambient Glow behind the logo */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-yellow-500 rounded-xl blur-md opacity-35 group-hover:opacity-60 transition duration-500"></div>
        
        {/* Modern 3D Hexagonal Shield Icon */}
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-[#141414] to-black border border-neutral-800/80 flex items-center justify-center shadow-lg shadow-black/80 group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-6.5 h-6.5 text-amber-500"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background geometric accents */}
            <path
              d="M50 5L90 28V72L50 95L10 72V28L50 5Z"
              stroke="url(#accent-gradient)"
              strokeWidth="4"
              strokeLinejoin="round"
              className="opacity-40"
            />
            
            {/* Core Dynamic Lightning Bolt Bolt Vector */}
            <path
              d="M56 16L28 51H49L41 84L71 47H49L56 16Z"
              fill="url(#logo-gold-grad)"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            
            <defs>
              <linearGradient id="logo-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#FBBF24" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <span className="text-base sm:text-xl font-bold tracking-tight text-white font-sora hidden min-[400px]:inline-block shrink-0">
          Insta<span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">DemoX</span>
        </span>
      )}
    </div>
  );
}
