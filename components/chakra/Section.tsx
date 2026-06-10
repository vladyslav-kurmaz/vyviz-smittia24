"use client";

import { Box, Container, Heading, Text, type BoxProps } from "@chakra-ui/react";
import { SectionDecor } from "@/components/ui/SectionDecor";

export type SectionTone = "cream" | "elevated" | "brand" | "dark";

type SectionProps = BoxProps & {
  id?: string;
  title?: string;
  subtitle?: string;
  /** @deprecated — використовуйте tone="elevated" */
  tinted?: boolean;
  tone?: SectionTone;
  decor?: boolean;
  skewTop?: boolean;
};

const TONE_BG: Record<SectionTone, string> = {
  cream: "cream",
  elevated: "elevated",
  brand: "elevated",
  dark: "brand.700",
};

export function Section({
  id,
  title,
  subtitle,
  tinted = false,
  tone,
  decor = false,
  skewTop = false,
  children,
  className,
  ...props
}: SectionProps) {
  const resolvedTone: SectionTone = tone ?? (tinted ? "elevated" : "cream");
  const isDark = resolvedTone === "dark";

  return (
    <Box
      as="section"
      id={id}
      py={{ base: 12, md: 16 }}
      bg={TONE_BG[resolvedTone]}
      position="relative"
      overflow="visible"
      className={[skewTop ? "section-skew-top" : "", className].filter(Boolean).join(" ") || undefined}
      {...props}
    >
      {decor && <SectionDecor tone={isDark ? "dark" : "light"} />}
      <Container maxW="7xl" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        {title && (
          <Box mb={{ base: 10, md: 12 }} maxW="3xl">
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="extrabold"
              color={isDark ? "white" : "ink"}
              lineHeight="shorter"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                mt={4}
                fontSize="lg"
                color={isDark ? "whiteAlpha.800" : "muted"}
                lineHeight="relaxed"
              >
                {subtitle}
              </Text>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}
