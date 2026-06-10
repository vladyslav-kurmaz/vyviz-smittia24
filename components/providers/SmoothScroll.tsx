"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import "lenis/dist/lenis.css";

const HEADER_OFFSET = 88;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.25,
        smoothWheel: true,
        touchMultiplier: 1.15,
        allowNestedScroll: true,
        anchors: {
          offset: -HEADER_OFFSET,
        },
        prevent: (node) =>
          node instanceof HTMLElement &&
          (node.classList.contains("lead-modal-overlay") ||
            node.classList.contains("lead-modal-panel")),
      }}
    >
      {children}
    </ReactLenis>
  );
}
