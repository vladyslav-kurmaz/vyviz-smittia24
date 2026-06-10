import { SERVICES } from "./services";
import { CITY_PAGES, citySeoPath } from "./cities";

export type SeoRoute =
  | { type: "service"; slug: string; path: string }
  | { type: "city"; slug: string; path: string };

export const SEO_ROUTES: SeoRoute[] = [
  ...SERVICES.map((s) => ({
    type: "service" as const,
    slug: s.slug,
    path: s.seoPath,
  })),
  ...CITY_PAGES.map((c) => ({
    type: "city" as const,
    slug: c.slug,
    path: citySeoPath(c.slug),
  })),
];

export const ALL_SEO_PATHS = SEO_ROUTES.map((r) => r.path);
