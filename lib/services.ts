export type Service = {
  slug: string;
  name: string;
  description: string;
  seoPath: string;
  priceFrom?: number;
};

export const SERVICES: Service[] = [
  {
    slug: "budivelne",
    name: "Вивіз будівельного сміття",
    description:
      "Після ремонту, демонтажу, будівництва. Биті матеріали, бетон, плитка, гіпсокартон.",
    seoPath: "vyviz-budivelnogo-smittya",
    priceFrom: 800,
  },
  {
    slug: "pryvatnyj-sektor",
    name: "Вивіз сміття з приватного сектору",
    description:
      "Великі обсяги з ділянок, приватних будинків і подвірʼїв. Листя, гілля, побутовий мотлох.",
    seoPath: "vyviz-z-pryvatnykh-budynkiv",
    priceFrom: 700,
  },
  {
    slug: "vtorynna-syrovyna",
    name: "Вивіз вторинної сировини",
    description:
      "Картон, пластик, метал, деревина — забираємо підготовлені матеріали та вивозимо на переробку.",
    seoPath: "vyviz-vtorynnoyi-syrovyny",
    priceFrom: 700,
  },
  {
    slug: "pobutove",
    name: "Вивіз побутового сміття",
    description:
      "Регулярний та разовий вивіз з квартир, будинків, офісів.",
    seoPath: "vyviz-pobutovogo-smittya",
    priceFrom: 800,
  },
  {
    slug: "mebli",
    name: "Вивіз старих меблів та хламу",
    description: "Дивани, шафи, столи, матраци, старий мотлох. Виносимо й завантажуємо самі.",
    seoPath: "vyviz-mebliv-ta-khlamu",
    priceFrom: 800,
  },
  {
    slug: "tekhnika",
    name: "Вивіз техніки",
    description:
      "Холодильники, пральні машини, стара побутова та офісна техніка.",
    seoPath: "vyviz-tekhniky",
    priceFrom: 800,
  },
  {
    slug: "demontazh",
    name: "Демонтаж",
    description: "Стін, перегородок, конструкцій з подальшим вивозом.",
    seoPath: "demontazh",
    priceFrom: 800,
  },
  {
    slug: "prybyrannya",
    name: "Прибирання після ремонту",
    description: "Повне очищення приміщення «під заселення».",
    seoPath: "prybyrannya-pislya-remontu",
    priceFrom: 800,
  },
  {
    slug: "vantazhnyky",
    name: "Послуги вантажників",
    description: "Навантаження, розвантаження, перенесення.",
    seoPath: "poslugy-vantazhnykiv",
    priceFrom: 800,
  },
  {
    slug: "gilky",
    name: "Вивіз гілок та листя",
    description: "Після обрізки дерев, прибирання ділянок.",
    seoPath: "vyviz-gilok-lystya",
    priceFrom: 800,
  },
  {
    slug: "vhalybe",
    name: "Вивіз великогабаритного сміття",
    description: "Нестандартні об'ємні відходи.",
    seoPath: "vyviz-vhalohabarytnoho-smittya",
    priceFrom: 800,
  },
  {
    slug: "obrizannya",
    name: "Обрізання дерев",
    description: "Формувальна та санітарна обрізка, з вивозом гілок.",
    seoPath: "obrizannya-derev",
    priceFrom: 800,
  },
  {
    slug: "kosinnya",
    name: "Косіння трави",
    description: "Покіс бур'янів та трави на ділянках, дачах, узбіччях.",
    seoPath: "kosinnya-travy",
    priceFrom: 800,
  },
  {
    slug: "rozchystka",
    name: "Розчистка територій",
    description: "Зарослі, чагарник, занедбані ділянки під ключ.",
    seoPath: "rozchystka-terytoriy",
    priceFrom: 800,
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
) as Record<string, Service>;

export const SERVICE_BY_PATH = Object.fromEntries(
  SERVICES.map((s) => [s.seoPath, s])
) as Record<string, Service>;
