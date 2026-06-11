"use client";

import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import { MESSENGERS } from "@/lib/contacts";
import { MessengerIcon } from "./MessengerIcon";

const items = [
  { key: "telegram" as const, href: MESSENGERS.telegram, label: "Telegram" },
  { key: "viber" as const, href: MESSENGERS.viber, label: "Viber" },
  { key: "whatsapp" as const, href: MESSENGERS.whatsapp, label: "WhatsApp" },
];

type Tone = "onDark" | "default";

const toneStyles: Record<Tone, { bg: string; color: string; hoverBg: string }> = {
  onDark: {
    bg: "whiteAlpha.200",
    color: "white",
    hoverBg: "whiteAlpha.300",
  },
  default: {
    bg: "brand.600",
    color: "white",
    hoverBg: "brand.700",
  },
};

type Props = { size?: "sm" | "md"; className?: string; tone?: Tone };

export function MessengerButtons({ size = "md", className, tone = "default" }: Props) {
  const boxSize = size === "sm" ? 11 : 12;
  const iconSize = size === "sm" ? 22 : 24;
  const styles = toneStyles[tone];

  return (
    <Flex gap={2.5} className={className}>
      {items.map((m) => (
        <ChakraLink
          key={m.key}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.label}
          data-event="messenger_click"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={boxSize}
          h={boxSize}
          rounded="full"
          flexShrink={0}
          bg={styles.bg}
          color={styles.color}
          shadow="btn"
          transition="all 0.2s"
          _hover={{ bg: styles.hoverBg, transform: "scale(1.08)" }}
        >
          <MessengerIcon messenger={m.key} size={iconSize} />
        </ChakraLink>
      ))}
    </Flex>
  );
}
