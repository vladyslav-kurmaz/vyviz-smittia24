/** Автопарк — ваші фото та ціни з прайсу проєкту */
export type FleetVehicle = {
  id: string;
  name: string;
  dimensions: string;
  volume: string;
  image: string;
  priceFrom?: number;
  /** Замість «від … грн» — напр. погодинна ставка */
  priceLabel?: string;
  /** Додатковий рядок під ціною */
  priceNote?: string;
};

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: "bus",
    name: "Бус",
    dimensions: "4 × 1,8 × 1,7 м",
    volume: "12 м³",
    priceFrom: 800,
    image: "/images/fleet/fleet-bus.webp",
  },
  {
    id: "gazel",
    name: "Газель",
    dimensions: "4,3 × 2 × 1,8 м",
    volume: "15 м³",
    priceFrom: 1000,
    image: "/images/fleet/fleet-gazel.webp",
  },
  {
    id: "zil",
    name: "ЗІЛ",
    dimensions: "3,6 × 2,3 × 1 м",
    volume: "8 м³",
    priceFrom: 2500,
    image: "/images/fleet/fleet-zil.webp",
  },
  {
    id: "kamaz",
    name: "Камаз",
    dimensions: "4,5 × 2,3 × 1,5 м",
    volume: "15 м³",
    priceFrom: 3500,
    image: "/images/fleet/fleet-kamaz.webp",
  },
  {
    id: "tractor",
    name: "Трактор",
    dimensions: "—",
    volume: "погодинно",
    priceLabel: "2500 грн/год",
    priceNote: "Подача прораховується окремо залежно від локації роботи",
    image: "/images/fleet/tractor.webp",
  },
];

export function formatFleetPrice(vehicle: FleetVehicle): string {
  if (vehicle.priceLabel) return vehicle.priceLabel;
  if (vehicle.priceFrom != null) return formatPriceFrom(vehicle.priceFrom);
  return "Уточнюйте";
}

export const VOLUME_PRICING = {
  withLoaders: { perCubic: 800, perBag: 60 },
  withoutLoaders: { perCubic: 700, perBag: 60 },
  perFloorNoElevator: 50,
  minCubicMeters: 5,
  baseDelivery: 800,
} as const;

export const PRICE_FACTORS = [
  {
    title: "Обсяг сміття",
    description: `З вантажниками: 1 м³ — ${VOLUME_PRICING.withLoaders.perCubic} грн, мішок до 30 кг — ${VOLUME_PRICING.withLoaders.perBag} грн. Без вантажників: 1 м³ — ${VOLUME_PRICING.withoutLoaders.perCubic} грн, мішок — ${VOLUME_PRICING.withoutLoaders.perBag} грн. Спуск без ліфта — від ${VOLUME_PRICING.perFloorNoElevator} грн/поверх.`,
  },
  {
    title: "Подача авто",
    description:
      "Підбираємо техніку під обсяг — менші авто для побутового, більші для будівельного, щоб забрати все за один виїзд.",
  },
  {
    title: "Вантажники",
    description:
      "Можете винести сміття самостійно — платите лише за машину. Або додамо вантажників за кількістю кубів/мішків.",
  },
  {
    title: "Поверх і відстань",
    description:
      "Якщо сміття з високого поверху без ліфта або далеко від авто — враховуємо час роботи.",
  },
  {
    title: "Тип сміття",
    description:
      "Будівельні матеріали, побутові речі, змішані відходи чи рослинні рештки — ціна залежить від обсягу та ваги.",
  },
] as const;

export function formatPriceFrom(amount: number): string {
  return `від ${amount.toLocaleString("uk-UA")} грн`;
}
