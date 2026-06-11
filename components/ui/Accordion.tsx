"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Surface } from "@/components/chakra/Surface";

type Item = { question: string; answer: string };

const panelTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Surface key={item.question} overflow="hidden" p={0} hover={false}>
            <button
              type="button"
              style={{ width: "100%", minHeight: "44px" }}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <Flex
                align="center"
                justify="space-between"
                gap={4}
                px={6}
                py={4}
                minH="44px"
                textAlign="left"
                fontWeight="semibold"
                color="ink"
              >
                {item.question}
                <Text
                  as="span"
                  color="accent.500"
                  fontSize="xl"
                  lineHeight={1}
                  display="inline-block"
                  transition="transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)"
                  transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
                  aria-hidden
                >
                  +
                </Text>
              </Flex>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={panelTransition}
                  style={{ overflow: "hidden" }}
                >
                  <Box px={6} pb={5} pt={0}>
                    <Text color="muted" lineHeight="relaxed">
                      {item.answer}
                    </Text>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Surface>
        );
      })}
    </Box>
  );
}
