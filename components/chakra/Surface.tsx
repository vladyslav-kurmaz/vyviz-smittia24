"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

type SurfaceVariant = "default" | "soft" | "accentTop";

/** Картка у стилі wastemanaged — м’яка тінь, заокруглення */
export function Surface({
  children,
  hover = false,
  variant = "default",
  ...props
}: BoxProps & { hover?: boolean; variant?: SurfaceVariant }) {
  const accentBar =
    variant === "accentTop"
      ? {
          position: "relative" as const,
          overflow: "hidden",
          _before: {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            h: "4px",
            bg: "linear-gradient(90deg, brand.500 0%, accent.500 100%)",
          },
        }
      : {};

  return (
    <Box
      bg={variant === "soft" ? "elevated" : "surface"}
      rounded="card"
      shadow="card"
      borderWidth={variant === "soft" ? "1px" : undefined}
      borderColor={variant === "soft" ? "brand.50" : undefined}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      {...accentBar}
      {...(hover
        ? {
            _hover: {
              shadow: "cardHover",
              transform: "translateY(-6px)",
            },
          }
        : {})}
      {...props}
    >
      {children}
    </Box>
  );
}
