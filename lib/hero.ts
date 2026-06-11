/** Головний екран — public/images/hero/ */
/** Desktop: повна якість, підвантажується після load (див. lib/hero-video.ts) */
export const HERO_VIDEO = "/images/hero/hero.mp4";
/** Не використовується на сайті — mobile hero лише постер (перформенс Lighthouse) */
export const HERO_VIDEO_MOBILE = "/images/hero/hero-mobile.mov";

/** Оптимізовані постери (не повнорозмірні gallery/*.webp) */
export const HERO_POSTER = "/images/hero/hero-poster.webp";
export const HERO_MOBILE_POSTER = "/images/hero/hero-mobile-poster.webp";

/** LCP-зображення для next/image (те саме, що постери) */
export const HERO_BG = HERO_POSTER;
export const HERO_BG_MOBILE = HERO_MOBILE_POSTER;
