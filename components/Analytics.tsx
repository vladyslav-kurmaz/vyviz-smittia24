import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/ads";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Один Google-тег (gtag.js) на всі призначення: Google Ads (AW-…) і,
  // якщо задано, GA4 (G-…). Тег лише у production, щоб локальна розробка та
  // тестові запуски не засмічували дані кабінету.
  const googleIds = [GOOGLE_ADS_ID, gaId].filter(Boolean) as string[];
  const enableGoogleTag =
    googleIds.length > 0 && process.env.NODE_ENV === "production";

  return (
    <>
      {enableGoogleTag && (
        <>
          {/* Дрібний inline-ініціалізатор: ставить dataLayer/gtag, тож події
              (кліки, форма) можна надсилати ще до завантаження бібліотеки. */}
          <Script id="google-tag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){dataLayer.push(arguments);};
              gtag('js', new Date());
              ${googleIds.map((id) => `gtag('config', '${id}');`).join("\n              ")}
            `}
          </Script>
          {/* Важка бібліотека — після load + idle, поза критичним шляхом LCP. */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`}
            strategy="lazyOnload"
          />
        </>
      )}
      {pixelId && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
