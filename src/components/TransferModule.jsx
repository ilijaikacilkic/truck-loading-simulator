import React, { useRef, useState } from 'react';
import { Trash2, Plus, FileSpreadsheet, Mail, UploadCloud, ClipboardList, RotateCcw } from 'lucide-react';
import { TRANSFER_EMAIL } from '../utils/constants.js';
import {
  downloadDailyRefillXlsx,
  formatDailyRefillRowsForEmail,
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
      if (!rows.length) setDailyUploadError('Excel je učitan, ali nisu pronađene stavke za refil.');
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

  function emailDailyRefill() {
    if (!dailyRows.length) {
      alert('Prvo učitaj Excel fajl za dnevni refil.');
      return;
    }
    downloadDailyRefillXlsx(dailyRows);
    const subject = encodeURIComponent(`Dnevni refil - ${todaySrDate()}`);
    const body = encodeURIComponent(`Dnevni refil
Datum: ${todaySrDate()}

Skinut je Excel fajl: dnevni-refil-${todayIsoDate()}.xlsx

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
          <p>Učitaj Excel iz maila. Aplikacija uzima ART, opis, bulk lokaciju, količinu za prenos i pick lokaciju.</p>
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
            <small> Možeš dopisati napomene pre slanja.</small>
          </div>
          <div className="daily-refill-actions">
            <button className="ghost" onClick={() => fileInputRef.current?.click()}><UploadCloud size={16}/> Drugi Excel</button>
            <button className="ghost" onClick={downloadDailyRefill}><FileSpreadsheet size={16}/> Preuzmi Excel</button>
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

        <div className="daily-refill-table-wrap">
          <table className="daily-refill-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ART</th>
                <th>Opis materijala</th>
                <th>Bulk lokacija</th>
                <th>Količina za prenos</th>
                <th>Pick lokacija</th>
                <th>Napomena</th>
              </tr>
            </thead>
            <tbody>
              {dailyRows.map((row, index) => <tr key={row.id}>
                <td data-label="#">{index + 1}</td>
                <td data-label="ART"><input value={row.art} onChange={e => updateDailyRow(row.id, { art: e.target.value })}/></td>
                <td data-label="Opis"><textarea value={row.description} onChange={e => updateDailyRow(row.id, { description: e.target.value })}/></td>
                <td data-label="Bulk"><input value={row.bulkLocation} onChange={e => updateDailyRow(row.id, { bulkLocation: e.target.value })}/></td>
                <td data-label="Količina"><input value={row.transferQty} onChange={e => updateDailyRow(row.id, { transferQty: e.target.value })}/></td>
                <td data-label="Pick"><input value={row.pickLocation} onChange={e => updateDailyRow(row.id, { pickLocation: e.target.value })}/></td>
                <td data-label="Napomena"><textarea placeholder="Napomena..." value={row.note} onChange={e => updateDailyRow(row.id, { note: e.target.value })}/></td>
              </tr>)}
            </tbody>
          </table>
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
