import type { Metadata } from "next";
import { PHONE_MAIN_DISPLAY, SITE_NAME } from "@/lib/contacts";
import type { CityPage } from "@/lib/cities";
import type { Service } from "@/lib/services";
import { citySeoPath } from "@/lib/cities";
import { defaultOgImages } from "@/lib/og-images";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Поки домен не задано — localhost; на проді вкажіть NEXT_PUBLIC_SITE_URL */
export const SITE_URL = configuredSiteUrl || "http://localhost:3000";

export function canonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

/** Перелік послуг у meta description (через ✓) */
export const META_SERVICE_CHECKS = [
  "будівельне сміття",
  "побутове сміття",
  "приватний сектор",
  "вторинна сировина",
  "меблі та хлам",
  "вантажники",
  "обрізання дерев",
  "розчистка територій",
] as const;

const REGION_LABEL = "Київ та область";

function serviceChecklist(): string {
  return META_SERVICE_CHECKS.map((s) => `✓ ${s}`).join(" ");
}

function withPhone(text: string): string {
  return `${text.trim()} ☎ ${PHONE_MAIN_DISPLAY}`;
}

function buildDescription(intro: string, locationPart: string): string {
  return withPhone(
    `${intro} ${locationPart}. ${serviceChecklist()}`
  );
}

function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = canonicalUrl(path);
  const images = defaultOgImages(title);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "uk_UA",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export function homePageTitle(): string {
  return `Вивіз сміття ${REGION_LABEL}`;
}

export function homePageDescription(): string {
  return buildDescription(
    "Швидкий вивіз сміття в Києві та Київській області — власний автопарк, вантажники, оцінка по фото, виїзд у день замовлення.",
    REGION_LABEL
  );
}

export function cityPageTitle(city: CityPage): string {
  return `Вивіз сміття ${city.name}`;
}

export function cityPageDescription(city: CityPage): string {
  return buildDescription(
    `Професійний вивіз сміття ${city.locative} та околиці — будівельне, побутове, меблі, гілля, легальна утилізація, без прихованих доплат.`,
    city.locative
  );
}

export function servicePageTitle(service: Service): string {
  return `${service.name} ${REGION_LABEL}`;
}

export function servicePageDescription(service: Service): string {
  return buildDescription(
    `${service.name} — швидкий виїзд, вантажники за потреби, розрахунок вартості по фото, легальна утилізація.`,
    REGION_LABEL
  );
}

export function homePageMetadata(): Metadata {
  return pageMetadata(homePageTitle(), homePageDescription(), "/");
}

export function cityPageMetadata(city: CityPage): Metadata {
  return pageMetadata(
    cityPageTitle(city),
    cityPageDescription(city),
    `/${citySeoPath(city.slug)}`
  );
}

export function servicePageMetadata(service: Service): Metadata {
  return pageMetadata(
    servicePageTitle(service),
    servicePageDescription(service),
    `/${service.seoPath}`
  );
}
