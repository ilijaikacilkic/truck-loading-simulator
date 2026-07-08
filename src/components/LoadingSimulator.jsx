import React from 'react';
import LoadingIntro from './LoadingIntro.jsx';
import { Trash2, Plus, RotateCcw, Save, X, MousePointer2, Grid3X3, Upload, Copy, Send, FileSpreadsheet, ArrowLeft, Clock3, Search, Download, UploadCloud, Image as ImageIcon, QrCode, Camera, Mail, Edit3 } from 'lucide-react';


export default function LoadingSimulator({ ctx }) {
  const { appView, APP_LOGO_SRC, APP_QUOTES, quoteIndex, openModule,
  showInstructions, setShowInstructions, moduleTitle, instructionContent,
  sharedLoad, setSharedLoad, validation, totalPlacedBoxCount, state,
  showLoadIntro, applyLoadingQuantities, skipLoadingQuantities,
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
  return appView === 'load' && <>
      <ModuleHeader />
      {showLoadIntro && <LoadingIntro cargoTypes={state.cargoTypes} onContinue={applyLoadingQuantities} onSkip={skipLoadingQuantities} />}
      {!showLoadIntro && <>
      <section className="metrics">
        <label>Dužina prikolice <input type="number" step="0.1" value={state.trailer.length} onChange={e => updateTrailer('length', e.target.value)} /> m</label>
        <label>Širina / dubina prikolice <input type="number" step="0.05" value={state.trailer.width} onChange={e => updateTrailer('width', e.target.value)} /> m</label>
        <div><b>{validation.usedArea.toFixed(2)}m²</b> iskorišćeno / {validation.trailerArea.toFixed(2)}m²</div>
        <div><b>{Math.round((validation.usedArea / validation.trailerArea) * 100) || 0}%</b> popunjeno</div>
      </section>

      <section className="mode-panel compact small-mode-panel">
        <h2>Način pakovanja</h2>
        <div className="segmented-switch">
          <button className={mode === 'drag' ? 'active' : ''} onClick={() => setMode('drag')}><MousePointer2 size={14}/> Drag</button>
          <button className={mode === 'grid' ? 'active' : ''} onClick={() => setMode('grid')}><Grid3X3 size={14}/> Grid</button>
        </div>
      </section>

      <section className="workspace">
        <section className="main-area">
          <div className="load-status-row">
            <span className={validation.valid ? 'status ok' : 'status bad'}>{validation.valid ? 'Sve staje' : 'NEMA MESTA'}</span>
            <span className="load-total-boxes">Ukupno boksova: <b>{totalPlacedBoxCount}</b></span>
          </div>
          <div className="trailer-wrap compact-trailer-wrap">
            <div className="dim dim-top">{state.trailer.length} m</div>
            <div className={`trailer ${validation.valid ? '' : 'bad-trailer'}`} ref={trailerRef} style={trailerStyle} onPointerDown={placeSelectedAt}>
              {!validation.valid && <div className="no-space-banner">NEMA MESTA</div>}
              <div className="dim dim-side">{state.trailer.width} m</div>
              <div className="lane-line lane-line-1"></div>
              <div className="lane-line lane-line-2"></div>
              {placed.map(b => {
                const invalid = validation.invalidIds.has(b.id);
                const w = toPx(b.length);
                const h = toPx(b.width);
                return <div key={b.id} onPointerDown={e => startDrag(e, b)} className={`box placed ${invalid ? 'invalid' : ''}`} style={{ left: toPx(b.x), top: toPx(b.y), width: w, height: h, background: b.color }}>
                  <strong>{b.name}</strong><span>{formatMeters(b.length)} × {formatMeters(b.width)} · {b.stackCount || 1} boksa</span>
                  <div className="box-actions"><button onClick={(e)=>{e.stopPropagation(); unplaceBox(b.id)}}><Trash2 size={13}/></button></div>
                </div>;
              })}
            </div>
          </div>
          <div className="actions">
            <button onClick={saveCurrentLoad}><Save size={16}/> Sačuvaj prikolicu</button>
            <button onClick={undoLastPlaced} disabled={!lastPlacedBoxId}><ArrowLeft size={16}/> Vrati poslednje</button>
            <button onClick={clearTrailer}><RotateCcw size={16}/> Isprazni prikolicu</button>
            <button className="danger" onClick={resetAll}><Trash2 size={16}/> Resetuj sve</button>
            <span><Save size={15}/> Automatski sačuvano lokalno</span>
          </div>
          <h2>Dostupna roba</h2>
          <div className="available compact-available">
            {unplaced.map(b => <div key={b.id} onPointerDown={e => mode === 'drag' ? startDrag(e, b) : selectForGrid(b)} className={`box preview ${selectedBoxId === b.id ? 'selected-box' : ''}`} style={{ background: b.color }}><strong>{b.name}</strong><span>{formatMeters(b.length)} × {formatMeters(b.width)} · {b.stackCount || 1} boksa</span>{mode === 'grid' && selectedBoxId === b.id && <em>Izabran</em>}</div>)}
          </div>
        </section>

        <aside className="panel types-panel">
          <div className="panel-title"><h2>Tipovi robe</h2><button onClick={addType}><Plus size={16}/> Dodaj</button></div>
          {state.cargoTypes.map(t => <div className="type-card" key={t.id}>
            <input value={t.name} onChange={e => updateType(t.id, { name: e.target.value })}/>
            <div className="row"><label>Dužina (m) <input type="number" step="0.1" value={t.length} onChange={e => updateType(t.id, { length: e.target.value })}/></label><label>Širina (m) <input type="number" step="0.1" value={t.width} onChange={e => updateType(t.id, { width: e.target.value })}/></label></div>
            <div className="row"><label>Količina buntova <input type="number" min="0" value={t.qty} onChange={e => updateType(t.id, { qty: e.target.value })}/></label><label>Boksova u buntu <input type="number" min="1" max="4" value={t.stackCount || 4} onChange={e => updateType(t.id, { stackCount: clamp(Number(e.target.value) || 1, 1, 4) })}/></label></div><div className="row"><label>Boja <input type="color" value={t.color} onChange={e => updateType(t.id, { color: e.target.value })}/></label></div>
            <button className="ghost danger" onClick={() => deleteType(t.id)}><Trash2 size={14}/> Obriši tip</button>
          </div>)}
        </aside>
      </section>

      <section className="saved-section">
        <div className="saved-title"><h2>Sačuvane prikolice</h2></div>
        <div className="saved-table-wrap">
          <table className="saved-table">
            <thead><tr><th>Prikaz</th><th>Datum i vreme</th><th>Ime vozača</th><th>Težina prikolice</th><th>Težina tereta</th><th>Slike</th><th>Status</th><th>Share</th><th></th></tr></thead>
            <tbody>
              {(state.savedLoads || []).length === 0 && <tr><td colSpan="9" className="empty-row">Još nema sačuvanih prikolica.</td></tr>}
              {(state.savedLoads || []).map(load => <tr key={load.id}>
                <td><img className="thumb" src={load.thumbnail} alt="Sačuvan raspored prikolice" /></td>
                <td>{formatDateTime(load.createdAt)}</td>
                <td><input placeholder="Ime vozača" value={load.driverName} onChange={e => updateSavedLoad(load.id, { driverName: e.target.value })}/></td>
                <td><input placeholder="npr. 7200 kg" value={load.trailerWeight} onChange={e => updateSavedLoad(load.id, { trailerWeight: e.target.value })}/></td>
                <td><input placeholder="npr. 18000 kg" value={load.cargoWeight} onChange={e => updateSavedLoad(load.id, { cargoWeight: e.target.value })}/></td>
                <td><label className="upload-btn"><Upload size={14}/> Dodaj slike<input type="file" accept="image/*" multiple onChange={e => uploadSavedPhotos(load.id, e.target.files)} /></label><div className="photo-strip">{(load.photos || []).map(photo => <span key={photo.id} className="photo-mini"><img src={photo.dataUrl} alt={photo.name}/><button onClick={() => removeSavedPhoto(load.id, photo.id)}>×</button></span>)}</div></td>
                <td><span className={load.valid ? 'mini-status ok' : 'mini-status bad'}>{load.valid ? 'OK' : 'Nema mesta'}</span></td>
                <td className="share-actions"><button onClick={() => copyShareLink(load)}><Copy size={15}/> Link</button><button onClick={() => emailShare(load)}><Mail size={15}/> Email</button></td>
                <td className="saved-actions"><button onClick={() => loadSavedLoad(load)}><Edit3 size={15}/> Učitaj</button><button className="icon-danger" onClick={() => deleteSavedLoad(load.id)}><Trash2 size={15}/></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>
      </>}
    </>;
}
