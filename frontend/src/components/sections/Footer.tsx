import white_logo from "@/assets/AKMAL_RAHMAN_WHITE_LOGO.png"

export function Footer() {
  return (
    <>
      <footer className="bg-[#0D1610] text-white/75 py-[clamp(3rem,7vw,6rem)] px-[clamp(1.5rem,5vw,4.5rem)]">
  <div className="max-w-[1360px] mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-10 sm:gap-16 items-start mb-12">
      <div>
        <img src={white_logo} className="block w-[140px] sm:w-auto h-auto sm:h-[2.8rem] object-contain mb-3" alt="Akmal Rahman" />
        <p className="text-sm text-white/40">Founder, EyeLevel Growth Studio. Marketing practitioner, Chennai.</p>
      </div>
      <div className="flex flex-wrap gap-8 sm:gap-[clamp(2rem,5vw,5rem)]">
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/30 mb-3.5">Connect</p>
          <ul className="flex flex-col gap-2.5">
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="https://linkedin.com/in/akmalrahman" target="_blank" rel="noopener">LinkedIn ↗</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="https://theeyelevelstudio.com" target="_blank" rel="noopener">EyeLevel Studio ↗</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#book">Book a call ↓</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/30 mb-3.5">Contact</p>
          <ul className="flex flex-col gap-2.5">
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="mailto:hello@eyelevelstudio.in">hello@eyelevelstudio.in</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="tel:+919789099499">+91 97890 99499</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/30 mb-3.5">On this site</p>
          <ul className="flex flex-col gap-2.5">
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#story">About</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#work">Work with me</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#writing">Writing</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#credentials">Background</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#testimonials">Recommendations</a></li>
            <li><a className="text-sm text-white/55 transition-colors duration-200 hover:text-white" href="#book">Book a call</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4">
      <p className="text-xs text-white/25">&copy; 2026 Akmal Rahman. All rights reserved.</p>
      <p className="text-xs text-white/25">Built by <a className="text-white/40 transition-colors duration-200 hover:text-white/80" href="https://theeyelevelstudio.com" target="_blank" rel="noopener">EyeLevel Growth Studio</a></p>
    </div>
  </div>
</footer>
    </>
  );
}
