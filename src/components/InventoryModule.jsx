import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { cleanLocationInput, normalizeWarehouseLocation } from '../utils/dataFormat.js';
import { findProductionInventoryEntry, searchProductionInventory, uppercaseProductionLocation } from '../utils/productionInventory.js';


export default function InventoryModule({ ctx }) {
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
  const inventoryLocationSuggestions = searchProductionInventory(inventoryForm.position, 12);
  const countLocationSuggestions = searchProductionInventory(countForm.position, 12);

  function resolveInventoryPosition(form, setter) {
    const entry = findProductionInventoryEntry(form.position);
    if (!entry) return;
    setter(current => ({ ...current, position: entry.location, art: current.art || entry.art }));
  }

  return appView === 'count' && <>
      <ModuleHeader />
      <section className="simple-module inventory-module">
        <h2>Inventar / stanje materijala</h2>
        <div className="form-grid">
          <input placeholder="Art" value={inventoryForm.art} onChange={e => setInventoryForm(f => ({...f, art:e.target.value.toUpperCase()}))}/>
          <input placeholder="Naziv / opis artikla" value={inventoryForm.name} onChange={e => setInventoryForm(f => ({...f, name:e.target.value}))}/>
          <input placeholder="Količina" value={inventoryForm.qty} onChange={e => setInventoryForm(f => ({...f, qty:e.target.value}))}/>
          <><input list="inventory-location-options" placeholder="Pozicija" value={inventoryForm.position} onChange={e => setInventoryForm(f => ({...f, position:uppercaseProductionLocation(e.target.value)}))} onBlur={() => resolveInventoryPosition(inventoryForm, setInventoryForm)}/><datalist id="inventory-location-options">{inventoryLocationSuggestions.map(item => <option key={`${item.art}-${item.location}`} value={item.location}>{item.art}</option>)}</datalist></>
          <input className="wide" placeholder="Napomena" value={inventoryForm.note} onChange={e => setInventoryForm(f => ({...f, note:e.target.value}))}/>
          <button className="wide" onClick={saveInventoryItem}><Plus size={16}/> Dodaj u inventar</button>
        </div>

        <div className="search-panel">
          <Search size={18}/>
          <input placeholder="Pretraga inventara: art, naziv, količina, pozicija..." value={inventorySearch} onChange={e => setInventorySearch(e.target.value)} />
        </div>

        <div className="inventory-list">
          {filteredInventory.length === 0 && <p className="empty-card">Nema artikala u inventaru ili nema rezultata za pretragu.</p>}
          {filteredInventory.map(item => <div className="inventory-card" key={item.id}>
            <div className="inventory-head"><b>{item.art || '-'} {item.name ? `· ${item.name}` : ''}</b><button className="icon-danger" onClick={() => deleteInventoryItem(item.id)}><Trash2 size={15}/></button></div>
            <div className="inventory-fields">
              <label>Količina<input value={item.qty || ''} onChange={e => updateInventoryItem(item.id, { qty: e.target.value })}/></label>
              <label>Pozicija<input value={item.position || ''} onChange={e => updateInventoryItem(item.id, { position: cleanLocationInput(e.target.value) })} onBlur={e => updateInventoryItem(item.id, { position: normalizeWarehouseLocation(e.target.value) })}/></label>
              <label className="wide">Napomena<input value={item.note || ''} onChange={e => updateInventoryItem(item.id, { note: e.target.value })}/></label>
            </div>
            <div className="inventory-photos">
              <label className="upload-btn"><ImageIcon size={14}/> Dodaj slike<input type="file" accept="image/*" multiple onChange={e => uploadInventoryPhotos(item.id, e.target.files)} /></label>
              <div className="photo-strip">{(item.photos || []).map(photo => <span key={photo.id} className="photo-mini"><img src={photo.dataUrl} alt={photo.name}/><button onClick={() => removeInventoryPhoto(item.id, photo.id)}>×</button></span>)}</div>
            </div>
            <small>Ažurirano: {formatDateTime(item.updatedAt || item.createdAt)}</small>
          </div>)}
        </div>
      </section>

      <section className="simple-module"><h2>Brzo brojanje</h2><div className="form-grid"><input placeholder="Art" value={countForm.art} onChange={e => setCountForm(f => ({...f, art:e.target.value.toUpperCase()}))}/><input placeholder="Količina" value={countForm.qty} onChange={e => setCountForm(f => ({...f, qty:e.target.value}))}/><><input list="count-location-options" placeholder="Pozicija" value={countForm.position} onChange={e => setCountForm(f => ({...f, position:uppercaseProductionLocation(e.target.value)}))} onBlur={() => resolveInventoryPosition(countForm, setCountForm)}/><datalist id="count-location-options">{countLocationSuggestions.map(item => <option key={`${item.art}-${item.location}`} value={item.location}>{item.art}</option>)}</datalist></><input className="wide" placeholder="Opis / napomena" value={countForm.note} onChange={e => setCountForm(f => ({...f, note:e.target.value}))}/><button onClick={saveCountRecord}><Save size={16}/> Sačuvaj brojanje</button></div><div className="record-list">{counts.length===0 && <p className="empty-card">Još nema brojanja.</p>}{counts.map(r => <div className="record-card" key={r.id}><b>{r.art || '-'}</b><span>{r.qty || '-'} kom</span><span>Pozicija: {r.position || '-'}</span><small>{formatDateTime(r.createdAt)}</small><p>{r.note}</p></div>)}</div></section>
    </>;
}
