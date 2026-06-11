import { scheduleAfterIdle } from "@/lib/idle-schedule";
import { isDesktopViewport } from "@/lib/viewport";

/** Затримка перед підвантаженням desktop-відео (після load) — не блокує LCP. */
export const HERO_VIDEO_LOAD_DELAY_MS = 2500;

export function shouldSkipHeroVideo(): boolean {
  if (typeof window === "undefined") return true;
  if (!isDesktopViewport()) return true;

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
  if (shouldSkipHeroVideo()) {
    return () => {};
  }

  return scheduleAfterIdle(onReady, HERO_VIDEO_LOAD_DELAY_MS, HERO_VIDEO_LOAD_DELAY_MS + 500);
}
