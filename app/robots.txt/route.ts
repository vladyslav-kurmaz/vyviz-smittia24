import { isProductionSite } from "@/lib/env";
import { SITE_URL } from "@/lib/seo-meta";

export function GET(): Response {
  const body = isProductionSite()
    ? `User-agent: *
# Allow everything by default
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
    : `User-agent: *
# Test / preview environment — block search engine indexing
Disallow: /
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
