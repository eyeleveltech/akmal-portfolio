import { useState } from "react";
import axios from "axios";
import { Clock, User, Building2, Calendar, Video } from "lucide-react";

export function BookCallSection() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isPast = dateObj < today;
      const isSelected = date === dateStr;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => { setDate(dateStr); setTime(""); }}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 
            ${isSelected ? 'bg-[#1C4A2E] text-white shadow-md' :
              isPast ? 'text-black/20 cursor-not-allowed' :
                'text-black hover:bg-[#1C4A2E]/10 hover:text-[#1C4A2E]'}`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBook = async () => {
    if (!date || !time) {
      setError("Please select a date and time.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/book-call", {
        name, email, company, date, time
      });
      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Failed to book the call. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = Array.from({ length: 48 }, (_, i) => {
    const hours24 = Math.floor(i / 2);
    const mins = (i % 2) === 0 ? '00' : '30';
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${String(hours12).padStart(2, '0')}:${mins} ${ampm}`;
  });

  return (
    <section id="book" className="py-[clamp(5.5rem,11vw,10rem)] bg-[#F2EEE6] border-t border-[#E0DCD2]">
      <div className="max-w-[860px] mx-auto px-[clamp(1.5rem,5vw,4.5rem)]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-3 before:content-[''] before:inline-block before:w-[22px] before:h-px before:bg-[#1C4A2E]">Book a call</p>
          <h2>30 minutes to figure out<br />if this is a <em>good fit.</em></h2>
          <p className="mt-3.5 text-sm text-black/50">Pick a date and time that works. I'll send a Google Meet link and a confirmation straight to your inbox.</p>
        </div>

        {step < 3 && (
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-11">
            <div className={`flex items-center gap-2 text-xs font-semibold tracking-[0.06em] uppercase ${step === 1 ? 'text-[#1C4A2E]' : 'text-black/30'}`}>
              <div className="w-[26px] h-[26px] rounded-full border-[1.5px] border-current flex items-center justify-center text-[11px] transition-colors duration-200 shrink-0">1</div>Details
            </div>
            <div className="w-4 sm:w-9 h-px bg-[#E0DCD2] shrink-0"></div>
            <div className={`flex items-center gap-2 text-xs font-semibold tracking-[0.06em] uppercase ${step === 2 ? 'text-[#1C4A2E]' : 'text-black/30'}`}>
              <div className="w-[26px] h-[26px] rounded-full border-[1.5px] border-current flex items-center justify-center text-[11px] transition-colors duration-200 shrink-0">2</div>Schedule
            </div>
          </div>
        )}

        {error && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[10px] py-3.5 px-4.5 text-sm text-[#991B1B] mb-4 text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <form className="flex flex-col gap-4.5" onSubmit={handleNext}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.8125rem] font-semibold text-black">Your name <span className="text-[#1C4A2E]">*</span></label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[10px] px-4 py-3.5 font-sans text-sm text-black w-full outline-none focus:border-[#1C4A2E]" placeholder="Priya Sharma" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.8125rem] font-semibold text-black">Email address <span className="text-[#1C4A2E]">*</span></label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[10px] px-4 py-3.5 font-sans text-sm text-black w-full outline-none focus:border-[#1C4A2E]" placeholder="priya@company.in" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.8125rem] font-semibold text-black">Phone number <span className="text-[#1C4A2E]">*</span></label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[10px] px-4 py-3.5 font-sans text-sm text-black w-full outline-none focus:border-[#1C4A2E]" placeholder="+91 98765 43210" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.8125rem] font-semibold text-black">Company / Organisation</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[10px] px-4 py-3.5 font-sans text-sm text-black w-full outline-none focus:border-[#1C4A2E]" placeholder="Your company name" />
                </div>
              </div>
              <button type="submit" className="bg-[#1C4A2E] text-white rounded-full px-9 py-4 text-sm font-semibold mt-6 self-start hover:bg-[#2A6840]">
                Pick a time &#8594;
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm text-black/50 mb-8 hover:text-black self-start">← Back</button>

            <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full">
              {/* Left Side: Calendar */}
              <div className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[24px] p-8 w-full max-w-sm shadow-sm shrink-0 mx-auto lg:mx-0">
                <div className="flex justify-between items-center mb-6">
                  <button onClick={handlePrevMonth} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-[#1C4A2E] transition-colors text-xl font-medium">
                    &larr;
                  </button>
                  <h3 className="font-serif text-[1.35rem] font-semibold text-[#1C4A2E]">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button onClick={handleNextMonth} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-[#1C4A2E] transition-colors text-xl font-medium">
                    &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-3">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-[0.6875rem] font-semibold text-black/40 uppercase tracking-widest">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-1 justify-items-center">
                  {renderCalendarDays()}
                </div>
              </div>

              {/* Right Side: Times & Confirm */}
              <div className="w-full lg:max-w-md flex flex-col lg:pt-8 min-h-[350px] mx-auto lg:mx-0">
                {!date ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-[1.5px] border-dashed border-[#E0DCD2] rounded-[24px]">
                    <p className="text-sm font-medium text-black/50">Please select a date on the calendar to see available times.</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full w-full max-w-[380px] mx-auto lg:mx-0">
                    <p className="text-[0.6875rem] tracking-widest font-semibold text-black/40 mb-4 uppercase text-center lg:text-left">Available Times for {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>

                    <style>
                      {`
                      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                      .custom-scrollbar::-webkit-scrollbar-thumb { background: #E0DCD2; border-radius: 10px; }
                      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #1C4A2E; }
                      `}
                    </style>

                    <div className="grid grid-cols-2 gap-3 mb-6 overflow-y-auto custom-scrollbar pr-2 max-h-[320px]">
                      {availableTimes.map(t => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`flex items-center justify-center gap-2 py-3.5 rounded-[12px] border-[1px] text-sm font-semibold transition-all duration-200 ${time === t
                              ? 'border-[#1C362F] bg-[#1C362F] text-white shadow-md'
                              : 'border-[#E0DCD2]/70 bg-white text-[#1A2F25] hover:border-[#1C362F]/30 hover:bg-black/[0.02]'
                            }`}
                        >
                          <Clock size={16} className={time === t ? "text-white/80" : "text-[#1A2F25]/60"} />
                          {t}
                        </button>
                      ))}
                    </div>

                    {time && (
                      <div className="mt-auto lg:pt-6 lg:border-t border-[#E0DCD2] animate-in fade-in duration-500">
                        <button onClick={handleBook} disabled={loading} className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.01em] transition-all duration-200 hover:bg-black/90 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none ml-auto flex items-center gap-2 group border border-transparent">
                          {loading ? "Booking..." : "Confirm Booking"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 px-6">
            <div className="w-12 h-12 bg-[#EAF1EC] rounded-full flex items-center justify-center mx-auto mb-5 text-[#1C4A2E] text-xl font-bold">
              ✓
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,2.8vw,3rem)] mb-2.5">Request received.</h2>
            <p className="text-black/50 text-sm max-w-[420px] mx-auto mb-7">I'll send a confirmation and calendar invite to your inbox. Looking forward to talking.</p>
            <div className="flex flex-col gap-0 bg-white border border-[#E0DCD2]/80 rounded-[16px] overflow-hidden mb-10 text-left shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-[400px] mx-auto">
              
              {/* Header section with Date/Time */}
              <div className="bg-[#1C4A2E] text-white p-5 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-4 opacity-10"><Calendar size={80} strokeWidth={1.5} /></div>
                <div className="bg-white/10 p-2.5 rounded-[10px] shrink-0 backdrop-blur-md border border-white/10"><Clock size={20} className="text-white" /></div>
                <div className="flex flex-col z-10">
                  <span className="text-[0.65rem] font-bold text-white/60 uppercase tracking-[0.15em] mb-0.5">Scheduled for</span>
                  <span className="font-semibold text-[0.95rem]">{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })} at {time}</span>
                </div>
              </div>

              {/* Body section with Details */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 text-[0.95rem]">
                  <div className="bg-[#EAF1EC] p-2.5 rounded-[10px] text-[#1C4A2E] shrink-0"><User size={18} /></div>
                  <div className="flex flex-col"><span className="text-[0.65rem] font-bold text-black/40 uppercase tracking-[0.15em] mb-0.5">Attendee</span><span className="font-semibold text-[#1A2F25]">{name}{company ? ` (${company})` : ''}</span></div>
                </div>

                <div className="flex items-center gap-4 text-[0.95rem] pt-1">
                  <div className="bg-[#EAF1EC] p-2.5 rounded-[10px] text-[#1C4A2E] shrink-0"><Video size={18} /></div>
                  <div className="flex flex-col"><span className="text-[0.65rem] font-bold text-black/40 uppercase tracking-[0.15em] mb-0.5">Location</span><span className="font-semibold text-[#1A2F25]">Google Meet (link in email)</span></div>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => { setStep(1); setDate(''); setTime(''); setName(''); setEmail(''); setCompany(''); setPhone(''); }} className="text-sm font-medium text-[#1C4A2E] underline">Book another call</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
