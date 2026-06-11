export const PHONE_MAIN = "+380964004141";
export const PHONE_MAIN_DISPLAY = "096 400 41 41";
export const PHONE_CALLS_ONLY = "+380634004141";
export const PHONE_CALLS_ONLY_DISPLAY = "063 400 41 41";

export const MESSENGERS = {
  telegram: "https://t.me/+380964004141",
  viber: "viber://chat?number=%2B380964004141",
  whatsapp: "https://wa.me/380964004141",
} as const;

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Вивіз Сміття 24";

/** Час подачі авто */
export const VEHICLE_ARRIVAL_SHORT = "від 60 хв";
export const VEHICLE_ARRIVAL_FULL =
  "від 60 хв (залежить від вашої локації)";
