import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PHONE_MAIN_DISPLAY } from "@/lib/contacts";
import { privacyPageMetadata } from "@/lib/metadata";

export const metadata = privacyPageMetadata();

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-32 md:px-6 prose prose-neutral">
        <h1 className="text-3xl font-bold">Політика конфіденційності</h1>
        <p className="mt-6 text-muted leading-relaxed">
          Ми збираємо лише дані, які ви надаєте через форму заявки: ім&apos;я,
          номер телефону, коментар, фото об&apos;єкта (за бажанням).
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Мета обробки — зв&apos;язатися з вами, оцінити обсяг робіт і виконати
          замовлення на вивіз сміття та суміжні послуги.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Дані не передаються третім особам, окрім каналів зв&apos;язку
          (телефон, месенджери, email менеджера) для обробки вашої заявки.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Надсилаючи форму, ви погоджуєтесь на обробку персональних даних.
        </p>
        <p className="mt-8">
          Питання:{" "}
          <a href="tel:+380964004141" className="font-semibold text-accent">
            {PHONE_MAIN_DISPLAY}
          </a>
        </p>
        <Link href="/" className="mt-8 inline-block text-accent hover:underline">
          ← На головну
        </Link>
      </main>
      <Footer />
    </>
  );
}
