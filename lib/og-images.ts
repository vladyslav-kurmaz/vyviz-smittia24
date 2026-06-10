import { SITE_URL } from "@/lib/seo-meta";

/** Головне OG-зображення — public/images/og/og-default.webp */
export const OG_DEFAULT_IMAGE = "/images/og/og-default.webp";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function ogImageUrl(path: string = OG_DEFAULT_IMAGE): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function defaultOgImages(alt: string) {
  const url = ogImageUrl(OG_DEFAULT_IMAGE);
  return [
    {
      url,
      width: OG_IMAGE_SIZE.width,
      height: OG_IMAGE_SIZE.height,
      alt,
    },
  ];
}
