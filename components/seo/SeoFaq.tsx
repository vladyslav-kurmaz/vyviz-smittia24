"use client";

import { Box } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import type { SeoFaqItem } from "@/lib/service-pages";

type Props = {
  items: SeoFaqItem[];
  title?: string;
};

export function SeoFaq({ items, title = "Часті запитання" }: Props) {
  return (
    <Section tone="elevated">
      <SectionHeader eyebrow="FAQ" title={title} align="center" />
      <Box maxW="3xl" mx="auto">
        <Accordion items={items} />
      </Box>
    </Section>
  );
}
