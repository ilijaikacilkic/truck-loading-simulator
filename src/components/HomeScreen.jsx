import React, { useMemo } from 'react';
import {
  ArrowLeft,
  BarChart3,
  ClipboardList,
  Clock3,
  Factory,
  History,
  PackageCheck,
  QrCode,
  Truck,
  UserCircle
} from 'lucide-react';

function sameLocalDay(dateLike, now = new Date()) {
  if (!dateLike) return false;
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return false;
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

function shortTime(dateLike) {
  if (!dateLike) return '';
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
}

function formatDashboardDate(dateLike = new Date()) {
  const d = new Date(dateLike);
  return d.toLocaleDateString('sr-RS', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

function buildActivity(ctx) {
  const {
    state,
    qrRows = [],
    transfers = [],
    sentTransfers = [],
    productionWriteoffs = [],
    counts = [],
    now = new Date()
  } = ctx;

  const savedLoads = state?.savedLoads || [];
  const todayLoads = savedLoads.filter(load => sameLocalDay(load.createdAt, now));
  const todayScans = qrRows.filter(row => sameLocalDay(row.createdAt || row.updatedAt, now));
  const todayBoxes = new Set(todayScans.map(row => row.boxNumber).filter(Boolean));
  const todayTransfers = [...transfers, ...sentTransfers].filter(row => sameLocalDay(row.createdAt || row.sentAt, now));
  const todayWriteoffs = productionWriteoffs.filter(row => sameLocalDay(row.updatedAt || row.createdAt, now));
  const todayCounts = counts.filter(row => sameLocalDay(row.createdAt, now));

  const latest = [
    ...todayLoads.map(load => ({ type: 'Utovar', title: load.driverName || 'Sačuvan utovar', time: load.createdAt })),
    ...todayScans.map(row => ({ type: 'Skeniranje', title: row.boxNumber ? `${row.boxNumber}` : `${row.cpr || 'CPR'}`, time: row.createdAt || row.updatedAt })),
    ...todayTransfers.map(row => ({ type: 'Dopuna', title: row.art || 'Dopuna', time: row.createdAt || row.sentAt })),
    ...todayWriteoffs.map(row => ({ type: 'Otpis', title: row.art || row.pickLocation || 'Otpis', time: row.updatedAt || row.createdAt })),
    ...todayCounts.map(row => ({ type: 'Inventar', title: row.art || row.position || 'Brojanje', time: row.createdAt }))
  ].sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0)).slice(0, 4);

  return {
    todayLoads: todayLoads.length,
    todayBoxes: todayBoxes.size,
    todayTransfers: todayTransfers.length,
    todayWriteoffs: todayWriteoffs.length,
    latest
  };
}

function ActivityPanel({ ctx }) {
  const activity = useMemo(() => buildActivity(ctx), [
    ctx.state?.savedLoads,
    ctx.qrRows,
    ctx.transfers,
    ctx.sentTransfers,
    ctx.productionWriteoffs,
    ctx.counts,
    ctx.now
  ]);

  return <section className="home-activity-card">
    <div className="activity-heading">
      <div>
        <h2>Aktivnosti</h2>
        <p className="activity-date">{formatDashboardDate(ctx.now)}</p>
      </div>
      <button className="activity-history-link" onClick={() => ctx.openModule('history')}><History size={16}/> Istorija</button>
    </div>

    <div className="activity-stats-grid">
      <div><b>{activity.todayLoads}</b><span>utovara</span></div>
      <div><b>{activity.todayBoxes}</b><span>boksova</span></div>
      <div><b>{activity.todayTransfers}</b><span>dopuna</span></div>
      <div><b>{activity.todayWriteoffs}</b><span>otpisa</span></div>
    </div>

    <div className="activity-latest-list">
      {activity.latest.length === 0 && <p>Nema aktivnosti za danas.</p>}
      {activity.latest.map((item, index) => <div key={`${item.type}-${item.time}-${index}`} className="activity-latest-row">
        <span>{item.type}</span>
        <b>{item.title}</b>
        <small>{shortTime(item.time)}</small>
      </div>)}
    </div>
  </section>;
}

export default function HomeScreen({ ctx }) {
  const { appView, openModule } = ctx;

  if (appView === 'home') {
    return <section className="home-screen home-dashboard-screen">
      <div className="dashboard-welcome-card">
        <div>
          <h1>Dobro jutro, Ilija</h1>
          <p>Verano Production & Logistics</p>
        </div>
        <div className="dashboard-user-chip"><UserCircle size={36}/><span>Logistika</span></div>
      </div>

      <div className="dashboard-main-actions">
        <button className="dashboard-action-card production-action" onClick={() => openModule('production')}>
          <Factory size={44}/>
          <b>PROIZVODNJA</b>
          <small>Otpis materijala</small>
        </button>
        <button className="dashboard-action-card logistics-action" onClick={() => openModule('logistics')}>
          <Truck size={46}/>
          <b>LOGISTIKA</b>
          <small>Utovar, skeniranje i dopune</small>
        </button>
      </div>

      <ActivityPanel ctx={ctx} />
    </section>;
  }

  if (appView === 'logistics') {
    return <section className="home-screen logistics-dashboard-screen">
      <div className="logistics-header-card">
        <button className="logistics-back-btn" onClick={() => openModule('home')}><ArrowLeft size={18}/> Početna</button>
        <div>
          <h1>Logistika</h1>
          <p>Operacije, dopune i skeniranje</p>
        </div>
      </div>

      <div className="logistics-module-grid">
        <button className="logistics-module-card" onClick={() => openModule('load')}><Truck size={30}/><b>Utovar</b><small>Plan prikolice</small></button>
        <button className="logistics-module-card" onClick={() => openModule('scan')}><QrCode size={30}/><b>Skeniranje</b><small>CPR i boksovi</small></button>
        <button className="logistics-module-card" onClick={() => openModule('transfer')}><ClipboardList size={30}/><b>Dopuna</b><small>Refil i transfer</small></button>
        <button className="logistics-module-card" onClick={() => openModule('count')}><BarChart3 size={30}/><b>Inventar</b><small>Stanje i brojanje</small></button>
        <button className="logistics-module-card" onClick={() => openModule('time')}><Clock3 size={30}/><b>Vreme</b><small>Do kraja smene</small></button>
      </div>

      <ActivityPanel ctx={ctx} />
    </section>;
  }

  return null;
}
