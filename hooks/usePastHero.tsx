"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PastHeroContext = createContext(false);

export function PastHeroProvider({ children }: { children: React.ReactNode }) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <PastHeroContext.Provider value={pastHero}>{children}</PastHeroContext.Provider>
  );
}

export function usePastHero() {
  return useContext(PastHeroContext);
}
