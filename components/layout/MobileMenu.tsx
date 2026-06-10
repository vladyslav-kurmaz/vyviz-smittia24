"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/navigation";
import { PHONE_MAIN, PHONE_MAIN_DISPLAY } from "@/lib/contacts";
import { MessengerButtons } from "@/components/ui/MessengerButtons";
import { Button } from "@/components/ui/Button";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-[min(100%,320px)] flex-col bg-surface p-6 shadow-2xl lg:hidden"
            aria-label="Мобільне меню"
          >
            <button
              type="button"
              className="mb-8 self-end text-2xl text-muted"
              onClick={onClose}
              aria-label="Закрити"
            >
              ×
            </button>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-lg font-semibold text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${PHONE_MAIN}`}
                className="block text-xl font-bold"
                data-event="call_click"
              >
                {PHONE_MAIN_DISPLAY}
              </a>
              <MessengerButtons />
              <Button href="#contact" fullWidth size="md" onClick={onClose}>
                Залишити заявку
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
