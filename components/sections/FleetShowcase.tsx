"use client";

import Image from "next/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { FLEET_VEHICLES, formatFleetPrice, type FleetVehicle } from "@/lib/fleet";

function FleetRow({ vehicle, index }: { vehicle: FleetVehicle; index: number }) {
  const reduceMotion = useReducedMotion();
  const hasDimensions = vehicle.dimensions && vehicle.dimensions !== "—";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 52%) minmax(0, 1fr)" }}
        gap={{ base: 5, md: 8, lg: 12 }}
        alignItems="center"
        py={{ base: 6, md: 8 }}
        _first={{ pt: 0 }}
      >
        <Box
          position="relative"
          w="full"
          maxW={{ lg: "520px" }}
          aspectRatio={{ base: "16 / 10", lg: "4 / 3" }}
          rounded="card"
          overflow="hidden"
          bg="brand.50"
          shadow="card"
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>

        <Stack
          gap={3}
          align="flex-start"
          textAlign="left"
          pl={{ base: 0, lg: 6, xl: 10 }}
          pr={{ lg: 2 }}
        >
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="ink"
            lineHeight="shorter"
            letterSpacing="-0.02em"
          >
            {vehicle.name}
          </Heading>

          <Box
            w={{ base: "72px", md: "96px" }}
            h="2px"
            bg="accent.500"
            rounded="full"
            aria-hidden
          />

          {hasDimensions && (
            <Box>
              <Text fontSize="sm" color="muted" lineHeight="relaxed">
                розміри:
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color="ink" lineHeight="relaxed" mt={0.5}>
                {vehicle.dimensions}
              </Text>
            </Box>
          )}

          {vehicle.volume && vehicle.volume !== "—" && (
            <Box>
              <Text fontSize="sm" color="muted" lineHeight="relaxed">
                обʼєм:
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                color="brand.600"
                lineHeight="relaxed"
                mt={0.5}
              >
                {vehicle.volume}
              </Text>
            </Box>
          )}

          <Heading
            as="p"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="accent.600"
            lineHeight="shorter"
            mt={1}
          >
            {formatFleetPrice(vehicle)}
          </Heading>

          {vehicle.priceNote && (
            <Text fontSize="sm" color="muted" lineHeight="relaxed" maxW="md">
              {vehicle.priceNote}
            </Text>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
}

export function FleetShowcase() {
  return (
    <Stack gap={0} maxW="7xl" mx="auto" w="full">
      {FLEET_VEHICLES.map((vehicle, index) => (
        <FleetRow key={vehicle.id} vehicle={vehicle} index={index} />
      ))}
    </Stack>
  );
}
