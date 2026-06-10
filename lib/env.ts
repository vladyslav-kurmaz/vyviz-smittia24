/**
 * Чи це публічний продакшен (індексація дозволена).
 * За замовчуванням — dev/preview (безпечно для тестів).
 */
export function isProductionSite(): boolean {
  const explicit =
    process.env.NEXT_PUBLIC_APP_ENV?.trim() ||
    process.env.APP_ENV?.trim();

  if (explicit === "production") return true;
  if (explicit === "development" || explicit === "preview") return false;

  if (process.env.VERCEL_ENV === "production") return true;
  if (
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  ) {
    return false;
  }

  return false;
}
