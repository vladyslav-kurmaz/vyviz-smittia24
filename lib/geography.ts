import { KYIV_DISTRICTS } from "@/lib/cities";

/** Карта зони роботи — public/images/geography/service-area-map.webp */
export const GEOGRAPHY_MAP_IMAGE = "/images/geography/service-area-map.webp";
export const GEOGRAPHY_MAP_ALT =
  "Карта зони роботи — Київ та Київська область";

/** Усі райони міста Києва (10 офіційних районів) */
export { KYIV_DISTRICTS };

const KYIV_OBLAST_RAW = [
  "Біла Церква",
  "Білогородка",
  "Бишів",
  "Боярка",
  "Бровари",
  "Васильків",
  "Вишневе",
  "Гатне",
  "Глеваха",
  "Гребінки",
  "Ірпінь",
  "Калинівка",
  "Крюківщина",
  "Макарів",
  "Обухів",
  "Софіївська Борщагівка",
  "Тарасівка",
  "Фастів",
  "Хотів",
  "Чабани",
  "Ясногородка",
] as const;

/** Населені пункти Київської області без повторів (Київ — окремо, за районами) */
export const KYIV_OBLAST_LOCATIONS = [...KYIV_OBLAST_RAW].sort((a, b) =>
  a.localeCompare(b, "uk")
);
