import { getGalleryImagePath } from "@/lib/gallery";

export type SeoHeroImages = {
  /** Горизонтальне — від md і ширше */
  desktop: string;
  /** Вертикальне — мобільні */
  mobile: string;
  /** Запасне, якщо файли ще не додані */
  fallback: string;
};

/**
 * Фото hero для SEO-сторінок — public/images/seo-heroes/{slug}-desktop.webp та -mobile.webp
 */
export function seoHeroImages(slug: string, fallbackGalleryId: number): SeoHeroImages {
  const fallback = getGalleryImagePath(fallbackGalleryId);
  return {
    desktop: `/images/seo-heroes/${slug}-desktop.webp`,
    mobile: `/images/seo-heroes/${slug}-mobile.webp`,
    fallback,
  };
}
