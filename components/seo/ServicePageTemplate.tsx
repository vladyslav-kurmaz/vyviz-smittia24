import Link from "next/link";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingMessengers } from "@/components/layout/FloatingMessengers";
import { SeoHero } from "@/components/seo/SeoHero";
import { SeoFaq } from "@/components/seo/SeoFaq";
import { Services } from "@/components/sections/Services";
import { FleetPricing } from "@/components/sections/FleetPricing";
import { PriceFormation } from "@/components/sections/PriceFormation";
import { Benefits } from "@/components/sections/Benefits";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Section } from "@/components/chakra/Section";
import type { Service } from "@/lib/services";
import type { CityPage } from "@/lib/cities";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServicePageContent } from "@/lib/service-pages";
import { getCityPageContent } from "@/lib/city-pages";
import { cityJsonLd, serviceJsonLd } from "@/lib/schema-jsonld";

type Props =
  | { type: "service"; data: Service }
  | { type: "city"; data: CityPage };

export function ServicePageTemplate({ type, data }: Props) {
  const isService = type === "service";
  const serviceContent = isService
    ? getServicePageContent(data as Service)
    : null;
  const cityContent = !isService ? getCityPageContent(data as CityPage) : null;
  const content = serviceContent ?? cityContent!;

  const breadcrumbLabel = isService
    ? (data as Service).name
    : `Вивіз сміття ${(data as CityPage).name}`;

  const eyebrow = isService
    ? "Послуга"
    : (data as CityPage).name;

  const jsonLd = isService
    ? serviceJsonLd(data as Service, content.faq)
    : cityJsonLd(data as CityPage, content.faq);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <Box as="main">
        <SeoHero
          eyebrow={eyebrow}
          title={content.heroTitle}
          subtitle={content.heroSubtitle}
          images={content.heroImages}
          primaryCta={{ label: "Передзвоніть мені", href: "#contact" }}
          secondaryCta={{ label: "Докладніше", href: "#services" }}
        />

        <Section tone="cream" pt={{ base: 8, md: 10 }} pb={{ base: 10, md: 12 }}>
          <Container maxW="3xl" px={{ base: 4, md: 6 }}>
            <Flex fontSize="sm" color="muted" mb={6} gap={2} flexWrap="wrap" align="center">
              <Link href="/">
                <Text as="span" _hover={{ color: "accent.500" }}>
                  Головна
                </Text>
              </Link>
              <Text as="span">/</Text>
              <Text as="span" color="ink">
                {breadcrumbLabel}
              </Text>
            </Flex>

            {content.paragraphs.map((p) => (
              <Text key={p.slice(0, 48)} mb={5} fontSize="md" color="muted" lineHeight="relaxed">
                {p}
              </Text>
            ))}

            {cityContent && (
              <Box mt={8}>
                <Heading as="h2" size="md" color="brand.600" mb={4}>
                  Що вивозимо {(data as CityPage).locative}
                </Heading>
                <Box as="ul" listStyleType="none" m={0} p={0}>
                  {cityContent.whatWeTake.map((item) => (
                    <Flex key={item} as="li" gap={3} mb={3} align="flex-start">
                      <Text color="accent.500" fontWeight="bold" aria-hidden>
                        —
                      </Text>
                      <Text fontSize="sm" color="muted" lineHeight="relaxed" flex={1}>
                        {item}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            )}

            {serviceContent && serviceContent.bullets.length > 0 && (
              <Box mt={8}>
                <Heading as="h2" size="md" color="brand.600" mb={4}>
                  Що входить у послугу
                </Heading>
                <Box as="ul" listStyleType="none" m={0} p={0}>
                  {serviceContent.bullets.map((item) => (
                    <Flex key={item} as="li" gap={3} mb={3} align="flex-start">
                      <Text color="accent.500" fontWeight="bold" aria-hidden>
                        —
                      </Text>
                      <Text fontSize="sm" color="muted" lineHeight="relaxed" flex={1}>
                        {item}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            )}
          </Container>
        </Section>

        <Services showTrustStrip={false} />
        <Benefits />
        <FleetPricing />
        <PriceFormation />
        <SeoFaq items={content.faq} />
        <FinalCTA />
      </Box>
      <Footer />
      <FloatingMessengers />
    </>
  );
}
