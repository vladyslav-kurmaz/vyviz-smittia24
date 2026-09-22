// Діагностика: чому в альбомі Telegram приходить лише 1 фото з кількох.
//
// Запуск (локально, зі своїми реальними значеннями у .env.local):
//   node --env-file=.env.local scripts/debug-telegram-media-group.mjs
//
// Скрипт напряму викликає Telegram Bot API sendMediaGroup з 2 маленькими
// тестовими зображеннями (посиланнями, без нашого коду відправки файлів)
// і друкує сиру відповідь Telegram. Токен нікуди, крім Telegram, не йде.

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

if (!token || !chatId) {
  console.error(
    "Заповніть TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID у .env.local (ті самі значення, що на Vercel), потім запустіть знову.",
  );
  process.exit(1);
}

async function main() {
  console.log("1) Перевірка sendMediaGroup за URL (без завантаження файлів)...");
  const urlMedia = [
    { type: "photo", media: "https://picsum.photos/id/237/500/500", caption: "Тест 1/2" },
    { type: "photo", media: "https://picsum.photos/id/238/500/500", caption: "Тест 2/2" },
  ];

  const urlRes = await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, media: urlMedia }),
  });
  const urlData = await urlRes.json();
  console.log("   Статус:", urlRes.status);
  console.log("   Відповідь:", JSON.stringify(urlData, null, 2));
  console.log(
    "   Очікується: ok:true і масив result з 2 message-об'єктами.\n",
  );

  console.log("2) Перевірка sendMediaGroup із завантаженням файлів (attach://), як робить сайт...");

  // Мінімальний валідний 1x1 JPEG, двічі — з різними іменами файлів,
  // так само, як це робить lib/telegram-lead.ts.
  const tinyJpegBase64 =
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcICQoJCQoNDAsMDRMOEBAOExoUFRQVFBonGyEbGxsaJyMuJiIsJic6MC0uMj9CQD9RVVdxcYCAgP/bAEMBCAgICQkJDQoKDVAiHiJQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
  const bytes = Buffer.from(tinyJpegBase64, "base64");

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append(
    "media",
    JSON.stringify([
      { type: "photo", media: "attach://photo0", caption: "Файл 1/2" },
      { type: "photo", media: "attach://photo1", caption: "Файл 2/2" },
    ]),
  );
  formData.append("photo0", new Blob([bytes], { type: "image/jpeg" }), "test-a.jpg");
  formData.append("photo1", new Blob([bytes], { type: "image/jpeg" }), "test-b.jpg");

  const fileRes = await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
    method: "POST",
    body: formData,
  });
  const fileData = await fileRes.json();
  console.log("   Статус:", fileRes.status);
  console.log("   Відповідь:", JSON.stringify(fileData, null, 2));
  console.log(
    "   Очікується: ok:true і масив result з 2 message-об'єктами.",
  );
}

main().catch((err) => {
  console.error("Помилка запиту:", err);
  process.exit(1);
});
