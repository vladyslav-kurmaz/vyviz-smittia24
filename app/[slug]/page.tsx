import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_BY_PATH } from "@/lib/services";
import { CITY_BY_SLUG, citySeoPath } from "@/lib/cities";
import { ALL_SEO_PATHS } from "@/lib/seo-routes";
import { servicePageMetadata, cityPageMetadata } from "@/lib/metadata";
import { ServicePageTemplate } from "@/components/seo/ServicePageTemplate";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return ALL_SEO_PATHS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICE_BY_PATH[params.slug];
  if (service) {
    return servicePageMetadata(service);
  }

  const cityEntry = Object.entries(CITY_BY_SLUG).find(
    ([, c]) => citySeoPath(c.slug) === params.slug
  );
  if (cityEntry) {
    return cityPageMetadata(cityEntry[1]);
  }

  return {};
}

export default function SeoPage({ params }: Props) {
  const service = SERVICE_BY_PATH[params.slug];
  if (service) {
    return <ServicePageTemplate type="service" data={service} />;
  }

  const cityEntry = Object.entries(CITY_BY_SLUG).find(
    ([, c]) => citySeoPath(c.slug) === params.slug
  );
  if (cityEntry) {
    return <ServicePageTemplate type="city" data={cityEntry[1]} />;
  }

  notFound();
}
