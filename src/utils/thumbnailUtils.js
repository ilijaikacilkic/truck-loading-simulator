import { boxRect } from './trailerUtils.js';
import { escapeXml } from './formatUtils.js';

export function createThumbnail(trailer, boxes) {
  const viewW = 260;
  const viewH = Math.max(72, Math.round((trailer.width / trailer.length) * viewW));
  const sx = viewW / trailer.length;
  const sy = viewH / trailer.width;
  const placed = boxes.filter(b => b.placed);
  const rects = placed.map(b => {
    const r = boxRect(b);
    return `<rect x="${r.x * sx}" y="${r.y * sy}" width="${r.w * sx}" height="${r.h * sy}" rx="4" fill="${b.color}" stroke="white" stroke-width="2"/><text x="${r.x * sx + 5}" y="${r.y * sy + 16}" font-size="11" font-family="Arial" fill="white" font-weight="700">${escapeXml(b.name)}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${viewW}" height="${viewH}" viewBox="0 0 ${viewW} ${viewH}"><rect width="100%" height="100%" fill="#f8fafc" stroke="#111827" stroke-width="5" rx="8"/>${rects}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
