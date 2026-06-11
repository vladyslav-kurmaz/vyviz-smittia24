import { VEHICLE_ARRIVAL_FULL } from "@/lib/contacts";
import { VOLUME_PRICING } from "@/lib/fleet";
import { seoHeroImages, type SeoHeroImages } from "@/lib/seo-hero";
import type { CityPage } from "@/lib/cities";
import type { SeoFaqItem } from "@/lib/service-pages";

export type CityPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImages: SeoHeroImages;
  paragraphs: string[];
  whatWeTake: string[];
  faq: SeoFaqItem[];
};

const WHAT_WE_TAKE_DEFAULT = [
  "будівельне сміття після ремонту чи демонтажу",
  "побутовий мотлох і старі меблі",
  "гілки, листя та рослинні рештки з ділянок",
  "вторинну сировину — картон, пластик, метал",
  "змішані відходи з підвалів, гаражів і горищ",
];

function cityFaq(city: CityPage): SeoFaqItem[] {
  const { name, locative } = city;
  return [
    {
      question: `Як швидко приїдемо ${locative}?`,
      answer:
        `Зазвичай подача авто — ${VEHICLE_ARRIVAL_FULL}. У більшості випадків виїжджаємо в день замовлення. Надішліть фото у месенджер — назвемо точну ціну за 10 хвилин.`,
    },
    {
      question: `Скільки коштує вивіз сміття ${locative}?`,
      answer: `Подача авто — ${VOLUME_PRICING.baseDelivery} грн. Наше завантаження — ${VOLUME_PRICING.withLoaders.perCubic} грн/м³, завантаження замовника — ${VOLUME_PRICING.withoutLoaders.perCubic} грн/м³. Побутовий мішок — ${VOLUME_PRICING.householdBag} грн, будівельний — ${VOLUME_PRICING.constructionBag} грн. Точну суму рахуємо за фото.`,
    },
    {
      question: `Є мінімальний обсяг замовлення для ${name}?`,
      answer:
        "Мінімальне замовлення — 5 м³ або еквівалент у мішках. Якщо обсяг менший — телефонуйте, разом знайдемо рішення.",
    },
    {
      question: `Чи вивозите сміття з багатоповерхівок без ліфта ${locative}?`,
      answer: `Так. Надаємо вантажників для спуску сміття з будь-якого поверху. Вартість коригується залежно від поверху та відстані до машини (спуск без ліфта — від ${VOLUME_PRICING.perFloorNoElevator} грн/поверх).`,
    },
    {
      question: "Як дізнатися точну вартість без виїзду майстра?",
      answer:
        "Надішліть 1–3 фото у Telegram, Viber або WhatsApp — протягом 10 хвилин скажемо вартість, яку машину подати і найближчий зручний час виїзду.",
    },
  ];
}

const CUSTOM: Partial<
  Record<
    string,
    Pick<CityPageContent, "paragraphs" | "whatWeTake" | "heroSubtitle">
  >
> = {
  kyiv: {
    heroSubtitle:
      "Усі райони столиці — від Печерська до Троєщини. Виїзд у день замовлення, оцінка по фото.",
    paragraphs: [
      "Київ — наш основний напрямок. Працюємо у всіх десяти районах: знаємо, де зручно під'їхати вантажівкою, а де краще подати компактнішу машину у двір чи на вузьку вулицю.",
      "Типові запити — ремонт у квартирі, розчищення підвалу чи горища, вивіз після переїзду, будівельне сміття з приватного сектору на околицях міста. Забираємо все: від мішків зі штукатуркою до старих меблів і великогабаритного хламу.",
    ],
    whatWeTake: WHAT_WE_TAKE_DEFAULT,
  },
  boyarka: {
    heroSubtitle:
      "Знаємо місто та його специфіку — Стара й Нова Боярка, приватний сектор і нові ЖК.",
    paragraphs: [
      "Боярка — місто з активним приватним сектором, кількома мікрорайонами багатоповерхівок і постійним житловим будівництвом. Стара Боярка, Нова Боярка, вулиці Соборності, Богдана Хмельницького, Білогородська — ми регулярно працюємо по всьому місту і знаємо, де зручно під'їхати вантажівкою, а де краще подати компактнішу машину.",
      "Запити на вивіз сміття у Боярці різноманітні: ремонти у квартирах нових ЖК, розчищення старих приватних будинків, прибирання після зими на ділянках. Ми забираємо все: від мішків зі штукатуркою до старих меблів і великогабаритного хламу.",
    ],
    whatWeTake: WHAT_WE_TAKE_DEFAULT,
  },
  irpin: {
    heroSubtitle: "Ірпінь і околиці — швидкий виїзд, знайомі маршрути та вузькі вулиці приватного сектору.",
    paragraphs: [
      "Ірпінь активно забудовується приватними будинками та котеджними містечками. Часто звертаються після ремонту, обрізки дерев на ділянках і генерального прибирання подвір'їв.",
      "Працюємо по всьому місту — підберемо авто під під'їзд і обсяг сміття, щоб забрати все за один виїзд.",
    ],
    whatWeTake: WHAT_WE_TAKE_DEFAULT,
  },
  brovary: {
    heroSubtitle: "Бровари та прилеглі села — вивіз сміття з квартир, будинків і ділянок.",
    paragraphs: [
      "Бровари — велике місто області з міксом багатоповерхівок і приватного сектору. Регулярно вивозимо будівельне сміття після ремонтів, старі меблі та рослинні відходи з ділянок.",
      "Один дзвінок — узгоджуємо час, рахуємо ціну за фото і приїжджаємо у зручний для вас проміжок.",
    ],
    whatWeTake: WHAT_WE_TAKE_DEFAULT,
  },
  "bila-tserkva": {
    heroSubtitle: "Біла Церква — подача техніки з Києва та області, виїзд у день звернення.",
    paragraphs: [
      "У Білій Церкві часто замовляють вивіз після ремонту квартир, розчищення ділянок і вивіз великогабаритного мотлоху з приватних будинків.",
      "Працюємо по всьому місту — від центру до нових мікрорайонів на околицях.",
    ],
    whatWeTake: WHAT_WE_TAKE_DEFAULT,
  },
};

const CITY_IMAGES: Record<string, number> = {
  kyiv: 2,
  boyarka: 9,
  irpin: 10,
  brovary: 11,
  "bila-tserkva": 12,
  vasylkiv: 3,
  vyshneve: 4,
  obukhiv: 5,
  fastiv: 6,
  bilohordka: 7,
  chabany: 8,
};

export function getCityPageContent(city: CityPage): CityPageContent {
  const custom = CUSTOM[city.slug];
  const imageId = CITY_IMAGES[city.slug] ?? ((city.slug.length % 10) + 1);

  const paragraphs = custom?.paragraphs ?? [
    `${city.name} — населений пункт Київської області, де ми регулярно виконуємо вивіз сміття. Працюємо з приватними будинками, квартирами після ремонту та ділянками.`,
    `Знаємо місцеву специфіку ${city.locative}: під'їзди, обмеження по вулицях і типові запити мешканців. Надішліть фото — розрахуємо вартість за 10 хвилин і узгодимо зручний час виїзду.`,
  ];

  return {
    heroTitle: `Вивіз сміття ${city.locative} — виїзд у день замовлення`,
    heroSubtitle:
      custom?.heroSubtitle ??
      `Швидкий вивіз сміття ${city.locative} та околиці. Оцінка по фото, вантажники, легальна утилізація.`,
    heroImages: seoHeroImages(city.slug, imageId),
    paragraphs,
    whatWeTake: custom?.whatWeTake ?? WHAT_WE_TAKE_DEFAULT,
    faq: cityFaq(city),
  };
}
