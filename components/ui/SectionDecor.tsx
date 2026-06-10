"use client";

import { Box } from "@chakra-ui/react";

/** Декоративні плями як на mvplogistics.eu — у фірмових кольорах */
export function SectionDecor({ tone = "light" }: { tone?: "light" | "dark" }) {
  const blobA = tone === "dark" ? "whiteAlpha.100" : "brand.100";
  const blobB = tone === "dark" ? "accent.500" : "accent.100";

  return (
    <>
      <Box
        position="absolute"
        top={{ base: "-8%", md: "-12%" }}
        right={{ base: "-20%", md: "-8%" }}
        w={{ base: "220px", md: "360px" }}
        h={{ base: "220px", md: "360px" }}
        rounded="full"
        bg={blobA}
        opacity={tone === "dark" ? 0.12 : 0.35}
        filter="blur(48px)"
        pointerEvents="none"
        aria-hidden
      />
      <Box
        position="absolute"
        bottom={{ base: "0", md: "8%" }}
        left={{ base: "-25%", md: "-6%" }}
        w={{ base: "180px", md: "280px" }}
        h={{ base: "180px", md: "280px" }}
        rounded="full"
        bg={blobB}
        opacity={tone === "dark" ? 0.18 : 0.28}
        filter="blur(40px)"
        pointerEvents="none"
        aria-hidden
      />
    </>
  );
}
