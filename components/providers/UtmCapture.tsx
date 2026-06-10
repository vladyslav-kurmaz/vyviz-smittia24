"use client";

import { useEffect } from "react";
import { parseUtmFromSearch, storeUtmFirstTouch } from "@/lib/utm";

/** Зберігає UTM з URL у sessionStorage (перше джерело в сесії) */
export function UtmCapture() {
  useEffect(() => {
    const utm = parseUtmFromSearch(window.location.search);
    storeUtmFirstTouch(utm);
  }, []);

  return null;
}
