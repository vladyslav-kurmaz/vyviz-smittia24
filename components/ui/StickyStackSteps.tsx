"use client";

import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

export type StickyStackStep = {
  title: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: StickyStackStep[];
};

const STICKY_TOP_BASE = 120;
const STICKY_TOP_STEP = 2;

export function StickyStackSteps({ eyebrow, title, subtitle, steps }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/*
        Grid: ліва й права колонки однакової висоти.
        Липкий заголовок зупиняється разом із останньою карткою — не заїжджає далі.
      */}
      <Grid
        templateColumns={{ base: "1fr", xl: "minmax(0, 1fr) minmax(0, 55%)" }}
        columnGap={{ xl: 12 }}
        rowGap={{ base: 8, xl: 0 }}
        alignItems="stretch"
        w="full"
      >
        <Box pr={{ xl: 4 }}>
          <Box
            position={{ xl: "sticky" }}
            top={{ xl: "8rem" }}
          >
            {eyebrow && (
              <Text
                as="span"
                display="inline-block"
                px={3}
                py={1}
                mb={3}
                rounded="md"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="0.08em"
                textTransform="uppercase"
                bg="brand.50"
                color="brand.600"
              >
                {eyebrow}
              </Text>
            )}
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
              fontWeight="bold"
              color="ink"
              lineHeight="shorter"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                mt={3}
                fontSize={{ base: "sm", md: "md" }}
                color="muted"
                lineHeight="relaxed"
                maxW="md"
              >
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>

        <Flex
          direction="column"
          gap={5}
          w={{ base: "full", sm: "75%", xl: "full" }}
          justifySelf={{ base: "stretch", sm: "end", xl: "stretch" }}
        >
          {steps.map((step, index) => (
            <Box
              key={step.title}
              position="sticky"
              top={`${STICKY_TOP_BASE + index * STICKY_TOP_STEP}px`}
              zIndex={index + 1}
              bg="elevated"
              rounded="card"
              shadow="cardHover"
              borderWidth="1px"
              borderColor="brand.50"
              p={{ base: 5, md: 6 }}
              minH="124px"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Flex gap={4} align="flex-start">
                <Flex
                  flexShrink={0}
                  w={9}
                  h={9}
                  rounded="button"
                  bg="brand.500"
                  color="white"
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  fontSize="sm"
                  aria-hidden
                >
                  {index + 1}
                </Flex>
                <Heading as="h3" size="sm" color="ink" lineHeight="snug" pt={0.5} flex={1}>
                  {step.title}
                </Heading>
              </Flex>
              <Text fontSize="sm" color="muted" lineHeight="relaxed">
                {step.description}
              </Text>
            </Box>
          ))}
        </Flex>
      </Grid>
    </motion.div>
  );
}
