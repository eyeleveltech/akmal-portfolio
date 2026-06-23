import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";

type Article = {
  id?: string;
  category: string;
  title: string;
  excerpt: string;
  platform: string;
  readTime: string;
  url: string;
};

export function WritingSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = () => {
      axios.get<Article[]>(`${API_URL}/articles`)
        .then(res => {
          setArticles(Array.isArray(res.data) ? res.data : []);
        })
        .catch(err => console.error("Failed to fetch articles:", err))
        .finally(() => setLoading(false));
    };

    fetchArticles();
    // Poll every 5 seconds so edits from the admin panel show up live.
    const interval = setInterval(fetchArticles, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayData = articles;

  return (
    <>
      <section className="w-full min-h-dvh overflow-hidden bg-[#FAFAF7] flex flex-col justify-center py-[clamp(7rem,14vh,11rem)] px-[clamp(1.5rem,5vw,4.5rem)]" id="writing">
        <div className="max-w-[1360px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-[clamp(2.5rem,5vh,4.5rem)] flex-wrap gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C4A2E] inline-flex items-center gap-3 mb-7 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full">Writing</p>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3.75rem)] tracking-[-0.02em] leading-[1.1]"><em>How</em> I think out loud</h2>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => window.open("https://www.linkedin.com/in/akmalbillekar/", "_blank", "noopener noreferrer")} className="inline-flex items-center gap-2.5 border-[1.5px] border-[#1C4A2E] text-[#1C4A2E] text-sm font-semibold tracking-[0.02em] px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 hover:bg-[#1C4A2E] hover:text-white hover:-translate-y-px">LinkedIn <ArrowUpRight className="size-5" /></button>
              <button onClick={() => window.open("https://medium.com/@akmal_29859", "_blank", "noopener noreferrer")} className="inline-flex items-center gap-2.5 border-[1.5px] border-[#1C4A2E] text-[#1C4A2E] text-sm font-semibold tracking-[0.02em] px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 hover:bg-[#1C4A2E] hover:text-white hover:-translate-y-px">Medium <ArrowUpRight className="size-5" /></button>
            </div>
          </div>
          {!loading && displayData.length === 0 && (
            <p className="text-black/40 italic">No articles published yet.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {displayData.map((article, i) => (
              <a key={article.id || i} className="bg-white border-[1.5px] border-[#E0DCD2] rounded-[16px] p-[clamp(1.5rem,3vw,2.5rem)] flex flex-col transition-all duration-200 text-inherit hover:border-[#1C4A2E] hover:shadow-[0_8px_32px_rgba(28,74,46,.1)] hover:-translate-y-[3px] group h-full" href={article.url} target={article.url !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
                <span className="text-[0.6875rem] font-semibold tracking-widest uppercase text-[#1C4A2E] mb-4">{article.category}</span>
                <h3 className="font-serif text-[clamp(1rem,1.4vw,1.3rem)] leading-[1.3] mb-3.5 flex-1">{article.title}</h3>
                <p className="text-sm text-black/50 leading-[1.6] mb-5 line-clamp-3 overflow-hidden">{article.excerpt}</p>
                <div className="flex justify-between items-center text-[0.8125rem] font-semibold text-[#1C4A2E] pt-4 border-t border-[#E0DCD2]">
                  <span>{article.platform}{article.readTime ? ` · ${article.readTime}` : ""}</span>
                  <span className="text-base inline-block transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"><ArrowUpRight className="size-5" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
