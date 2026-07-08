export function uppercaseText(value) {
  return String(value || '').toUpperCase();
}

export function normalizeArtNumber(value) {
  const raw = String(value || '').toUpperCase().trim();
  if (!raw) return '';
  const digits = raw.replace(/[^0-9]/g, '').slice(0, 6);
  return digits.length === 6 ? `ART-${digits}` : digits ? `ART-${digits}` : '';
}

export function artDigits(value) {
  return String(value || '').replace(/[^0-9]/g, '').slice(0, 6);
}

export function normalizeWarehouseLocation(value) {
  const raw = uppercaseText(value).trim();
  if (!raw) return '';
  const compact = raw.replace(/[^A-Z0-9]/g, '');
  const match = compact.match(/^(?:RS20)?([A-Z]{2})(\d{1,2})$/);
  if (match) {
    const [, row, number] = match;
    return `RS 20 ${row} ${number.padStart(2, '0')}`;
  }
  return raw.replace(/\s+/g, ' ');
}

export function cleanLocationInput(value) {
  return uppercaseText(value).replace(/\s+/g, ' ');
}

export function cleanDecimalInput(value) {
  return String(value || '').replace(',', '.').replace(/[^0-9.]/g, '');
}
