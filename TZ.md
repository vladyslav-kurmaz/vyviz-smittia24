# ПОВНЕ ТЗ: Landing Page «Вивіз сміття — Київ та область»

> **Призначення:** єдиний документ для повної генерації та збірки продакшн-проєкту (Next.js). Містить усі тексти, ціни, контакти, дизайн, SEO, структуру файлів і логіку функціоналу.  
> **Виключено з проєкту:** блок відгуків, приклади замовлень з ціною (замість них — калькулятор).  
> **Пізніше від клієнта:** назва компанії, логотип, реальні фото.

---

## 0. Промпт для AI-розробника (скопіювати цілком)

```
Створи повноцінний продакшн-проєкт за ТЗ «ПОВНЕ ТЗ: Landing Page Вивіз сміття».

Стек: Next.js 14 App Router, TypeScript, Tailwind CSS 3, Framer Motion, next/image.

Обов'язково реалізуй:
- Головну сторінку (single page) з усіма секціями з розділу 5 (БЕЗ відгуків).
- SEO-підсторінки послуг і міст (розділ 9).
- Sticky header з blur, мобільне меню, floating месенджери, зворотний дзвінок.
- Калькулятор з формулою з розділу 7.5.
- Форму заявки з upload фото (до 10), валідацією, honeypot.
- API route для заявок (Telegram webhook + email fallback через env).
- Усі тексти — дослівно з розділу 6.
- Кольори — розділ 3 (світла тема основна).
- Контакти — розділ 10.
- SEO: metadata, OG, sitemap, robots, JSON-LD (розділ 9).
- GA4 + Meta Pixel через env (не блокувати рендер якщо ID порожні).
- Плейсхолдер лого/назви: SITE_NAME="Вивіз сміття" до заміни.
- Фото: ImagePlaceholder компонент, НЕ стокові фото.
- prefers-reduced-motion, PageSpeed 90+ mobile.

Структура файлів — розділ 4. Не вигадуй ціни та контакти.
```

---

## 1. Статус контенту (що є / чого немає)

| Елемент | Статус | Дія в проєкті |
|---|---|---|
| Тексти всіх секцій | ✅ Готові (розділ 6) | Вставити дослівно |
| Ціни, прайс, калькулятор | ✅ Готові (розділ 7) | Константи + UI |
| Телефони, месенджери | ✅ Готові (розділ 10) | `lib/contacts.ts` |
| Кольори бренду | ✅ Готові (розділ 3) | `tailwind.config` + CSS vars |
| Назва компанії | ⏳ Пізніше | `SITE_NAME` env, текстовий лого |
| Логотип | ⏳ Пізніше | SVG-плейсхолдер (лісток + вантажівка) |
| Фото робіт | ⏳ Пізніше | `ImagePlaceholder` + папка `/public/images/` |
| Відгуки | ❌ Не потрібні | Секцію не робити |
| Приклади замовлень | ❌ Не потрібні | Не робити |
| Google Business URL | ⏳ Опційно | Прибрати з JSON-LD `sameAs` якщо порожньо |
| GA4 / Meta Pixel | ⏳ Опційно | Env, працює без ID |

---

## 2. Загальна інформація

| Параметр | Значення |
|---|---|
| Тип | Landing + SEO-підсторінки |
| Ніша | Вивіз сміття, обрізання дерев, косіння трави, розчистка територій |
| Гео | Київ та Київська область |
| Ціль | Заявки + дзвінки |
| Мова | Українська (`lang="uk"`) |
| Досвід | 5 років на ринку |
| Слоган | «Ми просто приїдемо і вирішимо вашу проблему» |
| Референси | vyviz-smittya.in.ua, hlam-express.com (калькулятор), vyviz-bud-kiev.com.ua |

**Аудиторія:** після ремонту, квартири/будинки, бригади, комерція, **дачники, садові товариства, села**. ОСББ — не акцентувати.

**Ключові болі:** швидкий виїзд, чесна ціна, вантажники під ключ, оцінка по фото, без прихованих доплат.

---

## 3. Дизайн-система

### 3.1 Фірмові кольори

| Токен | HEX | Використання |
|---|---|---|
| `primary` | `#355E3B` | Header акценти, бейджі, іконки, вторинні CTA |
| `accent` | `#D97708` | Головні CTA, hover-акценти |
| `background` | `#FDFBF5` | Фон сторінки |
| `text` | `#292524` | Основний текст |

### 3.2 CSS-змінні (`app/globals.css`)

```css
:root {
  --primary: #355E3B;
  --primary-dark: #2A4A2F;
  --primary-soft: rgba(53, 94, 59, 0.10);
  --accent: #D97708;
  --accent-hover: #B95F05;
  --accent-soft: rgba(217, 119, 8, 0.12);
  --bg: #FDFBF5;
  --bg-surface: #FFFFFF;
  --bg-elevated: #F6F3EA;
  --text: #292524;
  --text-muted: #6B645E;
  --border: rgba(41, 37, 36, 0.10);
}
```

### 3.3 Tailwind (`tailwind.config.ts`)

Розширити `theme.extend.colors`: `primary`, `accent`, `background`, `surface`, `elevated`, `muted`.

### 3.4 Типографіка
- Шрифт: **Inter** (Google Fonts, `next/font`)
- H1: `clamp(2.2rem, 6vw, 4rem)`, font-weight 800
- Body: 16–18px, line-height 1.6
- Секції: вертикальний padding `py-20 md:py-28`

### 3.5 UI-правила
- Багато whitespace, мінімум зайвого тексту
- Картки: `rounded-2xl`, тінь `shadow-lg`, фон `bg-surface`
- CTA primary: `bg-accent text-white`, hover scale + glow
- CTA secondary: `border-2 border-accent text-accent`
- Header sticky: `backdrop-blur-md bg-bg/80` після scroll > 80px
- **Не** виглядати як шаблонний сервісний сайт

### 3.6 Лого (плейсхолдер до отримання файлу)
- Компонент `Logo.tsx`: SVG-іконка (контейнер/листок у `#355E3B`) + текст `SITE_NAME`
- Змінна: `process.env.NEXT_PUBLIC_SITE_NAME` default `"Вивіз сміття"`
- Пізніше: замінити на `<Image src="/logo.svg" />` без зміни layout

---

## 4. Структура проєкту (файли)

```
vyviz-landing/
├── .env.example
├── .env.local                    # локально (не в git)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── robots.txt
│   ├── images/
│   │   ├── hero/                 # {{HERO_МЕДІА}}
│   │   ├── gallery/              # {{ГАЛЕРЕЯ_ФОТО}}
│   │   ├── services/             # {{ФОТО_ПОСЛУГИ}}
│   │   ├── fleet/                # автопарк
│   │   └── before-after/         # {{ФОТО_ДО}}, {{ФОТО_ПІСЛЯ}}
│   └── logo.svg                  # пізніше
├── app/
│   ├── layout.tsx                # шрифт, metadata base, Analytics
│   ├── page.tsx                  # головна (всі секції)
│   ├── globals.css
│   ├── sitemap.ts
│   ├── privacy/page.tsx          # політика конфіденційності
│   ├── api/
│   │   └── lead/route.ts         # POST заявки
│   └── (seo)/
│       ├── vyviz-budivelnogo-smittya/page.tsx
│       ├── vyviz-pobutovogo-smittya/page.tsx
│       ├── vyviz-mebliv/page.tsx
│       ├── demontazh/page.tsx
│       ├── poslugy-vantazhnykiv/page.tsx
│       ├── vyviz-gilok-lystya/page.tsx
│       ├── obrizannya-derev/page.tsx
│       ├── kosinnya-travy/page.tsx
│       ├── rozchystka-terytoriy/page.tsx
│       └── vyviz-smittya-[city]/page.tsx   # generateStaticParams
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── FloatingMessengers.tsx
│   │   └── Logo.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── Services.tsx
│   │   ├── Calculator.tsx
│   │   ├── Pricing.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Gallery.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── Geography.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ImagePlaceholder.tsx
│   │   ├── Lightbox.tsx
│   │   ├── Accordion.tsx
│   │   └── CallbackModal.tsx
│   ├── forms/
│   │   └── LeadForm.tsx
│   └── seo/
│       ├── JsonLd.tsx
│       └── ServicePageTemplate.tsx
├── lib/
│   ├── contacts.ts               # телефони, deep links
│   ├── pricing.ts                # прайс, формула калькулятора
│   ├── services.ts               # 12 послуг
│   ├── cities.ts                 # міста + райони Києва
│   ├── faq.ts
│   ├── benefits.ts
│   ├── metadata.ts               # generateMetadata helpers
│   └── constants.ts
└── hooks/
    ├── useScrollAnimation.ts
    └── useStickyHeader.ts
```

---

## 5. Структура головної сторінки (порядок секцій)

| # | ID якоря | Секція | Компонент |
|---|---|---|---|
| 1 | — | Header (sticky) | `Header` |
| 2 | `#hero` | Hero | `Hero` |
| 3 | `#benefits` | Переваги (8 карток) | `Benefits` |
| 4 | `#services` | Послуги (12 карток) | `Services` |
| 5 | `#calculator` | Калькулятор | `Calculator` |
| 6 | `#pricing` | Прайс + автопарк | `Pricing` |
| 7 | `#how-it-works` | Як працюємо (4 кроки) | `HowItWorks` |
| 8 | `#gallery` | Галерея + До/Після | `Gallery` + `BeforeAfter` |
| 9 | `#geography` | Географія + карта | `Geography` |
| 10 | `#faq` | FAQ (accordion) | `FAQ` |
| 11 | `#contact` | Фінальний CTA + форма | `FinalCTA` |
| 12 | — | Footer | `Footer` |
| — | — | Floating месенджери | `FloatingMessengers` |
| — | — | Модалка зворотного дзвінка | `CallbackModal` |

**Навігація header:** `Послуги` · `Ціни` · `Як працюємо` · `Роботи` · `Контакти`  
(пункт «Відгуки» — **відсутній**)

---

## 6. Готові тексти (вставляти дослівно)

### 6.1 Hero (`#hero`)
- **H1:** Вивіз сміття в Києві та області — без затримок і прихованих доплат
- **Підзаголовок:** Приїдемо в день звернення, завантажимо самі та чесно назвемо ціну ще до виїзду. Власний автопарк, свої вантажники, легальна утилізація.
- **Буліти:** Виїзд у день звернення · Працюємо без вихідних · Вантажники включені · Оцінка вартості по фото
- **CTA primary:** Розрахувати вартість → scroll `#calculator`
- **CTA secondary:** Залишити заявку → scroll `#contact`
- **Телефони:** `096 400 41 41` (великий), `063 400 41 41` (підпис: «додатковий для дзвінків»)
- **Месенджери:** Напишіть нам — оцінимо по фото за 10 хвилин
- **Бейдж:** 5 років на ринку · Подача авто за 30 хвилин

### 6.2 Переваги (`#benefits`)
**H2:** Чому обирають нас

| Заголовок | Опис |
|---|---|
| Швидкий виїзд | Подача авто за 30 хвилин, виїзд у день звернення |
| Чесна ціна | Озвучуємо вартість до виїзду. Без прихованих доплат |
| Власний транспорт | Бус, Газель, ЗІЛ, Камаз — підберемо під ваш обсяг |
| Вантажники включені | Зносимо, завантажуємо й прибираємо самі |
| Робота під ключ | Від заявки до чистого об'єкта — все беремо на себе |
| Прибираємо після себе | Залишаємо чисто там, де працювали |
| Оцінка по фото | Надішліть фото — порахуємо вартість дистанційно |
| Терміновий виїзд | Беремо специфічні та термінові замовлення |

### 6.3 Послуги (`#services`)
**H2:** Наші послуги  
**Підзаголовок:** Вивозимо сміття з будь-яких територій: квартири, будинки, об'єкти, дачі, села та садові товариства.

Кожна картка: фото (placeholder), назва, опис, бейджі `Подача авто · Вантажники за потреби · Легальна утилізація`, CTA **Замовити** → `#contact` з preselect послуги.

| slug | Назва | Опис |
|---|---|---|
| `budivelne` | Вивіз будівельного сміття | Після ремонту, демонтажу, будівництва. Биті матеріали, бетон, плитка, гіпсокартон. |
| `pobutove` | Вивіз побутового сміття | Регулярний та разовий вивіз з квартир, будинків, офісів. |
| `mebli` | Вивіз старих меблів | Дивани, шафи, столи, матраци. Виносимо й завантажуємо самі. |
| `tekhnika` | Вивіз техніки | Холодильники, пральні машини, стара побутова та офісна техніка. |
| `demontazh` | Демонтаж | Стін, перегородок, конструкцій з подальшим вивозом. |
| `prybyrannya` | Прибирання після ремонту | Повне очищення приміщення «під заселення». |
| `vantazhnyky` | Послуги вантажників | Навантаження, розвантаження, перенесення. |
| `gilky` | Вивіз гілок та листя | Після обрізки дерев, прибирання ділянок. |
| `vhalybe` | Вивіз великогабаритного сміття | Нестандартні об'ємні відходи. |
| `obrizannya` | Обрізання дерев | Формувальна та санітарна обрізка, з вивозом гілок. |
| `kosinnya` | Косіння трави | Покіс бур'янів та трави на ділянках, дачах, узбіччях. |
| `rozchystka` | Розчистка територій | Зарослі, чагарник, занедбані ділянки під ключ. |

### 6.4 Калькулятор (`#calculator`)
- **H2:** Розрахуйте вартість за 30 секунд
- **Підзаголовок:** Це попередня оцінка. Точну ціну підтвердимо після фото або огляду.
- Після розрахунку: **Замовити за цією ціною** + месенджери «Уточнити по фото»

### 6.5 Прайс (`#pricing`)
**H2:** Ціни та автопарк

**Автопарк:**

| Авто | Об'єм | Тоннаж | Ціна |
|---|---|---|---|
| Бус | 10 м³ | до 2 т | від 800 грн |
| Газель | 15 м³ | 2,5 т | від 1000 грн |
| ЗІЛ | 8 м³ | до 5 т | від 2500 грн |
| Камаз | 15 м³ | до 10 т | від 3500 грн |

**Тарифи:**

| Послуга | Ціна |
|---|---|
| Подача авто | від 800 грн |
| 1 м³ без вантажників | 700 грн |
| 1 м³ з вантажниками | 800 грн |
| Мішок (з завантаженням) | від 60 грн |
| Спуск без ліфта | від 50 грн/поверх |
| Мінімальне замовлення | 5 м³ |

**Примітка під таблицею:** Фінальна ціна залежить від: обсягу сміття, поверху, наявності ліфта, відстані, типу сміття, терміновості. Вантажники тарифікуються прив'язано до ціни куба.

### 6.6 Як працюємо (`#how-it-works`)
**H2:** Як ми працюємо

1. **Залишаєте заявку** — телефонуєте або пишете в месенджер. Можна одразу надіслати фото.
2. **Узгоджуємо деталі** — локація, тип і кількість сміття, відстань. Озвучуємо ціну.
3. **Приїжджаємо на об'єкт** — подача авто за 30 хвилин, працюємо без вихідних.
4. **Вивозимо та прибираємо** — завантажуємо самі, залишаємо чисто, утилізуємо легально.

### 6.7 Галерея (`#gallery`)
- **H2:** Наші роботи
- **Підзаголовок:** Реальні об'єкти, транспорт і команда. Без стокових фото.
- Сітка + lightbox, фільтри: Будівельне · Меблі/техніка · Демонтаж · Ділянки/гілки
- **До/Після:** slider comparison (react-compare-slider або власний)

### 6.8 Географія (`#geography`)
- **H2:** Де ми працюємо
- **Підзаголовок:** Київ і вся область — включно з селами та садовими товариствами.
- Карта (Google Maps embed або OpenStreetMap) + списки міст/районів

**Пріоритетні:** Київ, Васильків, Вишневе, Софіївська Борщагівка, Обухів, Фастів, Боярка, Біла Церква, Глеваха, Чабани, Хотів, Крюківщина.

**Також:** Тарасівка, Білогородка, Ясногородка, Гребінки, Бишів, Макарів та інші НП області.

**Райони Києва:** Голосіївський, Печерський, Шевченківський, Подільський, Оболонський, Дарницький, Деснянський, Святошинський, Солом'янський, Дніпровський.

### 6.9 FAQ (`#faq`)
**H2:** Часті запитання

1. **Як швидко можливий виїзд?** — Подаємо авто протягом 30 хвилин і виїжджаємо в день звернення. Доступний терміновий виїзд.
2. **Ви працюєте без вихідних?** — Так, працюємо щодня, без вихідних.
3. **Чи є у вас вантажники?** — Так, власні вантажники. Зносимо, завантажуємо й прибираємо самостійно.
4. **Чи можна оцінити вартість по фото?** — Так. Надішліть фото в Telegram, Viber або WhatsApp.
5. **Що входить у ціну?** — Подача авто, завантаження, вивіз і легальна утилізація. Вантажники — за потреби.
6. **Чи можна працювати без присутності клієнта?** — Так, за попереднім узгодженням.
7. **Яке мінімальне замовлення?** — 5 м³.
8. **Від чого залежить фінальна ціна?** — Обсяг, поверх, ліфт, відстань, тип сміття, терміновість.

### 6.10 Фінальний CTA (`#contact`)
- **H2:** Залиште заявку — приїдемо і вирішимо вашу проблему
- **Підзаголовок:** Передзвонимо протягом кількох хвилин, оцінимо обсяг і назвемо чесну ціну.

### 6.11 Footer
- Опис: Вивіз сміття, обрізання дерев, косіння трави та розчистка територій у Києві та області. 5 років на ринку.
- Графік: Без вихідних
- `© {year} {SITE_NAME}. Усі права захищені.`
- Посилання: Політика конфіденційності

---

## 7. Функціонал (технічна специфікація)

### 7.1 Контакти (`lib/contacts.ts`)

```typescript
export const PHONE_MAIN = '+380964004141';
export const PHONE_MAIN_DISPLAY = '096 400 41 41';
export const PHONE_CALLS_ONLY = '+380634004141';
export const PHONE_CALLS_ONLY_DISPLAY = '063 400 41 41';

export const MESSENGERS = {
  telegram: 'https://t.me/+380964004141',
  viber: 'viber://chat?number=%2B380964004141',
  whatsapp: 'https://wa.me/380964004141',
};
```

### 7.2 Калькулятор (`lib/pricing.ts`)

**Поля UI:**
1. Тип авто: Бус (10м³) / Газель (15м³) / ЗІЛ (8м³) / Камаз (15м³) **АБО** вільне поле «кількість м³» (number, min 5)
2. Вантажники: boolean
3. Поверх: number (0 = з землі), є ліфт: boolean
4. Мішки: number (optional, default 0)

**Константи:**
```typescript
export const PRICING = {
  baseDelivery: 800,
  perCubicNoLoaders: 700,
  perCubicWithLoaders: 800,
  perBag: 60,
  perFloorNoElevator: 50,
  minCubicMeters: 5,
  vehicles: [
    { id: 'bus', name: 'Бус', volume: 10, priceFrom: 800 },
    { id: 'gazel', name: 'Газель', volume: 15, priceFrom: 1000 },
    { id: 'zil', name: 'ЗІЛ', volume: 8, priceFrom: 2500 },
    { id: 'kamaz', name: 'Камаз', volume: 15, priceFrom: 3500 },
  ],
};
```

**Формула:**
```typescript
function calculate(input) {
  const cubes = Math.max(input.cubicMeters ?? input.vehicleVolume, PRICING.minCubicMeters);
  const pricePerCubic = input.withLoaders ? PRICING.perCubicWithLoaders : PRICING.perCubicNoLoaders;
  let total = PRICING.baseDelivery + cubes * pricePerCubic;
  if (!input.hasElevator && input.floor > 0) {
    total += input.floor * PRICING.perFloorNoElevator;
  }
  if (input.bags > 0) total += input.bags * PRICING.perBag;
  return { total, label: `від ${total.toLocaleString('uk-UA')} грн` };
}
```

**Відображення:** «Орієнтовна вартість: **від X грн**» + дисклеймер про уточнення по фото.

### 7.3 Форма заявки (`LeadForm.tsx`)

**Поля:**
- `name` (required, min 2)
- `phone` (required, regex UA: +380...)
- `service` (select, 12 опцій + «Інше»)
- `message` (textarea, адреса/коментар)
- `photos` (file input, multiple, max 10, max 5MB each, accept image/*)
- `consent` (checkbox required)
- `website` (honeypot, hidden, must be empty)

**Поведінка:**
- Submit → `POST /api/lead` JSON (FormData якщо є фото)
- Success: toast «Дякуємо! Передзвонимо найближчим часом»
- Error: показати помилку, не очищати поля
- Pre-fill `service` з query `?service=budivelne` або з калькулятора

### 7.4 API `/api/lead/route.ts`

**Request body:**
```json
{
  "name": "string",
  "phone": "string",
  "service": "string",
  "message": "string",
  "calculatorTotal": "number | optional",
  "photos": "base64[] | optional"
}
```

**Логіка:**
1. Валідація server-side
2. Якщо `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` → sendMessage з форматованим текстом
3. Якщо `LEAD_EMAIL` + SMTP/resend → email fallback
4. Return `{ success: true }`

**Повідомлення в Telegram (шаблон):**
```
🆕 Нова заявка
Ім'я: {name}
Телефон: {phone}
Послуга: {service}
Коментар: {message}
Калькулятор: {calculatorTotal} грн
Час: {ISO datetime}
```

### 7.5 Зворотний дзвінок (`CallbackModal`)
- Поля: ім'я, телефон
- Той самий `/api/lead` з `type: 'callback'`

### 7.6 ImagePlaceholder
```tsx
// Показує сірий блок з іконкою камери + підпис «Фото буде додано»
// Розміри responsive, aspect-ratio 16/9 або 4/3
```

### 7.7 Галерея
- Масив з `lib/gallery.ts` (шляхи до `/public/images/gallery/`)
- Якщо масив порожній — показати 6 placeholder-карток
- Lightbox на клік
- Before/After: мінімум 1 пара placeholder

### 7.8 Карта (`Geography`)
- Google Maps iframe embed (центр Київ, zoom 9) **або** Leaflet + OpenStreetMap (без API key)
- Env: `NEXT_PUBLIC_MAP_EMBED_URL` опційно

### 7.9 Аналітика
- `components/Analytics.tsx`: GA4 script якщо `NEXT_PUBLIC_GA_ID`
- Meta Pixel якщо `NEXT_PUBLIC_META_PIXEL_ID`
- Події на клік: `data-event="call_click" | messenger_click | lead_form_submit | calculator_submit"`

---

## 8. Анімації

| Елемент | Ефект |
|---|---|
| Hero | stagger fade-up: H1 → subtitle → bullets → CTA → image |
| Секції | fade-up on scroll (Framer Motion `whileInView`, once) |
| Картки | hover: `translateY(-4px)`, shadow, border accent |
| CTA | hover scale 1.03 + box-shadow glow |
| HowItWorks | stagger steps + connecting line animation |
| Gallery | fade-in grid, image hover scale 1.05 |
| Header | bg transition + backdrop-blur after 80px scroll |
| Mobile menu | slide from right + overlay fade |
| Floating buttons | pulse animation, appear after scroll 200px |
| `prefers-reduced-motion` | вимкнути анімації |

---

## 9. SEO

### 9.1 Головна сторінка
- **title:** `Вивіз сміття Київ та область — швидко, з вантажниками | {SITE_NAME}`
- **description:** `Вивіз будівельного та побутового сміття в Києві й області. Виїзд у день звернення, власний транспорт, вантажники включені, оцінка по фото, без прихованих доплат. ☎ 096 400 41 41`

### 9.2 URL маршрути
```
/                              — головна
/vyviz-budivelnogo-smittya
/vyviz-pobutovogo-smittya
/vyviz-mebliv
/demontazh
/poslugy-vantazhnykiv
/vyviz-gilok-lystya
/obrizannya-derev
/kosinnya-travy
/rozchystka-terytoriy
/vyviz-smittya-kyiv
/vyviz-smittya-vasylkiv
/vyviz-smittya-vyshneve
/vyviz-smittya-obukhiv
/vyviz-smittya-fastiv
/vyviz-smittya-boyarka
/vyviz-smittya-bila-tserkva
/privacy
```

### 9.3 SEO-сторінки послуг
Шаблон `ServicePageTemplate`:
- Унікальний H1: `{Послуга} в Києві та області`
- 2–3 абзаци (згенерувати з опису послуги + гео + CTA)
- Блок переваг (скорочено)
- Калькулятор (embed)
- Форма заявки
- Breadcrumbs
- Canonical URL

### 9.4 Ключові запити (розподіл)
- `/` — вивіз сміття Київ, вивіз сміття Київська область
- `/vyviz-budivelnogo-smittya` — вивіз будівельного сміття
- `/poslugy-vantazhnykiv` — вантажники Київ
- `/obrizannya-derev` — обрізання дерев
- `/kosinnya-travy` — вивіз трави, косіння
- `/vyviz-gilok-lystya` — вивіз гілок, вивіз листя
- `/vyviz-smittya-kyiv` + міста — гео-запити

### 9.5 JSON-LD

**LocalBusiness** (layout або page):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{SITE_NAME}",
  "telephone": ["+380964004141", "+380634004141"],
  "priceRange": "₴₴",
  "areaServed": ["Київ", "Київська область", "Васильків", "Вишневе", "Обухів", "Фастів", "Боярка", "Біла Церква"],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "21:00"
  }],
  "address": { "@type": "PostalAddress", "addressLocality": "Київ", "addressCountry": "UA" }
}
```

**FAQPage** — з 8 питань розділу 6.9.

**Service** — на кожній SEO-сторінці послуги.

**BreadcrumbList** — на підсторінках.

### 9.6 Alt-тексти
Формат: `{дія на фото} — {послуга}, Київ та область`

### 9.7 Технічне
- `app/sitemap.ts` — dynamic, всі routes
- `public/robots.txt` — Allow /, Sitemap URL
- `metadataBase` в layout
- Open Graph: title, description, image `/og-image.jpg` (згенерувати placeholder 1200×630 з кольорами бренду)

---

## 10. Environment variables (`.env.example`)

```bash
# Бренд
NEXT_PUBLIC_SITE_NAME="Вивіз сміття"
NEXT_PUBLIC_SITE_URL="https://example.com"

# Контакти (вже в коді, можна override)
# NEXT_PUBLIC_PHONE_MAIN=+380964004141

# Заявки
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
RESEND_API_KEY=
LEAD_EMAIL=manager@example.com

# Аналітика (опційно)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# Карта (опційно)
NEXT_PUBLIC_MAP_EMBED_URL=
```

---

## 11. Політика конфіденційності (`/privacy`)

Коротка сторінка українською:
- які дані збираємо (ім'я, телефон, фото, коментар)
- мета — обробка заявки
- не передаємо третім особам (крім месенджерів/пошти менеджера)
- згода через checkbox у формі
- контакт для запитів: `096 400 41 41`

---

## 12. Деплой

- **Рекомендація:** Vercel
- Build: `next build`
- Node 18+
- Env variables налаштувати в Vercel dashboard
- Домен: підключити після покупки
- `next.config.js`: images domains якщо CDN

---

## 13. Чеклист приймання (Definition of Done)

- [ ] Всі 11 секцій на головній (без відгуків)
- [ ] Тексти відповідають розділу 6
- [ ] Калькулятор рахує за формулою, min 5 м³
- [ ] 096 — основний, месенджери тільки на 096, 063 — дзвінки
- [ ] Форма + callback → API → Telegram/email
- [ ] Upload фото працює
- [ ] Sticky header + mobile menu + floating messengers
- [ ] Галерея lightbox + before/after slider
- [ ] SEO metadata + JSON-LD + sitemap
- [ ] 9+ SEO-підсторінок
- [ ] Lighthouse mobile Performance ≥ 90
- [ ] Адаптив 320px–1920px
- [ ] `prefers-reduced-motion` respected
- [ ] Плейсхолдер лого/фото до заміни клієнтом

---

## 14. Що додати пізніше (1 хвилина заміни)

| Файл / env | Дія |
|---|---|
| `public/logo.svg` | Замінити SVG в `Logo.tsx` |
| `NEXT_PUBLIC_SITE_NAME` | Оновити назву |
| `public/images/**` | Додати реальні фото, оновити `lib/gallery.ts` |
| `NEXT_PUBLIC_GA_ID` | Увімкнути аналітику |
| `og-image.jpg` | Замінити соц-прев'ю |

---

## 15. Чого уникати

- Секція відгуків
- Приклади замовлень з ціною
- Стокові фото
- Шаблонний вигляд
- Приховані доплати в текстах
- ОСББ як цільова аудиторія
- Канібалізація SEO (1 сторінка = 1 кластер запитів)

---

*Документ версія 2.0 — повна специфікація для створення проєкту без додаткових уточнень.*
