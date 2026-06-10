/** 10 цифр після +38: 0XX XX XX XXX */
export const PHONE_UA_MASK_HINT = "+38 (0XX) - XX - XX - XXX";

export function extractPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("38")) digits = digits.slice(2);
  return digits.slice(0, 10);
}

export function formatPhoneUA(digits: string): string {
  const d = digits.slice(0, 10);
  if (!d.length) return "+38 ";

  let out = "+38 (" + d.slice(0, 3);
  if (d.length < 3) return out;

  out += ")";
  if (d.length === 3) return out;

  out += " - " + d.slice(3, 5);
  if (d.length <= 5) return out;

  out += " - " + d.slice(5, 7);
  if (d.length <= 7) return out;

  out += " - " + d.slice(7, 10);
  return out;
}

export function isPhoneUAComplete(digits: string): boolean {
  return /^0\d{9}$/.test(digits);
}

export function phoneDigitsToSubmit(digits: string): string {
  return `+38${digits}`;
}

export function getPhoneError(digits: string, showValidation: boolean): string | null {
  if (!showValidation) return null;
  if (digits.length === 0) return "Вкажіть номер телефону";
  if (digits.length < 10) {
    return `Введіть номер повністю: ${PHONE_UA_MASK_HINT}`;
  }
  if (!isPhoneUAComplete(digits)) {
    return "Невірний формат. Номер має починатися з 0 (наприклад 099…)";
  }
  return null;
}

export function getNameError(name: string, showValidation: boolean): string | null {
  if (!showValidation) return null;
  if (!name.trim()) return "Ім'я не може бути пустим";
  return null;
}
