export function normalizeIndianPhone(value: string) {
  return value.replace(/\D/g, "").slice(-10);
}

export function isValidIndianPhone(value: string) {
  return normalizeIndianPhone(value).length === 10;
}

export function normalizeUsername(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20);
}

export function isValidUsername(value: string) {
  return /^[a-z0-9_]{3,20}$/.test(value);
}

export function isValidDisplayName(value: string) {
  return value.trim().length >= 2 && value.trim().length <= 30;
}

export function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00");
  return !Number.isNaN(date.getTime()) && date < new Date();
}
