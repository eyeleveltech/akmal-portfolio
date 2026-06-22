import sketched from "@/assets/akmal_sir_sketch.webp";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <section
        className="w-full min-h-screen bg-white flex flex-col md:flex-row items-center justify-center overflow-hidden relative"
        id="hero"
      >
        <div className="flex-1 flex flex-col justify-end px-[clamp(1.5rem,5vw,4.5rem)] pt-[100px] lg:pt-[140px] pb-[clamp(3rem,6vh,5rem)] z-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#1C4A2E] flex items-center gap-3.5 mb-6 opacity-0 animate-[fu_0.8s_ease_0.3s_forwards]">
            <span className="w-[5px] h-[5px] bg-[#1C4A2E] rounded-full"></span>
            Founder · EyeLevel Growth Studio · Chennai
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,7rem)] leading-[0.94] tracking-[-0.03em] mb-0 opacity-0 animate-[fu_0.9s_ease_0.5s_forwards]">
            The marketing practitioner who sat on <em>your side</em>
          </h1>
          <div className="flex flex-col gap-8 mt-[clamp(2rem,4vh,3.5rem)]">
            <p className="text-[clamp(0.95rem,1.3vw,1.1rem)] font-light text-black/70 leading-[1.7] max-w-[400px] opacity-0 animate-[fu_0.8s_ease_0.7s_forwards]">
              I've been the client who hired agencies and got let down. Then I
              built the one I always wished I could hire.
              <strong className="text-[#0D0D0B] font-medium block mt-2">
                Now I run it - and sometimes, I become yours.
              </strong>
            </p>
            <div className="shrink-0 flex flex-col items-start gap-3 opacity-0 animate-[fu_0.8s_ease_0.9s_forwards]">
              <a
                href="#book"
                className="inline-flex items-center gap-2.5 bg-[#1C4A2E] text-white text-sm font-semibold tracking-[0.02em] px-7 py-[0.9rem] rounded-full transition-all duration-250 hover:bg-[#2A6840] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(28,74,46,.35)]"
                id="hero-cta"
              >
                Let's talk <ArrowUpRight className="size-5" />
              </a>
              <p className="text-xs text-black/50 tracking-[0.04em]">
                30-min strategy call &nbsp;·&nbsp; No decks
              </p>
            </div>
          </div>
        </div>
        <img
          src={sketched}
          className="block mx-auto shrink-0 h-[350px] md:h-[350px] md:mb-20 lg:mb-0 lg:h-[calc(100dvh-6.5rem)] self-end object-contain object-bottom"
          alt="Akmal Rahman"
        />
      </section>
    </>
  );
}
