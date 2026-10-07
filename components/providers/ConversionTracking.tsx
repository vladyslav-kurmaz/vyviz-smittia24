"use client";

import { useEffect } from "react";
import { trackAdsConversion } from "@/lib/ads";

const MESSENGER_HREF = /^(?:https?:\/\/(?:t\.me|wa\.me)\/|viber:)/i;

/**
 * Один делегований слухач кліків для конверсій Google Ads: клік по номеру
 * (tel:) і по Telegram / Viber / WhatsApp. Так не треба чіпати кожне
 * посилання (шапка, меню, футер, CTA, плаваючі кнопки), а нові посилання
 * підхопляться автоматично.
 */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackAdsConversion("phone");
      } else if (MESSENGER_HREF.test(href)) {
        trackAdsConversion("messenger");
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
