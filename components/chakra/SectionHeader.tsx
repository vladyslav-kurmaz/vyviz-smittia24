"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: Props) {
  const textAlign = align === "center" ? "center" : "left";
  const mx = align === "center" ? "auto" : undefined;

  return (
    <Box mb={{ base: 8, md: 10 }} maxW="3xl" textAlign={textAlign} mx={mx}>
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
          bg={light ? "whiteAlpha.200" : "brand.50"}
          color={light ? "white" : "brand.600"}
        >
          {eyebrow}
        </Text>
      )}
      <Heading
        as="h2"
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        fontWeight="bold"
        color={light ? "white" : "ink"}
        lineHeight="shorter"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          mt={3}
          fontSize={{ base: "sm", md: "md" }}
          color={light ? "white" : "muted"}
          lineHeight="relaxed"
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
