"use client";

import { useEffect, useState } from "react";
import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import { MESSENGERS } from "@/lib/contacts";
import { MessengerIcon } from "@/components/ui/MessengerIcon";

const buttons = [
  { key: "telegram" as const, href: MESSENGERS.telegram, label: "Telegram" },
  { key: "viber" as const, href: MESSENGERS.viber, label: "Viber" },
  { key: "whatsapp" as const, href: MESSENGERS.whatsapp, label: "WhatsApp" },
];

export function FloatingMessengers() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`floating-messengers${visible ? " floating-messengers--visible" : ""}`}
      aria-hidden={!visible}
    >
      <Flex direction="column" gap={3}>
        {buttons.map((b) => (
          <ChakraLink
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={b.label}
            data-event="messenger_click"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={12}
            h={12}
            rounded="full"
            bg="brand.600"
            color="white"
            shadow="btn"
            transition="all 0.2s"
            _hover={{ bg: "brand.700", transform: "scale(1.08)" }}
            tabIndex={visible ? 0 : -1}
          >
            <MessengerIcon messenger={b.key} size={24} />
          </ChakraLink>
        ))}
      </Flex>
    </div>
  );
}
