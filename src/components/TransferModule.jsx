import React, { useRef, useState } from 'react';
import { Trash2, Plus, FileSpreadsheet, Mail, UploadCloud, ClipboardList, RotateCcw, Share2 } from 'lucide-react';
import { TRANSFER_EMAIL } from '../utils/constants.js';
import {
  downloadDailyRefillXlsx,
  formatDailyRefillRowsForEmail,
  makeDailyRefillFilename,
  makeDailyRefillXlsxFile,
  parseDailyRefillXlsx,
  todaySrDate
} from '../utils/excelUtils.js';


function uppercaseWarehouseText(value) {
  return String(value || '').toUpperCase();
}

function normalizeWarehouseLocation(value) {
  const raw = uppercaseWarehouseText(value).trim();
  if (!raw) return '';

  const compact = raw.replace(/[^A-Z0-9]/g, '');
  const match = compact.match(/^(?:RS20)?([A-Z]{2})(\d{1,2})$/);
  if (match) {
    const [, row, number] = match;
    return `RS 20 ${row} ${number.padStart(2, '0')}`;
  }

  return raw.replace(/\s+/g, ' ');
}

export default function TransferModule({ ctx }) {
  const {
    appView, transferForm, setTransferForm, saveTransferRecord, exportTransferExcel,
    emailTransfer, transfers, clearTransfers, deleteTransferRecord, formatDateTime, ModuleHeader
  } = ctx;

  const [transferView, setTransferView] = useState('manual');
  const [dailyRows, setDailyRows] = useState([]);
  const [dailyFileName, setDailyFileName] = useState('');
  const [dailyUploadError, setDailyUploadError] = useState('');
  const [dailyLoading, setDailyLoading] = useState(false);
  const [dailyDocumentNo, setDailyDocumentNo] = useState('A0000000');
  const fileInputRef = useRef(null);

  if (appView !== 'transfer') return null;

  const dailyExportRows = dailyRows.filter(row => String(row.art || '').trim());
  const dailyItemCount = dailyExportRows.length;

  async function handleDailyFileUpload(file) {
    if (!file) return;
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


  function clearDailyRefill() {
    if (!dailyRows.length) return;
    if (confirm('Obrisati učitani dnevni refil?')) {
      setDailyRows([]);
      setDailyFileName('');
      setDailyUploadError('');
    }
  }

  function downloadDailyRefill() {
    if (!dailyItemCount) {
      alert('Nema stavki sa popunjenim ART brojem za export.');
      return;
    }
    downloadDailyRefillXlsx(dailyExportRows, dailyDocumentNo);
  }

  async function shareDailyRefill() {
    if (!dailyItemCount) {
      alert('Nema stavki sa popunjenim ART brojem za export.');
      return;
    }
    const file = makeDailyRefillXlsxFile(dailyExportRows, dailyDocumentNo);
    const shareData = {
      title: 'Dnevni refil',
      text: `Dnevni refil - ${todaySrDate()}`,
      files: [file]
    };
    try {
      if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share(shareData);
      } else {
        downloadDailyRefillXlsx(dailyExportRows, dailyDocumentNo);
        alert('Ovaj browser ne podržava direktno deljenje fajla. Excel je skinut, pa ga dodaj ručno u mail.');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        console.error(err);
        alert('Deljenje nije uspelo. Excel možeš skinuti dugmetom „Preuzmi Excel”.');
      }
    }
  }

  function emailDailyRefill() {
    if (!dailyItemCount) {
      alert('Nema stavki sa popunjenim ART brojem za export.');
      return;
    }
    downloadDailyRefillXlsx(dailyExportRows, dailyDocumentNo);
    const subject = encodeURIComponent(`Dnevni refil - ${todaySrDate()}`);
    const body = encodeURIComponent(`Dnevni refil\nDatum: ${todaySrDate()}\n\nSkinut je Excel fajl: ${makeDailyRefillFilename()}\n\nU prilogu treba dodati preuzeti Excel fajl.\n\nPregled stavki:\n\n${formatDailyRefillRowsForEmail(dailyExportRows, dailyDocumentNo)}\n\nPozdrav`);
    window.location.href = `mailto:${TRANSFER_EMAIL}?subject=${subject}&body=${body}`;
  }

  const headerButton = transferView === 'daily'
    ? <button className="ghost" onClick={() => setTransferView('manual')}><RotateCcw size={16}/> Ručna dopuna</button>
    : <button onClick={() => setTransferView('daily')}><ClipboardList size={16}/> Dnevni refil</button>;

  return <>
    <ModuleHeader>{headerButton}</ModuleHeader>

    {transferView === 'daily' ? <section className="simple-module daily-refill-module">
      <div className="daily-refill-head">
        <div>
          <h2>Dnevni refil</h2>
          <p>Učitaj Excel iz maila. Aplikacija čita samo <b>Sheet 2</b>. Završni Excel je spreman za kopiranje u Navision.</p>
        </div>
        {dailyRows.length > 0 && <div className="daily-refill-count"><span>Stavki sa ART</span><b>{dailyItemCount}</b></div>}
      </div>

      {!dailyRows.length && <div className="daily-upload-zone">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={e => handleDailyFileUpload(e.target.files?.[0])}
          hidden
        />
        <button className="daily-upload-button" onClick={() => fileInputRef.current?.click()} disabled={dailyLoading}>
          <UploadCloud size={46}/>
          <strong>{dailyLoading ? 'Učitavam Excel...' : 'Upload Excel fajla'}</strong>
          <span>Izaberi .xlsx fajl skinut sa maila</span>
        </button>
        {dailyUploadError && <p className="daily-error">{dailyUploadError}</p>}
      </div>}

      {dailyRows.length > 0 && <>
        <div className="daily-refill-toolbar">
          <div>
            <strong>{dailyFileName || 'Učitani Excel'}</strong>
            <small>Možeš menjati ART, Bulk, količinu, Pick i opis. Export ide u Navision rasporedu.</small>
          </div>
          <label className="daily-doc-input"><span>Document No.</span><input value={dailyDocumentNo} onChange={e => setDailyDocumentNo(e.target.value.toUpperCase())}/></label>
          <div className="daily-refill-actions">
            <button className="ghost" onClick={() => fileInputRef.current?.click()}><UploadCloud size={16}/> Drugi Excel</button>
            <button className="ghost" onClick={addEmptyDailyRow}><Plus size={16}/> Dodaj red</button>
            <button className="ghost" onClick={downloadDailyRefill}><FileSpreadsheet size={16}/> Preuzmi Excel</button>
            <button className="ghost" onClick={shareDailyRefill}><Share2 size={16}/> Podeli Excel</button>
            <button onClick={emailDailyRefill}><Mail size={16}/> Pošalji mail</button>
            <button className="danger" onClick={clearDailyRefill}><Trash2 size={16}/> Obriši</button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={e => handleDailyFileUpload(e.target.files?.[0])}
            hidden
          />
        </div>

        <div className="daily-refill-list daily-refill-list-v145">
          {dailyRows.map((row, index) => <article className="daily-refill-card daily-refill-card-v145" key={row.id}>
            <div className="daily-card-index">{index + 1}</div>
            <div className="daily-card-main">
              <div className="daily-card-row daily-card-art-row">
                <label><span>ART</span><input inputMode="numeric" value={row.art || ''} onChange={e => updateDailyRow(row.id, { art: e.target.value.toUpperCase() })}/></label>
              </div>
              <div className="daily-card-row daily-card-locations-row">
                <label><span>Bulk</span><input value={row.bulkLocation || ''} onChange={e => updateDailyRow(row.id, { bulkLocation: uppercaseWarehouseText(e.target.value) })} onBlur={e => updateDailyRow(row.id, { bulkLocation: normalizeWarehouseLocation(e.target.value) })}/></label>
                <label><span>Kol.</span><input inputMode="decimal" value={row.transferQty || ''} onChange={e => updateDailyRow(row.id, { transferQty: e.target.value })}/></label>
                <label className="daily-pick-field"><span>Pick</span><input value={row.pickLocation || ''} onChange={e => updateDailyRow(row.id, { pickLocation: uppercaseWarehouseText(e.target.value) })} onBlur={e => updateDailyRow(row.id, { pickLocation: normalizeWarehouseLocation(e.target.value) })}/></label>
              </div>
              <label className="daily-description-edit"><span>Opis</span><input value={row.description || ''} onChange={e => updateDailyRow(row.id, { description: e.target.value })} placeholder="Opis / napomena"/></label>
            </div>
          </article>)}
        </div>
      </>}
    </section> : <section className="simple-module">
      <h2>Dopuna materijala</h2>
      <div className="form-grid">
        <label className="art-input-wrap"><span>ART-</span><input placeholder="123456" inputMode="numeric" maxLength="6" value={transferForm.art} onChange={e => setTransferForm(f => ({...f, art:e.target.value.replace(/\D/g, '').slice(0, 6)}))}/></label>
        <input placeholder="Količina" inputMode="decimal" value={transferForm.qty} onChange={e => setTransferForm(f => ({...f, qty:e.target.value}))}/>
        <input placeholder="Bulk" value={transferForm.from} onChange={e => setTransferForm(f => ({...f, from:uppercaseWarehouseText(e.target.value)}))} onBlur={e => setTransferForm(f => ({...f, from:normalizeWarehouseLocation(e.target.value)}))}/>
        <input placeholder="Pick" value={transferForm.to} onChange={e => setTransferForm(f => ({...f, to:uppercaseWarehouseText(e.target.value)}))} onBlur={e => setTransferForm(f => ({...f, to:normalizeWarehouseLocation(e.target.value)}))}/>
        <input className="wide" placeholder="Opis / napomena" value={transferForm.note} onChange={e => setTransferForm(f => ({...f, note:e.target.value}))}/>
        <div className="wide form-actions">
          <button onClick={saveTransferRecord}><Plus size={16}/> Dodaj stavku</button>
          <button className="ghost" onClick={exportTransferExcel} disabled={!transfers.length}><FileSpreadsheet size={16}/> Preuzmi Excel</button>
          <button onClick={emailTransfer} disabled={!transfers.length}><Mail size={16}/> Pošalji mail</button>
          <button className="danger" onClick={clearTransfers} disabled={!transfers.length}><Trash2 size={16}/> Obriši sve</button>
        </div>
      </div>
      <div className="record-list transfer-list">
        {transfers.length===0 && <p className="empty-card">Još nema dopuna. Unesi podatke i klikni „Dodaj stavku”.</p>}
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
