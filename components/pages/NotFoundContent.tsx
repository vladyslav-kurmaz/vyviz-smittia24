import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";

export function NotFoundContent() {
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
            mb={4}
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
            Сторінка помилки
          </Text>

          <Text
            fontSize={{ base: "5rem", md: "6rem" }}
            fontWeight="extrabold"
            lineHeight={1}
            color="brand.500"
            letterSpacing="-0.04em"
            aria-hidden
          >
            404
          </Text>

          <Heading
            as="h1"
            mt={4}
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="ink"
          >
            Сторінку не знайдено
          </Heading>

          <Box
            mt={4}
            px={4}
            py={3}
            mx="auto"
            maxW="md"
            rounded="button"
            bg="elevated"
            borderWidth="1px"
            borderColor="brand.50"
          >
            <Text fontSize="sm" fontWeight="semibold" color="ink">
              Помилка 404
            </Text>
            <Text fontSize="sm" color="muted" mt={1}>
              Запитана адреса не існує або була переміщена. Перевірте посилання або
              поверніться на головну.
            </Text>
          </Box>

          <Flex
            mt={8}
            gap={3}
            flexWrap="wrap"
            justify="center"
            direction={{ base: "column", sm: "row" }}
          >
            <Button href="/" variant="primary" size="md">
              На головну
            </Button>
            <Button href="/#contact" variant="brand" size="md">
              Звʼязатися з нами
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
