import React, { useEffect, useRef, useState } from 'react';
import { Trash2, Plus, FileSpreadsheet, Mail, UploadCloud, ClipboardList, ArrowLeft } from 'lucide-react';
import { TRANSFER_EMAIL } from '../utils/constants.js';
import { cleanLocationInput, normalizeArtNumber, normalizeWarehouseLocation } from '../utils/dataFormat.js';
import {
  downloadDailyRefillXlsx,
  formatDailyRefillRowsForEmail,
  makeDailyRefillFilename,
  parseDailyRefillXlsx,
  todaySrDate
} from '../utils/excelUtils.js';

const DAILY_REFILL_DRAFT_KEY = 'verano-daily-refill-draft-v1';

function loadDailyDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DAILY_REFILL_DRAFT_KEY));
    if (!saved || !Array.isArray(saved.rows)) return { rows: [], fileName: '', savedAt: '' };
    return { rows: saved.rows, fileName: saved.fileName || '', savedAt: saved.savedAt || '' };
  } catch {
    return { rows: [], fileName: '', savedAt: '' };
  }
}

function autosaveTimeLabel(iso) {
  if (!iso) return 'Autosave uključen';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Autosave uključen';
  return `Sačuvano ${d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })}`;
}

export default function TransferModule({ ctx }) {
  const {
    appView, transferForm, setTransferForm, saveTransferRecord, exportTransferExcel,
    emailTransfer, transfers, clearTransfers, deleteTransferRecord, formatDateTime, ModuleHeader
  } = ctx;

  const draft = useRef(loadDailyDraft()).current;
  const [transferView, setTransferView] = useState('manual');
  const [dailyRows, setDailyRows] = useState(draft.rows);
  const [dailyFileName, setDailyFileName] = useState(draft.fileName);
  const [dailyUploadError, setDailyUploadError] = useState('');
  const [dailyLoading, setDailyLoading] = useState(false);
  const [dailySavedAt, setDailySavedAt] = useState(draft.savedAt);
  const fileInputRef = useRef(null);
  const autosaveTimerRef = useRef(null);

  useEffect(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      try {
        if (!dailyRows.length) {
          localStorage.removeItem(DAILY_REFILL_DRAFT_KEY);
          setDailySavedAt('');
          return;
        }
        const savedAt = new Date().toISOString();
        localStorage.setItem(DAILY_REFILL_DRAFT_KEY, JSON.stringify({ rows: dailyRows, fileName: dailyFileName, savedAt }));
        setDailySavedAt(savedAt);
      } catch (err) {
        console.warn('Daily refill autosave failed', err);
      }
    }, 500);
    return () => clearTimeout(autosaveTimerRef.current);
  }, [dailyRows, dailyFileName]);

  if (appView !== 'transfer') return null;

  const dailyExportRows = dailyRows.filter(row => String(row.art || '').trim());
  const dailyItemCount = dailyExportRows.length;

  async function handleDailyFileUpload(file) {
    if (!file) return;
    if (dailyRows.length && !confirm('Zameniti trenutni dnevni refil novim Excelom?')) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setDailyLoading(true);
    setDailyUploadError('');
    try {
      const rows = await parseDailyRefillXlsx(file);
      setDailyRows(rows);
      setDailyFileName(file.name);
      if (!rows.length) setDailyUploadError('Excel je učitan, ali nisu pronađene stavke za refil u Sheet 2.');
    } catch (err) {
      console.error(err);
      setDailyRows([]);
      setDailyFileName('');
      setDailyUploadError(err?.message || 'Excel fajl nije mogao da se učita.');
    } finally {
      setDailyLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function updateDailyRow(id, patch) {
    setDailyRows(rows => rows.map(row => row.id === id ? { ...row, ...patch } : row));
  }

  function addEmptyDailyRow() {
    setDailyRows(rows => [...rows, {
      id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      art: '',
      description: '',
      bulkLocation: '',
      transferQty: '',
      pickLocation: '',
      note: '',
      createdAt: new Date().toISOString()
    }]);
  }

  function deleteDailyRow(id) {
    setDailyRows(rows => rows.filter(row => row.id !== id));
  }

  function downloadDailyRefill() {
    if (!dailyItemCount) {
      alert('Nema stavki sa popunjenim ART brojem za export.');
      return;
    }
    downloadDailyRefillXlsx(dailyExportRows);
  }

  function emailDailyRefill() {
    if (!dailyItemCount) {
      alert('Nema stavki sa popunjenim ART brojem za export.');
      return;
    }
    downloadDailyRefillXlsx(dailyExportRows);
    const subject = encodeURIComponent(`Dnevni refil - ${todaySrDate()}`);
    const body = encodeURIComponent(`Dnevni refil
Datum: ${todaySrDate()}

Skinut je Excel fajl: ${makeDailyRefillFilename()}

U prilogu treba dodati preuzeti Excel fajl.

Pregled stavki:

${formatDailyRefillRowsForEmail(dailyExportRows)}

Pozdrav`);
    window.location.href = `mailto:${TRANSFER_EMAIL}?subject=${subject}&body=${body}`;
  }

  function normalizeDailyLocation(id, field, value) {
    updateDailyRow(id, { [field]: normalizeWarehouseLocation(value) });
  }

  return <>
    <ModuleHeader>{transferView === 'daily' ? <button className="ghost" onClick={() => setTransferView('manual')}><ArrowLeft size={16}/> Ručna dopuna</button> : null}</ModuleHeader>

    {transferView === 'daily' ? <section className="simple-module daily-refill-module daily-refill-module-clean">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={e => handleDailyFileUpload(e.target.files?.[0])}
        hidden
      />

      {dailyRows.length > 0 && <div className="daily-refill-count-clean"><b>{dailyItemCount}</b><span>stavki</span></div>}

      {!dailyRows.length && <div className="daily-upload-zone">
        <button className="daily-upload-button" onClick={() => fileInputRef.current?.click()} disabled={dailyLoading}>
          <UploadCloud size={46}/>
          <strong>{dailyLoading ? 'Učitavam Excel...' : 'Upload Excel fajla'}</strong>
        </button>
        {dailyUploadError && <p className="daily-error">{dailyUploadError}</p>}
      </div>}

      {dailyRows.length > 0 && <>
        <div className="daily-refill-toolbar daily-refill-toolbar-clean">
          <div className="daily-file-block">
            <strong>{dailyFileName || 'Učitani Excel'}</strong>
            <small>{autosaveTimeLabel(dailySavedAt)}</small>
          </div>
          <div className="daily-refill-actions daily-refill-actions-clean">
            <button className="ghost" onClick={() => fileInputRef.current?.click()}><UploadCloud size={16}/> Drugi Excel</button>
            <button className="ghost" onClick={addEmptyDailyRow}><Plus size={16}/> Dodaj red</button>
            <button className="ghost" onClick={downloadDailyRefill}><FileSpreadsheet size={16}/> Preuzmi Excel</button>
            <button onClick={emailDailyRefill}><Mail size={16}/> Pošalji mail</button>
          </div>
          {dailyUploadError && <p className="daily-error">{dailyUploadError}</p>}
        </div>

        <div className="daily-refill-list daily-refill-list-v145">
          {dailyRows.map((row, index) => <article className="daily-refill-card daily-refill-card-v145" key={row.id}>
            <div className="daily-card-index">{index + 1}</div>
            <div className="daily-card-main">
              <div className="daily-card-row daily-card-art-row">
                <label><span>ART</span><input inputMode="numeric" value={row.art || ''} onChange={e => updateDailyRow(row.id, { art: e.target.value.toUpperCase() })} onBlur={e => updateDailyRow(row.id, { art: normalizeArtNumber(e.target.value) })}/></label>
                <button className="icon-danger daily-delete-row" onClick={() => deleteDailyRow(row.id)} title="Obriši stavku"><Trash2 size={15}/></button>
              </div>
              <div className="daily-card-row daily-card-locations-row">
                <label><span>Bulk</span><input value={row.bulkLocation || ''} onChange={e => updateDailyRow(row.id, { bulkLocation: cleanLocationInput(e.target.value) })} onBlur={e => normalizeDailyLocation(row.id, 'bulkLocation', e.target.value)}/></label>
                <label><span>Količina</span><input inputMode="decimal" value={row.transferQty || ''} onChange={e => updateDailyRow(row.id, { transferQty: e.target.value })}/></label>
                <label className="daily-pick-field"><span>Pick</span><input value={row.pickLocation || ''} onChange={e => updateDailyRow(row.id, { pickLocation: cleanLocationInput(e.target.value) })} onBlur={e => normalizeDailyLocation(row.id, 'pickLocation', e.target.value)}/></label>
              </div>
              <label className="daily-description-edit"><span>Opis</span><input value={row.description || ''} onChange={e => updateDailyRow(row.id, { description: e.target.value })}/></label>
              <label className="daily-description-edit daily-note-edit"><span>Napomena</span><input value={row.note || ''} onChange={e => updateDailyRow(row.id, { note: e.target.value })} placeholder="Interna napomena"/></label>
            </div>
          </article>)}
        </div>
      </>}
    </section> : <section className="simple-module transfer-module">
      <div className="daily-refill-entry-row"><button className="daily-refill-main-button" onClick={() => setTransferView('daily')}><ClipboardList size={18}/> Dnevni refil</button></div>
      <h2>Dopuna materijala</h2>
      <div className="form-grid">
        <label className="art-input-wrap"><span>ART-</span><input placeholder="123456" inputMode="numeric" maxLength="6" value={transferForm.art} onChange={e => setTransferForm(f => ({...f, art:e.target.value.replace(/\D/g, '').slice(0, 6)}))}/></label>
        <input placeholder="Količina" inputMode="decimal" value={transferForm.qty} onChange={e => setTransferForm(f => ({...f, qty:e.target.value}))}/>
        <input placeholder="Bulk" value={transferForm.from} onChange={e => setTransferForm(f => ({...f, from:cleanLocationInput(e.target.value)}))} onBlur={e => setTransferForm(f => ({...f, from:normalizeWarehouseLocation(e.target.value)}))}/>
        <input placeholder="Pick" value={transferForm.to} onChange={e => setTransferForm(f => ({...f, to:cleanLocationInput(e.target.value)}))} onBlur={e => setTransferForm(f => ({...f, to:normalizeWarehouseLocation(e.target.value)}))}/>
        <input className="wide" placeholder="Opis / napomena" value={transferForm.note} onChange={e => setTransferForm(f => ({...f, note:e.target.value}))}/>
        <div className="wide form-actions">
          <button onClick={saveTransferRecord}><Plus size={16}/> Dodaj stavku</button>
          <button className="ghost" onClick={exportTransferExcel} disabled={!transfers.length}><FileSpreadsheet size={16}/> Preuzmi Excel</button>
          <button onClick={emailTransfer} disabled={!transfers.length}><Mail size={16}/> Pošalji mail</button>
          <button className="danger" onClick={clearTransfers} disabled={!transfers.length}><Trash2 size={16}/> Obriši sve</button>
        </div>
      </div>
      <div className="record-list transfer-list">
        {transfers.length===0 && <p className="empty-card">Nema dodatih dopuna</p>}
        {transfers.map((r, index) => <div className="record-card transfer-card" key={r.id}>
          <div className="transfer-card-head"><b>Dopuna {index + 1}</b><button className="icon-danger" onClick={() => deleteTransferRecord(r.id)}><Trash2 size={15}/></button></div>
          <div className="transfer-lines">
            <span><strong>Art:</strong> {r.art || '-'}</span>
            <span><strong>Količina:</strong> {r.qty || '-'}</span>
            <span><strong>Bulk:</strong> {r.from || '-'}</span>
            <span><strong>Pick:</strong> {r.to || '-'}</span>
            {r.note && <span><strong>Napomena:</strong> {r.note}</span>}
          </div>
          <small>{formatDateTime(r.createdAt)}</small>
        </div>)}
      </div>
    </section>}
  </>;
}
