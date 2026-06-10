/** Фото робіт — public/images/gallery/ */
export const GALLERY_DIR = "/images/gallery";

/**
 * Номери файлів: 1.webp, 2.webp, 3.webp …
 * Після додавання фото — допишіть номери сюди, напр. [1, 2, 3, 4, 5]
 */
export const GALLERY_IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;

/** Скільки фото показувати до натискання «Показати більше» */
export const GALLERY_INITIAL_COUNT = 6;

export function getGalleryImagePath(id: number): string {
  return `${GALLERY_DIR}/${id}.webp`;
}
