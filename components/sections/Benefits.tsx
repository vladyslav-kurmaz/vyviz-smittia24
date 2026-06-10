"use client";

import Image from "next/image";
import { useState } from "react";
import { SimpleGrid, Text, Heading, Flex } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Surface } from "@/components/chakra/Surface";
import { BENEFITS_ICONS_DIR, HOMEPAGE_BENEFITS } from "@/lib/benefits";

function BenefitIcon({
  iconFile,
  iconFallback,
  title,
}: {
  iconFile: string;
  iconFallback: string;
  title: string;
}) {
  const src = `${BENEFITS_ICONS_DIR}/${iconFile}`;
  const [useFallback, setUseFallback] = useState(false);

  return (
    <Flex
      w={14}
      h={14}
      mx="auto"
      mb={5}
      align="center"
      justify="center"
      rounded="cardSm"
      bg="brand.50"
      position="relative"
      overflow="hidden"
      aria-hidden
    >
      {!useFallback ? (
        <Image
          src={src}
          alt=""
          width={36}
          height={36}
          style={{ objectFit: "contain" }}
          onError={() => setUseFallback(true)}
        />
      ) : (
        <Text as="span" lineHeight={1} role="img" aria-label={title}>
          {iconFallback}
        </Text>
      )}
    </Flex>
  );
}

export function Benefits() {
  return (
    <Section id="benefits" tone="cream">
      <SectionHeader
        eyebrow="Переваги"
        title="Чому обирають нас"
        align="center"
      />

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={6} maxW="6xl" mx="auto">
        {HOMEPAGE_BENEFITS.map((b) => (
          <Surface key={b.title} variant="accentTop" hover p={5} h="full" textAlign="center">
            <BenefitIcon
              iconFile={b.iconFile}
              iconFallback={b.iconFallback}
              title={b.title}
            />
            <Heading as="h3" size="sm" color="ink">
              {b.title}
            </Heading>
            <Text mt={2} fontSize="xs" color="muted" lineHeight="relaxed">
              {b.description}
            </Text>
          </Surface>
        ))}
      </SimpleGrid>
    </Section>
  );
}
