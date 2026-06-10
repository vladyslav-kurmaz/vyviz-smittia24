"use client";

import { Box, SimpleGrid, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { MessengerButtons } from "@/components/ui/MessengerButtons";
import {
  PHONE_MAIN,
  PHONE_MAIN_DISPLAY,
  PHONE_CALLS_ONLY,
  PHONE_CALLS_ONLY_DISPLAY,
} from "@/lib/contacts";

export function FinalCTA() {
  return (
    <Box as="section" id="contact" position="relative" overflow="hidden" py={{ base: 12, md: 16 }}>
      <Box
        position="absolute"
        inset={0}
        css={{
          background:
            "linear-gradient(135deg, #233d28 0%, #2a4a2f 48%, #355e3b 100%)",
        }}
      />
      <Box position="relative" zIndex={1} maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 10 }} alignItems="start">
          <Box>
            <SectionHeader
              eyebrow="Контакти"
              title="Ми швидко зв'яжемося з вами"
              subtitle="Заповніть форму — менеджер уточнить деталі, розрахує вартість і запропонує найближчий час виїзду."
              light
            />
            <Flex direction="column" gap={2} mt={2}>
              <ChakraLink
                href={`tel:${PHONE_MAIN}`}
                display="block"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="white"
                _hover={{ color: "accent.100" }}
                data-event="call_click"
              >
                {PHONE_MAIN_DISPLAY}
              </ChakraLink>
              <ChakraLink
                href={`tel:${PHONE_CALLS_ONLY}`}
                display="block"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="white"
                _hover={{ color: "accent.100" }}
              >
                {PHONE_CALLS_ONLY_DISPLAY}
              </ChakraLink>
              <Box fontSize="sm" color="whiteAlpha.800" lineHeight="relaxed">
                Не знаєте точну суму? Надішліть фото — розрахуємо за 10 хвилин
              </Box>
              <MessengerButtons className="mt-2" tone="onDark" />
            </Flex>
          </Box>

          <Box className="lead-form-panel">
            <LeadForm variant="modal" />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
