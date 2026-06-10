# Вивіз сміття — Landing (Київ та область)

Next.js 14 landing page за ТЗ. Контакти, калькулятор, форма заявки, SEO-сторінки.

## Запуск локально

```bash
cd ~/vyviz-landing
cp .env.example .env.local
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## Збірка

```bash
npm run build
npm start
```

## Що підставити пізніше

| Файл / env | Опис |
|---|---|
| `NEXT_PUBLIC_SITE_NAME` | Назва компанії |
| `public/logo.svg` | Логотип |
| `public/images/**` | Реальні фото |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Заявки в Telegram |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Аналітика |

## Структура

- Головна: усі секції (без відгуків)
- SEO: `/vyviz-budivelnogo-smittya`, `/vyviz-smittya-kyiv` тощо
- API: `POST /api/lead`

## Телефони

- **096 400 41 41** — дзвінки + месенджери
- **063 400 41 41** — лише дзвінки
