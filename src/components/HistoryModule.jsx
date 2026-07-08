import React from 'react';
import { Download, RotateCcw, Search, UploadCloud } from 'lucide-react';

export default function HistoryModule({ ctx }) {
  const {
    appView, state, qrRows, transfers, sentTransfers, productionWriteoffs,
    historySearch, setHistorySearch, filteredHistory, downloadBackup,
    restoreBackup, formatDateTime, resetHistory, ModuleHeader
  } = ctx;

  if (appView !== 'history') return null;

  return <>
    <ModuleHeader />
    <section className="simple-module history-module">
      <div className="history-heading-row">
        <h2>Istorija</h2>
        <button className="danger" onClick={resetHistory}><RotateCcw size={16}/> Reset istorije</button>
      </div>

      <div className="history-grid">
        <div><h3>Utovar</h3><p>{(state.savedLoads || []).length}</p></div>
        <div><h3>Skeniranje</h3><p>{qrRows.length}</p></div>
        <div><h3>Dopune</h3><p>{transfers.length + sentTransfers.length}</p></div>
        <div><h3>Otpis</h3><p>{(productionWriteoffs || []).length}</p></div>
      </div>

      <div className="search-panel"><Search size={18}/><input placeholder="Pretraži istoriju..." value={historySearch} onChange={e => setHistorySearch(e.target.value)} /></div>
      <div className="backup-actions"><button onClick={downloadBackup}><Download size={16}/> Preuzmi backup</button><label className="upload-btn"><UploadCloud size={16}/> Vrati backup<input type="file" accept="application/json,.json" onChange={e => restoreBackup(e.target.files?.[0])}/></label></div>
      <div className="history-list">
        {filteredHistory.length === 0 && <p className="empty-card">Nema rezultata za ovu pretragu.</p>}
        {filteredHistory.map(item => <div className="history-card" key={`${item.type}-${item.id}`}><div className="history-icon">{item.icon}</div><div><div className="history-card-head"><b>{item.title}</b><span>{item.type}</span></div><p>{item.summary}</p><small>{item.createdAt ? formatDateTime(item.createdAt) : '-'}</small></div></div>)}
      </div>
    </section>
  </>;
}
