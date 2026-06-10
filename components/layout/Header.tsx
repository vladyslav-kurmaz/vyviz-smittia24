"use client";

import { useState } from "react";
import { Box, Flex, Container, Link as ChakraLink, chakra } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { MessengerButtons } from "@/components/ui/MessengerButtons";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "@/lib/navigation";
import { PHONE_MAIN, PHONE_MAIN_DISPLAY } from "@/lib/contacts";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Box
        as="header"
        position="fixed"
        insetX={0}
        top={0}
        zIndex={50}
        shadow="sm"
        css={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(42, 74, 47, 0.94)",
        }}
      >
        <Container maxW="7xl" px={{ base: 4, md: 6 }} py={3}>
          <Flex align="center" justify="space-between" gap={4}>
            <Logo light />

            <Flex as="nav" display={{ base: "none", lg: "flex" }} gap={8} aria-label="Головна">
              {NAV_LINKS.map((link) => (
                <ChakraLink
                  key={link.href}
                  href={link.href}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="whiteAlpha.900"
                  _hover={{ color: "white" }}
                  transition="color 0.2s"
                >
                  {link.label}
                </ChakraLink>
              ))}
            </Flex>

            <Flex display={{ base: "none", lg: "flex" }} align="center" gap={4}>
              <ChakraLink
                href={`tel:${PHONE_MAIN}`}
                fontSize="md"
                fontWeight="bold"
                color="white"
                whiteSpace="nowrap"
                data-event="call_click"
              >
                {PHONE_MAIN_DISPLAY}
              </ChakraLink>
              <MessengerButtons size="sm" tone="onDark" />
              <Button href="#contact" variant="primary" size="md">
                Замовити
              </Button>
            </Flex>

            <Flex display={{ base: "flex", lg: "none" }} align="center" gap={2}>
              <Button
                href="#contact"
                variant="primary"
                size="sm"
                aria-label="Обговорити замовлення"
              >
                Обговорити
              </Button>
              <chakra.button
                type="button"
                p={2}
                color="white"
                aria-label="Відкрити меню"
                onClick={() => setMenuOpen(true)}
                bg="transparent"
                border="none"
                cursor="pointer"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </chakra.button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
