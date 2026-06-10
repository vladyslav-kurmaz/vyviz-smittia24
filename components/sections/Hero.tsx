"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import {
  HERO_BG,
  HERO_BG_MOBILE,
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
} from "@/lib/hero";

function HeroBackgroundVideo({
  src,
  poster,
  onFallback,
}: {
  src: string;
  poster: string;
  onFallback: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ensurePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;
    try {
      await video.play();
    } catch {
      onFallback();
    }
  }, [onFallback]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    void ensurePlay();

    const onEnded = () => {
      video.currentTime = 0;
      void video.play();
    };

    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [ensurePlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onError={onFallback}
      onLoadedData={() => void ensurePlay()}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [desktopVideoOk, setDesktopVideoOk] = useState(true);
  const [mobileVideoOk, setMobileVideoOk] = useState(true);
  const showDesktopVideo = !reduceMotion && desktopVideoOk;
  const showMobileVideo = !reduceMotion && mobileVideoOk;

  const slide = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { y: 20 },
          animate: { y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      h="100dvh"
      minH="100dvh"
      w="full"
      overflow="hidden"
      display="flex"
      alignItems="center"
      pt={{ base: 20, md: 24 }}
      pb={{ base: 12, md: 16 }}
    >
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        aria-hidden
        overflow="hidden"
        pointerEvents="none"
      >
        <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
          <Image
            src={HERO_BG_MOBILE}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {showMobileVideo && (
            <Box position="absolute" inset={0}>
              <HeroBackgroundVideo
                src={HERO_VIDEO_MOBILE}
                poster={HERO_BG_MOBILE}
                onFallback={() => setMobileVideoOk(false)}
              />
            </Box>
          )}
        </Box>
        <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {showDesktopVideo && (
            <Box position="absolute" inset={0}>
              <HeroBackgroundVideo
                src={HERO_VIDEO}
                poster={HERO_BG}
                onFallback={() => setDesktopVideoOk(false)}
              />
            </Box>
          )}
        </Box>
        <Box position="absolute" inset={0} bg="blackAlpha.400" />
        <Box
          position="absolute"
          inset={0}
          style={{
            background:
              "linear-gradient(105deg, rgba(35,61,40,0.85) 0%, rgba(35,61,40,0.5) 45%, rgba(35,61,40,0.25) 70%, transparent 100%)",
          }}
        />
      </Box>

      <Container
        maxW="7xl"
        position="relative"
        zIndex={2}
        px={{ base: 4, md: 6 }}
        w="full"
      >
        <Box maxW={{ base: "full", md: "2xl", lg: "3xl" }}>
          <motion.div {...slide(0)}>
            <Text
              display="inline-block"
              px={4}
              py={1.5}
              mb={5}
              rounded="full"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.12em"
              textTransform="uppercase"
              bg="whiteAlpha.200"
              color="white"
              borderWidth="1px"
              borderColor="whiteAlpha.400"
            >
              Київ та область
            </Text>
          </motion.div>

          <motion.div {...slide(0.08)}>
            <Heading
              as="h1"
              fontSize={{ base: "2.75rem", md: "3.5rem", lg: "4.25rem" }}
              fontWeight="extrabold"
              lineHeight="1.08"
              letterSpacing="-0.03em"
              color="white"
              textShadow="0 2px 20px rgba(0,0,0,0.45)"
            >
              Вивіз сміття швидко
              <Box as="span" display="block" color="#ffedd5" mt={1}>
                без зайвих клопотів
              </Box>
            </Heading>
          </motion.div>

          <motion.div {...slide(0.16)}>
            <Text
              mt={5}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              lineHeight="1.65"
              color="white"
              textShadow="0 1px 12px rgba(0,0,0,0.35)"
            >
              Вивозимо будівельне, побутове та великогабаритне сміття. Приїжджаємо
              вчасно, допомагаємо із завантаженням та залишаємо після себе порядок.
            </Text>
          </motion.div>

          <motion.div {...slide(0.24)}>
            <Flex mt={8} gap={4} flexWrap="wrap">
              <Button href="#contact" variant="primary">
                Передзвоніть мені
              </Button>
              <Button href="#services" variant="secondary" onDark>
                Докладніше
              </Button>
            </Flex>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
