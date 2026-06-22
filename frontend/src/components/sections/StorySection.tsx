export function StorySection() {
  return (
    <>
      <section className="w-full min-h-dvh overflow-hidden bg-[#0D1610] flex flex-col justify-center py-[clamp(5rem,10vh,9rem)] px-[clamp(1.5rem,5vw,4.5rem)]" id="story">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-[clamp(2.5rem,5vh,5rem)]">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-white/50 before:rounded-full">The story</p>
          <blockquote className="font-serif text-[clamp(2rem,4.5vw,5.5rem)] text-white leading-[1.12] tracking-tight not-italic max-w-[900px]">
            Most agencies talk <em>at</em> clients.<br />
            I think the job is to think <em>with</em> them
          </blockquote>
          <div className="flex flex-wrap gap-[clamp(2rem,5vw,6rem)] border-t border-white/10 pt-[clamp(1.5rem,3vh,2.5rem)]">
            <div className="s-stat flex flex-col">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">12</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/70 leading-normal mb-1">Companies built for</div>
              <div className="text-[11px] text-white/40 leading-normal">across 7+ industries</div>
            </div>
            <div className="s-stat flex flex-col">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">1,20,000</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/70 leading-normal mb-1">Leads generated</div>
              <div className="text-[11px] text-white/40 leading-normal">across client campaigns</div>
            </div>
            <div className="s-stat flex flex-col">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">15</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/70 leading-normal mb-1">Retainer clients</div>
              <div className="text-[11px] text-white/40 leading-normal">across 3 cities, currently</div>
            </div>
            <div className="s-stat flex flex-col">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">70%</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/70 leading-normal mb-1">Referral rate</div>
              <div className="text-[11px] text-white/40 leading-normal">of new clients in the last 2 years</div>
            </div>
          </div>
          <p className="text-sm text-white/25 tracking-[0.04em]">Akmal Rahman, Founder, EyeLevel Growth Studio</p>
        </div>
      </section>
    </>
  );
}
