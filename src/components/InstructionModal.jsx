import React from 'react';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon } from 'lucide-react';


export default function InstructionModal({ ctx }) {
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
  return showInstructions && <div className="modal-backdrop" onClick={() => setShowInstructions(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Uputstvo — {moduleTitle()}</h2>
          <button className="ghost" onClick={() => setShowInstructions(false)}><X size={16}/> Zatvori</button>
        </div>
        {instructionContent()}
      </div>
    </div>;
}
