import React, { useMemo, useState } from 'react';
import { ArrowLeft, Download, Plus, Trash2, X } from 'lucide-react';
import { downloadXlsxFile, todayIsoDate } from '../utils/excelUtils.js';

const STORAGE_KEY = 'verano-production-writeoff-v1';

function parseQty(value) {
  const normalized = String(value || '').replace(',', '.').trim();
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function formatQty(value) {
  const rounded = Math.round((Number(value) || 0) * 1000) / 1000;
  return String(rounded).replace('.', ',');
}

function normalizePick(value) {
  return String(value || '').trim().toUpperCase();
}

export default function ProductionModule({ ctx }) {
  const { appView, ModuleHeader } = ctx;
  const [screen, setScreen] = useState('menu');
  const [pick, setPick] = useState('');
  const [qty, setQty] = useState('');
  const [rows, setRows] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  const [message, setMessage] = useState('');

  const totalMeters = useMemo(() => rows.reduce((sum, row) => sum + parseQty(row.qty), 0), [rows]);

  if (appView !== 'production') return null;

  function saveRows(nextRows) {
    setRows(nextRows);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRows));
  }

  function addWriteOff() {
    const cleanPick = normalizePick(pick);
    const amount = parseQty(qty);

    if (!cleanPick) {
      setMessage('Unesi pick lokaciju.');
      return;
    }
    if (amount <= 0) {
      setMessage('Unesi količinu koja se otpisuje.');
      return;
    }

    const existingIndex = rows.findIndex(row => normalizePick(row.pick) === cleanPick);
    let nextRows;
    if (existingIndex >= 0) {
      nextRows = rows.map((row, index) => index === existingIndex
        ? { ...row, qty: String(parseQty(row.qty) + amount) }
        : row
      );
      setMessage(`Dodato na postojeću lokaciju ${cleanPick}.`);
    } else {
      nextRows = [...rows, { id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, pick: cleanPick, qty: String(amount) }];
      setMessage(`Dodato: ${cleanPick}.`);
    }

    saveRows(nextRows);
    setPick('');
    setQty('');
  }

  function deleteRow(id) {
    saveRows(rows.filter(row => row.id !== id));
  }

  function clearAll() {
    saveRows([]);
    setMessage('Otpis je očišćen.');
  }

  function downloadWriteOffExcel() {
    if (!rows.length) {
      setMessage('Nema stavki za Excel.');
      return;
    }
    const sheetRows = [
      ['Pick lokacija', 'Ukupna metraža'],
      ...rows.map(row => [row.pick, parseQty(row.qty)])
    ];
    downloadXlsxFile(`otpis-materijala-${todayIsoDate()}.xlsx`, sheetRows, 'Otpis');
  }

  if (screen === 'menu') {
    return <>
      <ModuleHeader />
      <section className="simple-module production-module">
        <div className="production-menu-card">
          <button className="production-action-tile writeoff-tile" onClick={() => setScreen('writeoff')}>
            <span className="writeoff-icon"><X size={58} strokeWidth={4}/></span>
            <strong>Otpis</strong>
            <small>Unos pick lokacije i metraže za otpis materijala.</small>
          </button>
        </div>
      </section>
    </>;
  }

  return <>
    <ModuleHeader>
      <button className="ghost" onClick={() => setScreen('menu')}><ArrowLeft size={16}/> Proizvodnja</button>
    </ModuleHeader>

    <section className="simple-module production-module writeoff-module">
      <div className="writeoff-panel">
        <div className="writeoff-heading">
          <span className="writeoff-icon small"><X size={34} strokeWidth={4}/></span>
          <div>
            <h2>Otpis</h2>
            <p>Unesi pick lokaciju i količinu. Ako lokacija već postoji, metraža se sabira.</p>
          </div>
        </div>

        <div className="writeoff-form">
          <label>
            <span>Pick lokacija</span>
            <input value={pick} onChange={e => setPick(e.target.value.toUpperCase())} placeholder="npr. A12-03" />
          </label>
          <label>
            <span>Količina za otpis</span>
            <input inputMode="decimal" value={qty} onChange={e => setQty(e.target.value)} placeholder="npr. 6" />
          </label>
          <button className="primary writeoff-add" onClick={addWriteOff}><Plus size={18}/> Dodaj</button>
        </div>

        {message && <p className="writeoff-message">{message}</p>}

        <div className="writeoff-summary">
          <strong>Ukupno lokacija: {rows.length}</strong>
          <span>Ukupna metraža: {formatQty(totalMeters)}</span>
        </div>

        {rows.length > 0 && <div className="writeoff-table-wrap">
          <table className="writeoff-table">
            <thead>
              <tr>
                <th>Pick lokacija</th>
                <th>Ukupna metraža</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => <tr key={row.id}>
                <td>{row.pick}</td>
                <td>{formatQty(row.qty)}</td>
                <td><button className="icon danger" onClick={() => deleteRow(row.id)} title="Obriši"><Trash2 size={16}/></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>}

        <div className="writeoff-actions">
          <button className="primary" onClick={downloadWriteOffExcel}><Download size={18}/> Preuzmi Excel</button>
          {rows.length > 0 && <button className="ghost danger-text" onClick={clearAll}>Očisti otpis</button>}
        </div>
      </div>
    </section>
  </>;
}
