/** Автопарк — ваші фото та ціни з прайсу проєкту */
export type FleetVehicle = {
  id: string;
  name: string;
  dimensions: string;
  volume: string;
  /** Вантажопідйомність, напр. «5 т» */
  payload?: string;
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
    volume: "10 м³",
    payload: "до 2 т",
    priceFrom: 1000,
    image: "/images/fleet/fleet-bus.webp",
  },
  {
    id: "gazel",
    name: "Газель",
    dimensions: "4,3 × 2 × 1,8 м",
    volume: "15 м³",
    payload: "до 2,5 т",
    priceFrom: 1000,
    image: "/images/fleet/fleet-gazel.webp",
  },
  {
    id: "zil",
    name: "ЗІЛ",
    dimensions: "3,6 × 2,3 × 1 м",
    volume: "5 м³",
    payload: "5 т",
    priceFrom: 2500,
    image: "/images/fleet/fleet-zil.webp",
  },
  {
    id: "kamaz",
    name: "Камаз",
    dimensions: "4,5 × 2,3 × 1,5 м",
    volume: "12 м³",
    payload: "10 т",
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
  baseDelivery: 1000,
  withLoaders: { perCubic: 800 },
  withoutLoaders: { perCubic: 750 },
  householdBag: 80,
  constructionBag: 100,
  perFloorNoElevator: 20,
  distanceFreeMeters: 20,
  distanceBlockMeters: 20,
  distanceBlockPrice: 15,
  minCubicMeters: 5,
} as const;

export const PRICE_FACTORS = [
  {
    title: "Подача автомобіля",
    description: `${VOLUME_PRICING.baseDelivery} грн — підбираємо техніку під обсяг, щоб забрати все за один виїзд.`,
  },
  {
    title: "Обсяг сміття",
    description: `Наше завантаження — ${VOLUME_PRICING.withLoaders.perCubic} грн/м³. Завантаження замовника — ${VOLUME_PRICING.withoutLoaders.perCubic} грн/м³.`,
  },
  {
    title: "Пакування в мішки",
    description: `Побутовий мотлох у наші мішки з завантаженням — ${VOLUME_PRICING.householdBag} грн/мішок. Будівельне сміття (під лопату) — ${VOLUME_PRICING.constructionBag} грн/мішок.`,
  },
  {
    title: "Відстань до автомобіля",
    description: `До ${VOLUME_PRICING.distanceFreeMeters} м — без доплати. Якщо далі — ${VOLUME_PRICING.distanceBlockPrice} грн за кожні ${VOLUME_PRICING.distanceBlockMeters} м.`,
  },
  {
    title: "Спуск без ліфта",
    description: `${VOLUME_PRICING.perFloorNoElevator} грн/поверх, якщо ліфта немає.`,
  },
] as const;

export function formatPriceFrom(amount: number): string {
  return `від ${amount.toLocaleString("uk-UA")} грн`;
}
