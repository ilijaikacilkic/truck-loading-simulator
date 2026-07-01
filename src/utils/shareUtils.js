import { createThumbnail } from './thumbnailUtils.js';

export function encodeSharePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeSharePayload(encoded) {
  const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
export function buildSharePayload(load) {
  return {
    createdAt: load.createdAt,
    driverName: load.driverName || '',
    trailerWeight: load.trailerWeight || '',
    cargoWeight: load.cargoWeight || '',
    trailer: load.trailer,
    boxes: (load.boxes || []).filter(b => b.placed).map(b => ({
      id: b.id, name: b.name, length: b.length, width: b.width, color: b.color, x: b.x, y: b.y, placed: true, stackCount: b.stackCount || 1
    })),
    valid: load.valid,
    thumbnail: createThumbnail(load.trailer, load.boxes || []),
  };
}

