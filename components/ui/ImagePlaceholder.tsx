"use client";

import { Text, Flex } from "@chakra-ui/react";

type Props = {
  label?: string;
  aspect?: "video" | "square";
  rounded?: string;
};

export function ImagePlaceholder({
  label = "Фото буде додано",
  aspect = "video",
  rounded = "card",
}: Props) {
  const aspectRatio = aspect === "video" ? 16 / 9 : 1;

  return (
    <Flex
      aspectRatio={aspectRatio}
      w="full"
      direction="column"
      align="center"
      justify="center"
      rounded={rounded}
      bg="elevated"
      color="muted"
      role="img"
      aria-label={label}
    >
      <svg
        width={48}
        height={48}
        viewBox="0 0 24 24"
        style={{ marginBottom: 12, opacity: 0.35, color: "#355E3B" }}
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <Text fontSize="sm" fontWeight="medium" px={4} textAlign="center">
        {label}
      </Text>
    </Flex>
  );
}
