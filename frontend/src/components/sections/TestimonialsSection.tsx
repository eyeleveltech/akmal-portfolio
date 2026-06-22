export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[#F2EEE6] py-[clamp(5rem,10vh,9rem)] px-[clamp(1.5rem,5vw,4.5rem)] border-t border-[#E0DCD2]"
    >
      <div className="max-w-[1360px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-[clamp(2.5rem,5vh,4rem)] flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-5 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">
              LinkedIn recommendations
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,3.25rem)] tracking-[-0.02em] leading-[1.1]">
              What people say
              <br />
              <em>when I'm not in the room</em>
            </h2>
          </div>
        </div>

        {/* Placeholder */}
        <p className="text-[clamp(1.125rem,1.5vw,1.5rem)] text-black/60 font-serif leading-[1.6]">
          This section is being updated with recommendations from founders and clients.
        </p>
      </div>
    </section>
  );
}
