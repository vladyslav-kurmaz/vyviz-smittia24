"use client";

import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";
import { SITE_NAME } from "@/lib/contacts";

type Props = {
  /** Шапка — світлий текст на зеленому фоні */
  light?: boolean;
};

export function Logo({ light = false }: Props) {
  const lineColor = light ? "white" : "ink";

  return (
    <Link href="/" aria-label={SITE_NAME}>
      <Flex align="center" gap={0} lineHeight={1}>
        <Flex
          direction="column"
          justify="center"
          gap={{ base: "2px", md: "3px" }}
          fontWeight="800"
          letterSpacing="0.06em"
          textTransform="uppercase"
        >
          <Text
            fontSize={{ base: "11px", md: "12px" }}
            color={lineColor}
            whiteSpace="nowrap"
          >
            Вивіз
          </Text>
          <Text
            fontSize={{ base: "11px", md: "12px" }}
            color={lineColor}
            whiteSpace="nowrap"
          >
            Сміття
          </Text>
        </Flex>
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          fontWeight="800"
          color="accent.500"
          letterSpacing="0"
          lineHeight={1}
          alignSelf="center"
          ml={0}
        >
          24
        </Text>
      </Flex>
    </Link>
  );
}
