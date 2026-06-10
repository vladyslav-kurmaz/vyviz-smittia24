import { VEHICLE_ARRIVAL_SHORT } from "@/lib/contacts";

/**
 * Переваги на головній (секція «Переваги роботи з нами»).
 *
 * Іконки (SVG або PNG, бажано 48×48 або 64×64):
 *   public/images/benefits/
 *
 * Імена файлів — поле iconFile нижче. Поки файлу немає, показується emoji з iconFallback.
 */
export const HOMEPAGE_BENEFITS = [
  {
    iconFile: "benefit-fleet.svg",
    iconFallback: "🚛",
    title: "Власний автопарк",
    description: "Бус, Газель, ЗІЛ, Камаз — підберемо авто під ваш обсяг",
  },
  {
    iconFile: "benefit-fast.svg",
    iconFallback: "⚡",
    title: `Подача авто ${VEHICLE_ARRIVAL_SHORT}`,
    description: "Залежить від вашої локації",
  },
  {
    iconFile: "benefit-experience.svg",
    iconFallback: "📅",
    title: "5 років на ринку",
    description: "Досвід роботи з приватними та корпоративними клієнтами",
  },
  {
    iconFile: "benefit-legal.svg",
    iconFallback: "♻️",
    title: "Легальна утилізація",
    description: "Вивіз на офіційні полігони з документами",
  },
  {
    iconFile: "benefit-247.svg",
    iconFallback: "🕐",
    title: "Працюємо 24/7",
    description: "Без вихідних — зателефонуйте у зручний час",
  },
] as const;

export const BENEFITS_ICONS_DIR = "/images/benefits";
