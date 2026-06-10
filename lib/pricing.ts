export const PRICING = {
  baseDelivery: 800,
  perCubicNoLoaders: 700,
  perCubicWithLoaders: 800,
  perBag: 60,
  perFloorNoElevator: 50,
  minCubicMeters: 5,
  vehicles: [
    {
      id: "bus",
      name: "Бус",
      volume: 10,
      tons: "до 2 т",
      priceFrom: 800,
      dimensions: "10 м³",
      image: "/images/fleet/fleet-bus.webp",
    },
    {
      id: "gazel",
      name: "Газель",
      volume: 15,
      tons: "2,5 т",
      priceFrom: 1000,
      dimensions: "15 м³",
      image: "/images/fleet/fleet-gazel.webp",
    },
    {
      id: "zil",
      name: "ЗІЛ",
      volume: 8,
      tons: "до 5 т",
      priceFrom: 2500,
      dimensions: "8 м³",
      image: "/images/fleet/fleet-zil.webp",
    },
    {
      id: "kamaz",
      name: "Камаз",
      volume: 15,
      tons: "до 10 т",
      priceFrom: 3500,
      dimensions: "15 м³",
      image: "/images/fleet/fleet-kamaz.webp",
    },
  ],
  tariffs: [
    { label: "Подача авто", price: "від 800 грн" },
    { label: "1 м³ без вантажників", price: "700 грн" },
    { label: "1 м³ з вантажниками", price: "800 грн" },
    { label: "Мішок (з завантаженням)", price: "від 60 грн" },
    { label: "Спуск без ліфта", price: "від 50 грн/поверх" },
    { label: "Мінімальне замовлення", price: "5 м³" },
  ],
} as const;

export type CalculatorInput = {
  cubicMeters: number;
  withLoaders: boolean;
  floor: number;
  hasElevator: boolean;
  bags: number;
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
  if (input.bags > 0) {
    total += input.bags * PRICING.perBag;
  }
  return total;
}

export function formatPrice(amount: number): string {
  return `від ${amount.toLocaleString("uk-UA")} грн`;
}
