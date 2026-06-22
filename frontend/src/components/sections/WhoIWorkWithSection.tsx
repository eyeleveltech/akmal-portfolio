import { ArrowDown } from "lucide-react";

export function WhoIWorkWithSection() {
  return (
    <section id="who-i-work-with" className="w-full bg-white py-[clamp(5rem,10vh,8rem)] px-[clamp(1.5rem,5vw,4.5rem)] border-t border-[#E0DCD2]">
      <div className="max-w-[1360px] mx-auto w-full">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">
          Who I work with
        </p>
        <div className="max-w-[800px]">
          <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-serif leading-[1.4] text-black mb-8">
            Companies that have a real business but no senior marketing person to own it
          </p>
          <p className="text-[1.0625rem] text-black/70 leading-[1.7] mb-8">
            You are past the stage of figuring out what you do. What you need now is someone who can build the marketing function and run it, not just execute a campaign.
          </p>
          <p className="text-[1.0625rem] text-black/70 font-semibold mb-4">This fits best if you are:</p>
          <ul className="list-disc pl-5 flex flex-col gap-3 text-[1.0625rem] text-black/70 leading-[1.6] mb-8">
            <li>A founder who has been managing marketing yourself and needs to hand it off to someone who can own it properly.</li>
            <li>A company that has tried agencies but keeps getting execution without strategy.</li>
            <li>A business in a growth phase where marketing needs to be treated as a core function, not a support activity.</li>
          </ul>
          <p className="text-[1.0625rem] text-black/70 leading-[1.7] mb-8">
            <strong>Industries where I have built this:</strong> Real Estate, Healthcare, IT and SaaS, Automotive, Manufacturing and B2B.
          </p>
          <p className="text-[1.0625rem] text-black/70 leading-[1.7] mb-10">
            If any of that fits, start with a 30-minute call. I will ask questions about your business and by the end of it you will have a clear picture of where the gap is, whether you work with me or not.
          </p>
          <button 
            onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} 
            className="inline-flex items-center gap-2.5 bg-[#1C4A2E] text-white text-sm font-semibold tracking-[0.02em] px-7 py-[0.9rem] rounded-full transition-all duration-250 hover:bg-[#2A6840] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(28,74,46,.35)]"
          >
            Book the call <ArrowDown className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
