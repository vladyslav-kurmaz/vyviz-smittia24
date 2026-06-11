"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import {
  HERO_BG,
  HERO_BG_MOBILE,
  HERO_POSTER,
  HERO_VIDEO,
} from "@/lib/hero";
import { scheduleHeroVideoLoad } from "@/lib/hero-video";
import { DESKTOP_MEDIA } from "@/lib/viewport";

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
  }, [ensurePlay, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
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
  const [desktopVideoOk, setDesktopVideoOk] = useState(true);
  const [loadDesktopVideo, setLoadDesktopVideo] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(DESKTOP_MEDIA);
    const update = () => {
      setReduceMotion(motion.matches);
      setIsDesktop(desktop.matches);
    };
    update();
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  const showDesktopVideo = isDesktop && !reduceMotion && desktopVideoOk;

  useEffect(() => {
    if (!showDesktopVideo) {
      setLoadDesktopVideo(false);
      return;
    }
    return scheduleHeroVideoLoad(() => setLoadDesktopVideo(true));
  }, [showDesktopVideo]);

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
            unoptimized
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>

        <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            quality={60}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {showDesktopVideo && loadDesktopVideo && (
            <Box position="absolute" inset={0}>
              <HeroBackgroundVideo
                src={HERO_VIDEO}
                poster={HERO_POSTER}
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
          <div className="hero-enter">
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
          </div>

          <div className="hero-enter hero-enter-delay-1">
            <Heading
              as="h1"
              fontSize={{ base: "2rem", sm: "2.5rem", md: "3.25rem", lg: "3.75rem" }}
              fontWeight="extrabold"
              lineHeight="1.1"
              letterSpacing="-0.03em"
              color="white"
              textShadow="0 2px 20px rgba(0,0,0,0.45)"
              textWrap="balance"
            >
              Вивіз будь-якого сміття по всій Київській області
            </Heading>
          </div>

          <div className="hero-enter hero-enter-delay-2">
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
          </div>

          <div className="hero-enter hero-enter-delay-3">
            <Flex mt={8} gap={4} flexWrap="wrap">
              <Button href="#contact" variant="primary">
                Передзвоніть мені
              </Button>
              <Button href="#services" variant="secondary" onDark>
                Докладніше
              </Button>
            </Flex>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
