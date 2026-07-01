import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon, QrCode, Camera, Mail, Edit3 } from 'lucide-react';


export default function HistoryModule({ ctx }) {
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
  downloadBackup, restoreBackup, now, workInfo, formatDateTime, sentTransfers, inventory, clamp, ModuleHeader } = ctx;
  return appView === 'history' && <>
      <ModuleHeader />
      <section className="simple-module history-module">
        <h2>Istorija i pretraga</h2>
        <div className="history-grid"><div><h3>Prikolice</h3><p>{(state.savedLoads || []).length}</p></div><div><h3>Boksovi</h3><p>{qrRows.length}</p></div><div><h3>Dopune</h3><p>{transfers.length + sentTransfers.length}</p></div><div><h3>Inventar</h3><p>{inventory.length}</p></div></div>
        <div className="search-panel"><Search size={18}/><input placeholder="Pretraži sve: datum, boks, art, roba, bulk, pick, vozač..." value={historySearch} onChange={e => setHistorySearch(e.target.value)} /></div>
        <div className="backup-actions"><button onClick={downloadBackup}><Download size={16}/> Preuzmi backup</button><label className="upload-btn"><UploadCloud size={16}/> Vrati backup<input type="file" accept="application/json,.json" onChange={e => restoreBackup(e.target.files?.[0])}/></label></div>
        <div className="history-list">
          {filteredHistory.length === 0 && <p className="empty-card">Nema rezultata za ovu pretragu.</p>}
          {filteredHistory.map(item => <div className="history-card" key={`${item.type}-${item.id}`}><div className="history-icon">{item.icon}</div><div><div className="history-card-head"><b>{item.title}</b><span>{item.type}</span></div><p>{item.summary}</p><small>{item.createdAt ? formatDateTime(item.createdAt) : '-'}</small></div></div>)}
        </div>
      </section>
    </>;
}
