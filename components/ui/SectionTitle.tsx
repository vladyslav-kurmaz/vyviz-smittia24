"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  id?: string;
};

export function SectionTitle({ title, subtitle, children, id }: Props) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="mb-12 max-w-3xl"
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted leading-relaxed">{subtitle}</p>
      )}
      {children}
    </motion.div>
  );
}
