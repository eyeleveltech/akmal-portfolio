type Education = { degree: string; school: string };

const education: Education[] = [
  {
    degree: "Master of Science · Electronic Media",
    school: "University of Madras",
  },
  {
    degree: "Bachelor of Science · Visual Communication",
    school: "The New College, Chennai",
  },
];


const skills: string[] = [
  "Brand Strategy",
  "Performance Marketing",
  "Content Strategy",
  "AI-Powered Marketing",
  "SEO & AEO",
  "Social Media Strategy",
  "Campaign Management",
  "Marketing Analytics",
  "Fractional CMO",
  "Growth Strategy",
  "Google Ads",
  "Event Marketing",
];

const eyebrow =
  "text-xs font-semibold tracking-[0.14em] uppercase text-black/50 mb-6 inline-flex items-center gap-3 before:content-[''] before:inline-block before:w-[18px] before:h-px before:bg-[#1C4A2E] before:opacity-50";

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="bg-[#FAFAF7] py-[clamp(5rem,10vh,9rem)] px-[clamp(1.5rem,5vw,4.5rem)] border-t border-[#E0DCD2]"
    >
      <div className="max-w-[1360px] mx-auto w-full">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">
          Background
        </p>
        <h2 className="font-serif text-[clamp(1.75rem,3vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-12">
          Where I learned to think
          <br />
          <em>about marketing differently</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-[clamp(2.5rem,5vw,5.5rem)] mb-16 items-start">
          {/* Education */}
          <div className="flex flex-col">
            <p className={eyebrow}>Education</p>
            {education.map((item) => (
              <div
                key={item.degree}
                className="py-6 border-t border-[#E0DCD2] flex flex-col gap-1 last:border-b"
              >
                <p className="font-serif text-[1.375rem] leading-[1.25] text-black tracking-[-0.01em]">
                  {item.degree}
                </p>
                <p className="text-[0.9375rem] text-black/50 mt-0.5">
                  {item.school}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Skills */}
        <div className="pt-10 border-t border-[#E0DCD2]">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-black/50 mb-5 inline-flex items-center gap-3 before:content-[''] before:inline-block before:w-[18px] before:h-px before:bg-[#1C4A2E] before:opacity-50">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#E0DCD2] text-[0.8125rem] font-medium text-black transition-all duration-200 hover:border-[#1C4A2E] hover:bg-[#EAF1EC] hover:text-[#1C4A2E]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
