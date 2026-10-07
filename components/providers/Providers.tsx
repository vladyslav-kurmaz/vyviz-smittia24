"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme/system";
import { PastHeroProvider } from "@/hooks/usePastHero";
import { LeadModalProvider } from "./LeadModalProvider";
import { SmoothScroll } from "./SmoothScroll";
import { UtmCapture } from "./UtmCapture";
import { ConversionTracking } from "./ConversionTracking";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <SmoothScroll>
        <UtmCapture />
        <ConversionTracking />
        <PastHeroProvider>
          <LeadModalProvider>{children}</LeadModalProvider>
        </PastHeroProvider>
      </SmoothScroll>
    </ChakraProvider>
  );
}
