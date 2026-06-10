"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MESSENGER_ICON_FILES,
  MESSENGER_ICONS_DIR,
} from "@/lib/messengers-ui";
import { TelegramIcon, ViberIcon, WhatsAppIcon } from "./MessengerIcons";

type MessengerKey = keyof typeof MESSENGER_ICON_FILES;

const FallbackIcon = {
  telegram: TelegramIcon,
  viber: ViberIcon,
  whatsapp: WhatsAppIcon,
} as const;

type Props = {
  messenger: MessengerKey;
  size: number;
};

export function MessengerIcon({ messenger, size }: Props) {
  const src = `${MESSENGER_ICONS_DIR}/${MESSENGER_ICON_FILES[messenger]}`;
  const [useFallback, setUseFallback] = useState(false);
  const Fallback = FallbackIcon[messenger];

  if (useFallback) {
    return <Fallback size={size} />;
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      style={{
        objectFit: "contain",
        /* чорні SVG/PNG → білі на зеленому/напівпрозорому фоні кнопки */
        filter: "brightness(0) invert(1)",
      }}
      onError={() => setUseFallback(true)}
    />
  );
}
