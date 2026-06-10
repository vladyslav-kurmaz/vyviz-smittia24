import Image from "next/image";
import { Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Surface } from "@/components/chakra/Surface";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FEATURED_SERVICES } from "@/lib/featured-services";

function ServicePanelContent({
  title,
  image,
  seoPath,
  points,
}: {
  title: string;
  image: string;
  seoPath: string;
  points: string[];
}) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }}>
      <Box
        p={{ base: 6, md: 10, lg: 12 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        order={{ base: 2, lg: 1 }}
      >
        <Heading as="h3" size="xl" color="ink" mb={5} lineHeight="shorter">
          {title}
        </Heading>
        <Box as="ul" listStyleType="none" m={0} p={0}>
          {points.map((p) => (
            <Flex key={p} as="li" gap={3} mb={3.5} align="flex-start">
              <Text color="accent.500" fontWeight="bold" lineHeight="relaxed" aria-hidden>
                —
              </Text>
              <Text fontSize="sm" color="muted" lineHeight="relaxed" flex={1}>
                {p}
              </Text>
            </Flex>
          ))}
        </Box>
        <Box mt={8}>
          <Button href={`/${seoPath}`} size="md">
            Детальніше
          </Button>
        </Box>
      </Box>
      <Box
        position="relative"
        w="full"
        h={{ base: "280px", sm: "320px", lg: "420px" }}
        minH={{ base: "280px", lg: "420px" }}
        order={{ base: 1, lg: 2 }}
        overflow="hidden"
        bg="brand.100"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
      </Box>
    </SimpleGrid>
  );
}

type ServicesProps = {
  /** На головній — смуга статистики над блоком */
  showTrustStrip?: boolean;
};

export function Services({ showTrustStrip = true }: ServicesProps) {

  return (
    <Section
      id="services"
      tone="elevated"
      position="relative"
      zIndex={5}
      pt={showTrustStrip ? 0 : { base: 12, md: 16 }}
      pb={{ base: 12, md: 16 }}
    >
      {showTrustStrip && (
        <Box position="relative" h={0} zIndex={2}>
          <Box
            position="absolute"
            top={{ base: "-108px", md: "-124px" }}
            left={0}
            right={0}
            zIndex={10}
          >
            <TrustStrip />
          </Box>
        </Box>
      )}

      <Box pt={showTrustStrip ? { base: 16, md: 20 } : 0}>
        <SectionHeader
          eyebrow="Послуги"
          title="Будь-яке сміття вивеземо швидко і без клопотів"
          subtitle="Оберіть тип сміття — покажемо, що входить у послугу"
          align="center"
        />

        <div className="services-switcher">
        {FEATURED_SERVICES.map((service, index) => (
          <input
            key={service.id}
            type="radio"
            name="featured-service"
            id={`svc-radio-${service.id}`}
            defaultChecked={index === 0}
            className="services-radio"
          />
        ))}

        <div className="service-tablist" role="tablist" aria-label="Види послуг">
          {FEATURED_SERVICES.map((service) => (
            <label
              key={service.id}
              htmlFor={`svc-radio-${service.id}`}
              className="service-tab-label"
            >
              {service.tab}
            </label>
          ))}
        </div>

        <Surface p={0} overflow="hidden" hover={false} className="service-panels" rounded="card">
          {FEATURED_SERVICES.map((service) => (
            <div
              key={service.id}
              className={`service-panel service-panel-${service.id}`}
              role="tabpanel"
            >
              <ServicePanelContent
                title={service.title}
                image={service.image}
                seoPath={service.seoPath}
                points={service.points}
              />
            </div>
          ))}
        </Surface>
        </div>
      </Box>
    </Section>
  );
}
