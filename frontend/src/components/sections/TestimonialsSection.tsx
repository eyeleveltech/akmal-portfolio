import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  context: string;
  linkedin: string;
};

// All recommendations live here — add / edit / reorder in one place.
const RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/akmalrahman/details/recommendations/";

const testimonials: Testimonial[] = [
  {
    quote:
      "Akmal was an invaluable member of my team. His respect for authority and reporting was a testament to his humility and dedication at work. During my leadership tenure in managing Akmal, he has received many noteworthy mentions/accolades because of his contributions at work and willingness to be tested out of his comfort zone. A great team player who will be a candidate of merit to whoever that chooses to interact with him in future and I wish him success in the years ahead.",
    name: "Manjit Cherian",
    title: "CEO · Marketing as Sales Support (MaSs)",
    context: "Direct manager · Sep 2018",
    linkedin: "https://www.linkedin.com/in/manjitcherian/",
  },
  {
    quote:
      "Akmal handled the PR activities of SSI very diligently. He is a sincere with high integrity and ethics. He developed many professional and friendly relationships with inside and outside organisation. He is good in change management and a quick learner",
    name: "VG Sakthikumar",
    title:
      "Chairman & Managing Director at SCHWING Stetter (India) Private Limited",
    context: "Direct manager · Dec 2018",
    linkedin: " https://www.linkedin.com/in/vg-sakthikumar-3b898240/",
  },
  {
    quote:
      "Worked with me at Network 18, he is one of the few people who transform themselves completely in no time to take up a completely new role and take charge of it. A versatile professional with a great sense of agility and responsbility.",
    name: "Nabeel A Khan",
    title: "DVP, Public Affairs & Communications · Renault India",
    context: "Same team · May 2021",
    linkedin: "https://www.linkedin.com/in/nabeel-a-khan-359ba317/",
  },
  {
    quote:
      "What makes Akmal special isn't just his expertise — it's how he combines deep knowledge with authentic care for the people and businesses he works with. His integrated approach to traditional marketing, digital strategies, and AI automation creates campaigns that are both innovative and highly effective.",
    name: "Fazeel Ahmed",
    title: "Salesforce Lightning UI Architecture",
    context: "Studied together · Aug 2025",
    linkedin: "https://www.linkedin.com/in/fazeel-ahmed-5a34571a/",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  return (
    <section
      id="testimonials"
      className="bg-[#F2EEE6] py-[clamp(5rem,10vh,9rem)] px-[clamp(1.5rem,5vw,4.5rem)] border-t border-[#E0DCD2]"
    >
      <div className="max-w-[1360px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-[clamp(2.5rem,5vh,4rem)] flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-5 before:content-[''] before:inline-block before:w-[22px] before:h-px before:bg-[#1C4A2E] before:opacity-50">
              LinkedIn recommendations
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,3.25rem)] tracking-[-0.02em] leading-[1.1]">
              What people say
              <br />
              <em>when I'm not in the room.</em>
            </h2>
          </div>
          <a
            href={RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#1C4A2E] inline-flex items-center gap-1.5 pb-1 border-b border-transparent transition-colors duration-200 hover:border-[#1C4A2E]"
          >
            View all on LinkedIn <ArrowUpRight className="size-5" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex w-full transition-transform duration-[600ms] ease-[cubic-bezier(.7,.05,.3,1)] will-change-transform"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] min-w-0 bg-white border border-[#E0DCD2] rounded-[20px] p-[clamp(2rem,4vw,3.5rem)] flex flex-col gap-8 relative before:content-['\\201C'] before:absolute before:top-5 before:right-8 before:font-serif before:text-6xl before:leading-none before:text-[#1C4A2E] before:opacity-10 before:pointer-events-none"
                >
                  <p className="font-serif text-[1rem] sm:text-[clamp(1.25rem,1.6vw,1.6rem)] leading-[1.55] text-black not-italic tracking-[-0.005em]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-6 border-t border-[#E0DCD2] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-base text-black">
                        {t.name}
                      </p>
                      <p className="text-sm text-black/50 leading-normal mt-0.5">
                        {t.title}
                      </p>
                      <p className="text-xs text-black/30 mt-1.5 italic tracking-[0.03em]">
                        {t.context}
                      </p>
                    </div>
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1C4A2E] border border-[#1C4A2E]/30 rounded-full px-4 py-2 transition-all duration-200 hover:bg-[#1C4A2E] hover:text-white hover:-translate-y-px self-start sm:self-auto"
                    >
                      View on LinkedIn <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-[#E0DCD2] bg-white text-[1.1rem] text-black inline-flex items-center justify-center transition-all duration-200 hover:bg-[#1C4A2E] hover:border-[#1C4A2E] hover:text-white hover:-translate-y-px"
              aria-label="Previous"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="inline-flex gap-2 items-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-[7px] shrink-0 border-none p-0 transition-all duration-250 ${
                    currentIndex === idx
                      ? "bg-[#1C4A2E] w-[22px] rounded-[4px]"
                      : "bg-black/20 w-[7px] rounded-full"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                ></button>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-[#E0DCD2] bg-white text-[1.1rem] text-black inline-flex items-center justify-center transition-all duration-200 hover:bg-[#1C4A2E] hover:border-[#1C4A2E] hover:text-white hover:-translate-y-px"
              aria-label="Next"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
