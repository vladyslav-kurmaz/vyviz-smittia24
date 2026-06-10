/** UTM-параметри для атрибуції заявок */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "vyviz_utm";

export function parseUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) utm[key] = value;
  }

  return utm;
}

export function readStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Перше джерело в сесії — не перезаписуємо наступні переходи без UTM */
export function storeUtmFirstTouch(utm: UtmParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(utm).length === 0) return;

  const existing = readStoredUtm();
  if (Object.keys(existing).length > 0) return;

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
}

export function formatUtmForDisplay(utm: UtmParams): string {
  return Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
}
