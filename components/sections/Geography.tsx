"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Flex, Grid, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Surface } from "@/components/chakra/Surface";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  GEOGRAPHY_MAP_ALT,
  GEOGRAPHY_MAP_IMAGE,
  KYIV_DISTRICTS,
  KYIV_OBLAST_LOCATIONS,
} from "@/lib/geography";

function LocationBadge({ children }: { children: string }) {
  return (
    <Box
      px={3}
      py={1.5}
      rounded="pill"
      bg="brand.50"
      color="brand.700"
      fontSize="sm"
      fontWeight="medium"
      lineHeight="short"
      borderWidth="1px"
      borderColor="brand.100"
    >
      {children}
    </Box>
  );
}

function ServiceAreaMap() {
  const [failed, setFailed] = useState(false);

  return (
    <Surface overflow="hidden" p={0} hover={false}>
      <Box
        position="relative"
        w="full"
        aspectRatio={{ base: "16 / 10", lg: "4 / 3" }}
        bg="brand.50"
        overflow="hidden"
        css={{
          "& img": {
            objectFit: "cover",
            objectPosition: "center",
          },
        }}
      >
        {failed ? (
          <ImagePlaceholder
            label="Додайте service-area-map.webp у public/images/geography/"
            aspect="video"
            rounded="none"
          />
        ) : (
          <Image
            src={GEOGRAPHY_MAP_IMAGE}
            alt={GEOGRAPHY_MAP_ALT}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
            onError={() => setFailed(true)}
          />
        )}
      </Box>
    </Surface>
  );
}

export function Geography() {
  return (
    <Section id="geography" tone="cream">
      <SectionHeader
        eyebrow="Географія"
        title="Де ми працюємо"
        subtitle="Київ усіма районами та Київська область — міста, селища, села й садові товариства."
        align="center"
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 8, lg: 10 }}
        alignItems="start"
        maxW="6xl"
        mx="auto"
      >
        <ServiceAreaMap />

        <Flex direction="column" gap={8}>
          <Box>
            <Heading as="h3" size="sm" mb={4} color="brand.600">
              Київ — усі райони
            </Heading>
            <Wrap gap={2} display={{ base: "none", lg: "flex" }}>
              {KYIV_DISTRICTS.map((district) => (
                <WrapItem key={district}>
                  <LocationBadge>{district}</LocationBadge>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

          <Box>
            <Heading as="h3" size="sm" mb={4} color="brand.600">
              Київська область
            </Heading>
            <Wrap gap={2}>
              {KYIV_OBLAST_LOCATIONS.map((place) => (
                <WrapItem key={place}>
                  <LocationBadge>{place}</LocationBadge>
                </WrapItem>
              ))}
            </Wrap>
            <Text mt={4} fontSize="sm" color="muted" lineHeight="relaxed">
              Також виїжджаємо в інші населені пункти області — уточнюйте за телефоном.
            </Text>
          </Box>
        </Flex>
      </Grid>
    </Section>
  );
}
