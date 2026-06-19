import { useState } from "react";
import logo from "@/assets/AKMAL RAHMAN_LOGO.png"

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav id="nav" className="fixed top-0 left-0 right-0 z-50 py-3 px-5 sm:px-[clamp(1.5rem,5vw,4.5rem)] flex justify-between items-center bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E0DCD2] transition-all duration-300">
        <a href="#hero" onClick={() => setIsOpen(false)} className="shrink-0 block z-10">
          <img src={logo} className="block w-[130px] sm:w-auto h-auto sm:h-[2.2rem] md:h-[1.7rem] lg:h-[3.2rem] mix-blend-multiply object-contain" alt="Akmal Rahman" />
        </a>

        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-4 lg:gap-9">
          <a href="#story" className="text-sm font-medium text-black/50 relative transition-colors duration-200 hover:text-black after:absolute after:-bottom-0.5 after:left-0 after:right-full after:h-px after:bg-[#1C4A2E] after:transition-all after:duration-250 hover:after:right-0">About</a>
          <a href="#work" className="text-sm font-medium text-black/50 relative transition-colors duration-200 hover:text-black after:absolute after:-bottom-0.5 after:left-0 after:right-full after:h-px after:bg-[#1C4A2E] after:transition-all after:duration-250 hover:after:right-0">Work</a>
          <a href="#writing" className="text-sm font-medium text-black/50 relative transition-colors duration-200 hover:text-black after:absolute after:-bottom-0.5 after:left-0 after:right-full after:h-px after:bg-[#1C4A2E] after:transition-all after:duration-250 hover:after:right-0">Writing</a>
          <a href="#credentials" className="text-sm font-medium text-black/50 relative transition-colors duration-200 hover:text-black after:absolute after:-bottom-0.5 after:left-0 after:right-full after:h-px after:bg-[#1C4A2E] after:transition-all after:duration-250 hover:after:right-0">Background</a>
        </div>

        <a href="#book" className="items-center text-sm font-semibold text-white bg-[#1C4A2E] px-5.5 py-2.5 rounded-full tracking-[0.01em] transition-all duration-200 hover:bg-[#2A6840] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(28,74,46,.3)] hidden sm:inline-flex shrink-0">Book a call</a>

        {/* Mobile menu toggle */}
        <button
          className="flex sm:hidden flex-col gap-[2px] p-2 z-[60] shrink-0"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-[12px] h-[1.5px] bg-[#0D0D0B] block transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}></span>
          <span className={`w-[12px] h-[1.5px] bg-[#0D0D0B] block transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[12px] h-[1.5px] bg-[#0D0D0B] block transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}></span>
        </button>

        {/* Mobile dropdown menu */}
        <div className={`absolute top-full left-0 w-full bg-[#FAFAF7]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${isOpen ? 'max-h-[400px] opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-[#E0DCD2]/50' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-center gap-6 pt-6 pb-8 border-t border-[#E0DCD2]/30">
            <a href="#story" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#1A2F25]">About</a>
            <a href="#work" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#1A2F25]">Work</a>
            <a href="#writing" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#1A2F25]">Writing</a>
            <a href="#credentials" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#1A2F25]">Background</a>
            <a href="#book" onClick={() => setIsOpen(false)} className="mt-2 text-sm font-semibold text-white bg-[#1C4A2E] px-8 py-3 rounded-full">Book a call</a>
          </div>
        </div>
      </nav>
    </>
  );
}
