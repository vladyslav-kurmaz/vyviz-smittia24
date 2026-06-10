import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";

export function ThankYouContent() {
  return (
    <Box
      as="section"
      bg="cream"
      pt={{ base: 28, md: 32 }}
      pb={{ base: 16, md: 20 }}
      minH={{ base: "calc(100dvh - 80px)", md: "60vh" }}
      display="flex"
      alignItems="center"
    >
      <Container maxW="2xl" px={{ base: 4, md: 6 }}>
        <Box textAlign="center">
          <Text
            as="span"
            display="inline-block"
            px={3}
            py={1}
            mb={6}
            rounded="full"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.1em"
            textTransform="uppercase"
            bg="brand.50"
            color="brand.600"
            borderWidth="1px"
            borderColor="brand.100"
          >
            Заявку надіслано
          </Text>

          <Text fontSize="4xl" lineHeight={1} mb={4} aria-hidden>
            ✓
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="extrabold"
            color="ink"
            lineHeight="shorter"
            textWrap="balance"
          >
            Дякуємо, що звернулися!
          </Heading>

          <Box
            mt={5}
            px={5}
            py={4}
            mx="auto"
            maxW="md"
            rounded="card"
            bg="elevated"
            borderWidth="1px"
            borderColor="brand.50"
            shadow="card"
          >
            <Text fontSize="md" color="muted" lineHeight="relaxed">
              Ми зв&apos;яжемося з вами найближчим часом, уточнимо деталі та розрахуємо
              вартість.
            </Text>
          </Box>

          <Box mt={8}>
            <Button href="/" variant="primary" size="lg">
              Повернутись на головну
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
