import { getGalleryImagePath } from "@/lib/gallery";

/** Головний екран — public/images/hero/ */
export const HERO_VIDEO = "/images/hero/hero.mp4";
export const HERO_VIDEO_MOBILE = "/images/hero/hero-mobile.mov";

/** Десктоп — горизонтальне фото з галереї */
export const HERO_BG = getGalleryImagePath(1);

/** Мобайл — вертикальне фото з галереї (7.webp, 1170×1548) */
export const HERO_BG_MOBILE = getGalleryImagePath(7);
