import { VOLUME_PRICING } from "@/lib/fleet";

export const PRICING = {
  baseDelivery: VOLUME_PRICING.baseDelivery,
  perCubicNoLoaders: VOLUME_PRICING.withoutLoaders.perCubic,
  perCubicWithLoaders: VOLUME_PRICING.withLoaders.perCubic,
  householdBag: VOLUME_PRICING.householdBag,
  constructionBag: VOLUME_PRICING.constructionBag,
  perFloorNoElevator: VOLUME_PRICING.perFloorNoElevator,
  distanceFreeMeters: VOLUME_PRICING.distanceFreeMeters,
  distanceBlockMeters: VOLUME_PRICING.distanceBlockMeters,
  distanceBlockPrice: VOLUME_PRICING.distanceBlockPrice,
  minCubicMeters: VOLUME_PRICING.minCubicMeters,
  vehicles: [
    {
      id: "bus",
      name: "Бус",
      volume: 10,
      tons: "до 2 т",
      priceFrom: 1000,
      dimensions: "10 м³",
      image: "/images/fleet/fleet-bus.webp",
    },
    {
      id: "gazel",
      name: "Газель",
      volume: 15,
      tons: "до 2,5 т",
      priceFrom: 1000,
      dimensions: "15 м³",
      image: "/images/fleet/fleet-gazel.webp",
    },
    {
      id: "zil",
      name: "ЗІЛ",
      volume: 5,
      tons: "5 т",
      priceFrom: 2500,
      dimensions: "5 м³",
      image: "/images/fleet/fleet-zil.webp",
    },
    {
      id: "kamaz",
      name: "Камаз",
      volume: 12,
      tons: "10 т",
      priceFrom: 3500,
      dimensions: "12 м³",
      image: "/images/fleet/fleet-kamaz.webp",
    },
  ],
  tariffs: [
    { label: "Подача автомобіля", price: `${VOLUME_PRICING.baseDelivery} грн` },
    {
      label: "1 м³ — наше завантаження",
      price: `${VOLUME_PRICING.withLoaders.perCubic} грн`,
    },
    {
      label: "1 м³ — завантаження замовника",
      price: `${VOLUME_PRICING.withoutLoaders.perCubic} грн`,
    },
    {
      label: "Побутовий мішок з завантаженням",
      price: `${VOLUME_PRICING.householdBag} грн`,
    },
    {
      label: "Будівельний мішок (під лопату)",
      price: `${VOLUME_PRICING.constructionBag} грн`,
    },
    {
      label: `До ${VOLUME_PRICING.distanceFreeMeters} м до авто`,
      price: "без доплати",
    },
    {
      label: `Переміщення понад ${VOLUME_PRICING.distanceFreeMeters} м`,
      price: `${VOLUME_PRICING.distanceBlockPrice} грн / ${VOLUME_PRICING.distanceBlockMeters} м`,
    },
    {
      label: "Спуск без ліфта",
      price: `${VOLUME_PRICING.perFloorNoElevator} грн/поверх`,
    },
    { label: "Мінімальне замовлення", price: `${VOLUME_PRICING.minCubicMeters} м³` },
  ],
} as const;

export type CalculatorInput = {
  cubicMeters: number;
  withLoaders: boolean;
  floor: number;
  hasElevator: boolean;
  householdBags: number;
  constructionBags: number;
  distanceMeters: number;
};

export function calculatePrice(input: CalculatorInput): number {
  const cubes = Math.max(input.cubicMeters, PRICING.minCubicMeters);
  const pricePerCubic = input.withLoaders
    ? PRICING.perCubicWithLoaders
    : PRICING.perCubicNoLoaders;
  let total = PRICING.baseDelivery + cubes * pricePerCubic;

  if (!input.hasElevator && input.floor > 0) {
    total += input.floor * PRICING.perFloorNoElevator;
  }
  if (input.householdBags > 0) {
    total += input.householdBags * PRICING.householdBag;
  }
  if (input.constructionBags > 0) {
    total += input.constructionBags * PRICING.constructionBag;
  }

  const extraDistance = Math.max(0, input.distanceMeters - PRICING.distanceFreeMeters);
  if (extraDistance > 0) {
    total +=
      Math.ceil(extraDistance / PRICING.distanceBlockMeters) *
      PRICING.distanceBlockPrice;
  }

  return total;
}

export function formatPrice(amount: number): string {
  return `від ${amount.toLocaleString("uk-UA")} грн`;
}
