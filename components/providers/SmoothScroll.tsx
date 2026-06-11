"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import { scheduleAfterIdle } from "@/lib/idle-schedule";
import { DESKTOP_MEDIA } from "@/lib/viewport";
import "lenis/dist/lenis.css";

const HEADER_OFFSET = 88;
const LENIS_DEFER_MS = 1500;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(DESKTOP_MEDIA);
    if (motion.matches || !desktop.matches) return;

    const cancel = scheduleAfterIdle(() => setEnabled(true), LENIS_DEFER_MS);

    const onChange = () => {
      setEnabled(!motion.matches && desktop.matches);
    };
    motion.addEventListener("change", onChange);
    desktop.addEventListener("change", onChange);

    return () => {
      cancel();
      motion.removeEventListener("change", onChange);
      desktop.removeEventListener("change", onChange);
    };
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
