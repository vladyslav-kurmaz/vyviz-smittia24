/** Затримка перед підвантаженням desktop-відео (після load) — не блокує LCP. */
export const HERO_VIDEO_LOAD_DELAY_MS = 2000;

export function shouldSkipHeroVideo(): boolean {
  if (typeof window === "undefined") return true;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return true;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
    return true;
  }

  return false;
}

export function scheduleHeroVideoLoad(onReady: () => void): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const run = () => {
    if (cancelled || shouldSkipHeroVideo()) return;

    const start = () => {
      if (!cancelled) onReady();
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, {
        timeout: HERO_VIDEO_LOAD_DELAY_MS + 500,
      });
    } else {
      timeoutId = setTimeout(start, HERO_VIDEO_LOAD_DELAY_MS);
    }
  };

  if (document.readyState === "complete") {
    timeoutId = setTimeout(run, HERO_VIDEO_LOAD_DELAY_MS);
  } else {
    window.addEventListener("load", run, { once: true });
  }

  return () => {
    cancelled = true;
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}
