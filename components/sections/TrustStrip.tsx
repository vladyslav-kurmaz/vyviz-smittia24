"use client";

import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { Surface } from "@/components/chakra/Surface";
import { VEHICLE_ARRIVAL_SHORT } from "@/lib/contacts";

const STATS = [
  { value: VEHICLE_ARRIVAL_SHORT, label: "подача авто, залежить від локації" },
  { value: "24/7", label: "приймаємо заявки" },
  { value: "від 800 ₴", label: "подача буса" },
  { value: "100%", label: "легальна утилізація" },
];

export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { y: 32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      aria-label="Переваги сервісу"
    >
      <Surface
        p={{ base: 5, md: 8 }}
        shadow="cardHover"
        borderWidth="1px"
        borderColor="brand.100"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          h: "4px",
          bg: "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
        }}
      >
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: 5, md: 8 }}>
          {STATS.map((s) => (
            <Box key={s.label} textAlign={{ base: "center", lg: "left" }}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="extrabold"
                color="brand.600"
                lineHeight="shorter"
              >
                {s.value}
              </Text>
              <Text mt={1} fontSize="xs" color="muted" lineHeight="short">
                {s.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Surface>
    </motion.div>
  );
}
