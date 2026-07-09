import React, { useMemo, useState } from 'react';
import { Trash2, QrCode, Camera, Send, Copy, FileSpreadsheet, Undo2, Box, PackageCheck, Pencil, ArrowRightLeft, X } from 'lucide-react';

export default function ScannerModule({ ctx }) {
  const {
    appView, ModuleHeader, videoRef, scannerError, qrRows, setQrRows,
    qrScanKind, setQrScanKind, qrScanMessage, QR_PRODUCT_TYPES,
    manualQrValue, setManualQrValue, addManualQr, applyQrProductType,
    updateQrRow, deleteQrRow, undoLastQrRow, emailMarija, copyQrTable,
    downloadScanningXlsx, scanFlash, scanFeed
  } = ctx;

  const [editingBox, setEditingBox] = useState('');

  const waitingRows = qrRows.filter(row => !row.boxNumber);
  const completedRows = qrRows.filter(row => row.boxNumber);
  const rowsWithoutType = qrRows.filter(row => !row.productType);

  const boxGroups = useMemo(() => {
    const map = new Map();
    completedRows.forEach(row => {
      const key = String(row.boxNumber || '').trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(row);
    });
    return [...map.entries()].map(([boxNumber, rows]) => {
      const types = [...new Set(rows.map(row => row.productType).filter(Boolean))];
      const groupType = !types.length ? 'Bez tipa' : types.length === 1 ? types[0] : 'Mixed';
      return { boxNumber, rows, groupType };
    });
  }, [completedRows]);

  const boxTypeStats = useMemo(() => {
    const stats = {};
    boxGroups.forEach(group => {
      stats[group.groupType] = (stats[group.groupType] || 0) + 1;
    });
    return Object.entries(stats);
  }, [boxGroups]);

  if (appView !== 'scan') return null;

  function deleteBox(boxNumber) {
    if (!confirm(`Obrisati ceo boks ${boxNumber} iz liste?`)) return;
    setQrRows(rows => rows.filter(row => row.boxNumber !== boxNumber));
    if (editingBox === boxNumber) setEditingBox('');
  }

  function moveRowToBox(row) {
    const nextBox = prompt('Unesi novi boks za ovaj CPR:', row.boxNumber || '');
    if (nextBox === null) return;
    const clean = nextBox.trim();
    if (!clean) return;
    updateQrRow(row.id, { boxNumber: clean, updatedAt: new Date().toISOString() });
  }

  function removeRowFromBox(row) {
    if (!confirm(`Izvaditi ${row.cpr || 'CPR'} iz boksa?`)) return;
    updateQrRow(row.id, { boxNumber: '', updatedAt: new Date().toISOString() });
  }

  return <>
    <ModuleHeader />
    <section className="qr-module qr-flow-module">
      <div className="qr-top">
        <div className="qr-scanner-card">
          <div className="qr-scanner-head">
            <div>
              <h2><QrCode size={22}/> Skeniranje</h2>
            </div>
            <span className="qr-count">{boxGroups.length} boksova</span>
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

          <div className={`camera-box ${qrScanKind === 'box' ? 'box-mode' : 'product-mode'} ${scanFlash ? 'scan-success' : ''}`}>
            <video ref={videoRef} muted playsInline />
            <div className="scan-frame"><Camera size={30}/></div>
            <div className="scan-feed">
              {scanFeed.map(item => (
                <div key={item.id} className={`scan-feed-item ${item.kind === 'box' ? 'is-box' : 'is-product'}`}>
                  <small>{item.kind === 'box' ? 'BOKS' : 'CPR'}</small>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
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
          <p>Klik na tip robe popunjava sve skenirane stavke koje još nemaju dodeljen tip.</p>
        </div>
        <div className="qr-product-buttons">
          {QR_PRODUCT_TYPES.map(type => <button key={type} onClick={() => applyQrProductType(type)} disabled={!rowsWithoutType.length}>{type}<small>Popuni {rowsWithoutType.length || 0}</small></button>)}
        </div>
      </div>

      <div className="scanner-summary-panel">
        <div className="scanner-summary-head">
          <div>
            <h2>Skenirani boksovi</h2>
            <p>{boxGroups.length} boksova · {waitingRows.length} CPR na čekanju</p>
          </div>
          <div className="scanner-summary-chips">
            {boxTypeStats.map(([label, count]) => (
              <span key={label} className="summary-chip">{label}: <b>{count}</b></span>
            ))}
          </div>
        </div>

        {!!waitingRows.length && (
          <div className="waiting-rows-panel">
            <h3>CPR na čekanju</h3>
            <div className="waiting-rows-list">
              {waitingRows.map(row => (
                <span key={row.id} className="waiting-row-chip">{row.cpr}</span>
              ))}
            </div>
          </div>
        )}

        <div className="box-groups-grid">
          {!boxGroups.length && !waitingRows.length && (
            <div className="empty-card">Još nema skeniranih boksova.</div>
          )}

          {boxGroups.map(group => {
            const isEditing = editingBox === group.boxNumber;
            return <article key={group.boxNumber} className="box-group-card">
              <div className="box-group-head">
                <div>
                  <span className="box-group-label">Boks</span>
                  <h3>{group.boxNumber}</h3>
                </div>
                <div className="box-group-badges">
                  <span className={`box-group-type ${group.groupType === 'Mixed' ? 'mixed' : ''}`}>{group.groupType}</span>
                  <span className="box-group-size">{group.rows.length} CPR</span>
                </div>
              </div>

              <div className="box-group-actions">
                <button className="ghost" onClick={() => setEditingBox(isEditing ? '' : group.boxNumber)}><Pencil size={14}/> {isEditing ? 'Zatvori' : 'Uredi boks'}</button>
                <button className="danger" onClick={() => deleteBox(group.boxNumber)}><Trash2 size={14}/> Izbriši boks</button>
              </div>

              <div className="box-group-list">
                {group.rows.map(row => (
                  <div key={row.id} className="box-group-row">
                    <div className="box-group-cpr">{row.cpr || '-'}</div>
                    <div className="box-group-meta">
                      {isEditing ? (
                        <select value={row.productType || ''} onChange={e => updateQrRow(row.id, { productType: e.target.value, updatedAt: new Date().toISOString() })}>
                          <option value="">Bez tipa</option>
                          {QR_PRODUCT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      ) : <span>{row.productType || 'Bez tipa'}</span>}
                      <span>{group.boxNumber}</span>
                    </div>
                    {isEditing && <div className="box-row-actions">
                      <button className="ghost" onClick={() => moveRowToBox(row)}><ArrowRightLeft size={14}/> Prebaci</button>
                      <button className="ghost" onClick={() => removeRowFromBox(row)}><X size={14}/> Izvadi</button>
                      <button className="danger" onClick={() => deleteQrRow(row.id)}><Trash2 size={14}/> Obriši</button>
                    </div>}
                  </div>
                ))}
              </div>
            </article>;
          })}
        </div>
      </div>

      <div className="qr-table-section">
        <div className="qr-table-title">
          <div>
            <h2>Detaljna tabela</h2>
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
