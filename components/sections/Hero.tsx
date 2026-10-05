import { HERO_BG, HERO_BG_MOBILE } from "@/lib/hero";
import { HeroActions } from "@/components/sections/HeroActions";
import { HeroVideoLayer } from "@/components/sections/HeroVideoLayer";

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-media" aria-hidden>
        {/* <picture> — браузер завантажує лише те джерело, що відповідає
            viewport, а не обидва одразу (як було раніше з двома <img>,
            прихованими через CSS display:none — приховане зображення все
            одно вантажилось). На мобільному це прибирає зайве
            завантаження десктопної картинки (138 КБ) з тим самим
            найвищим пріоритетом, що й потрібна mobile-версія. */}
        <picture className="hero-media__picture">
          <source media="(min-width: 768px)" srcSet={HERO_BG} />
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
        </picture>
        <HeroVideoLayer />
        <div className="hero-media__scrim" />
        <div className="hero-media__gradient" />
      </div>

      <div className="hero-content">
        <div className="hero-content__inner">
          {/* Жодних fade-in/opacity:0 на тексті першого екрана: абзац .hero-lead
              є LCP-елементом, і поки він стартував із opacity:0, LCP
              фіксувався лише після появи анімації (render delay ≈ 85% LCP). */}
          <span className="hero-eyebrow">Київ та область</span>

          <h1 className="hero-title">
            Вивіз будь-якого сміття по всій Київській області
          </h1>

          <p className="hero-lead">
            Вивозимо будівельне, побутове та великогабаритне сміття. Приїжджаємо
            вчасно, допомагаємо із завантаженням та залишаємо після себе порядок.
          </p>

          <div>
            <HeroActions />
          </div>
        </div>
      </div>
    </section>
  );
}
