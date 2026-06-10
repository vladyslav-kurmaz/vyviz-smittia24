"use client";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Surface } from "@/components/chakra/Surface";
import { HOW_IT_WORKS_STEPS } from "@/lib/navigation";

function StepCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Surface variant="soft" hover p={{ base: 5, md: 6 }} h="full" position="relative" overflow="hidden">
      <Text
        position="absolute"
        top={2}
        right={3}
        fontSize={{ base: "2.5rem", md: "3rem" }}
        fontWeight="bold"
        lineHeight={1}
        color="brand.100"
        userSelect="none"
        aria-hidden
      >
        {num}
      </Text>
      <Box position="relative" zIndex={1}>
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          mb={4}
          rounded="button"
          bg="brand.500"
          color="white"
          fontSize="sm"
          fontWeight="bold"
        >
          {index + 1}
        </Box>
        <Heading size="md" color="ink">
          {title}
        </Heading>
        <Text mt={2} fontSize="sm" color="muted" lineHeight="relaxed">
          {description}
        </Text>
      </Box>
    </Surface>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="elevated">
      <SectionHeader
        eyebrow="Процес"
        title="Як ми працюємо"
        subtitle="Чотири кроки від заявки до чистого об'єкта — як на зручних логістичних лендингах"
        align="center"
      />

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <StepCard
            key={step.title}
            index={i}
            title={step.title}
            description={step.description}
          />
        ))}
      </Grid>
    </Section>
  );
}
