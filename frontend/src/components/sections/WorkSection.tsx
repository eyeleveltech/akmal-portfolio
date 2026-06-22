import { ArrowDown } from "lucide-react";

export function WorkSection() {
  return (
    <>
      <section className="w-full min-h-dvh overflow-hidden bg-[#F2EEE6] flex flex-col justify-center py-[clamp(5rem,10vh,8rem)] px-[clamp(1.5rem,5vw,4.5rem)]" id="work">
        <div className="max-w-[1360px] mx-auto w-full">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">The engagement</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(3rem,7vw,8rem)] items-center">
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,4rem)] leading-[1.1] tracking-tight mb-5">
                When you need a CMO<br />
                without a <em>CMO budget</em>
              </h2>
              <p className="text-[clamp(1rem,1.15vw,1.125rem)] text-black/50 leading-[1.7] max-w-[480px] mb-8">
                I work with a small number of companies at a time, either as a direct Fractional CMO or through EyeLevel Growth Studio as your agency. Either way: strategy and execution, not just advice.
              </p>
              <button onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2.5 bg-[#1C4A2E] text-white text-sm font-semibold tracking-[0.02em] px-7 py-[0.9rem] rounded-full transition-all duration-250 hover:bg-[#2A6840] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(28,74,46,.35)]">Start with a call <ArrowDown className="size-5" /></button>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-5 py-4.5 border-b border-[#E0DCD2] first:border-t">
                <span className="font-serif text-sm text-[#1C4A2E] italic shrink-0 pt-0.5 w-6">01</span>
                <div className="flex flex-col">
                  <strong className="block text-base font-semibold mb-1.5">Strategy that fits your stage</strong>
                  <span className="text-[0.9375rem] text-black/50 leading-[1.55]">Not a template borrowed from a company 10x your size</span>
                </div>
              </div>
              <div className="flex items-start gap-5 py-4.5 border-b border-[#E0DCD2] first:border-t">
                <span className="font-serif text-sm text-[#1C4A2E] italic shrink-0 pt-0.5 w-6">02</span>
                <div className="flex flex-col">
                  <strong className="block text-base font-semibold mb-1.5">Execution your team can run</strong>
                  <span className="text-[0.9375rem] text-black/50 leading-[1.55]">Real briefs, real workflows, real accountability</span>
                </div>
              </div>
              <div className="flex items-start gap-5 py-4.5 border-b border-[#E0DCD2] first:border-t">
                <span className="font-serif text-sm text-[#1C4A2E] italic shrink-0 pt-0.5 w-6">03</span>
                <div className="flex flex-col">
                  <strong className="block text-base font-semibold mb-1.5">Honest pushback</strong>
                  <span className="text-[0.9375rem] text-black/50 leading-[1.55]">I'll tell you when an idea won't work - before you spend on it</span>
                </div>
              </div>
              <div className="flex items-start gap-5 py-4.5 border-b border-[#E0DCD2] first:border-t">
                <span className="font-serif text-sm text-[#1C4A2E] italic shrink-0 pt-0.5 w-6">04</span>
                <div className="flex flex-col">
                  <strong className="block text-base font-semibold mb-1.5">One point of accountability</strong>
                  <span className="text-[0.9375rem] text-black/50 leading-[1.55]">Not a rotating account team that loses context every quarter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
