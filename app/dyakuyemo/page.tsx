import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThankYouContent } from "@/components/pages/ThankYouContent";

export const metadata: Metadata = {
  title: { absolute: "Дякуємо за звернення" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <ThankYouContent />
      </main>
      <Footer />
    </>
  );
}
