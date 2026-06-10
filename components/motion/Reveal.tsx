"use client";

import type { ReactNode } from "react";

/** Залишено для сумісності — без приховування контенту */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  fade?: boolean;
}) {
  return <div className={className}>{children}</div>;
}
