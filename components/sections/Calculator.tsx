"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Input,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { Section } from "@/components/chakra/Section";
import { SectionHeader } from "@/components/chakra/SectionHeader";
import { Surface } from "@/components/chakra/Surface";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/forms/FieldError";
import { MessengerButtons } from "@/components/ui/MessengerButtons";
import {
  PRICING,
  calculatePrice,
  formatPrice,
} from "@/lib/pricing";

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <chakra.button
      type="button"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      p={4}
      rounded="button"
      bg={checked ? "brand.50" : "elevated"}
      transition="all 0.2s"
      onClick={() => onChange(!checked)}
      textAlign="left"
      border="none"
      cursor="pointer"
    >
      <Box>
        <Text fontWeight="semibold" color="ink" fontSize="sm">
          {label}
        </Text>
        {description && (
          <Text fontSize="xs" color="muted" mt={0.5}>
            {description}
          </Text>
        )}
      </Box>
      <Box
        w={11}
        h={6}
        rounded="button"
        bg={checked ? "brand.500" : "muted"}
        opacity={checked ? 1 : 0.35}
        position="relative"
        transition="all 0.2s"
        flexShrink={0}
      >
        <Box
          position="absolute"
          top="3px"
          left={checked ? "22px" : "3px"}
          w="18px"
          h="18px"
          rounded="button"
          bg="white"
          transition="all 0.2s"
          shadow="none"
        />
      </Box>
    </chakra.button>
  );
}

export function Calculator() {
  const [vehicleId, setVehicleId] = useState<string>("gazel");
  const [cubicMeters, setCubicMeters] = useState(0);
  const [withLoaders, setWithLoaders] = useState(true);
  const [floor, setFloor] = useState(0);
  const [hasElevator, setHasElevator] = useState(true);
  const [bags, setBags] = useState(0);

  const canCalculate = cubicMeters >= PRICING.minCubicMeters;

  const selectedVehicle = PRICING.vehicles.find((v) => v.id === vehicleId);

  const volume = useMemo(
    () => Math.max(cubicMeters, PRICING.minCubicMeters),
    [cubicMeters]
  );

  const total = useMemo(
    () =>
      calculatePrice({
        cubicMeters: volume,
        withLoaders,
        floor,
        hasElevator,
        bags,
      }),
    [volume, withLoaders, floor, hasElevator, bags]
  );

  function selectVehicle(id: string) {
    setVehicleId(id);
  }

  const inputStyles = {
    bg: "elevated",
    border: "none",
    rounded: "button",
    h: "48px",
    fontSize: "md",
    px: 5,
    _focus: {
      outline: "2px solid",
      outlineColor: "brand.500",
      bg: "surface",
    },
  };

  const volumeTooLow = cubicMeters > 0 && cubicMeters < PRICING.minCubicMeters;

  function handleDigitsOnly(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (n: number) => void,
  ) {
    const digits = e.target.value.replace(/\D/g, "");
    setter(digits === "" ? 0 : Number(digits));
  }

  function blockNonDigitKeys(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  }

  return (
    <Section id="calculator" tinted>
      <SectionHeader
        eyebrow="Калькулятор"
        title="Розрахуйте вартість за 30 секунд"
        subtitle="Оберіть авто, вкажіть обсяг — отримаєте орієнтовну ціну без прихованих доплат"
        align="center"
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }}
        gap={{ base: 8, lg: 10 }}
        maxW="6xl"
        mx="auto"
        alignItems="start"
      >
        {/* Форма */}
        <Surface p={{ base: 5, md: 8 }} hover={false}>
          <Stack gap={6}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="ink" mb={3}>
                Тип авто
              </Text>
              <Grid templateColumns={{ base: "1fr 1fr" }} gap={3}>
                {PRICING.vehicles.map((v) => {
                  const active = vehicleId === v.id;
                  const img =
                    "image" in v && v.image ? String(v.image) : undefined;
                  return (
                    <chakra.button
                      key={v.id}
                      type="button"
                      onClick={() => selectVehicle(v.id)}
                      p={0}
                      overflow="hidden"
                      rounded="button"
                      textAlign="left"
                      bg={active ? "brand.50" : "elevated"}
                      outline={active ? "2px solid" : "none"}
                      outlineColor="brand.500"
                      transition="all 0.2s"
                      w="full"
                      border="none"
                      cursor="pointer"
                      _hover={{ transform: "translateY(-1px)", shadow: "btn" }}
                    >
                      <Box
                        position="relative"
                        w="full"
                        h={{ base: "120px", sm: "140px", md: "160px" }}
                        bg="brand.100"
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt={v.name}
                            fill
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            sizes="(max-width: 768px) 50vw, 320px"
                          />
                        ) : (
                          <Flex h="full" align="center" justify="center" fontSize="2xl">
                            🚛
                          </Flex>
                        )}
                      </Box>
                      <Box p={3}>
                        <Text fontWeight="bold" fontSize="sm" color="ink">
                          {v.name}
                        </Text>
                        <Text fontSize="xs" color="muted">
                          {v.volume} м³ · від {v.priceFrom} грн
                        </Text>
                      </Box>
                    </chakra.button>
                  );
                })}
              </Grid>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="ink" mb={2}>
                Обсяг сміття, м³ (метри кубічні)
              </Text>
              <Box position="relative" mb={volumeTooLow ? 4 : 0}>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="5 м³"
                  value={cubicMeters > 0 ? String(cubicMeters) : ""}
                  onChange={(e) => handleDigitsOnly(e, setCubicMeters)}
                  onKeyDown={blockNonDigitKeys}
                  aria-invalid={volumeTooLow}
                  borderColor={volumeTooLow ? "red.500" : undefined}
                  w="full"
                  {...inputStyles}
                />
                <FieldError
                  tight
                  message={
                    volumeTooLow
                      ? `Мінімальне замовлення — ${PRICING.minCubicMeters} м³`
                      : null
                  }
                />
              </Box>
            </Box>

            <Toggle
              checked={withLoaders}
              onChange={setWithLoaders}
              label="Потрібні вантажники"
              description="Зносимо та завантажуємо самі"
            />

            <Grid templateColumns="1fr 1fr" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="semibold" color="ink" mb={2}>
                  Поверх
                </Text>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={floor > 0 ? String(floor) : ""}
                  onChange={(e) => handleDigitsOnly(e, setFloor)}
                  onKeyDown={blockNonDigitKeys}
                  {...inputStyles}
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="semibold" color="ink" mb={2}>
                  Мішків (опц.)
                </Text>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={bags > 0 ? String(bags) : ""}
                  onChange={(e) => handleDigitsOnly(e, setBags)}
                  onKeyDown={blockNonDigitKeys}
                  {...inputStyles}
                />
              </Box>
            </Grid>

            <Toggle
              checked={hasElevator}
              onChange={setHasElevator}
              label="Є ліфт"
              description={!hasElevator && floor > 0 ? "+50 грн за поверх без ліфта" : undefined}
            />
          </Stack>
        </Surface>

        {/* Результат */}
        <Box position={{ lg: "sticky" }} top={{ lg: "100px" }}>
          <Surface
            p={{ base: 6, md: 8 }}
            hover={false}
            bg={canCalculate ? "brand.600" : "surface"}
            color={canCalculate ? "white" : "ink"}
          >
            {!canCalculate ? (
              <Box textAlign="center" py={8}>
                <Text fontSize="4xl" mb={4} aria-hidden>
                  📋
                </Text>
                <Heading size="md" color="ink">
                  Орієнтовна вартість зʼявиться тут
                </Heading>
                <Text mt={2} fontSize="sm" color="muted">
                  Вкажіть обсяг від {PRICING.minCubicMeters} м³ — ціна оновиться автоматично
                </Text>
              </Box>
            ) : (
              <>
                <Text fontSize="sm" color="whiteAlpha.800" textTransform="uppercase" letterSpacing="wider">
                  Орієнтовна вартість
                </Text>
                <Heading size="3xl" mt={2} fontWeight="extrabold">
                  {formatPrice(total)}
                </Heading>
                <Text mt={3} fontSize="sm" color="whiteAlpha.800">
                  {selectedVehicle?.name ?? "Обраний обсяг"} · {volume} м³
                  {withLoaders ? " · з вантажниками" : ""}
                </Text>
                <Text mt={4} fontSize="xs" color="whiteAlpha.700">
                  Точну ціну підтвердимо після фото або огляду на місці
                </Text>
                <Stack gap={3} mt={8}>
                  <Button href="#contact" fullWidth>
                    Замовити за цією ціною
                  </Button>
                </Stack>
                <Box mt={6} pt={6} borderTop="1px solid" borderColor="whiteAlpha.300">
                  <Text fontSize="sm" color="whiteAlpha.900" mb={3}>
                    Уточнити по фото в месенджері:
                  </Text>
                  <MessengerButtons />
                </Box>
              </>
            )}
          </Surface>

          <Box mt={4} p={4} rounded="card" bg="surface" shadow="card">
            <Text fontSize="xs" color="muted" lineHeight="relaxed">
              <Box as="span" fontWeight="semibold" color="ink">
                Подача від {PRICING.baseDelivery} грн
              </Box>
              {" · "}1 м³: {PRICING.perCubicWithLoaders} грн (з вантажниками) /{" "}
              {PRICING.perCubicNoLoaders} грн (без)
            </Text>
          </Box>
        </Box>
      </Grid>
    </Section>
  );
}
