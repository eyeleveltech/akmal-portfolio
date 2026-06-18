import { useEffect, useRef } from "react";
import { PAGE_SCRIPT } from "@/lib/akmal-content";

import {
  Nav,
  HeroSection,
  StorySection,
  WorkSection,
  WritingSection,
  CredentialsSection,
  TestimonialsSection,
  BookCallSection,
  Footer
} from "@/components/sections";

export function MainSite() {
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    try {
      // Execute the original page script in the global scope.
      const fn = new Function(PAGE_SCRIPT);
      fn();
    } catch (e) {
      console.error("Page script error:", e);
    }
  }, []);

  return (
    <>
      <Nav />
      <HeroSection />
      <StorySection />
      <WorkSection />
      <WritingSection />
      <CredentialsSection />
      <TestimonialsSection />
      <BookCallSection />
      <Footer />
      
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
    </>
  );
}
