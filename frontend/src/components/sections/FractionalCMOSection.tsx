import { ArrowDown } from "lucide-react";

export function FractionalCMOSection() {
  return (
    <section className="w-full bg-white py-[clamp(5rem,10vh,8rem)] px-[clamp(1.5rem,5vw,4.5rem)] border-t border-[#E0DCD2]" id="fractional-cmo">
      <div className="max-w-[1360px] mx-auto w-full">
        <div className="mb-10 lg:mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">Fractional CMO</p>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] tracking-tight max-w-[800px]">
            Senior marketing leadership without the full-time hire
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 lg:mb-14">
          <div className="bg-[#FAFAF7] p-8 border-[1.5px] border-[#E0DCD2] rounded-2xl flex flex-col transition-all duration-200 hover:border-[#1C4A2E] hover:shadow-[0_8px_32px_rgba(28,74,46,.1)] hover:-translate-y-[3px] group">
            <h3 className="text-[0.9375rem] font-bold uppercase tracking-wide text-black mb-4 w-fit relative after:absolute after:-bottom-1 after:left-0 after:right-full after:h-[1.5px] after:bg-[#1C4A2E] after:transition-all after:duration-300 group-hover:after:right-0">Fractional CMO</h3>
            <p className="text-[1.0625rem] text-black/70 leading-[1.65]">
              I come in as your marketing head. I own the strategy, set the roadmap, manage whoever you have in-house, and make the calls that a CMO makes. You get senior-level thinking applied to your specific stage, your specific market.
            </p>
          </div>
          
          <div className="bg-[#FAFAF7] p-8 border-[1.5px] border-[#E0DCD2] rounded-2xl flex flex-col transition-all duration-200 hover:border-[#1C4A2E] hover:shadow-[0_8px_32px_rgba(28,74,46,.1)] hover:-translate-y-[3px] group">
            <h3 className="text-[0.9375rem] font-bold uppercase tracking-wide text-black mb-4 w-fit relative after:absolute after:-bottom-1 after:left-0 after:right-full after:h-[1.5px] after:bg-[#1C4A2E] after:transition-all after:duration-300 group-hover:after:right-0">CMO + Agency</h3>
            <p className="text-[1.0625rem] text-black/70 leading-[1.65]">
              I come in as Fractional CMO and bring EyeLevel Growth Studio with me as the execution team. Strategy and delivery under one roof, owned by one person.
            </p>
          </div>
          
          <div className="bg-[#FAFAF7] p-8 border-[1.5px] border-[#E0DCD2] rounded-2xl flex flex-col transition-all duration-200 hover:border-[#1C4A2E] hover:shadow-[0_8px_32px_rgba(28,74,46,.1)] hover:-translate-y-[3px] group">
            <h3 className="text-[0.9375rem] font-bold uppercase tracking-wide text-black mb-4 w-fit relative after:absolute after:-bottom-1 after:left-0 after:right-full after:h-[1.5px] after:bg-[#1C4A2E] after:transition-all after:duration-300 group-hover:after:right-0">The Engagement Model</h3>
            <p className="text-[1.0625rem] text-black/70 leading-[1.65]">
              Flexible by design. Some companies need this for a focused sprint to fix a specific problem. Others keep me on month to month as their ongoing marketing head. We figure out what makes sense in the first conversation.
            </p>
          </div>
          
          <div className="bg-[#FAFAF7] p-8 border-[1.5px] border-[#E0DCD2] rounded-2xl flex flex-col transition-all duration-200 hover:border-[#1C4A2E] hover:shadow-[0_8px_32px_rgba(28,74,46,.1)] hover:-translate-y-[3px] group">
            <h3 className="text-[0.9375rem] font-bold uppercase tracking-wide text-black mb-4 w-fit relative after:absolute after:-bottom-1 after:left-0 after:right-full after:h-[1.5px] after:bg-[#1C4A2E] after:transition-all after:duration-300 group-hover:after:right-0">What the discovery call is</h3>
            <p className="text-[1.0625rem] text-black/70 leading-[1.65]">
              30 minutes. No deck. I will ask about your business, your current marketing setup, and what you are trying to fix. By the end, you will have a clear picture of where the biggest gap is.
            </p>
          </div>
        </div>
        
        <div className="flex">
          <button onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center gap-2.5 bg-[#1C4A2E] text-white text-sm font-semibold tracking-[0.02em] px-7 py-[0.9rem] rounded-full transition-all duration-250 hover:bg-[#2A6840] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(28,74,46,.35)]">
            Book the call <ArrowDown className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
