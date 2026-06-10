# Favicon та PWA-іконки

Файли в цій папці віддаються як `/icons/...`.

| Файл | Призначення |
|------|-------------|
| `favicon-16x16.png` | Іконка вкладки 16×16 |
| `favicon-32x32.png` | Іконка вкладки 32×32 |
| `android-chrome-192x192.png` | PWA / Android |
| `android-chrome-512x512.png` | PWA splash |

**Окремо в `app/` (Next.js підхоплює автоматично):**

- `app/favicon.ico` — класична іконка вкладки
- `app/icon.png` — сучасні браузери
- `app/apple-icon.png` — iOS «Додати на головний екран»
- `app/manifest.ts` — Web App Manifest (не редагуйте `.webmanifest` тут)
