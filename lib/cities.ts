export const PRIORITY_CITIES = [
  "Київ",
  "Васильків",
  "Вишневе",
  "Софіївська Борщагівка",
  "Обухів",
  "Фастів",
  "Боярка",
  "Біла Церква",
  "Глеваха",
  "Чабани",
  "Хотів",
  "Крюківщина",
];

export const OTHER_CITIES = [
  "Тарасівка",
  "Білогородка",
  "Ясногородка",
  "Гребінки",
  "Бишів",
  "Макарів",
];

export const KYIV_DISTRICTS = [
  "Голосіївський",
  "Печерський",
  "Шевченківський",
  "Подільський",
  "Оболонський",
  "Дарницький",
  "Деснянський",
  "Святошинський",
  "Солом'янський",
  "Дніпровський",
];

export type CityPage = {
  slug: string;
  name: string;
  /** Називний у контексті «у …» — напр. «у Боярці» */
  locative: string;
};

export const CITY_PAGES: CityPage[] = [
  { slug: "kyiv", name: "Київ", locative: "у Києві" },
  { slug: "bila-tserkva", name: "Біла Церква", locative: "у Білій Церкві" },
  { slug: "bilohordka", name: "Білогородка", locative: "у Білогородці" },
  { slug: "byshiv", name: "Бишів", locative: "у Бишеві" },
  { slug: "boyarka", name: "Боярка", locative: "у Боярці" },
  { slug: "brovary", name: "Бровари", locative: "у Броварах" },
  { slug: "vasylkiv", name: "Васильків", locative: "у Василькові" },
  { slug: "vyshneve", name: "Вишневе", locative: "у Вишневому" },
  { slug: "gatne", name: "Гатне", locative: "у Гатному" },
  { slug: "glevakha", name: "Глеваха", locative: "у Глевасі" },
  { slug: "grebinky", name: "Гребінки", locative: "у Гребінках" },
  { slug: "irpin", name: "Ірпінь", locative: "в Ірпені" },
  { slug: "kalynivka", name: "Калинівка", locative: "у Калинівці" },
  { slug: "kryukivshchyna", name: "Крюківщина", locative: "у Крюківщині" },
  { slug: "makariv", name: "Макарів", locative: "у Макарові" },
  { slug: "obukhiv", name: "Обухів", locative: "в Обухові" },
  {
    slug: "sofiivska-borshchahivka",
    name: "Софіївська Борщагівка",
    locative: "у Софіївській Борщагівці",
  },
  { slug: "tarasivka", name: "Тарасівка", locative: "у Тарасівці" },
  { slug: "fastiv", name: "Фастів", locative: "у Фастові" },
  { slug: "khotiv", name: "Хотів", locative: "у Хотові" },
  { slug: "chabany", name: "Чабани", locative: "у Чабанах" },
  { slug: "yasnohorodka", name: "Ясногородка", locative: "в Ясногородці" },
];

export const CITY_BY_SLUG = Object.fromEntries(
  CITY_PAGES.map((c) => [c.slug, c])
) as Record<string, CityPage>;

/** Міста в колонці «Область» у футері */
const FOOTER_CITY_SLUGS = [
  "kyiv",
  "bila-tserkva",
  "vasylkiv",
  "vyshneve",
  "irpin",
  "kryukivshchyna",
  "makariv",
  "obukhiv",
  "fastiv",
] as const;

export const FOOTER_CITIES = FOOTER_CITY_SLUGS.map((slug) => CITY_BY_SLUG[slug]);

export function citySeoPath(slug: string): string {
  return `vyviz-smittya-${slug}`;
}
