"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_POSTER, HERO_VIDEO } from "@/lib/hero";
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
      className="hero-media__video"
    />
  );
}

export function HeroVideoLayer() {
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

  if (!showDesktopVideo || !loadDesktopVideo) return null;

  return (
    <HeroBackgroundVideo
      src={HERO_VIDEO}
      poster={HERO_POSTER}
      onFallback={() => setDesktopVideoOk(false)}
    />
  );
}
