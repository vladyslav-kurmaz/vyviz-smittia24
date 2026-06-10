"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { THANK_YOU_PATH } from "@/lib/thank-you";
import {
  Box,
  Text,
  Stack,
  Input,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";
import {
  getNameError,
  getPhoneError,
  phoneDigitsToSubmit,
  PHONE_UA_MASK_HINT,
} from "@/lib/phone-ua";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { FieldError } from "./FieldError";
import { LeadPhotoUpload } from "./LeadPhotoUpload";
import { LEAD_PHOTO_MAX_COUNT } from "@/lib/lead-photos";
import { readStoredUtm } from "@/lib/utm";

const fieldProps = {
  bg: "elevated",
  border: "none",
  rounded: "button",
  _focus: { outline: "2px solid", outlineColor: "accent.500", bg: "surface" },
};

type Props = {
  variant?: "default" | "modal";
  defaultService?: string;
  calculatorTotal?: number;
  onSuccess?: () => void;
};

function ModalFieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="lead-modal-label">{children}</span>;
}

function modalInputInnerClass(hasError: boolean) {
  return `lead-modal-input-inner${hasError ? " lead-modal-input-inner--error" : ""}`;
}

export function LeadForm({
  variant = "default",
  defaultService = "",
  calculatorTotal,
  onSuccess,
}: Props) {
  const router = useRouter();
  const isModal = variant === "modal";
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const phone = usePhoneInput();
  const [form, setForm] = useState({
    name: "",
    service: defaultService,
    message: "",
    consent: false,
    website: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const showPhoneValidation =
    phone.phoneTouched || phone.phoneDigits.length > 0 || submitted;
  const showNameValidation = nameTouched || submitted;

  const nameError = useMemo(
    () => getNameError(form.name, showNameValidation),
    [form.name, showNameValidation],
  );
  const phoneError = useMemo(
    () => getPhoneError(phone.phoneDigits, showPhoneValidation),
    [phone.phoneDigits, showPhoneValidation],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setNameTouched(true);
    phone.setPhoneTouched(true);

    const nameErrNow = getNameError(form.name, true);
    const phoneErrNow = getPhoneError(phone.phoneDigits, true);
    if (nameErrNow || phoneErrNow || !form.consent) return;

    setStatus("loading");

    try {
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("phone", phoneDigitsToSubmit(phone.phoneDigits));
      body.append("service", form.service || "Не вказано");
      body.append("message", form.message);
      body.append("website", form.website);
      if (calculatorTotal) body.append("calculatorTotal", String(calculatorTotal));
      photos.slice(0, LEAD_PHOTO_MAX_COUNT).forEach((f) => body.append("photos", f));

      const utm = readStoredUtm();
      if (Object.keys(utm).length > 0) {
        body.append("utm", JSON.stringify(utm));
      }
      body.append("pageUrl", window.location.href);

      const res = await fetch("/api/lead", { method: "POST", body });
      if (!res.ok) throw new Error("fail");
      onSuccess?.();
      router.push(THANK_YOU_PATH);
    } catch {
      setStatus("error");
    }
  }

  const nameInputProps = {
    value: form.name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, name: e.target.value }),
    onBlur: () => setNameTouched(true),
    autoComplete: "name" as const,
  };

  if (isModal) {
    return (
      <form className="lead-modal-form" onSubmit={onSubmit} noValidate>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="lead-modal-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div className="lead-modal-field">
          <ModalFieldLabel>Тип послуги</ModalFieldLabel>
          <select
            className="lead-modal-input lead-modal-select"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Оберіть послугу</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Інше">Інше</option>
          </select>
        </div>

        <div className="lead-modal-field">
          <ModalFieldLabel>Ваше ім&apos;я *</ModalFieldLabel>
          <div className={modalInputInnerClass(!!nameError)}>
            <input
              className={`lead-modal-input${nameError ? " lead-modal-input--invalid" : ""}`}
              aria-invalid={!!nameError}
              {...nameInputProps}
            />
            <FieldError message={nameError} className="lead-modal-field-error" tight />
          </div>
        </div>

        <div className="lead-modal-field">
          <ModalFieldLabel>Номер телефону *</ModalFieldLabel>
          <div className={modalInputInnerClass(!!phoneError)}>
            <input
              className={`lead-modal-input${phoneError ? " lead-modal-input--invalid" : ""}`}
              aria-invalid={!!phoneError}
              placeholder={PHONE_UA_MASK_HINT}
              {...phone.inputProps}
            />
            <FieldError message={phoneError} className="lead-modal-field-error" tight />
          </div>
        </div>

        <div className="lead-modal-field">
          <ModalFieldLabel>Коментар / адреса</ModalFieldLabel>
          <AutoResizeTextarea
            className="lead-modal-input lead-modal-textarea"
            minRows={2}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <div className="lead-modal-field lead-modal-field--upload">
          <ModalFieldLabel>Фото (до {LEAD_PHOTO_MAX_COUNT})</ModalFieldLabel>
          <LeadPhotoUpload onFilesChange={setPhotos} />
        </div>

        <label className="lead-modal-consent">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />
          <span>
            Погоджуюсь на обробку даних згідно з{" "}
            <Link href="/privacy" className="lead-modal-consent-link">
              політикою конфіденційності
            </Link>
          </span>
        </label>
        {submitted && !form.consent && (
          <p className="lead-modal-status lead-modal-status--error" role="alert">
            Потрібна згода на обробку даних
          </p>
        )}

        {status === "error" && (
          <p className="lead-modal-status lead-modal-status--error">
            Не вдалося надіслати. Зателефонуйте або напишіть у месенджер.
          </p>
        )}

        <button
          type="submit"
          className="lead-modal-submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Надсилання…" : "Надіслати"}
        </button>

        <p className="lead-modal-privacy">
          <svg
            className="lead-modal-privacy-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
          гарантуємо повну конфіденційність та нерозголошення ваших даних третім
          особам
        </p>
      </form>
    );
  }

  return (
    <Box as="form" onSubmit={onSubmit} {...({ noValidate: true } as Record<string, boolean>)}>
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <Stack gap={4}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Ім&apos;я *
          </Text>
          <Box position="relative" mb={nameError ? 4 : 0}>
            <Input
              aria-invalid={!!nameError}
              borderColor={nameError ? "red.500" : undefined}
              {...fieldProps}
              {...nameInputProps}
            />
            <FieldError message={nameError} tight />
          </Box>
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Телефон *
          </Text>
          <Box position="relative" mb={phoneError ? 4 : 0}>
            <Input
              aria-invalid={!!phoneError}
              borderColor={phoneError ? "red.500" : undefined}
              placeholder={PHONE_UA_MASK_HINT}
              {...fieldProps}
              {...phone.inputProps}
            />
            <FieldError message={phoneError} tight />
          </Box>
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Тип послуги
          </Text>
          <select
            className="w-full rounded-[4px] bg-[#F6F3EA] px-4 py-3 border-0 focus:outline-2 focus:outline-[#D97708]"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Оберіть послугу</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Інше">Інше</option>
          </select>
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Коментар / адреса
          </Text>
          <AutoResizeTextarea
            variant="chakra"
            minRows={2}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            {...fieldProps}
          />
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Завантажити фото (до {LEAD_PHOTO_MAX_COUNT}, до 5 МБ)
          </Text>
          <LeadPhotoUpload onFilesChange={setPhotos} />
        </Box>

        <Flex align="flex-start" gap={2}>
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />
          <Box fontSize="sm" color="muted" lineHeight="relaxed">
            Погоджуюсь на обробку персональних даних згідно з{" "}
            <ChakraLink href="/privacy" color="accent.500" textDecoration="underline">
              політикою конфіденційності
            </ChakraLink>
          </Box>
        </Flex>
        {submitted && !form.consent && (
          <Text fontSize="sm" color="red.500" role="alert">
            Потрібна згода на обробку даних
          </Text>
        )}

        {status === "error" && (
          <Text fontSize="sm" color="red.500">
            Не вдалося надіслати. Зателефонуйте або напишіть у месенджер.
          </Text>
        )}

        <Button type="submit" fullWidth disabled={status === "loading"}>
          {status === "loading" ? "Надсилання…" : "Відправити заявку"}
        </Button>
      </Stack>
    </Box>
  );
}
