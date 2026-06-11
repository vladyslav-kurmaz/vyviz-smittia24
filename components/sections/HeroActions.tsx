"use client";

import { Button } from "@/components/ui/Button";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <Button href="#contact" variant="primary">
        Передзвоніть мені
      </Button>
      <Button href="#services" variant="secondary" onDark>
        Докладніше
      </Button>
    </div>
  );
}
