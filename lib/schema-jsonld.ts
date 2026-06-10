import {
  SITE_URL,
  cityPageDescription,
  cityPageTitle,
  homePageDescription,
  homePageTitle,
  servicePageDescription,
  servicePageTitle,
} from "@/lib/seo-meta";
import {
  PHONE_MAIN,
  PHONE_CALLS_ONLY,
  SITE_NAME,
} from "@/lib/contacts";
import { ogImageUrl } from "@/lib/og-images";
import type { CityPage } from "@/lib/cities";
import type { Service } from "@/lib/services";
import { citySeoPath } from "@/lib/cities";
import type { SeoFaqItem } from "@/lib/service-pages";

type JsonLd = Record<string, unknown>;

/** Сервіс без стаціонарного офісу — лише зона виїзду */
function localBusinessBase(areaServed: string[]): JsonLd {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    image: ogImageUrl(),
    logo: `${SITE_URL}/images/logo/logo.png`,
    telephone: [PHONE_MAIN, PHONE_CALLS_ONLY],
    priceRange: "₴₴",
    areaServed: areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_MAIN,
        contactType: "customer service",
        areaServed: "UA",
        availableLanguage: ["uk"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
  };
}

function webSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "uk-UA",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function breadcrumbSchema(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function webPageSchema(
  name: string,
  description: string,
  path: string
): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "uk-UA",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

function faqSchema(items: SeoFaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function serviceSchema(service: Service, path: string): JsonLd {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Київ та Київська область",
    },
  };
}

export function homeJsonLd(faq: SeoFaqItem[]): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        webSiteSchema(),
        localBusinessBase(["Київ", "Київська область"]),
        webPageSchema(homePageTitle(), homePageDescription(), "/"),
        faqSchema(faq),
      ],
    },
  ];
}

export function cityJsonLd(city: CityPage, faq: SeoFaqItem[]): JsonLd[] {
  const path = `/${citySeoPath(city.slug)}`;
  const title = cityPageTitle(city);
  const description = cityPageDescription(city);
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        webPageSchema(title, description, path),
        breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: title, path },
        ]),
        localBusinessBase([city.name, "Київська область"]),
        faqSchema(faq),
      ],
    },
  ];
}

export function serviceJsonLd(service: Service, faq: SeoFaqItem[]): JsonLd[] {
  const path = `/${service.seoPath}`;
  const title = servicePageTitle(service);
  const description = servicePageDescription(service);
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        webPageSchema(title, description, path),
        breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: service.name, path },
        ]),
        serviceSchema(service, path),
        localBusinessBase(["Київ", "Київська область"]),
        faqSchema(faq),
      ],
    },
  ];
}
