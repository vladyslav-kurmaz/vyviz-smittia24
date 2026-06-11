import Link from "next/link";
import { Box, Container, Grid, Text, Heading, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { SERVICES } from "@/lib/services";
import { FOOTER_CITIES, citySeoPath } from "@/lib/cities";
import {
  PHONE_MAIN,
  PHONE_MAIN_DISPLAY,
  PHONE_CALLS_ONLY,
  PHONE_CALLS_ONLY_DISPLAY,
  SITE_NAME,
} from "@/lib/contacts";
import { MessengerButtons } from "@/components/ui/MessengerButtons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" bg="elevated" py={16}>
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={12}>
          <Box>
            <Logo />
            <Text mt={4} fontSize="sm" color="ink" lineHeight="relaxed" opacity={0.72}>
              Вивіз сміття, обрізання дерев, косіння трави та розчистка територій у
              Києві та області. 5 років на ринку.
            </Text>
            <Text mt={2} fontSize="sm" fontWeight="medium" color="brand.500">
              Без вихідних
            </Text>
          </Box>

          <Box>
            <Heading size="sm" mb={4} color="ink">
              Послуги
            </Heading>
            <Box as="ul" listStyleType="none" m={0} p={0}>
              {SERVICES.slice(0, 8).map((s) => (
                <Box as="li" key={s.slug} mb={2}>
                  <Link href={`/${s.seoPath}`}>
                    <Box
                      as="span"
                      fontSize="sm"
                      color="ink"
                      opacity={0.72}
                      _hover={{ color: "accent.600", opacity: 1 }}
                    >
                      {s.name}
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Heading size="sm" mb={4} color="ink">
              Область
            </Heading>
            <Box
              as="ul"
              listStyleType="none"
              m={0}
              p={0}
              columnCount={{ base: 1, sm: 2 }}
              columnGap={4}
            >
              {FOOTER_CITIES.map((city) => (
                <Box as="li" key={city.slug} mb={2} breakInside="avoid">
                  <Link href={`/${citySeoPath(city.slug)}`}>
                    <Box
                      as="span"
                      fontSize="sm"
                      color="ink"
                      opacity={0.72}
                      _hover={{ color: "accent.600", opacity: 1 }}
                    >
                      {city.name}
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Heading size="sm" mb={4} color="ink">
              Контакти
            </Heading>
            <Flex direction="column" gap={2} fontSize="sm">
              <ChakraLink
                href={`tel:${PHONE_MAIN}`}
                display="block"
                fontWeight="bold"
                color="ink"
              >
                {PHONE_MAIN_DISPLAY}
              </ChakraLink>
              <ChakraLink
                href={`tel:${PHONE_CALLS_ONLY}`}
                display="block"
                fontWeight="bold"
                color="ink"
              >
                {PHONE_CALLS_ONLY_DISPLAY}
              </ChakraLink>
            </Flex>
            <MessengerButtons size="sm" className="mt-4" />
          </Box>
        </Grid>

        <Flex
          mt={12}
          pt={8}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
          fontSize="sm"
          color="ink"
          opacity={0.72}
        >
          <Text>© {year} {SITE_NAME}. Усі права захищені.</Text>
          <Link href="/privacy">
            <Box as="span" _hover={{ color: "accent.600", opacity: 1 }}>
              Політика конфіденційності
            </Box>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
