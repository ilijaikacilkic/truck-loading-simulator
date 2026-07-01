export function escapeXml(text) {
  return String(text).replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}
export function formatDateTime(iso) {
  return new Date(iso).toLocaleString('sr-RS', { dateStyle: 'short', timeStyle: 'short' });
}
export function formatMeters(value) { return `${Number(value).toLocaleString('sr-RS', { maximumFractionDigits: 2 })} m`; }

