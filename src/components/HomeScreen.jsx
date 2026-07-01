import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon } from 'lucide-react';


export default function HomeScreen({ ctx }) {
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
  return appView === 'home' && <section className="home-screen">
      <div className="home-logo">
        <img className="app-logo-img" src={APP_LOGO_SRC} alt="Logo aplikacije" />
        <h1>Verano Logistics</h1>
      </div>

      <div className="home-grid">
        <button className="home-tile" onClick={() => openModule('load')}><span className="tile-icon">🚚</span><b>UTOVAR</b></button>
        <button className="home-tile" onClick={() => openModule('scan')}><span className="tile-icon">📦</span><b>SKENIRANJE</b></button>
        <button className="home-tile" onClick={() => openModule('transfer')}><span className="tile-icon">🔄</span><b>DOPUNA</b></button>
        <button className="home-tile" onClick={() => openModule('count')}><span className="tile-icon">📊</span><b>INVENTAR</b></button>
        <button className="home-tile" onClick={() => openModule('history')}><span className="tile-icon">📖</span><b>ISTORIJA</b></button>
        <button className="home-tile" onClick={() => openModule('time')}><span className="tile-icon">⏰</span><b>VREME</b></button>
      </div>

      <div className="quote-card quote-only">
        <p>“{APP_QUOTES[quoteIndex]}”</p>
      </div>
    </section>;
}
