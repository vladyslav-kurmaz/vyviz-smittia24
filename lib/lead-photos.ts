/** Обмеження для фото у формі заявки */
export const LEAD_PHOTO_MAX_COUNT = 5;
export const LEAD_PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5 МБ

export function formatPhotoSizeMb(bytes: number = LEAD_PHOTO_MAX_BYTES): string {
  return `${bytes / (1024 * 1024)} МБ`;
}

const ERROR_MESSAGES: Record<string, string> = {
  TOO_MANY_FILES: `Можна додати не більше ${LEAD_PHOTO_MAX_COUNT} фото`,
  FILE_TOO_LARGE: `Файл завеликий. Максимум ${formatPhotoSizeMb()} на одне фото`,
  FILE_INVALID_TYPE: "Дозволені лише зображення (JPG, PNG, WEBP тощо)",
  FILE_TOO_SMALL: "Файл занадто малий",
  FILE_INVALID: "Невірний файл",
  FILE_EXISTS: "Цей файл уже додано",
};

export function getPhotoUploadError(
  rejected: { file: File; errors: string[] }[],
): string | null {
  if (!rejected.length) return null;
  const first = rejected[0];
  const code = first.errors[0];
  const named = first.file?.name ? `«${first.file.name}»` : "Файл";
  return ERROR_MESSAGES[code] ?? `${named}: не вдалося додати`;
}
