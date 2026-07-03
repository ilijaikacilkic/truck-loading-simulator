import React, { useRef, useState } from 'react';
import { Trash2, Plus, FileSpreadsheet, Mail, UploadCloud, ClipboardList, RotateCcw, Share2 } from 'lucide-react';
import { TRANSFER_EMAIL } from '../utils/constants.js';
import {
  downloadDailyRefillXlsx,
  formatDailyRefillRowsForEmail,
  makeDailyRefillFilename,
  makeDailyRefillXlsxFile,
  parseDailyRefillXlsx,
  todayIsoDate,
  todaySrDate
} from '../utils/excelUtils.js';

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
  const fileInputRef = useRef(null);

  if (appView !== 'transfer') return null;

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

  function clearDailyRefill() {
    if (!dailyRows.length) return;
    if (confirm('Obrisati učitani dnevni refil?')) {
      setDailyRows([]);
      setDailyFileName('');
      setDailyUploadError('');
    }
  }

  function downloadDailyRefill() {
    if (!dailyRows.length) return;
    downloadDailyRefillXlsx(dailyRows);
  }

  async function shareDailyRefill() {
    if (!dailyRows.length) {
      alert('Prvo učitaj Excel fajl za dnevni refil.');
      return;
    }
    const file = makeDailyRefillXlsxFile(dailyRows);
    const shareData = {
      title: 'Dnevni refil',
      text: `Dnevni refil - ${todaySrDate()}`,
      files: [file]
    };
    try {
      if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share(shareData);
      } else {
        downloadDailyRefillXlsx(dailyRows);
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
    if (!dailyRows.length) {
      alert('Prvo učitaj Excel fajl za dnevni refil.');
      return;
    }
    downloadDailyRefillXlsx(dailyRows);
    const subject = encodeURIComponent(`Dnevni refil - ${todaySrDate()}`);
    const body = encodeURIComponent(`Dnevni refil
Datum: ${todaySrDate()}

Skinut je Excel fajl: ${makeDailyRefillFilename()}

U prilogu treba dodati preuzeti Excel fajl.

Pregled stavki:

${formatDailyRefillRowsForEmail(dailyRows)}

Pozdrav`);
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
          <p>Učitaj Excel iz maila. Aplikacija čita samo <b>Sheet 2</b> i uzima ART, opis, bulk, količinu za prenos i pick.</p>
        </div>
        {dailyRows.length > 0 && <div className="daily-refill-count"><span>Stavki</span><b>{dailyRows.length}</b></div>}
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
            <small> Završni Excel se skida kao ART | Bulk | Količina | Pick.</small>
          </div>
          <div className="daily-refill-actions">
            <button className="ghost" onClick={() => fileInputRef.current?.click()}><UploadCloud size={16}/> Drugi Excel</button>
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

        <div className="daily-refill-list">
          {dailyRows.map((row, index) => <article className="daily-refill-card" key={row.id}>
            <div className="daily-card-index">{index + 1}</div>
            <div className="daily-card-main">
              <div className="daily-card-top">
                <strong>{row.art || '-'}</strong>
                <span>{row.bulkLocation || '-'} → {row.pickLocation || '-'}</span>
              </div>
              {row.description && <p className="daily-card-description">{row.description}</p>}
              <div className="daily-card-inputs">
                <label>
                  <span>Količina</span>
                  <input value={row.transferQty} onChange={e => updateDailyRow(row.id, { transferQty: e.target.value })}/>
                </label>
                <label className="daily-note-input">
                  <span>Napomena</span>
                  <input placeholder="Napomena..." value={row.note} onChange={e => updateDailyRow(row.id, { note: e.target.value })}/>
                </label>
              </div>
            </div>
          </article>)}
        </div>
      </>}
    </section> : <section className="simple-module">
      <h2>Dopuna materijala</h2>
      <div className="form-grid">
        <label className="art-input-wrap"><span>ART-</span><input placeholder="123456" inputMode="numeric" maxLength="6" value={transferForm.art} onChange={e => setTransferForm(f => ({...f, art:e.target.value.replace(/\D/g, '').slice(0, 6)}))}/></label>
        <input placeholder="Količina" value={transferForm.qty} onChange={e => setTransferForm(f => ({...f, qty:e.target.value}))}/>
        <input placeholder="Bulk" value={transferForm.from} onChange={e => setTransferForm(f => ({...f, from:e.target.value}))}/>
        <input placeholder="Pick" value={transferForm.to} onChange={e => setTransferForm(f => ({...f, to:e.target.value}))}/>
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
