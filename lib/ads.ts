/**
 * Google Ads: ID тега та відстеження конверсій.
 *
 * ID тега (AW-…) — публічний, він і так видно в коді кожної сторінки, тому
 * зашитий як значення за замовчуванням. Порожній NEXT_PUBLIC_GOOGLE_ADS_ID
 * повністю вимикає тег (корисно для A/B-вимірювань швидкості).
 *
 * Мітки конверсій (частина після "/" у send_to: 'AW-…/МІТКА') беруться з
 * кабінету Google Ads: Цілі → Конверсії → дія → Тег → Фрагмент події.
 * Поки мітка порожня — відповідна подія просто не надсилається.
 */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "AW-18452795377";

export type ConversionKind = "lead" | "phone" | "messenger";

export const ADS_CONVERSION_LABELS: Record<ConversionKind, string> = {
  /** Надсилання форми заявки */
  lead: process.env.NEXT_PUBLIC_ADS_LABEL_LEAD?.trim() ?? "",
  /** Клік по номеру телефону (tel:) */
  phone: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE?.trim() ?? "",
  /** Клік по Telegram / Viber / WhatsApp */
  messenger: process.env.NEXT_PUBLIC_ADS_LABEL_MESSENGER?.trim() ?? "",
};

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Надсилає конверсію в Google Ads. Безпечно викликати до завантаження
 * gtag.js: команда потрапляє в dataLayer і буде оброблена, щойно бібліотека
 * завантажиться (сам gtag.js вантажиться відкладено, поза критичним шляхом).
 */
export function trackAdsConversion(kind: ConversionKind): void {
  if (typeof window === "undefined") return;
  if (!GOOGLE_ADS_ID) return;

  const label = ADS_CONVERSION_LABELS[kind];
  if (!label) return;

  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag() {
      // gtag.js очікує саме об'єкт arguments, а не масив
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  }

  w.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
}
