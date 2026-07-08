import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import HomeScreen from './components/HomeScreen.jsx';
import InstructionModal from './components/InstructionModal.jsx';
import SharedLoadView from './components/SharedLoadView.jsx';
import LoadingSimulator from './components/LoadingSimulator.jsx';
import ScannerModule from './components/ScannerModule.jsx';
import TransferModule from './components/TransferModule.jsx';
import InventoryModule from './components/InventoryModule.jsx';
import HistoryModule from './components/HistoryModule.jsx';
import TimeModule from './components/TimeModule.jsx';
import ProductionModule from './components/ProductionModule.jsx';

import { STORAGE_KEY, PX_PER_METER, MARIJA_EMAIL, TRANSFER_EMAIL, APP_LOGO_SRC, QR_STORAGE_KEY, QR_PRODUCT_TYPES, TRANSFER_STORAGE_KEY, SENT_TRANSFER_STORAGE_KEY, COUNT_STORAGE_KEY, INVENTORY_STORAGE_KEY, PRODUCTION_WRITEOFF_STORAGE_KEY, BACKUP_SCHEMA_VERSION, APP_QUOTES, DEFAULT_STATE } from './utils/constants.js';
import { clamp, rectsOverlap, boxRect, snapBoxPosition, makeBoxesFromTypes, snapToGrid, rangesOverlap, LANES } from './utils/trailerUtils.js';
import { makePlannedBoxes } from './utils/loadingPlanner.js';
import { createThumbnail } from './utils/thumbnailUtils.js';
import { formatDateTime, formatMeters } from './utils/formatUtils.js';
import { encodeSharePayload, decodeSharePayload, buildSharePayload } from './utils/shareUtils.js';
import { formatQrRowsForEmail, todayIsoDate, todaySrDate, downloadScanningXlsx, formatTransferRowsForEmail, downloadTransferXlsx } from './utils/excelUtils.js';
import { downloadJsonFile, readFileAsText, readImageFiles, matchesQuery } from './utils/fileUtils.js';
import { artDigits, normalizeArtNumber, normalizeWarehouseLocation } from './utils/dataFormat.js';


export default function App() {
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
  const [sentTransfers, setSentTransfers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SENT_TRANSFER_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [lastPlacedBoxId, setLastPlacedBoxId] = useState(null);
  const [showLoadIntro, setShowLoadIntro] = useState(true);
  const [counts, setCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(COUNT_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [inventory, setInventory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [productionWriteoffs, setProductionWriteoffs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PRODUCTION_WRITEOFF_STORAGE_KEY)) || []; } catch { return []; }
  });
  const [transferForm, setTransferForm] = useState({ art: '', qty: '', from: '', to: '', note: '' });
  const [countForm, setCountForm] = useState({ art: '', qty: '', position: '', note: '' });
  const [inventoryForm, setInventoryForm] = useState({ art: '', name: '', qty: '', position: '', note: '' });
  const [historySearch, setHistorySearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [pendingQr, setPendingQr] = useState('');
  const pendingQrRef = useRef('');
  const [manualQrValue, setManualQrValue] = useState('');
  const [scannerError, setScannerError] = useState('');
  const [qrScanKind, setQrScanKind] = useState('product');
  const [qrScanMessage, setQrScanMessage] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanLoopRef = useRef(null);
  const trailerRef = useRef(null);
  const qrScanKindRef = useRef('product');
  const qrRowsRef = useRef([]);
  const lastQrScanRef = useRef({ value: '', at: 0 });
  const qrMessageTimerRef = useRef(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  useEffect(() => { pendingQrRef.current = pendingQr; }, [pendingQr]);
  useEffect(() => { qrScanKindRef.current = qrScanKind; }, [qrScanKind]);
  useEffect(() => { qrRowsRef.current = qrRows; localStorage.setItem(QR_STORAGE_KEY, JSON.stringify(qrRows)); }, [qrRows]);
  useEffect(() => { localStorage.setItem(TRANSFER_STORAGE_KEY, JSON.stringify(transfers)); }, [transfers]);
  useEffect(() => { localStorage.setItem(SENT_TRANSFER_STORAGE_KEY, JSON.stringify(sentTransfers)); }, [sentTransfers]);
  useEffect(() => { localStorage.setItem(COUNT_STORAGE_KEY, JSON.stringify(counts)); }, [counts]);
  useEffect(() => { localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem(PRODUCTION_WRITEOFF_STORAGE_KEY, JSON.stringify(productionWriteoffs)); }, [productionWriteoffs]);
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
          try {
            const codes = await detector.detect(videoRef.current);
            const value = codes?.[0]?.rawValue?.trim();
            if (value) handleScannedQr(value);
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

  const totalPlacedBoxCount = placed.reduce((sum, b) => sum + Number(b.stackCount || 1), 0);

  const allHistory = useMemo(() => {
    const loads = (state.savedLoads || []).map(load => ({
      id: load.id,
      type: 'Utovar',
      icon: '🚚',
      createdAt: load.createdAt,
      title: `Utovar prikolice${load.driverName ? ` - ${load.driverName}` : ''}`,
      summary: `Vozač: ${load.driverName || '-'} · Prikolica: ${load.trailerWeight || '-'} · Teret: ${load.cargoWeight || '-'} · Status: ${load.valid ? 'OK' : 'NEMA MESTA'}`,
      searchText: JSON.stringify(load)
    }));
    const scans = qrRows.map((row, index) => ({
      id: row.id,
      type: 'Skeniranje',
      icon: '📦',
      createdAt: row.createdAt || row.updatedAt,
      title: `CPR ${row.cpr || row.boxNumber || index + 1}`,
      summary: `Boks: ${row.boxNumber || '-'} · ${row.productType || '-'}`,
      searchText: JSON.stringify(row)
    }));
    const transferItems = [...transfers, ...sentTransfers].map(row => ({
      id: row.id,
      type: 'Dopuna',
      icon: '🔄',
      createdAt: row.createdAt || row.sentAt,
      title: `ART ${row.art || '-'}`,
      summary: `Količina: ${row.qty || '-'} · Bulk: ${row.from || '-'} · Pick: ${row.to || '-'}${row.note ? ` · ${row.note}` : ''}`,
      searchText: JSON.stringify(row)
    }));
    const productionItems = (productionWriteoffs || []).map(row => ({
      id: row.id,
      type: 'Proizvodnja',
      icon: '✕',
      createdAt: row.updatedAt || row.createdAt,
      title: `${row.art || '-'} · ${row.pickLocation || '-'}`,
      summary: `Otpis: ${row.quantity || '-'} · Lokacija: ${row.pickLocation || '-'}`,
      searchText: JSON.stringify(row)
    }));
    return [...loads, ...scans, ...transferItems, ...productionItems]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [state.savedLoads, qrRows, transfers, sentTransfers, productionWriteoffs]);
  const filteredHistory = useMemo(() => allHistory.filter(item => {
    const dateText = item.createdAt ? `${formatDateTime(item.createdAt)} ${new Date(item.createdAt).toISOString().slice(0, 10)}` : '';
    return matchesQuery(`${item.type} ${item.title} ${item.summary} ${dateText} ${item.searchText}`, historySearch);
  }), [allHistory, historySearch]);
  const filteredInventory = useMemo(() => inventory.filter(item => matchesQuery(`${item.art} ${item.name} ${item.qty} ${item.position} ${item.note}`, inventorySearch)), [inventory, inventorySearch]);

  function applyLoadingQuantities(physicalCounts) {
    setState(s => {
      const planned = makePlannedBoxes(s.cargoTypes, physicalCounts);
      return { ...s, cargoTypes: planned.cargoTypes, boxes: planned.boxes };
    });
    setSelectedBoxId(null);
    setLastPlacedBoxId(null);
    setShowLoadIntro(false);
  }

  function skipLoadingQuantities() {
    setShowLoadIntro(false);
  }

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
    const newType = { id: crypto.randomUUID(), name: 'Nova stavka robe', length: 1.0, width: 0.8, qty: 1, stackCount: 4, color: '#22c55e' };
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
    setDrag({ id: box.id, wasPlaced: isPlaced, offsetX: isPlaced ? p.x - box.x : 0.2, offsetY: isPlaced ? p.y - box.y : 0.2 });
  }
  function onPointerMove(e) {
    if (!drag || !trailerRef.current) return;
    const p = pointerPos(e);
    setState(s => {
      const movingBox = s.boxes.find(b => b.id === drag.id);
      if (!movingBox) return s;
      const bw = Number(movingBox.length) || 0;
      const bh = Number(movingBox.width) || 0;
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
    if (!drag.wasPlaced) setLastPlacedBoxId(drag.id);
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
      const bw = Number(movingBox.length) || 0;
      const bh = Number(movingBox.width) || 0;
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
      const candidateX = snapToGrid(nextX);
      if (bh > laneHeight || candidateX + bw > s.trailer.length) {
        alert('Ne može da stane u ovaj red.');
        return s;
      }
      const candidate = { ...movingBox, placed: true, x: candidateX, y: laneY };
      setLastPlacedBoxId(selectedBoxId);
      return { ...s, boxes: s.boxes.map(b => b.id === selectedBoxId ? candidate : b) };
    });
  }
  function undoLastPlaced() {
    if (!lastPlacedBoxId) return;
    setState(s => ({ ...s, boxes: s.boxes.map(b => b.id === lastPlacedBoxId ? { ...b, placed: false, x: 0, y: 0 } : b) }));
    setLastPlacedBoxId(null);
  }
  function unplaceBox(id) { setState(s => ({ ...s, boxes: s.boxes.map(b => b.id === id ? { ...b, placed: false, x: 0, y: 0 } : b) })); }
  function clearTrailer() { setState(s => ({ ...s, boxes: s.boxes.map(b => ({ ...b, placed: false, x: 0, y: 0 })) })); setLastPlacedBoxId(null); }
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


  function showQrMessage(message) {
    setQrScanMessage(message);
    if (qrMessageTimerRef.current) clearTimeout(qrMessageTimerRef.current);
    qrMessageTimerRef.current = setTimeout(() => setQrScanMessage(''), 2200);
  }

  function makeId() {
    return crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  }

  function normalizeQrValue(value) {
    return String(value || '').trim();
  }

  function handleScannedQr(rawValue) {
    const value = normalizeQrValue(rawValue);
    if (!value) return;
    const nowMs = Date.now();
    const last = lastQrScanRef.current;
    if (last.value === value && nowMs - last.at < 1000) return;
    lastQrScanRef.current = { value, at: nowMs };

    if (navigator.vibrate) navigator.vibrate(35);
    setScannerError('');

    if (qrScanKindRef.current === 'box') {
      setQrRows(rows => {
        const waiting = rows.filter(row => !row.boxNumber);
        if (!waiting.length) {
          showQrMessage('Nema CPR-ova koji čekaju boks. Prvo skeniraj proizvode.');
          return rows;
        }
        showQrMessage(`${waiting.length} CPR povezano sa boksom ${value}`);
        return rows.map(row => !row.boxNumber ? { ...row, boxNumber: value, updatedAt: new Date().toISOString() } : row);
      });
      return;
    }

    setQrRows(rows => {
      const exists = rows.some(row => normalizeQrValue(row.cpr || row.boxNumber).toLowerCase() === value.toLowerCase());
      if (exists) {
        showQrMessage(`Već skenirano: ${value}`);
        return rows;
      }
      showQrMessage(`Skenirano: ${value}`);
      return [...rows, {
        id: makeId(),
        cpr: value,
        boxNumber: '',
        productType: '',
        description: '',
        createdAt: new Date().toISOString(),
      }];
    });
  }

  function addManualQr() {
    const value = manualQrValue.trim();
    if (!value) return;
    handleScannedQr(value);
    setManualQrValue('');
  }

  function applyQrProductType(productType) {
    setQrRows(rows => rows.map(row => row.productType ? row : { ...row, productType, updatedAt: new Date().toISOString() }));
    showQrMessage(`Tip robe dodat: ${productType}`);
  }

  function undoLastQrRow() {
    setQrRows(rows => rows.slice(0, -1));
    showQrMessage('Poslednji red je obrisan.');
  }

  function confirmQrType(productType) {
    applyQrProductType(productType);
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
    if (!qrRows.length) return;
    downloadScanningXlsx(qrRows);
    const subject = encodeURIComponent(`Scanning lista - ${todaySrDate()}`);
    const body = encodeURIComponent(`Zdravo Marija,

Skinuta je Excel scanning lista za ${todaySrDate()}.

U prilogu treba dodati fajl: scanning-lista-${todayIsoDate()}.xlsx

Pregled tabele:

${formatQrRowsForEmail(qrRows)}

Pozdrav`);
    window.location.href = `mailto:${MARIJA_EMAIL}?subject=${subject}&body=${body}`;
  }

  function emailTransfer() {
    if (!transfers.length) {
      alert('Prvo dodaj bar jednu dopunu.');
      return;
    }
    const subject = encodeURIComponent(`Dopuna materijala - ${todaySrDate()}`);
    const body = encodeURIComponent(`Dopuna materijala
Datum: ${todaySrDate()}

${formatTransferRowsForEmail(transfers)}

Pozdrav`);
    window.location.href = `mailto:${TRANSFER_EMAIL}?subject=${subject}&body=${body}`;
    const sentAt = new Date().toISOString();
    setSentTransfers(rows => [...transfers.map(t => ({ ...t, sentAt })), ...rows]);
    setTransfers([]);
  }

  function exportTransferExcel() {
    if (!transfers.length) return;
    downloadTransferXlsx(transfers);
  }

  function clearTransfers() {
    if (confirm('Obrisati sve dopune?')) setTransfers([]);
  }

  function deleteTransferRecord(id) {
    setTransfers(rows => rows.filter(row => row.id !== id));
  }

  function openModule(view) {
    setAppView(view);
    setQrMode(view === 'scan');
    setPendingQr('');
    setQrScanMessage('');
    setShowInstructions(false);
    if (view === 'load') {
      setShowLoadIntro(true);
      setSelectedBoxId(null);
    }
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
    const digits = artDigits(transferForm.art);
    if (digits.length !== 6) {
      alert('Art nije kompletan');
      return;
    }
    if (!transferForm.qty.trim()) {
      alert('Unesi količinu.');
      return;
    }
    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...transferForm,
      art: `ART-${digits}`,
      from: normalizeWarehouseLocation(transferForm.from),
      to: normalizeWarehouseLocation(transferForm.to)
    };
    setTransfers(rows => [record, ...rows]);
    setTransferForm({ art: '', qty: '', from: '', to: '', note: '' });
  }

  function saveCountRecord() {
    if (!countForm.art.trim() && !countForm.qty.trim()) return;
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...countForm, art: normalizeArtNumber(countForm.art) || countForm.art, position: normalizeWarehouseLocation(countForm.position) || countForm.position };
    setCounts(rows => [record, ...rows]);
    setCountForm({ art: '', qty: '', position: '', note: '' });
  }


  function saveInventoryItem() {
    if (!inventoryForm.art.trim() && !inventoryForm.name.trim()) return;
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), photos: [], ...inventoryForm, art: normalizeArtNumber(inventoryForm.art) || inventoryForm.art, position: normalizeWarehouseLocation(inventoryForm.position) || inventoryForm.position };
    setInventory(rows => [record, ...rows]);
    setInventoryForm({ art: '', name: '', qty: '', position: '', note: '' });
  }
  function updateInventoryItem(id, patch) {
    setInventory(rows => rows.map(row => row.id === id ? { ...row, ...patch, updatedAt: new Date().toISOString() } : row));
  }
  function deleteInventoryItem(id) {
    if (confirm('Obrisati artikal iz inventara?')) setInventory(rows => rows.filter(row => row.id !== id));
  }
  async function uploadInventoryPhotos(id, files) {
    const photos = await readImageFiles(files, 4);
    if (!photos.length) return;
    setInventory(rows => rows.map(row => row.id === id ? { ...row, photos: [...(row.photos || []), ...photos], updatedAt: new Date().toISOString() } : row));
  }
  function removeInventoryPhoto(itemId, photoId) {
    setInventory(rows => rows.map(row => row.id === itemId ? { ...row, photos: (row.photos || []).filter(p => p.id !== photoId), updatedAt: new Date().toISOString() } : row));
  }
  function downloadBackup() {
    const backup = {
      schema: 'verano-logistics-backup',
      version: BACKUP_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      state,
      qrRows,
      transfers,
      sentTransfers,
      counts,
      inventory,
      productionWriteoffs
    };
    downloadJsonFile(`verano-backup-${todayIsoDate()}.json`, backup);
  }
  async function restoreBackup(file) {
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const backup = JSON.parse(text);
      if (!backup || backup.schema !== 'verano-logistics-backup') {
        alert('Ovo ne izgleda kao Verano backup fajl.');
        return;
      }
      if (!confirm('Vraćanje backup-a će zameniti lokalne podatke u aplikaciji. Nastaviti?')) return;
      if (backup.state) setState({ ...DEFAULT_STATE, ...backup.state, savedLoads: backup.state.savedLoads || [] });
      setQrRows(backup.qrRows || []);
      setTransfers(backup.transfers || []);
      setSentTransfers(backup.sentTransfers || []);
      setCounts(backup.counts || []);
      setInventory(backup.inventory || []);
      setProductionWriteoffs(backup.productionWriteoffs || []);
      alert('Backup je vraćen.');
    } catch (err) {
      console.error(err);
      alert('Backup nije mogao da se učita.');
    }
  }


  function resetHistory() {
    if (!confirm('Obrisati istoriju utovara, skeniranja, dopuna i otpisa?')) return;
    setState(s => ({ ...s, savedLoads: [] }));
    setQrRows([]);
    setTransfers([]);
    setSentTransfers([]);
    setProductionWriteoffs([]);
    try { localStorage.setItem(PRODUCTION_WRITEOFF_STORAGE_KEY, JSON.stringify([])); } catch {}
  }

  function moduleTitle() {
    return {
      load: 'Utovar prikolice',
      scan: 'Skeniranje boksova',
      logistics: 'Logistika',
      production: 'Otpis materijala',
      transfer: 'Dopuna materijala',
      count: 'Inventar / stanje',
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
    if (appView === 'transfer') return <div className="instructions-grid"><div><h3>Dopuna materijala</h3><p>Unesi ART/ID, količinu, poziciju sa koje je uzeto i poziciju na koju je preneto. Sačuvani red ostaje u lokalnoj istoriji uređaja.</p></div><div><h3>Dnevni refil</h3><p>U dnevnom refilu učitaj Excel, proveri količine, dopiši napomenu i preuzmi ili podeli završni Excel.</p></div></div>;
    if (appView === 'production') return <div className="instructions-grid"><div><h3>Otpis</h3><p>Unesi pick lokaciju i količinu za otpis. Ako istu pick lokaciju dodaš više puta, aplikacija automatski sabira ukupnu metražu.</p></div><div><h3>Preuzmi Excel</h3><p>Na kraju preuzmi Excel sa dve kolone: Pick lokacija i ukupna metraža.</p></div></div>;
    if (appView === 'count') return <div className="instructions-grid"><div><h3>Inventar / stanje</h3><p>Dodaj artikal, količinu, poziciju i slike. Sve ostaje lokalno i može da se pronađe kroz istoriju i pretragu.</p></div><div><h3>Brojanje</h3><p>Donji deo ekrana možeš koristiti za brza brojanja stanja materijala po pozicijama.</p></div></div>;
    return <div className="instructions-grid">
      <div><h3>1. Izaberi način rada</h3><p><b>Drag</b> služi za ručno pomeranje robe. <b>Grid</b> dodaje robu u jednu od tri trake prikolice.</p></div>
      <div><h3>2. Menjanje robe</h3><p>U panelu „Tipovi robe“ možeš promeniti naziv, dimenzije, količinu i boju.</p></div>
      <div><h3>3. Prikolica</h3><p>Na telefonu je prikolica umanjena da se lakše koristi. Ako roba ne staje, prikazuje se upozorenje.</p></div>
      <div><h3>4. Čuvanje</h3><p>Sačuvaj prikolicu, upiši vozača, težine i dodaj slike po potrebi.</p></div>
    </div>;
  }


  const isMobile = viewportWidth <= 768;
  const pxPerMeter = isMobile
    ? Math.max(28, Math.min(46, (viewportWidth - 44) / Math.max(state.trailer.length, 1)))
    : Math.max(60, Math.min(92, (viewportWidth - 96) / Math.max(state.trailer.length, 1)));
  const toPx = (m) => m * pxPerMeter;
  const trailerHeight = isMobile ? Math.max(toPx(state.trailer.width), 78) : Math.max(toPx(state.trailer.width), 150);
  const trailerStyle = { width: toPx(state.trailer.length), height: trailerHeight };
  const workInfo = getWorkTimeInfo();

  const logisticsViews = new Set(['load', 'scan', 'transfer', 'count', 'history', 'time']);
  const ModuleHeader = ({ children }) => {
    const backTarget = logisticsViews.has(appView) ? 'logistics' : 'home';
    const backLabel = logisticsViews.has(appView) ? 'Logistika' : 'Početna';
    return <header className="module-header">
      <button className="back-home" onClick={() => openModule(backTarget)}><ArrowLeft size={17}/> {backLabel}</button>
      <h1>{moduleTitle()}</h1>
      <div className="module-actions">
        {children}
        <button className="ghost" onClick={() => setShowInstructions(true)}>Uputstvo</button>
      </div>
    </header>;
  };


  const ctx = {
    appView, APP_LOGO_SRC, APP_QUOTES, quoteIndex, openModule,
    showInstructions, setShowInstructions, moduleTitle, instructionContent,
    sharedLoad, setSharedLoad, validation, totalPlacedBoxCount, state,
    showLoadIntro, applyLoadingQuantities, skipLoadingQuantities,
    updateTrailer, placed, unplaced, mode, setMode, selectedBoxId,
    selectForGrid, startDrag, placeSelectedAt, trailerRef, trailerStyle,
    toPx, formatMeters, unplaceBox, saveCurrentLoad, undoLastPlaced,
    lastPlacedBoxId, clearTrailer, resetAll, updateType, deleteType, addType,
    updateSavedLoad, uploadSavedPhotos, removeSavedPhoto, copyShareLink,
    emailShare, loadSavedLoad, deleteSavedLoad, qrMode, pendingQr,
    manualQrValue, setManualQrValue, addManualQr, scannerError, videoRef,
    qrScanKind, setQrScanKind, qrScanMessage, applyQrProductType, undoLastQrRow,
    QR_PRODUCT_TYPES, confirmQrType, setPendingQr, qrRows, emailMarija,
    copyQrTable, downloadScanningXlsx, setQrRows, updateQrRow, deleteQrRow,
    transferForm, setTransferForm, saveTransferRecord, exportTransferExcel,
    emailTransfer, transfers, clearTransfers, deleteTransferRecord,
    filteredInventory, inventoryForm, setInventoryForm, saveInventoryItem,
    inventorySearch, setInventorySearch, updateInventoryItem, deleteInventoryItem,
    uploadInventoryPhotos, removeInventoryPhoto, countForm, setCountForm,
    saveCountRecord, counts, historySearch, setHistorySearch, filteredHistory,
    downloadBackup, restoreBackup, now, workInfo, formatDateTime, sentTransfers, inventory, productionWriteoffs, setProductionWriteoffs, resetHistory, clamp, ModuleHeader
  };

  return <main className={`app app-${appView}`} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
    <HomeScreen ctx={ctx} />

    <InstructionModal ctx={ctx} />

    <SharedLoadView ctx={ctx} />

    <LoadingSimulator ctx={ctx} />

    <ScannerModule ctx={ctx} />

    <TransferModule ctx={ctx} />

    <InventoryModule ctx={ctx} />

    <HistoryModule ctx={ctx} />
    <TimeModule ctx={ctx} />
    <ProductionModule ctx={ctx} />
  </main>;

}

