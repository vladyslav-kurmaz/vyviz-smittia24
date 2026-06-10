"use client";

import { Box } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/faq";

export function FAQ() {
  return (
    <Section id="faq" tone="elevated">
      <SectionHeader
        eyebrow="FAQ"
        title="Часті запитання"
        subtitle="Короткі відповіді про ціну, час виїзду та те, що можна вивозити"
        align="center"
      />
      <Box maxW="3xl" mx="auto">
        <Accordion items={FAQ_ITEMS} />
      </Box>
    </Section>
  );
}
