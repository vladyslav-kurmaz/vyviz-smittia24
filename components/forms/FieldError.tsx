import { Text } from "@chakra-ui/react";

type Props = { message: string | null; className?: string; tight?: boolean };

/** Попередження під полем (absolute, одразу під лінією інпута) */
export function FieldError({ message, className, tight }: Props) {
  if (!message) return null;

  return (
    <Text
      as="span"
      role="alert"
      position="absolute"
      left={0}
      top="100%"
      mt={tight ? "2px" : 1}
      fontSize="xs"
      fontWeight="medium"
      color="red.500"
      lineHeight="1.35"
      zIndex={1}
      className={className}
    >
      {message}
    </Text>
  );
}
