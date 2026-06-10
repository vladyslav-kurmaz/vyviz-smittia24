import { SITE_NAME } from "@/lib/contacts";
import { SITE_URL } from "@/lib/seo-meta";

const telegramApi = (token: string) => `https://api.telegram.org/bot${token}/`;

export type LeadUtm = Partial<Record<string, string>>;

export type LeadTelegramPayload = {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
  calculatorTotal?: string;
  pageUrl?: string;
  utm?: LeadUtm;
  photoCount?: number;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function isTelegramConfigured(): boolean {
  return !!(
    process.env.TELEGRAM_BOT_TOKEN?.trim() &&
    process.env.TELEGRAM_CHAT_ID?.trim()
  );
}

export function formatLeadMessage(payload: LeadTelegramPayload): string {
  const lines: string[] = [
    `🆕 <b>Нова заявка — ${escapeHtml(SITE_NAME)}</b>`,
    `Сайт: ${escapeHtml(SITE_URL)}`,
    "",
    `Ім'я: ${escapeHtml(payload.name ?? "—")}`,
    `Телефон: ${escapeHtml(payload.phone ?? "—")}`,
    `Послуга: ${escapeHtml(payload.service ?? "—")}`,
    `Коментар: ${escapeHtml(payload.message?.trim() || "—")}`,
  ];

  if (payload.calculatorTotal) {
    lines.push(
      `Сума з калькулятора: ${escapeHtml(payload.calculatorTotal)} грн`,
    );
  }

  if (payload.pageUrl) {
    lines.push(`Сторінка: ${escapeHtml(payload.pageUrl)}`);
  }

  if (payload.utm && Object.keys(payload.utm).length > 0) {
    lines.push("");
    lines.push("UTM-мітки:");
    for (const [key, value] of Object.entries(payload.utm)) {
      if (value) lines.push(`${escapeHtml(key)}: ${escapeHtml(value)}`);
    }
  }

  lines.push("");
  lines.push(
    `Час: ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`,
  );

  if (payload.photoCount && payload.photoCount > 0) {
    lines.push(`📎 Фото: ${payload.photoCount} шт. (див. нижче)`);
  }

  return lines.join("\n");
}

export async function sendTelegramText(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;

  const res = await fetch(`${telegramApi(token)}sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    console.error("[telegram] sendMessage:", res.status, await res.text());
  }

  return res.ok;
}

export async function sendTelegramPhotos(files: File[]): Promise<boolean> {
  if (files.length === 0) return true;

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;

  try {
    if (files.length === 1) {
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("photo", files[0], files[0].name);

      const res = await fetch(`${telegramApi(token)}sendPhoto`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("[telegram] sendPhoto:", res.status, await res.text());
      }

      return res.ok;
    }

    const media = files.map((_, index) => ({
      type: "photo",
      media: `attach://photo${index}`,
    }));

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("media", JSON.stringify(media));
    files.forEach((file, index) => {
      formData.append(`photo${index}`, file, file.name);
    });

    const res = await fetch(`${telegramApi(token)}sendMediaGroup`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error(
        "[telegram] sendMediaGroup:",
        res.status,
        await res.text(),
      );
    }

    return res.ok;
  } catch (error) {
    console.error("[telegram] photos error:", error);
    return false;
  }
}
