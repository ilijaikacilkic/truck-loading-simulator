import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon, QrCode, Camera, Mail, Edit3 } from 'lucide-react';


export default function ScannerModule({ ctx }) {
  const { appView, APP_LOGO_SRC, APP_QUOTES, quoteIndex, openModule,
  showInstructions, setShowInstructions, moduleTitle, instructionContent,
  sharedLoad, setSharedLoad, validation, totalPlacedBoxCount, state,
  updateTrailer, placed, unplaced, mode, setMode, selectedBoxId,
  selectForGrid, startDrag, placeSelectedAt, trailerRef, trailerStyle,
  toPx, formatMeters, unplaceBox, saveCurrentLoad, undoLastPlaced,
  lastPlacedBoxId, clearTrailer, resetAll, updateType, deleteType, addType,
  updateSavedLoad, uploadSavedPhotos, removeSavedPhoto, copyShareLink,
  emailShare, loadSavedLoad, deleteSavedLoad, qrMode, pendingQr,
  manualQrValue, setManualQrValue, addManualQr, scannerError, videoRef,
  QR_PRODUCT_TYPES, confirmQrType, setPendingQr, qrRows, emailMarija,
  copyQrTable, downloadScanningXlsx, setQrRows, updateQrRow, deleteQrRow,
  transferForm, setTransferForm, saveTransferRecord, exportTransferExcel,
  emailTransfer, transfers, clearTransfers, deleteTransferRecord,
  filteredInventory, inventoryForm, setInventoryForm, saveInventoryItem,
  inventorySearch, setInventorySearch, updateInventoryItem, deleteInventoryItem,
  uploadInventoryPhotos, removeInventoryPhoto, countForm, setCountForm,
  saveCountRecord, counts, historySearch, setHistorySearch, filteredHistory,
  downloadBackup, restoreBackup, now, workInfo, formatDateTime, ModuleHeader } = ctx;
  return appView === 'scan' && <>
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
          <div className="qr-table-title"><h2>Excel tabela</h2><div className="qr-actions"><button onClick={emailMarija} disabled={!qrRows.length}><Send size={15}/> Pošalji Mariji</button><button className="ghost" onClick={copyQrTable} disabled={!qrRows.length}><Copy size={15}/> Kopiraj</button><button className="ghost" onClick={() => downloadScanningXlsx(qrRows)} disabled={!qrRows.length}><FileSpreadsheet size={15}/> Preuzmi Excel</button><button className="danger" onClick={() => { if (confirm('Obrisati celu QR tabelu?')) setQrRows([]); }} disabled={!qrRows.length}><Trash2 size={15}/> Obriši</button></div></div>
          <div className="qr-table-wrap"><table className="qr-table"><thead><tr><th>#</th><th>Broj boksa</th><th>Tip robe</th><th>Opis</th><th></th></tr></thead><tbody>{!qrRows.length && <tr><td colSpan="5" className="empty-row">Još nema skeniranih boksova.</td></tr>}{qrRows.map((row, index) => <tr key={row.id}><td>{index + 1}</td><td><input value={row.boxNumber} onChange={e => updateQrRow(row.id, { boxNumber: e.target.value })}/></td><td><select value={row.productType} onChange={e => updateQrRow(row.id, { productType: e.target.value })}>{QR_PRODUCT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></td><td><input value={row.description} onChange={e => updateQrRow(row.id, { description: e.target.value })} placeholder="Opis" /></td><td><button className="icon-danger" onClick={() => deleteQrRow(row.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
        </div>
      </section>
    </>;
}
