import { VEHICLE_ARRIVAL_FULL } from "@/lib/contacts";

export const NAV_LINKS = [
  { href: "/#services", label: "Послуги" },
  { href: "/#pricing", label: "Ціни" },
  { href: "/#geography", label: "Географія" },
  { href: "/#contact", label: "Контакти" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Залишаєте заявку",
    description:
      "Телефонуєте або пишете в месенджер. Можна одразу надіслати фото.",
  },
  {
    title: "Узгоджуємо деталі",
    description:
      "Локація, тип і кількість сміття, відстань. Озвучуємо ціну.",
  },
  {
    title: "Приїжджаємо на об'єкт",
    description: `Подача авто ${VEHICLE_ARRIVAL_FULL}, працюємо без вихідних.`,
  },
  {
    title: "Вивозимо та прибираємо",
    description: "Завантажуємо самі, залишаємо чисто, утилізуємо легально.",
  },
];

export const SERVICE_BADGES = [
  "Подача авто",
  "Вантажники за потреби",
  "Легальна утилізація",
];
