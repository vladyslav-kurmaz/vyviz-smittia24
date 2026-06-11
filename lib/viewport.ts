export const DESKTOP_MEDIA = "(min-width: 768px)";

export function isDesktopViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(DESKTOP_MEDIA).matches;
}
