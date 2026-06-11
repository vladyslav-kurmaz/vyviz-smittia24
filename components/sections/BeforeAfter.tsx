"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Flex, SimpleGrid, useBreakpointValue, chakra } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BEFORE_AFTER_PAIRS, type BeforeAfterPair } from "@/lib/before-after";

const AUTO_PLAY_MS = 4000;

function PhotoCell({
  src,
  alt,
  label,
  variant,
}: {
  src: string;
  alt: string;
  label: string;
  variant: "before" | "after";
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <Box position="relative" flex={{ md: 1 }} minW={0} w="full">
      <Box
        position="absolute"
        top={3}
        left={3}
        zIndex={2}
        px={2}
        py={1}
        rounded="sm"
        fontSize="xs"
        fontWeight="bold"
        color="white"
        bg={variant === "before" ? "blackAlpha.700" : "accent.600"}
      >
        {label}
      </Box>
      <Box
        position="relative"
        aspectRatio={{ base: 1, md: 4 / 3 }}
        maxH={{ base: "240px", md: "300px" }}
        w="full"
        bg="brand.100"
      >
        {failed ? (
          <ImagePlaceholder
            label={label}
            aspect="square"
            rounded="none"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            quality={70}
            sizes="(max-width: 768px) 90vw, 400px"
            style={{ objectFit: "cover" }}
            onError={() => setFailed(true)}
          />
        )}
      </Box>
    </Box>
  );
}

function PairSlide({ pair }: { pair: BeforeAfterPair }) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: 2, md: 3 }}
      w="full"
      maxW={{ base: "420px", md: "full" }}
      mx="auto"
    >
      <PhotoCell
        src={pair.before}
        alt={`До — ${pair.id}`}
        label="До"
        variant="before"
      />
      <PhotoCell
        src={pair.after}
        alt={`Після — ${pair.id}`}
        label="Після"
        variant="after"
      />
    </SimpleGrid>
  );
}

export function BeforeAfter() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false;
  const [index, setIndex] = useState(0);
  const count = BEFORE_AFTER_PAIRS.length;
  const pair = BEFORE_AFTER_PAIRS[index];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (reduceMotion || count <= 1) return;
    const id = window.setInterval(next, AUTO_PLAY_MS);
    return () => window.clearInterval(id);
  }, [next, reduceMotion, count]);

  return (
    <Section id="before-after" tone="elevated" overflow="hidden">
      <Box maxW="5xl" mx="auto" w="full">
        <SectionHeader
          eyebrow="Результат"
          title="До / Після"
          subtitle="Порівняйте обʼєкт до та після вивозу — слайдер перемикається автоматично"
          align="center"
        />

        <Box overflow="hidden" shadow="none">
          <Box position="relative" minH={{ base: "488px", md: "300px" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pair.id}
                initial={
                  reduceMotion
                    ? false
                    : isDesktop
                      ? { opacity: 0, x: 48 }
                      : { opacity: 0, y: 32 }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : isDesktop
                      ? { opacity: 0, x: -48 }
                      : { opacity: 0, y: -32 }
                }
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <PairSlide pair={pair} />
              </motion.div>
            </AnimatePresence>
          </Box>

          <Flex mt={4} gap={1.5} flexWrap="wrap" justify="center" role="tablist" aria-label="Слайди до і після">
            {BEFORE_AFTER_PAIRS.map((p, i) => (
              <chakra.button
                key={p.id}
                type="button"
                role="tab"
                aria-label={`Слайд ${p.id}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                w={i === index ? "20px" : "8px"}
                h="8px"
                rounded="full"
                bg={i === index ? "brand.500" : "brand.100"}
                border="none"
                p={0}
                cursor="pointer"
                transition="all 0.25s"
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Section>
  );
}
