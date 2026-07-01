import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon } from 'lucide-react';


export default function SharedLoadView({ ctx }) {
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
  return sharedLoad && <section className="shared-view">
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
    </section>;
}
