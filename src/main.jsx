import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RotateCw, Trash2, Plus, RotateCcw, Save, X, Edit3, MousePointer2, Grid3X3, Upload, Copy, Mail, Camera, FileSpreadsheet, ClipboardList, ArrowLeft, Send, Truck, QrCode, Repeat2, ListOrdered, History, Clock3, Home, Timer, PackageCheck } from 'lucide-react';
import './styles.css';

const STORAGE_KEY = 'truck-loading-simulator-v8';
const PX_PER_METER = 76;
const MARIJA_EMAIL = 'ilija.ilkic@hotmail.co.uk'; // OVDE upiši Marijin email
const QR_STORAGE_KEY = 'truck-loading-simulator-qr-table-v1';
const QR_PRODUCT_TYPES = ['Roletne', 'Tende', 'Žaluzine', 'Extra Transfer'];
const TRANSFER_STORAGE_KEY = 'verano-transfer-records-v1';
const COUNT_STORAGE_KEY = 'verano-count-records-v1';
const APP_QUOTES = [
  'Marija čeka tabelu.',
  'Ostavi napolitanku Jovane.',
  'Počni da skeniraš Golube.',
  'Pazi da ti Sveta nije iza ledja.',
  'Koliko Rumenka ima bokseva???.',
  'Daj plave bokseve....',
  'Ajde ti, nije mi nidočega.',
  'Sveta je bio na ostrvu!.',
  'Kaži 8.',
  'Si pregledao boks? Jesam (zna da nije).'
];

const DEFAULT_STATE = {
  trailer: { length: 13.6, width: 2.45 },
  cargoTypes: [
    { id: crypto.randomUUID(), name: 'Roletne', length: 3.5, width: 0.8, qty: 2, color: '#2563eb' },
    { id: crypto.randomUUID(), name: 'Tende', length: 6.0, width: 0.8, qty: 2, color: '#16a34a' },
    { id: crypto.randomUUID(), name: 'Žaluzine', length: 4.0, width: 0.8, qty: 2, color: '#f97316' },
    { id: crypto.randomUUID(), name: 'Rumenka', length: 5.0, width: 0.8, qty: 1, color: '#9333ea' },
    { id: crypto.randomUUID(), name: 'Extra Transfer', length: 6.0, width: 0.8, qty: 1, color: '#dc2626' },
    { id: crypto.randomUUID(), name: 'Paleta', length: 0.8, width: 0.8, qty: 3, color: '#0891b2' },
  ],
  boxes: [],
  savedLoads: [],
};

function clamp(num, min, max) { return Math.max(min, Math.min(max, num)); }
function mToPx(m) { return m * PX_PER_METER; }
function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function boxRect(box) {
  const length = box.rotated ? box.width : box.length;
  const width = box.rotated ? box.length : box.width;
  return { x: box.x, y: box.y, w: length, h: width };
}

const SNAP_THRESHOLD_M = 18 / PX_PER_METER;
const GRID_STEP_M = 0.05;
const LANES = 3;
function snapToGrid(value) { return Math.round(value / GRID_STEP_M) * GRID_STEP_M; }
function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}
function snapBoxPosition(box, boxes, trailer) {
  const bw = box.rotated ? box.width : box.length;
  const bh = box.rotated ? box.length : box.width;
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

function makeBoxesFromTypes(cargoTypes, existingBoxes) {
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
        x: 0,
        y: 0,
        placed: false,
        rotated: false,
      });
    }
  }
  return next.map(b => {
    const t = cargoTypes.find(t => t.id === b.typeId);
    return t ? { ...b, name: t.name, length: Number(t.length), width: Number(t.width), color: t.color } : b;
  });
}

function createThumbnail(trailer, boxes) {
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
function escapeXml(text) {
  return String(text).replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}
function formatDateTime(iso) {
  return new Date(iso).toLocaleString('sr-RS', { dateStyle: 'short', timeStyle: 'short' });
}
function formatMeters(value) { return `${Number(value).toLocaleString('sr-RS', { maximumFractionDigits: 2 })} m`; }

function encodeSharePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeSharePayload(encoded) {
  const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
function buildSharePayload(load) {
  return {
    createdAt: load.createdAt,
    driverName: load.driverName || '',
    trailerWeight: load.trailerWeight || '',
    cargoWeight: load.cargoWeight || '',
    trailer: load.trailer,
    boxes: (load.boxes || []).filter(b => b.placed).map(b => ({
      id: b.id, name: b.name, length: b.length, width: b.width, color: b.color, x: b.x, y: b.y, placed: true, rotated: b.rotated
    })),
    valid: load.valid,
    thumbnail: createThumbnail(load.trailer, load.boxes || []),
  };
}

function formatQrRowsForEmail(rows) {
  if (!rows.length) return 'Tabela je prazna.';
  const header = '#	Broj boksa	Tip robe	Opis';
  const lines = rows.map((row, index) => `${index + 1}	${row.boxNumber}	${row.productType}	${row.description || '-'}`);
  return [header, ...lines].join('\n');
}
function downloadQrCsv(rows) {
  const header = ['#', 'Broj boksa', 'Tip robe', 'Opis'];
  const csvRows = rows.map((row, index) => [index + 1, row.boxNumber, row.productType, row.description || '']);
  const csv = [header, ...csvRows]
    .map(cols => cols.map(value => `"${String(value).replace(/"/g, '""')}"`).join(';'))
    .join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `qr-tabela-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.trailer) return { ...DEFAULT_STATE, ...saved, savedLoads: saved.savedLoads || [] };
    } catch {}
    return { ...DEFAULT_STATE, boxes: makeBoxesFromTypes(DEFAULT_STATE.cargoTypes, []) };
  });
  const [drag, setDrag] = useState(null);
  const [mode, setMode] = useState('drag');
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [sharedLoad, setSharedLoad] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [qrMode, setQrMode] = useState(false);
  const [appView, setAppView] = useState('home');
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * APP_QUOTES.length));
  const [now, setNow] = useState(() => new Date());
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth || 1200);
  const [qrRows, setQrRows] = useState(() => {
    try { return JSON.parse(localStorage.getItem(QR_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [transfers, setTransfers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(TRANSFER_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [counts, setCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(COUNT_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [transferForm, setTransferForm] = useState({ art: '', qty: '', from: '', to: '', note: '' });
  const [countForm, setCountForm] = useState({ art: '', qty: '', position: '', note: '' });
  const [pendingQr, setPendingQr] = useState('');
  const pendingQrRef = useRef('');
  const [manualQrValue, setManualQrValue] = useState('');
  const [scannerError, setScannerError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanLoopRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  useEffect(() => { pendingQrRef.current = pendingQr; }, [pendingQr]);
  useEffect(() => { localStorage.setItem(QR_STORAGE_KEY, JSON.stringify(qrRows)); }, [qrRows]);
  useEffect(() => { localStorage.setItem(TRANSFER_STORAGE_KEY, JSON.stringify(transfers)); }, [transfers]);
  useEffect(() => { localStorage.setItem(COUNT_STORAGE_KEY, JSON.stringify(counts)); }, [counts]);
  useEffect(() => {
    const quoteTimer = setInterval(() => setQuoteIndex(i => (i + 1) % APP_QUOTES.length), 5 * 60 * 1000);
    const clockTimer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => { clearInterval(quoteTimer); clearInterval(clockTimer); };
  }, []);
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth || 1200);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  useEffect(() => {
    const hash = window.location.hash || '';
    const match = hash.match(/^#load=(.+)$/);
    if (!match) return;
    try { setSharedLoad(decodeSharePayload(match[1])); } catch (err) { console.warn('Invalid shared load link', err); }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function startQrScanner() {
      if (!qrMode) return;
      if (!navigator.mediaDevices?.getUserMedia) {
        setScannerError('Kamera nije dostupna u ovom browseru. Možeš ručno upisati broj boksa.');
        return;
      }
      if (!('BarcodeDetector' in window)) {
        setScannerError('QR skener nije podržan u ovom browseru. Možeš ručno upisati broj boksa.');
        return;
      }
      try {
        setScannerError('');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (cancelled) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        const scan = async () => {
          if (cancelled || !videoRef.current) return;
          if (pendingQrRef.current) { scanLoopRef.current = requestAnimationFrame(scan); return; }
          try {
            const codes = await detector.detect(videoRef.current);
            const value = codes?.[0]?.rawValue?.trim();
            if (value) {
              setPendingQr(value);
              return;
            }
          } catch {}
          scanLoopRef.current = requestAnimationFrame(scan);
        };
        scanLoopRef.current = requestAnimationFrame(scan);
      } catch (err) {
        setScannerError('Kamera nije pokrenuta. Proveri dozvolu za kameru ili ručno upiši broj boksa.');
      }
    }
    startQrScanner();
    return () => {
      cancelled = true;
      if (scanLoopRef.current) cancelAnimationFrame(scanLoopRef.current);
      streamRef.current?.getTracks()?.forEach(track => track.stop());
      streamRef.current = null;
    };
  }, [qrMode]);

  useEffect(() => {
    if (selectedBoxId && !state.boxes.some(b => b.id === selectedBoxId && !b.placed)) {
      setSelectedBoxId(null);
    }
  }, [selectedBoxId, state.boxes]);

  const placed = state.boxes.filter(b => b.placed);
  const unplaced = state.boxes.filter(b => !b.placed);
  const validation = useMemo(() => {
    const invalidIds = new Set();
    for (const b of placed) {
      const r = boxRect(b);
      if (r.x < 0 || r.y < 0 || r.x + r.w > state.trailer.length || r.y + r.h > state.trailer.width) invalidIds.add(b.id);
    }
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        if (rectsOverlap(boxRect(placed[i]), boxRect(placed[j]))) {
          invalidIds.add(placed[i].id); invalidIds.add(placed[j].id);
        }
      }
    }
    const usedArea = placed.reduce((sum, b) => sum + b.length * b.width, 0);
    const trailerArea = state.trailer.length * state.trailer.width;
    return { invalidIds, usedArea, trailerArea, valid: invalidIds.size === 0 };
  }, [placed, state.trailer]);

  function updateTrailer(field, value) {
    setState(s => ({ ...s, trailer: { ...s.trailer, [field]: Math.max(0.1, Number(value) || 0.1) } }));
  }
  function updateType(id, patch) {
    setState(s => {
      const cargoTypes = s.cargoTypes.map(t => t.id === id ? { ...t, ...patch } : t);
      return { ...s, cargoTypes, boxes: makeBoxesFromTypes(cargoTypes, s.boxes) };
    });
  }
  function addType() {
    const newType = { id: crypto.randomUUID(), name: 'Nova stavka robe', length: 1.0, width: 0.8, qty: 1, color: '#22c55e' };
    setState(s => ({ ...s, cargoTypes: [...s.cargoTypes, newType], boxes: makeBoxesFromTypes([...s.cargoTypes, newType], s.boxes) }));
  }
  function deleteType(id) {
    setState(s => {
      const cargoTypes = s.cargoTypes.filter(t => t.id !== id);
      return { ...s, cargoTypes, boxes: makeBoxesFromTypes(cargoTypes, s.boxes.filter(b => b.typeId !== id)) };
    });
  }
  function pointerPos(e) {
    const rect = trailerRef.current.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / pxPerMeter, y: (e.clientY - rect.top) / pxPerMeter };
  }
  function startDrag(e, box) {
    if (mode !== 'drag') return;
    e.preventDefault();
    const isPlaced = box.placed;
    const p = isPlaced && trailerRef.current ? pointerPos(e) : { x: 0, y: 0 };
    setDrag({ id: box.id, offsetX: isPlaced ? p.x - box.x : 0.2, offsetY: isPlaced ? p.y - box.y : 0.2 });
  }
  function onPointerMove(e) {
    if (!drag || !trailerRef.current) return;
    const p = pointerPos(e);
    setState(s => {
      const movingBox = s.boxes.find(b => b.id === drag.id);
      if (!movingBox) return s;
      const bw = movingBox.rotated ? movingBox.width : movingBox.length;
      const bh = movingBox.rotated ? movingBox.length : movingBox.width;
      const rawBox = {
        ...movingBox,
        placed: true,
        x: clamp(p.x - drag.offsetX, 0, Math.max(0, s.trailer.length - bw)),
        y: clamp(p.y - drag.offsetY, 0, Math.max(0, s.trailer.width - bh)),
      };
      const snappedBox = snapBoxPosition(rawBox, s.boxes, s.trailer);
      return { ...s, boxes: s.boxes.map(b => b.id === drag.id ? snappedBox : b) };
    });
  }
  function onPointerUp() {
    if (!drag) return;
    setState(s => ({ ...s, boxes: s.boxes.map(b => b.id === drag.id ? snapBoxPosition(b, s.boxes, s.trailer) : b) }));
    setDrag(null);
  }
  function selectForGrid(box) {
    if (box.placed) return;
    setSelectedBoxId(box.id);
  }
  function placeSelectedAt(e) {
    if (mode !== 'grid' || !selectedBoxId || !trailerRef.current) return;
    if (e.target.closest('.box')) return;
    const p = pointerPos(e);
    setState(s => {
      const movingBox = s.boxes.find(b => b.id === selectedBoxId && !b.placed);
      if (!movingBox) return s;
      const bw = movingBox.rotated ? movingBox.width : movingBox.length;
      const bh = movingBox.rotated ? movingBox.length : movingBox.width;
      const laneHeight = s.trailer.width / LANES;
      const laneIndex = clamp(Math.floor(p.y / laneHeight), 0, LANES - 1);
      const laneTop = laneIndex * laneHeight;
      const laneY = clamp(laneTop + Math.max(0, (laneHeight - bh) / 2), 0, Math.max(0, s.trailer.width - bh));
      const laneStart = laneTop;
      const laneEnd = laneTop + laneHeight;
      const laneBoxes = s.boxes
        .filter(b => b.placed && rangesOverlap(boxRect(b).y, boxRect(b).y + boxRect(b).h, laneStart, laneEnd))
        .map(b => boxRect(b));
      const nextX = laneBoxes.length ? Math.max(...laneBoxes.map(r => r.x + r.w)) : 0;
      // Grid Click is locked: user chooses only the lane. The app snaps to the left edge
      // for the first box and then directly behind the last box in that lane.
      const candidate = { ...movingBox, placed: true, x: snapToGrid(nextX), y: laneY };
      return { ...s, boxes: s.boxes.map(b => b.id === selectedBoxId ? candidate : b) };
    });
  }
  function rotateBox(id) { setState(s => ({ ...s, boxes: s.boxes.map(b => b.id === id ? { ...b, rotated: !b.rotated } : b) })); }
  function unplaceBox(id) { setState(s => ({ ...s, boxes: s.boxes.map(b => b.id === id ? { ...b, placed: false, x: 0, y: 0 } : b) })); }
  function clearTrailer() { setState(s => ({ ...s, boxes: s.boxes.map(b => ({ ...b, placed: false, x: 0, y: 0 })) })); }
  function resetAll() { if (confirm('Reset entire project?')) setState({ ...DEFAULT_STATE, boxes: makeBoxesFromTypes(DEFAULT_STATE.cargoTypes, []) }); }

  function saveCurrentLoad() {
    const now = new Date().toISOString();
    const record = {
      id: crypto.randomUUID(),
      createdAt: now,
      thumbnail: createThumbnail(state.trailer, state.boxes),
      driverName: '',
      trailerWeight: '',
      cargoWeight: '',
      photos: [],
      trailer: { ...state.trailer },
      boxes: state.boxes.map(b => ({ ...b })),
      cargoTypes: state.cargoTypes.map(t => ({ ...t })),
      valid: validation.valid,
      usedArea: validation.usedArea,
    };
    setState(s => ({ ...s, savedLoads: [record, ...(s.savedLoads || [])] }));
  }
  function updateSavedLoad(id, patch) {
    setState(s => ({ ...s, savedLoads: (s.savedLoads || []).map(load => load.id === id ? { ...load, ...patch } : load) }));
  }
  function uploadSavedPhotos(id, files) {
    const selected = Array.from(files || []).slice(0, 6);
    if (!selected.length) return;
    Promise.all(selected.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: crypto.randomUUID(), name: file.name, dataUrl: reader.result });
      reader.readAsDataURL(file);
    }))).then(photos => {
      setState(s => ({ ...s, savedLoads: (s.savedLoads || []).map(load => load.id === id ? { ...load, photos: [...(load.photos || []), ...photos] } : load) }));
    });
  }
  function removeSavedPhoto(loadId, photoId) {
    setState(s => ({ ...s, savedLoads: (s.savedLoads || []).map(load => load.id === loadId ? { ...load, photos: (load.photos || []).filter(p => p.id !== photoId) } : load) }));
  }
  function getShareUrl(load) {
    const payload = buildSharePayload(load);
    return `${window.location.origin}${window.location.pathname}#load=${encodeSharePayload(payload)}`;
  }
  async function copyShareLink(load) {
    const url = getShareUrl(load);
    try { await navigator.clipboard.writeText(url); alert('Link je kopiran.'); }
    catch { window.prompt('Kopiraj link:', url); }
  }
  function emailShare(load) {
    const url = getShareUrl(load);
    const subject = encodeURIComponent('Prikaz utovara prikolice');
    const body = encodeURIComponent(`Prikaz utovara prikolice:
${url}

Datum: ${formatDateTime(load.createdAt)}
Vozač: ${load.driverName || '-'}
Težina prikolice: ${load.trailerWeight || '-'}
Težina tereta: ${load.cargoWeight || '-'}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
  function deleteSavedLoad(id) {
    setState(s => ({ ...s, savedLoads: (s.savedLoads || []).filter(load => load.id !== id) }));
  }
  function loadSavedLoad(load) {
    setState(s => ({
      ...s,
      trailer: { ...load.trailer },
      cargoTypes: load.cargoTypes ? load.cargoTypes.map(t => ({ ...t })) : s.cargoTypes,
      boxes: load.boxes.map(b => ({ ...b })),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  function addManualQr() {
    const value = manualQrValue.trim();
    if (!value) return;
    setPendingQr(value);
    setManualQrValue('');
  }
  function confirmQrType(productType) {
    if (!pendingQr) return;
    const newRow = {
      id: crypto.randomUUID(),
      boxNumber: pendingQr,
      productType,
      description: '',
      createdAt: new Date().toISOString(),
    };
    setQrRows(rows => [...rows, newRow]);
    setPendingQr('');
  }
  function updateQrRow(id, patch) {
    setQrRows(rows => rows.map(row => row.id === id ? { ...row, ...patch } : row));
  }
  function deleteQrRow(id) {
    setQrRows(rows => rows.filter(row => row.id !== id));
  }
  async function copyQrTable() {
    const table = formatQrRowsForEmail(qrRows);
    try { await navigator.clipboard.writeText(table); alert('Tabela je kopirana.'); }
    catch { window.prompt('Kopiraj tabelu:', table); }
  }
  function emailMarija() {
    const subject = encodeURIComponent(`Tabela boksova - ${new Date().toLocaleDateString('sr-RS')}`);
    const body = encodeURIComponent(`Zdravo Marija,

U nastavku je tabela skeniranih boksova:

${formatQrRowsForEmail(qrRows)}

Pozdrav`);
    window.location.href = `mailto:${MARIJA_EMAIL}?subject=${subject}&body=${body}`;
  }

  function openModule(view) {
    setAppView(view);
    setQrMode(view === 'scan');
    setPendingQr('');
    setShowInstructions(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getWorkTimeInfo(date = now) {
    const start = new Date(date);
    start.setHours(7, 0, 0, 0);
    const end = new Date(date);
    end.setHours(15, 0, 0, 0);
    let target = end;
    let label = 'Do kraja smene ostalo je';
    let done = false;
    if (date < start) {
      target = start;
      label = 'Do početka smene ostalo je';
    } else if (date >= end) {
      done = true;
    }
    if (done) return { status: 'Smena je završena.', hours: 0, minutes: 0, label: 'Radno vreme 07:00–15:00' };
    const diff = Math.max(0, target - date);
    const hours = Math.floor(diff / 36e5);
    const minutes = Math.floor((diff % 36e5) / 60000);
    return { label, hours, minutes, status: `${hours}h ${minutes}min` };
  }

  function saveTransferRecord() {
    if (!transferForm.art.trim() && !transferForm.qty.trim()) return;
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...transferForm };
    setTransfers(rows => [record, ...rows]);
    setTransferForm({ art: '', qty: '', from: '', to: '', note: '' });
  }

  function saveCountRecord() {
    if (!countForm.art.trim() && !countForm.qty.trim()) return;
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...countForm };
    setCounts(rows => [record, ...rows]);
    setCountForm({ art: '', qty: '', position: '', note: '' });
  }

  function moduleTitle() {
    return {
      load: 'Utovar prikolice',
      scan: 'Skeniranje boksova',
      transfer: 'Dopuna materijala',
      count: 'Brojanje materijala',
      history: 'Istorija',
      time: 'Vreme'
    }[appView] || 'Verano Logistics';
  }

  function instructionContent() {
    if (appView === 'scan') return <div className="instructions-grid">
      <div><h3>1. Skeniraj boks</h3><p>Usmeri kameru ka QR kodu boksa. Ako kamera ne očita, broj boksa možeš upisati ručno.</p></div>
      <div><h3>2. Izaberi tip robe</h3><p>Nakon skeniranja izaberi Roletne, Tende, Žaluzine ili Extra Transfer. Palete nisu u izboru jer nemaju QR kodove.</p></div>
      <div><h3>3. Dopuni opis</h3><p>U tabeli možeš ručno dopisati opis ili napomenu za svaki boks.</p></div>
      <div><h3>4. Pošalji Mariji</h3><p>Dugme otvara mail aplikaciju sa tabelom u tekstu poruke. Ti samo proveriš i klikneš Send.</p></div>
    </div>;
    if (appView === 'transfer') return <div className="instructions-grid"><div><h3>Dopuna materijala</h3><p>Unesi ART/ID, količinu, poziciju sa koje je uzeto i poziciju na koju je preneto. Sačuvani red ostaje u lokalnoj istoriji uređaja.</p></div></div>;
    if (appView === 'count') return <div className="instructions-grid"><div><h3>Brojanje materijala</h3><p>Unesi ART/ID, količinu i poziciju. Koristi se za brzu lokalnu evidenciju stanja.</p></div></div>;
    return <div className="instructions-grid">
      <div><h3>1. Izaberi način rada</h3><p><b>Drag</b> služi za ručno pomeranje robe. <b>Grid</b> dodaje robu u jednu od tri trake prikolice.</p></div>
      <div><h3>2. Menjanje robe</h3><p>U panelu „Tipovi robe“ možeš promeniti naziv, dimenzije, količinu i boju.</p></div>
      <div><h3>3. Prikolica</h3><p>Na telefonu je prikolica umanjena da se lakše koristi. Ako roba ne staje, prikazuje se upozorenje.</p></div>
      <div><h3>4. Čuvanje</h3><p>Sačuvaj prikolicu, upiši vozača, težine i dodaj slike po potrebi.</p></div>
    </div>;
  }


  const isMobile = viewportWidth <= 768;
  const pxPerMeter = isMobile ? Math.max(28, Math.min(46, (viewportWidth - 44) / Math.max(state.trailer.length, 1))) : PX_PER_METER;
  const toPx = (m) => m * pxPerMeter;
  const trailerHeight = isMobile ? Math.max(toPx(state.trailer.width), 78) : Math.max(toPx(state.trailer.width), 210);
  const trailerStyle = { width: toPx(state.trailer.length), height: trailerHeight };
  const workInfo = getWorkTimeInfo();

  const ModuleHeader = ({ children }) => <header className="module-header">
    <button className="back-home" onClick={() => openModule('home')}><ArrowLeft size={17}/> Početna</button>
    <h1>{moduleTitle()}</h1>
    <div className="module-actions">
      {children}
      <button className="ghost" onClick={() => setShowInstructions(true)}>Uputstvo</button>
    </div>
  </header>;

  return <main className={`app app-${appView}`} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
    {appView === 'home' && <section className="home-screen">
      <div className="home-logo">
        <div className="brand-strip home-brand">
          <img src="/popovic.jpg" alt="Popović logo" />
          <X size={22} className="collab-x" />
          <img src="/verano.jpg" alt="Verano logo" />
        </div>
        <h1>Verano Logistics</h1>
      </div>

      <div className="home-grid">
        <button className="home-tile" onClick={() => openModule('load')}><span className="tile-icon">🚚</span><b>UTOVAR</b></button>
        <button className="home-tile" onClick={() => openModule('scan')}><span className="tile-icon">📦</span><b>SKENIRANJE</b></button>
        <button className="home-tile" onClick={() => openModule('transfer')}><span className="tile-icon">🔄</span><b>DOPUNA</b></button>
        <button className="home-tile" onClick={() => openModule('count')}><span className="tile-icon">🔢</span><b>BROJANJE</b></button>
        <button className="home-tile" onClick={() => openModule('history')}><span className="tile-icon">📖</span><b>ISTORIJA</b></button>
        <button className="home-tile" onClick={() => openModule('time')}><span className="tile-icon">⏰</span><b>VREME</b></button>
      </div>

      <div className="quote-card">
        <span>Citati</span>
        <p>“{APP_QUOTES[quoteIndex]}”</p>
      </div>
    </section>}

    {showInstructions && <div className="modal-backdrop" onClick={() => setShowInstructions(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Uputstvo — {moduleTitle()}</h2>
          <button className="ghost" onClick={() => setShowInstructions(false)}><X size={16}/> Zatvori</button>
        </div>
        {instructionContent()}
      </div>
    </div>}

    {sharedLoad && <section className="shared-view">
      <div className="shared-head">
        <div><h2>Deljeni prikaz utovara</h2><p>Ovo je samo prikaz sačuvane prikolice.</p></div>
        <button className="ghost" onClick={() => { window.location.hash = ''; setSharedLoad(null); }}><X size={16}/> Zatvori prikaz</button>
      </div>
      <div className="shared-card">
        <img src={sharedLoad.thumbnail} alt="Prikaz utovara" />
        <div>
          <b>Datum:</b> {sharedLoad.createdAt ? formatDateTime(sharedLoad.createdAt) : '-'}<br/>
          <b>Vozač:</b> {sharedLoad.driverName || '-'}<br/>
          <b>Težina prikolice:</b> {sharedLoad.trailerWeight || '-'}<br/>
          <b>Težina tereta:</b> {sharedLoad.cargoWeight || '-'}<br/>
          <b>Status:</b> {sharedLoad.valid ? 'OK' : 'NEMA MESTA'}
        </div>
      </div>
    </section>}

    {appView === 'load' && <>
      <ModuleHeader><div className={validation.valid ? 'status ok' : 'status bad'}>{validation.valid ? 'Sve staje' : 'NEMA MESTA'}</div></ModuleHeader>
      <section className="metrics">
        <label>Dužina prikolice <input type="number" step="0.1" value={state.trailer.length} onChange={e => updateTrailer('length', e.target.value)} /> m</label>
        <label>Širina / dubina prikolice <input type="number" step="0.05" value={state.trailer.width} onChange={e => updateTrailer('width', e.target.value)} /> m</label>
        <div><b>{placed.length}</b> placed / <b>{unplaced.length}</b> unplaced</div>
        <div><b>{validation.usedArea.toFixed(2)}m²</b> used / {validation.trailerArea.toFixed(2)}m²</div>
        <div><b>{Math.round((validation.usedArea / validation.trailerArea) * 100) || 0}%</b> area used</div>
      </section>

      <section className="mode-panel compact small-mode-panel">
        <h2>Način pakovanja</h2>
        <div className="segmented-switch">
          <button className={mode === 'drag' ? 'active' : ''} onClick={() => setMode('drag')}><MousePointer2 size={14}/> Drag</button>
          <button className={mode === 'grid' ? 'active' : ''} onClick={() => setMode('grid')}><Grid3X3 size={14}/> Grid</button>
        </div>
      </section>

      <section className="workspace">
        <section className="main-area">
          <div className="trailer-wrap compact-trailer-wrap">
            <div className="dim dim-top">{state.trailer.length} m</div>
            <div className={`trailer ${validation.valid ? '' : 'bad-trailer'}`} ref={trailerRef} style={trailerStyle} onPointerDown={placeSelectedAt}>
              {!validation.valid && <div className="no-space-banner">NEMA MESTA</div>}
              <div className="dim dim-side">{state.trailer.width} m</div>
              <div className="lane-line lane-line-1"></div>
              <div className="lane-line lane-line-2"></div>
              {placed.map(b => {
                const invalid = validation.invalidIds.has(b.id);
                const w = toPx(b.rotated ? b.width : b.length);
                const h = toPx(b.rotated ? b.length : b.width);
                return <div key={b.id} onPointerDown={e => startDrag(e, b)} className={`box placed ${invalid ? 'invalid' : ''}`} style={{ left: toPx(b.x), top: toPx(b.y), width: w, height: h, background: b.color }}>
                  <strong>{b.name}</strong><span>{formatMeters(b.rotated ? b.width : b.length)} × {formatMeters(b.rotated ? b.length : b.width)}</span>
                  <div className="box-actions"><button onClick={(e)=>{e.stopPropagation(); rotateBox(b.id)}}><RotateCw size={13}/></button><button onClick={(e)=>{e.stopPropagation(); unplaceBox(b.id)}}><Trash2 size={13}/></button></div>
                </div>;
              })}
            </div>
          </div>
          <div className="actions">
            <button onClick={saveCurrentLoad}><Save size={16}/> Sačuvaj prikolicu</button>
            <button onClick={clearTrailer}><RotateCcw size={16}/> Isprazni prikolicu</button>
            <button className="danger" onClick={resetAll}><Trash2 size={16}/> Resetuj sve</button>
            <span><Save size={15}/> Automatski sačuvano lokalno</span>
          </div>
          <h2>Dostupna roba</h2>
          <div className="available compact-available">
            {unplaced.map(b => <div key={b.id} onPointerDown={e => mode === 'drag' ? startDrag(e, b) : selectForGrid(b)} className={`box preview ${selectedBoxId === b.id ? 'selected-box' : ''}`} style={{ background: b.color }}><strong>{b.name}</strong><span>{formatMeters(b.length)} × {formatMeters(b.width)}</span>{mode === 'grid' && selectedBoxId === b.id && <em>Izabran</em>}</div>)}
          </div>
        </section>

        <aside className="panel types-panel">
          <div className="panel-title"><h2>Tipovi robe</h2><button onClick={addType}><Plus size={16}/> Dodaj</button></div>
          {state.cargoTypes.map(t => <div className="type-card" key={t.id}>
            <input value={t.name} onChange={e => updateType(t.id, { name: e.target.value })}/>
            <div className="row"><label>Dužina (m) <input type="number" step="0.1" value={t.length} onChange={e => updateType(t.id, { length: e.target.value })}/></label><label>Širina (m) <input type="number" step="0.1" value={t.width} onChange={e => updateType(t.id, { width: e.target.value })}/></label></div>
            <div className="row"><label>Količina <input type="number" min="0" value={t.qty} onChange={e => updateType(t.id, { qty: e.target.value })}/></label><label>Boja <input type="color" value={t.color} onChange={e => updateType(t.id, { color: e.target.value })}/></label></div>
            <button className="ghost danger" onClick={() => deleteType(t.id)}><Trash2 size={14}/> Obriši tip</button>
          </div>)}
        </aside>
      </section>

      <section className="saved-section">
        <div className="saved-title"><h2>Sačuvane prikolice</h2></div>
        <div className="saved-table-wrap">
          <table className="saved-table">
            <thead><tr><th>Prikaz</th><th>Datum i vreme</th><th>Ime vozača</th><th>Težina prikolice</th><th>Težina tereta</th><th>Slike</th><th>Status</th><th>Share</th><th></th></tr></thead>
            <tbody>
              {(state.savedLoads || []).length === 0 && <tr><td colSpan="9" className="empty-row">Još nema sačuvanih prikolica.</td></tr>}
              {(state.savedLoads || []).map(load => <tr key={load.id}>
                <td><img className="thumb" src={load.thumbnail} alt="Sačuvan raspored prikolice" /></td>
                <td>{formatDateTime(load.createdAt)}</td>
                <td><input placeholder="Ime vozača" value={load.driverName} onChange={e => updateSavedLoad(load.id, { driverName: e.target.value })}/></td>
                <td><input placeholder="npr. 7200 kg" value={load.trailerWeight} onChange={e => updateSavedLoad(load.id, { trailerWeight: e.target.value })}/></td>
                <td><input placeholder="npr. 18000 kg" value={load.cargoWeight} onChange={e => updateSavedLoad(load.id, { cargoWeight: e.target.value })}/></td>
                <td><label className="upload-btn"><Upload size={14}/> Dodaj slike<input type="file" accept="image/*" multiple onChange={e => uploadSavedPhotos(load.id, e.target.files)} /></label><div className="photo-strip">{(load.photos || []).map(photo => <span key={photo.id} className="photo-mini"><img src={photo.dataUrl} alt={photo.name}/><button onClick={() => removeSavedPhoto(load.id, photo.id)}>×</button></span>)}</div></td>
                <td><span className={load.valid ? 'mini-status ok' : 'mini-status bad'}>{load.valid ? 'OK' : 'Nema mesta'}</span></td>
                <td className="share-actions"><button onClick={() => copyShareLink(load)}><Copy size={15}/> Link</button><button onClick={() => emailShare(load)}><Mail size={15}/> Email</button></td>
                <td className="saved-actions"><button onClick={() => loadSavedLoad(load)}><Edit3 size={15}/> Učitaj</button><button className="icon-danger" onClick={() => deleteSavedLoad(load.id)}><Trash2 size={15}/></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </>}

    {appView === 'scan' && <>
      <ModuleHeader />
      <section className="qr-module">
        <div className="qr-top">
          <div className="qr-scanner-card">
            <div className="qr-scanner-head"><h2><QrCode size={22}/> Skeniranje boksova</h2><span className="qr-count">{qrRows.length} redova</span></div>
            {!pendingQr ? <>
              <div className="camera-box"><video ref={videoRef} muted playsInline /><div className="scan-frame"><Camera size={30}/><span>Usmeri kameru ka QR kodu</span></div></div>
              {scannerError && <div className="scanner-error">{scannerError}</div>}
              <div className="manual-scan"><input value={manualQrValue} onChange={e => setManualQrValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addManualQr(); }} placeholder="Ručno unesi broj boksa" /><button onClick={addManualQr}>Dodaj broj</button></div>
            </> : <div className="type-picker"><h3>Boks: <span>{pendingQr}</span></h3><div className="type-picker-buttons">{QR_PRODUCT_TYPES.map(type => <button key={type} onClick={() => confirmQrType(type)}>{type}</button>)}</div><button className="ghost" onClick={() => setPendingQr('')}>Poništi</button></div>}
          </div>
        </div>
        <div className="qr-table-section">
          <div className="qr-table-title"><h2>Excel tabela</h2><div className="qr-actions"><button onClick={emailMarija} disabled={!qrRows.length}><Send size={15}/> Pošalji Mariji</button><button className="ghost" onClick={copyQrTable} disabled={!qrRows.length}><Copy size={15}/> Kopiraj</button><button className="ghost" onClick={() => downloadQrCsv(qrRows)} disabled={!qrRows.length}><FileSpreadsheet size={15}/> CSV</button><button className="danger" onClick={() => { if (confirm('Obrisati celu QR tabelu?')) setQrRows([]); }} disabled={!qrRows.length}><Trash2 size={15}/> Obriši</button></div></div>
          <div className="qr-table-wrap"><table className="qr-table"><thead><tr><th>#</th><th>Broj boksa</th><th>Tip robe</th><th>Opis</th><th></th></tr></thead><tbody>{!qrRows.length && <tr><td colSpan="5" className="empty-row">Još nema skeniranih boksova.</td></tr>}{qrRows.map((row, index) => <tr key={row.id}><td>{index + 1}</td><td><input value={row.boxNumber} onChange={e => updateQrRow(row.id, { boxNumber: e.target.value })}/></td><td><select value={row.productType} onChange={e => updateQrRow(row.id, { productType: e.target.value })}>{QR_PRODUCT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></td><td><input value={row.description} onChange={e => updateQrRow(row.id, { description: e.target.value })} placeholder="Opis" /></td><td><button className="icon-danger" onClick={() => deleteQrRow(row.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
        </div>
      </section>
    </>}

    {appView === 'transfer' && <>
      <ModuleHeader />
      <section className="simple-module"><h2>Dopuna materijala</h2><div className="form-grid"><input placeholder="ART / ID" value={transferForm.art} onChange={e => setTransferForm(f => ({...f, art:e.target.value}))}/><input placeholder="Količina" value={transferForm.qty} onChange={e => setTransferForm(f => ({...f, qty:e.target.value}))}/><input placeholder="Pozicija odakle" value={transferForm.from} onChange={e => setTransferForm(f => ({...f, from:e.target.value}))}/><input placeholder="Pozicija gde" value={transferForm.to} onChange={e => setTransferForm(f => ({...f, to:e.target.value}))}/><input className="wide" placeholder="Opis / napomena" value={transferForm.note} onChange={e => setTransferForm(f => ({...f, note:e.target.value}))}/><button onClick={saveTransferRecord}><Save size={16}/> Sačuvaj dopunu</button></div><div className="record-list">{transfers.length===0 && <p className="empty-card">Još nema dopuna.</p>}{transfers.map(r => <div className="record-card" key={r.id}><b>{r.art || '-'}</b><span>{r.qty || '-'} kom</span><span>{r.from || '-'} → {r.to || '-'}</span><small>{formatDateTime(r.createdAt)}</small><p>{r.note}</p></div>)}</div></section>
    </>}

    {appView === 'count' && <>
      <ModuleHeader />
      <section className="simple-module"><h2>Brojanje materijala</h2><div className="form-grid"><input placeholder="ART / ID" value={countForm.art} onChange={e => setCountForm(f => ({...f, art:e.target.value}))}/><input placeholder="Količina" value={countForm.qty} onChange={e => setCountForm(f => ({...f, qty:e.target.value}))}/><input placeholder="Pozicija" value={countForm.position} onChange={e => setCountForm(f => ({...f, position:e.target.value}))}/><input className="wide" placeholder="Opis / napomena" value={countForm.note} onChange={e => setCountForm(f => ({...f, note:e.target.value}))}/><button onClick={saveCountRecord}><Save size={16}/> Sačuvaj brojanje</button></div><div className="record-list">{counts.length===0 && <p className="empty-card">Još nema brojanja.</p>}{counts.map(r => <div className="record-card" key={r.id}><b>{r.art || '-'}</b><span>{r.qty || '-'} kom</span><span>Pozicija: {r.position || '-'}</span><small>{formatDateTime(r.createdAt)}</small><p>{r.note}</p></div>)}</div></section>
    </>}

    {appView === 'history' && <>
      <ModuleHeader />
      <section className="simple-module"><h2>Istorija</h2><div className="history-grid"><div><h3>Prikolice</h3><p>{(state.savedLoads || []).length} sačuvanih prikolica</p></div><div><h3>Boksovi</h3><p>{qrRows.length} skeniranih boksova</p></div><div><h3>Dopune</h3><p>{transfers.length} zapisa</p></div><div><h3>Brojanje</h3><p>{counts.length} zapisa</p></div></div></section>
    </>}

    {appView === 'time' && <>
      <ModuleHeader />
      <section className="time-screen"><div className="time-card"><Clock3 size={64}/><h2>{now.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })}</h2><p>Radno vreme: 07:00–15:00</p><strong>{workInfo.label}</strong><div className="time-left">{workInfo.status}</div></div></section>
    </>}
  </main>;

}

createRoot(document.getElementById('root')).render(<App />);
