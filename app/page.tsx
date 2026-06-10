import { JsonLd } from "@/components/seo/JsonLd";
import { homeJsonLd } from "@/lib/schema-jsonld";
import { FAQ_ITEMS } from "@/lib/faq";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingMessengers } from "@/components/layout/FloatingMessengers";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { FleetPricing } from "@/components/sections/FleetPricing";
import { PriceFormation } from "@/components/sections/PriceFormation";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Geography } from "@/components/sections/Geography";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

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
