"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { Surface } from "@/components/chakra/Surface";
import { Button } from "@/components/ui/Button";
import { StickyStackSteps } from "@/components/ui/StickyStackSteps";
import { PRICE_FACTORS, VOLUME_PRICING } from "@/lib/fleet";

export function PriceFormation() {
  return (
    <Section id="price-formation" tone="cream">
      <Box maxW="7xl" mx="auto">
        <StickyStackSteps
          eyebrow="Ціни"
          title="Як формується ціна?"
          subtitle="Озвучуємо вартість наперед — без прихованих платежів"
          steps={PRICE_FACTORS.map((item) => ({
            title: item.title,
            description: item.description,
          }))}
        />

        <Box mt={{ base: "70px", md: "86px" }}>
          <Surface w="full" p={{ base: 5, md: 6 }} bg="brand.50" hover={false}>
            <Text fontSize="sm" fontWeight="bold" color="brand.700" mb={2}>
              Умовно
            </Text>
            <Text fontSize="sm" color="ink" lineHeight="relaxed">
              Наприклад, 7 м³ сміття: подача {VOLUME_PRICING.baseDelivery} грн + 7 ×{" "}
              {VOLUME_PRICING.withLoaders.perCubic} грн = орієнтовно 6600 грн з нашим
              завантаженням, або близько 6250 грн, якщо завантажуєте самостійно.
            </Text>
          </Surface>

          <Box mt={10} textAlign="center" maxW="2xl" mx="auto">
            <Heading as="h3" size="lg" color="ink" mb={3}>
              Як отримати точну суму?
            </Heading>
            <Text fontSize="md" color="muted" mb={6} lineHeight="relaxed">
              Надішліть 1–3 фото — скажемо, яку машину подати, вартість під ключ, чи
              потрібні вантажники і коли можемо приїхати.
            </Text>
            <Flex justify="center" w="full">
              <Button
                href="#contact"
                variant="primary"
                size="md"
                className="price-formation-cta"
              >
                Надіслати фото та отримати розрахунок
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
