import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";
import { Analytics } from "@/components/Analytics";
import { Providers } from "@/components/providers/Providers";
import { HERO_BG, HERO_BG_MOBILE } from "@/lib/hero";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Два preload з media — відповідає <picture> у Hero.tsx: кожен
            пристрій підвантажує заздалегідь лише те зображення, яке
            реально покаже (раніше desktop-версія теж завжди
            завантажувала мобільний постер). */}
        <link
          rel="preload"
          as="image"
          href={HERO_BG_MOBILE}
          fetchPriority="high"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href={HERO_BG}
          fetchPriority="high"
          media="(min-width: 768px)"
        />
      </head>
      <body
        className={`${inter.variable} ${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
