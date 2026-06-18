export function StorySection() {
  return (
    <>
      <section className="w-full min-h-dvh overflow-hidden bg-[#0D1610] flex flex-col justify-center py-[clamp(5rem,10vh,9rem)] px-[clamp(1.5rem,5vw,4.5rem)]" id="story">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-[clamp(2.5rem,5vh,5rem)]">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-[22px] before:h-px before:bg-white/20">The story</p>
          <blockquote className="font-serif text-[clamp(2rem,4.5vw,5.5rem)] text-white leading-[1.12] tracking-tight not-italic max-w-[900px]">
            Most agencies talk <em>at</em> clients.<br />
            I think the job is to think <em>with</em> them.
          </blockquote>
          <div className="flex flex-wrap gap-[clamp(2rem,5vw,6rem)] border-t border-white/10 pt-[clamp(1.5rem,3vh,2.5rem)]">
            <div className="s-stat">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">15+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/35 leading-normal">Years in<br />marketing</div>
            </div>
            <div className="s-stat">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">5+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/35 leading-normal">Countries<br />worked</div>
            </div>
            <div className="s-stat">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">7+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/35 leading-normal">Industries</div>
            </div>
            <div className="s-stat">
              <div className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-none mb-1.5">1</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/35 leading-normal">Team that<br />owns it</div>
            </div>
          </div>
          <p className="text-sm text-white/25 tracking-[0.04em]">— Akmal Rahman &nbsp;/&nbsp; Founder, EyeLevel Growth Studio</p>
        </div>
      </section>
    </>
  );
}
