"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "@chakra-ui/react";
import { LeadForm } from "@/components/forms/LeadForm";
import { usePastHero } from "@/hooks/usePastHero";

export type LeadModalOptions = {
  service?: string;
  calculatorTotal?: number;
};

type LeadModalContextValue = {
  openLeadModal: (options?: LeadModalOptions) => void;
  closeLeadModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function isLeadModalHref(href?: string) {
  if (!href) return false;
  return href === "#contact" || href === "/#contact" || href.endsWith("#contact");
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelMotion = {
  initial: { opacity: 0, y: 72, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 48, scale: 0.98 },
};

const panelTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const pastHero = usePastHero();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<LeadModalOptions>({});

  const openLeadModal = useCallback((opts?: LeadModalOptions) => {
    setOptions(opts ?? {});
    setOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLeadModal();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeLeadModal]);

  const value = useMemo(
    () => ({ openLeadModal, closeLeadModal }),
    [openLeadModal, closeLeadModal]
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}

      <button
        type="button"
        onClick={() => openLeadModal()}
        className={`lead-fab${pastHero ? " is-visible" : ""}`}
        aria-label="Обговорити замовлення"
        aria-hidden={!pastHero}
        tabIndex={pastHero ? 0 : -1}
      >
        <span className="lead-fab-text">
          <span>Обговорити</span>
          <span>замовлення</span>
        </span>
      </button>

      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              key="lead-modal-overlay"
              className="lead-modal-overlay"
              {...overlayMotion}
              transition={{ duration: 0.35 }}
              onClick={closeLeadModal}
            >
              <motion.div
                key="lead-modal-panel"
                className="lead-modal-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="lead-modal-title"
                {...panelMotion}
                transition={panelTransition}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lead-modal-close"
                  onClick={closeLeadModal}
                  aria-label="Закрити"
                >
                  ×
                </button>

                <h2 id="lead-modal-title" className="lead-modal-title">
                  Зворотний дзвінок
                </h2>

                <LeadForm
                  key={`${open}-${options.service ?? ""}-${options.calculatorTotal ?? ""}`}
                  variant="modal"
                  defaultService={options.service ?? ""}
                  calculatorTotal={options.calculatorTotal}
                  onSuccess={closeLeadModal}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </LeadModalContext.Provider>
  );
}
