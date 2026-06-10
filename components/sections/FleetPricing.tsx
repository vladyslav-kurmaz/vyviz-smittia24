"use client";

import { Text } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { FleetShowcase } from "@/components/sections/FleetShowcase";

export function FleetPricing() {
  return (
    <Section id="pricing" tone="elevated">
      <SectionHeader
        eyebrow="Автопарк"
        title="Ціни на подачу авто"
        align="center"
      />

      <FleetShowcase />

      <Text
        mt={{ base: 8, md: 10 }}
        maxW="3xl"
        mx="auto"
        textAlign="center"
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="semibold"
        color="ink"
        lineHeight="relaxed"
      >
        Ми підберемо авто саме під ваші потреби, щоб не переплачувати за зайвий обʼєм
      </Text>
    </Section>
  );
}
