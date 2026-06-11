import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeJsonLd } from "@/lib/schema-jsonld";
import { FAQ_ITEMS } from "@/lib/faq";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingMessengers } from "@/components/layout/FloatingMessengers";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";

const FleetPricing = dynamic(
  () => import("@/components/sections/FleetPricing").then((m) => m.FleetPricing),
  { loading: () => null },
);
const PriceFormation = dynamic(
  () => import("@/components/sections/PriceFormation").then((m) => m.PriceFormation),
  { loading: () => null },
);
const Gallery = dynamic(
  () => import("@/components/sections/Gallery").then((m) => m.Gallery),
  { loading: () => null },
);
const BeforeAfter = dynamic(
  () => import("@/components/sections/BeforeAfter").then((m) => m.BeforeAfter),
  { loading: () => null },
);
const Geography = dynamic(
  () => import("@/components/sections/Geography").then((m) => m.Geography),
  { loading: () => null },
);
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ), {
  loading: () => null,
});
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { loading: () => null },
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd(FAQ_ITEMS)} />
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <FleetPricing />
        <PriceFormation />
        <Gallery />
        <BeforeAfter />
        <Geography />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingMessengers />
    </>
  );
}
