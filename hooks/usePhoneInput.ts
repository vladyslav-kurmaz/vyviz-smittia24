"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  extractPhoneDigits,
  formatPhoneUA,
} from "@/lib/phone-ua";

export function usePhoneInput() {
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const display = formatPhoneUA(phoneDigits);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }, [display]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneDigits(extractPhoneDigits(e.target.value));
    setPhoneTouched(true);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setPhoneDigits((d) => d.slice(0, -1));
      setPhoneTouched(true);
      return;
    }
    if (e.key === "Delete") {
      e.preventDefault();
      setPhoneDigits((d) => d.slice(0, -1));
      setPhoneTouched(true);
      return;
    }
    if (e.key === "Tab" || e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") {
      return;
    }
    if (e.ctrlKey || e.metaKey) return;
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      setPhoneDigits((d) => (d.length < 10 ? d + e.key : d));
      setPhoneTouched(true);
      return;
    }
    e.preventDefault();
  }, []);

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhoneDigits(extractPhoneDigits(e.clipboardData.getData("text")));
    setPhoneTouched(true);
  }, []);

  const reset = useCallback(() => {
    setPhoneDigits("");
    setPhoneTouched(false);
  }, []);

  return {
    phoneDigits,
    setPhoneDigits,
    phoneTouched,
    setPhoneTouched,
    display,
    inputRef,
    inputProps: {
      ref: inputRef,
      type: "tel" as const,
      value: display,
      onChange,
      onKeyDown,
      onPaste,
      onFocus: () => setPhoneTouched(true),
      onBlur: () => setPhoneTouched(true),
      autoComplete: "tel" as const,
      inputMode: "numeric" as const,
    },
    reset,
  };
}
