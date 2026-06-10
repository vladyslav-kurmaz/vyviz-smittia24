"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import type { SeoHeroImages } from "@/lib/seo-hero";

type Cta = { label: string; href: string };

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  images: SeoHeroImages;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

function BgImage({ src, onError }: { src: string; onError: () => void }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      priority
      sizes="100vw"
      style={{ objectFit: "cover", objectPosition: "center" }}
      onError={onError}
    />
  );
}

export function SeoHero({
  eyebrow,
  title,
  subtitle,
  images,
  primaryCta = { label: "Передзвоніть мені", href: "#contact" },
  secondaryCta = { label: "Докладніше", href: "#services" },
}: Props) {
  const reduceMotion = useReducedMotion();
  const [desktopOk, setDesktopOk] = useState(true);
  const [mobileOk, setMobileOk] = useState(true);

  const desktopSrc = desktopOk ? images.desktop : images.fallback;
  const mobileSrc = mobileOk ? images.mobile : images.fallback;

  const slide = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { y: 20 },
          animate: { y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      h={{ base: "100dvh", md: "min(100dvh, 720px)" }}
      minH={{ base: "520px", md: "560px" }}
      w="full"
      overflow="hidden"
      display="flex"
      alignItems="center"
      pt={{ base: 20, md: 24 }}
      pb={{ base: 12, md: 16 }}
    >
      <Box position="absolute" inset={0} zIndex={0} overflow="hidden" pointerEvents="none" aria-hidden>
        <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
          <BgImage src={mobileSrc} onError={() => setMobileOk(false)} />
        </Box>
        <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
          <BgImage src={desktopSrc} onError={() => setDesktopOk(false)} />
        </Box>
        <Box position="absolute" inset={0} bg="blackAlpha.400" />
        <Box
          position="absolute"
          inset={0}
          style={{
            background:
              "linear-gradient(105deg, rgba(35,61,40,0.85) 0%, rgba(35,61,40,0.5) 45%, rgba(35,61,40,0.25) 70%, transparent 100%)",
          }}
        />
      </Box>

      <Container maxW="7xl" position="relative" zIndex={2} px={{ base: 4, md: 6 }} w="full">
        <Box maxW={{ base: "full", md: "2xl", lg: "3xl" }}>
          {eyebrow && (
            <motion.div {...slide(0)}>
              <Text
                display="inline-block"
                px={4}
                py={1.5}
                mb={5}
                rounded="full"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="0.12em"
                textTransform="uppercase"
                bg="whiteAlpha.200"
                color="white"
                borderWidth="1px"
                borderColor="whiteAlpha.400"
              >
                {eyebrow}
              </Text>
            </motion.div>
          )}

          <motion.div {...slide(eyebrow ? 0.08 : 0)}>
            <Heading
              as="h1"
              fontSize={{ base: "2rem", sm: "2.5rem", md: "3.25rem", lg: "3.75rem" }}
              fontWeight="extrabold"
              lineHeight="1.1"
              letterSpacing="-0.03em"
              color="white"
              textShadow="0 2px 20px rgba(0,0,0,0.45)"
              textWrap="balance"
            >
              {title}
            </Heading>
          </motion.div>

          <motion.div {...slide(eyebrow ? 0.16 : 0.08)}>
            <Text
              mt={5}
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.65"
              color="white"
              textShadow="0 1px 12px rgba(0,0,0,0.35)"
            >
              {subtitle}
            </Text>
          </motion.div>

          <motion.div {...slide(eyebrow ? 0.24 : 0.16)}>
            <Flex mt={8} gap={4} flexWrap="wrap">
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" onDark>
                {secondaryCta.label}
              </Button>
            </Flex>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
