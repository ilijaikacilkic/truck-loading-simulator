import React from 'react';
import { Trash2, QrCode, Camera, Send, Copy, FileSpreadsheet, Undo2, Box, PackageCheck } from 'lucide-react';

export default function ScannerModule({ ctx }) {
  const {
    appView, ModuleHeader, videoRef, scannerError, qrRows, setQrRows,
    qrScanKind, setQrScanKind, qrScanMessage, QR_PRODUCT_TYPES,
    manualQrValue, setManualQrValue, addManualQr, applyQrProductType,
    updateQrRow, deleteQrRow, undoLastQrRow, emailMarija, copyQrTable,
    downloadScanningXlsx
  } = ctx;

  if (appView !== 'scan') return null;

  const waitingRows = qrRows.filter(row => !row.boxNumber);
  const completedRows = qrRows.filter(row => row.boxNumber);
  const rowsWithoutType = qrRows.filter(row => !row.productType);

  return <>
    <ModuleHeader />
    <section className="qr-module qr-flow-module">
      <div className="qr-top">
        <div className="qr-scanner-card">
          <div className="qr-scanner-head">
            <div>
              <h2><QrCode size={22}/> Skeniranje</h2>
              
            </div>
            <span className="qr-count">{qrRows.length} CPR</span>
          </div>

          <div className="scan-toggle-row">
            <button className={qrScanKind === 'product' ? 'active' : ''} onClick={() => setQrScanKind('product')}>
              <PackageCheck size={18}/> Proizvod
            </button>
            <button className={qrScanKind === 'box' ? 'active' : ''} onClick={() => setQrScanKind('box')}>
              <Box size={18}/> Boks
            </button>
          </div>

          <div className="scanner-status-row">
            <span className={qrScanKind === 'product' ? 'status-product' : 'status-box'}>
              {qrScanKind === 'product' ? 'Skeniraš CPR proizvode' : `Skeniraš boks za ${waitingRows.length} proizvoda`}
            </span>
            <span>Na čekanju: <b>{waitingRows.length}</b></span>
          </div>

          <div className="camera-box"><video ref={videoRef} muted playsInline /><div className="scan-frame"><Camera size={30}/><span>{qrScanKind === 'product' ? 'Usmeri kameru ka QR kodu proizvoda' : 'Usmeri kameru ka QR kodu boksa'}</span></div></div>
          {(scannerError || qrScanMessage) && <div className={scannerError ? 'scanner-error' : 'scanner-message'}>{scannerError || qrScanMessage}</div>}

          <div className="manual-scan">
            <input value={manualQrValue} onChange={e => setManualQrValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addManualQr(); }} placeholder={qrScanKind === 'product' ? 'Ručno unesi CPR' : 'Ručno unesi boks'} />
            <button onClick={addManualQr}>Dodaj</button>
          </div>
        </div>
      </div>

      <div className="qr-product-panel">
        <div>
          <h3>Tip robe</h3>
        </div>
        <div className="qr-product-buttons">
          {QR_PRODUCT_TYPES.map(type => <button key={type} onClick={() => applyQrProductType(type)} disabled={!rowsWithoutType.length}>{type}<small>Popuni {rowsWithoutType.length || 0}</small></button>)}
        </div>
      </div>

      <div className="qr-table-section">
        <div className="qr-table-title">
          <div>
            <h2>Scanning tabela</h2>
            <p>{completedRows.length} povezano · {waitingRows.length} čeka boks</p>
          </div>
          <div className="qr-actions">
            <button className="ghost" onClick={undoLastQrRow} disabled={!qrRows.length}><Undo2 size={15}/> Vrati poslednje</button>
            <button onClick={emailMarija} disabled={!qrRows.length}><Send size={15}/> Pošalji Mariji</button>
            <button className="ghost" onClick={copyQrTable} disabled={!qrRows.length}><Copy size={15}/> Kopiraj</button>
            <button className="ghost" onClick={() => downloadScanningXlsx(qrRows)} disabled={!qrRows.length}><FileSpreadsheet size={15}/> Preuzmi Excel</button>
            <button className="danger" onClick={() => { if (confirm('Obrisati celu scanning tabelu?')) setQrRows([]); }} disabled={!qrRows.length}><Trash2 size={15}/> Obriši</button>
          </div>
        </div>

        <div className="qr-table-wrap"><table className="qr-table qr-flow-table"><thead><tr><th>#</th><th>CPR</th><th>Boks</th><th>Tip robe</th><th></th></tr></thead><tbody>{!qrRows.length && <tr><td colSpan="5" className="empty-row">Još nema skeniranih CPR-ova.</td></tr>}{qrRows.map((row, index) => <tr key={row.id} className={!row.boxNumber ? 'waiting-row' : ''}><td>{index + 1}</td><td><input value={row.cpr || ''} onChange={e => updateQrRow(row.id, { cpr: e.target.value })}/></td><td><input value={row.boxNumber || ''} onChange={e => updateQrRow(row.id, { boxNumber: e.target.value })} placeholder="Čeka boks"/></td><td><select value={row.productType || ''} onChange={e => updateQrRow(row.id, { productType: e.target.value })}><option value="">Bez tipa</option>{QR_PRODUCT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></td><td><button className="icon-danger" onClick={() => deleteQrRow(row.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      </div>
    </section>
  </>;
}
