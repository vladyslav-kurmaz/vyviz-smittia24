import type { Metadata } from "next";
import { SITE_URL, homePageMetadata, canonicalUrl } from "./seo-meta";

export { homePageMetadata, cityPageMetadata, servicePageMetadata } from "./seo-meta";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...homePageMetadata(),
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export function privacyPageMetadata(): Metadata {
  return {
    title: { absolute: "Політика конфіденційності" },
    robots: { index: false, follow: false },
    alternates: { canonical: canonicalUrl("/privacy") },
  };
}
