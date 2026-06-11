import { HERO_BG, HERO_BG_MOBILE } from "@/lib/hero";
import { HeroActions } from "@/components/sections/HeroActions";
import { HeroVideoLayer } from "@/components/sections/HeroVideoLayer";

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-media" aria-hidden>
        <div className="hero-media__mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG_MOBILE}
            alt=""
            className="hero-media__img"
            width={360}
            height={477}
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <div className="hero-media__desktop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG}
            alt=""
            className="hero-media__img"
            width={1280}
            height={960}
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <HeroVideoLayer />
        <div className="hero-media__scrim" />
        <div className="hero-media__gradient" />
      </div>

      <div className="hero-content">
        <div className="hero-content__inner">
          <span className="hero-eyebrow hero-enter">Київ та область</span>

          <h1 className="hero-title">
            Вивіз будь-якого сміття по всій Київській області
          </h1>

          <p className="hero-lead hero-enter hero-enter-delay-1">
            Вивозимо будівельне, побутове та великогабаритне сміття. Приїжджаємо
            вчасно, допомагаємо із завантаженням та залишаємо після себе порядок.
          </p>

          <div className="hero-enter hero-enter-delay-2">
            <HeroActions />
          </div>
        </div>
      </div>
    </section>
  );
}
