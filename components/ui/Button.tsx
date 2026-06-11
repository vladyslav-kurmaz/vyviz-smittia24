"use client";

import Link from "next/link";
import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { isLeadModalHref, useLeadModal } from "@/components/providers/LeadModalProvider";
import type { LeadModalOptions } from "@/components/providers/LeadModalProvider";

type Variant = "primary" | "secondary" | "brand" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Для secondary на темному фоні (hero) */
  onDark?: boolean;
  href?: string;
  leadModal?: LeadModalOptions;
  fullWidth?: boolean;
  children: ReactNode;
};

const sizeStyles = {
  sm: { minH: "40px", h: "auto", py: 2, px: 5, fontSize: "sm" },
  md: { minH: "48px", h: "auto", py: 2.5, px: 6, fontSize: "sm" },
  lg: { minH: "52px", h: "auto", py: 3, px: 8, fontSize: "md" },
};

export function Button({
  variant = "primary",
  size = "lg",
  onDark = false,
  href,
  leadModal,
  fullWidth = false,
  children,
  onClick,
  className,
  ...props
}: Props) {
  const { openLeadModal } = useLeadModal();
  const opensModal = isLeadModalHref(href);

  const base = {
    ...sizeStyles[size],
    w: fullWidth ? "full" : undefined,
    maxW: fullWidth ? "100%" : undefined,
    whiteSpace: "normal",
    lineHeight: "1.35",
    textAlign: "center",
    rounded: "button",
    fontWeight: "700",
    letterSpacing: "0.01em",
    transition: "all 0.22s ease",
    shadow: "btn",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.500",
      outlineOffset: "2px",
    },
    _active: { transform: "translateY(0)" },
    _disabled: { opacity: 0.55, cursor: "not-allowed", transform: "none" },
  };

  const variants = {
    primary: {
      bg: "accent.600",
      color: "white",
      border: "none",
      _hover: {
        bg: "accent.700",
        shadow: "glow",
        transform: "translateY(-1px)",
      },
    },
    brand: {
      bg: "brand.500",
      color: "white",
      border: "none",
      _hover: {
        bg: "brand.600",
        shadow: "btn",
        transform: "translateY(-1px)",
      },
    },
    secondary: onDark
      ? {
          variant: "outline" as const,
          borderWidth: "2px",
          borderColor: "white",
          color: "white",
          bg: "blackAlpha.300",
          shadow: "none",
          _hover: { bg: "whiteAlpha.300", transform: "translateY(-1px)" },
        }
      : {
          variant: "outline" as const,
          borderWidth: "2px",
          borderColor: "brand.600",
          color: "brand.700",
          bg: "surface",
          shadow: "none",
          _hover: { bg: "brand.50", shadow: "btn", transform: "translateY(-1px)" },
        },
    ghost: {
      variant: "ghost" as const,
      color: "brand.500",
      shadow: "none",
      _hover: { bg: "brand.50" },
    },
  };

  const chakraProps = {
    ...base,
    ...(variant === "ghost" ? variants.ghost : variants[variant === "brand" ? "brand" : variant === "primary" ? "primary" : "secondary"]),
  };

  const handleLeadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openLeadModal(leadModal);
    onClick?.(e);
  };

  const cls = className ? String(className) : undefined;

  if (opensModal) {
    return (
      <ChakraButton
        type="button"
        onClick={handleLeadClick}
        className={cls}
        {...chakraProps}
        {...props}
      >
        {children}
      </ChakraButton>
    );
  }

  if (href) {
    return (
      <ChakraButton asChild className={cls} {...chakraProps}>
        <Link href={href}>{children}</Link>
      </ChakraButton>
    );
  }

  return (
    <ChakraButton onClick={onClick} className={cls} {...chakraProps} {...props}>
      {children}
    </ChakraButton>
  );
}
