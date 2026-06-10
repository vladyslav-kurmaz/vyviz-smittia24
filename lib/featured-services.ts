import { GALLERY_IMAGE_IDS, getGalleryImagePath } from "@/lib/gallery";

export type FeaturedService = {
  id: string;
  tab: string;
  title: string;
  image: string;
  seoPath: string;
  points: string[];
};

/** Три головні послуги на лендингу (як на vyviz-smittya.in.ua) */
export const FEATURED_SERVICES: FeaturedService[] = [
  {
    id: "budivelne",
    tab: "Будівельне",
    title: "Вивіз будівельного сміття",
    image: getGalleryImagePath(14),
    seoPath: "vyviz-budivelnogo-smittya",
    points: [
      "Швидке очищення після ремонту, демонтажу чи будівництва",
      "Подача техніки потрібного об'єму",
      "Акуратне завантаження з мінімумом шуму",
      "Чиста територія без зайвих клопотів",
      "Виїзд у день замовлення",
    ],
  },
  {
    id: "pryvatnyj-sektor",
    tab: "Приватний сектор",
    title: "Вивіз сміття з приватного сектору",
    image: getGalleryImagePath(9),
    seoPath: "vyviz-z-pryvatnykh-budynkiv",
    points: [
      "Вивіз великих обсягів зібраних відходів із приватних територій",
      "Забираємо листя, гілля, рослинні рештки та побутове сміття",
      "Ви лишаєте відходи у визначеному місці — ми все завантажуємо",
      "Швидке оформлення та узгоджений час подачі техніки",
      "Територія залишається повністю звільненою від сміття",
    ],
  },
  {
    id: "vtorynna-syrovyna",
    tab: "Вторинна сировина",
    title: "Вивіз вторинної сировини",
    image: getGalleryImagePath(GALLERY_IMAGE_IDS[0]),
    seoPath: "vyviz-vtorynnoyi-syrovyny",
    points: [
      "Вивіз картону, пластику, металу, деревини та іншої вторсировини",
      "Забираємо підготовлені матеріали у мішках, коробках чи пачках",
      "Доставляємо вторсировину на пункти прийому для переробки",
      "Окремий збір допомагає зменшити кількість відходів у довкіллі",
      "Швидке оформлення та узгоджений час приїзду",
    ],
  },
];
