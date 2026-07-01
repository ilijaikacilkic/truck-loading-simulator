import { PX_PER_METER } from './constants.js';

export function clamp(num, min, max) { return Math.max(min, Math.min(max, num)); }
export function mToPx(m) { return m * PX_PER_METER; }
export function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
export function boxRect(box) {
  return { x: box.x, y: box.y, w: Number(box.length) || 0, h: Number(box.width) || 0 };
}

export const SNAP_THRESHOLD_M = 18 / PX_PER_METER;
export const GRID_STEP_M = 0.05;
export const LANES = 3;
export function snapToGrid(value) { return Math.round(value / GRID_STEP_M) * GRID_STEP_M; }
export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}
export function snapBoxPosition(box, boxes, trailer) {
  const bw = Number(box.length) || 0;
  const bh = Number(box.width) || 0;
  let x = box.x;
  let y = box.y;

  // Always allow snapping to trailer boundaries.
  const snapCandidatesX = [0, trailer.length - bw];
  const snapCandidatesY = [0, trailer.width - bh];

  boxes.forEach(other => {
    if (!other.placed || other.id === box.id) return;
    const r = boxRect(other);
    const verticalTouchBelow = Math.abs(y - (r.y + r.h)) <= SNAP_THRESHOLD_M;
    const verticalTouchAbove = Math.abs((y + bh) - r.y) <= SNAP_THRESHOLD_M;

    // IMPORTANT: do NOT snap boxes left/right next to each other along trailer length.
    // Horizontal gaps must remain real and visible.
    // Only allow vertical stacking: under/above another box, like Box B under Box A.
    if (verticalTouchBelow || verticalTouchAbove || rangesOverlap(x, x + bw, r.x, r.x + r.w)) {
      snapCandidatesX.push(r.x); // align same column only
    }
    if (verticalTouchBelow) y = r.y + r.h;
    if (verticalTouchAbove) y = r.y - bh;
  });

  for (const candidate of snapCandidatesX) {
    if (Math.abs(x - candidate) <= SNAP_THRESHOLD_M) x = candidate;
  }
  for (const candidate of snapCandidatesY) {
    if (Math.abs(y - candidate) <= SNAP_THRESHOLD_M) y = candidate;
  }

  x = clamp(x, 0, Math.max(0, trailer.length - bw));
  y = clamp(y, 0, Math.max(0, trailer.width - bh));
  return { ...box, x, y };
}

export function makeBoxesFromTypes(cargoTypes, existingBoxes) {
  const kept = existingBoxes.filter(b => cargoTypes.some(t => t.id === b.typeId));
  const next = [...kept];
  for (const type of cargoTypes) {
    const current = next.filter(b => b.typeId === type.id).length;
    for (let i = current; i < Number(type.qty || 0); i++) {
      next.push({
        id: crypto.randomUUID(),
        typeId: type.id,
        name: type.name,
        length: Number(type.length),
        width: Number(type.width),
        color: type.color,
        stackCount: Number(type.stackCount || 4),
        x: 0,
        y: 0,
        placed: false,
      });
    }
  }
  return next.map(b => {
    const t = cargoTypes.find(t => t.id === b.typeId);
    return t ? { ...b, name: t.name, length: Number(t.length), width: Number(t.width), color: t.color, stackCount: Number(b.stackCount || t.stackCount || 4) } : b;
  });
}

