"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  GALLERY_IMAGE_IDS,
  GALLERY_INITIAL_COUNT,
  getGalleryImagePath,
} from "@/lib/gallery";

function GalleryImage({
  id,
  priority,
  onReady,
}: {
  id: number;
  priority?: boolean;
  onReady?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const src = getGalleryImagePath(id);

  if (failed) {
    return <ImagePlaceholder label={`Фото ${id}`} />;
  }

  return (
    <Box position="relative" aspectRatio={4 / 3} w="full" bg="brand.50">
      <Image
        src={src}
        alt={`Наші роботи — фото ${id}`}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={60}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        onLoad={onReady}
        onError={() => {
          setFailed(true);
          onReady?.();
        }}
      />
    </Box>
  );
}

function measureCollapsedHeight(grid: HTMLElement, visibleCount: number): number {
  const items = Array.from(grid.children) as HTMLElement[];
  if (items.length === 0) return 0;
  const lastVisible = items[Math.min(visibleCount, items.length) - 1];
  const gridTop = grid.getBoundingClientRect().top;
  const bottom = lastVisible.getBoundingClientRect().bottom;
  return Math.ceil(bottom - gridTop);
}

export function Gallery() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [collapsedH, setCollapsedH] = useState(0);
  const [fullH, setFullH] = useState(0);

  const hasPhotos = GALLERY_IMAGE_IDS.length > 0;
  const hasMore = GALLERY_IMAGE_IDS.length > GALLERY_INITIAL_COUNT;

  const updateHeights = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    setFullH(grid.scrollHeight);
    setCollapsedH(measureCollapsedHeight(grid, GALLERY_INITIAL_COUNT));
  }, []);

  const scheduleUpdateHeights = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateHeights();
    });
  }, [updateHeights]);

  useLayoutEffect(() => {
    scheduleUpdateHeights();
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => scheduleUpdateHeights());
    ro.observe(grid);
    window.addEventListener("resize", scheduleUpdateHeights);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdateHeights);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleUpdateHeights]);

  const toggle = () => setExpanded((v) => !v);

  return (
    <Section id="gallery" tone="elevated">
      <SectionHeader
        eyebrow="Портфоліо"
        title="Наші роботи"
        subtitle="Реальні об'єкти, транспорт і команда"
        align="center"
      />

      {hasPhotos ? (
        <Box maxW="6xl" mx="auto">
          <Box
            overflow="hidden"
            transition={reduceMotion ? "none" : "max-height 0.55s ease"}
            maxH={
              expanded
                ? fullH > 0
                  ? `${fullH}px`
                  : undefined
                : collapsedH > 0
                  ? `${collapsedH}px`
                  : undefined
            }
          >
            <Box
              ref={gridRef}
              display="grid"
              gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }}
              gap={4}
            >
              {GALLERY_IMAGE_IDS.map((id, index) => (
                <Box key={id} overflow="hidden" rounded="card">
                  <GalleryImage
                    id={id}
                    priority={index < GALLERY_INITIAL_COUNT}
                    onReady={scheduleUpdateHeights}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {hasMore && (
            <Box mt={8} textAlign="center">
              <Button type="button" variant="primary" size="lg" onClick={toggle}>
                {expanded ? "Згорнути" : "Показати більше"}
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box maxW="6xl" mx="auto" textAlign="center">
          <Text fontSize="sm" color="muted" mb={6}>
            Додайте фото в папку{" "}
            <Box as="code" fontSize="xs" bg="cream" px={1.5} py={0.5} rounded="sm">
              public/images/gallery/
            </Box>{" "}
            (1.webp, 2.webp, …) — підключимо на сайті.
          </Text>
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }}
            gap={4}
          >
            {[1, 2, 3].map((n) => (
              <Box key={n} overflow="hidden" rounded="card" opacity={0.5}>
                <ImagePlaceholder label={`Робота ${n}`} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Section>
  );
}
