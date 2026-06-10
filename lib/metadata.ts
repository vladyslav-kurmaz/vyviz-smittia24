import type { Metadata } from "next";
import { SITE_URL, homePageMetadata, canonicalUrl } from "./seo-meta";

export { homePageMetadata, cityPageMetadata, servicePageMetadata } from "./seo-meta";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...homePageMetadata(),
};

export function privacyPageMetadata(): Metadata {
  return {
    title: { absolute: "Політика конфіденційності" },
    robots: { index: false, follow: false },
    alternates: { canonical: canonicalUrl("/privacy") },
  };
}
