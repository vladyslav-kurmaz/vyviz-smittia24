/**
 * Стиснення фото на клієнті перед відправкою заявки.
 *
 * Vercel обмежує тіло serverless-функції приблизно 4.5 МБ на весь запит.
 * Телефонні фото часто важать 3–8 МБ, тому без стиснення запит з
 * доданими фото падає з 413 (FUNCTION_PAYLOAD_TOO_LARGE) ще до того,
 * як дійде до /api/lead. Стискаємо кожне фото до розумного розміру,
 * ділячи спільний бюджет запиту між усіма доданими файлами.
 */

const DEFAULT_MAX_DIMENSION = 1600;
const DEFAULT_INITIAL_QUALITY = 0.82;
const DEFAULT_MIN_QUALITY = 0.45;
/** Спільний бюджет на всі фото в одному запиті, з запасом нижче ліміту Vercel. */
const DEFAULT_TOTAL_BUDGET_BYTES = 3.6 * 1024 * 1024;
const MIN_PER_FILE_BUDGET_BYTES = 300 * 1024;

type CompressOptions = {
  maxDimension?: number;
  targetBytes?: number;
  initialQuality?: number;
  minQuality?: number;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (event) => {
      URL.revokeObjectURL(url);
      reject(event);
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/** Стискає одне фото. Якщо щось піде не так, повертає оригінальний файл. */
export async function compressImageFile(
  file: File,
  options: CompressOptions = {},
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }

  const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION;
  const targetBytes = options.targetBytes ?? DEFAULT_TOTAL_BUDGET_BYTES;
  const initialQuality = options.initialQuality ?? DEFAULT_INITIAL_QUALITY;
  const minQuality = options.minQuality ?? DEFAULT_MIN_QUALITY;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    // Білий фон — JPEG не підтримує прозорість (PNG зі альфа-каналом).
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    let quality = initialQuality;
    let blob = await canvasToBlob(canvas, quality);

    while (blob && blob.size > targetBytes && quality > minQuality) {
      quality = Math.max(minQuality, quality - 0.1);
      blob = await canvasToBlob(canvas, quality);
      if (quality <= minQuality) break;
    }

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const newName = `${file.name.replace(/\.[^.]+$/, "")}.jpg`;
    return new File([blob], newName, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}

/**
 * Стискає список фото, ділячи спільний бюджет розміру запиту між ними,
 * щоб уся заявка з фото вклалась у ліміт serverless-функції.
 */
export async function compressImageFiles(
  files: File[],
  totalBudgetBytes: number = DEFAULT_TOTAL_BUDGET_BYTES,
): Promise<File[]> {
  if (files.length === 0) return [];

  const perFileBudget = Math.max(
    MIN_PER_FILE_BUDGET_BYTES,
    Math.floor(totalBudgetBytes / files.length),
  );

  const compressed: File[] = [];
  for (const file of files) {
    compressed.push(await compressImageFile(file, { targetBytes: perFileBudget }));
  }
  return compressed;
}
