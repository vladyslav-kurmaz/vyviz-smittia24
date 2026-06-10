"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type TextareaHTMLAttributes,
} from "react";
import { Textarea, type TextareaProps } from "@chakra-ui/react";

function syncHeight(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

type NativeProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
  minRows?: number;
};

type ChakraVariantProps = Omit<TextareaProps, "rows"> & {
  variant: "chakra";
  minRows?: number;
};

type Props = NativeProps | ChakraVariantProps;

function isChakraProps(props: Props): props is ChakraVariantProps {
  return "variant" in props && props.variant === "chakra";
}

export function AutoResizeTextarea(props: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const minRows = props.minRows ?? 2;

  const resize = useCallback(() => {
    syncHeight(ref.current);
  }, []);

  useEffect(() => {
    resize();
  }, [props.value, resize]);

  if (isChakraProps(props)) {
    const { onChange, variant, ...chakraProps } = props;
    void variant;

    return (
      <Textarea
        ref={ref}
        rows={minRows}
        resize="none"
        overflow="hidden"
        minH="2.5rem"
        py={2}
        lineHeight="1.45"
        onChange={(e) => {
          onChange?.(e);
          resize();
        }}
        {...chakraProps}
      />
    );
  }

  const { onChange, ...nativeProps } = props;

  return (
    <textarea
      ref={ref}
      rows={minRows}
      onChange={(e) => {
        onChange?.(e);
        resize();
      }}
      {...nativeProps}
    />
  );
}
