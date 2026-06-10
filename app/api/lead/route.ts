import { NextResponse } from "next/server";
import { LEAD_PHOTO_MAX_BYTES, LEAD_PHOTO_MAX_COUNT } from "@/lib/lead-photos";
import {
  formatLeadMessage,
  isTelegramConfigured,
  sendTelegramPhotos,
  sendTelegramText,
  type LeadUtm,
} from "@/lib/telegram-lead";

function parseUtm(raw: string | undefined): LeadUtm {
  if (!raw?.trim()) return {};

  try {
    const parsed = JSON.parse(raw) as LeadUtm;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function filterValidPhotos(photos: File[]): File[] {
  return photos
    .slice(0, LEAD_PHOTO_MAX_COUNT)
    .filter(
      (file) =>
        file.size > 0 &&
        file.size <= LEAD_PHOTO_MAX_BYTES &&
        file.type.startsWith("image/"),
    );
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let payload: Record<string, string> = {};
    let validPhotos: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();

      if (form.get("website")) {
        return NextResponse.json({ success: true });
      }

      form.forEach((value, key) => {
        if (typeof value === "string") payload[key] = value;
      });

      const photos = form
        .getAll("photos")
        .filter((value): value is File => value instanceof File);
      validPhotos = filterValidPhotos(photos);
    } else {
      payload = await request.json();

      if (payload.website) {
        return NextResponse.json({ success: true });
      }
    }

    const leadPayload = {
      name: payload.name,
      phone: payload.phone,
      service: payload.service ?? payload.type,
      message: payload.message,
      calculatorTotal: payload.calculatorTotal,
      pageUrl: payload.pageUrl,
      utm: parseUtm(payload.utm),
      photoCount: validPhotos.length,
    };

    const text = formatLeadMessage(leadPayload);
    const telegramReady = isTelegramConfigured();

    if (telegramReady) {
      const messageSent = await sendTelegramText(text);

      if (!messageSent) {
        return NextResponse.json(
          { error: "Не вдалося надіслати заявку" },
          { status: 502 },
        );
      }

      if (validPhotos.length > 0) {
        await sendTelegramPhotos(validPhotos);
      }
    } else {
      console.log("[lead] Telegram не налаштовано, заявка:\n", text);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[lead] error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
