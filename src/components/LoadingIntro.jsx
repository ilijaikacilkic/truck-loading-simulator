import React, { useMemo, useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';

export default function LoadingIntro({ cargoTypes, onContinue, onSkip }) {
  const [counts, setCounts] = useState({});
  const total = useMemo(() => Object.values(counts).reduce((sum, v) => sum + (Number(v) || 0), 0), [counts]);

  function updateCount(id, value) {
    const clean = String(value || '').replace(/\D/g, '').slice(0, 4);
    setCounts(prev => ({ ...prev, [id]: clean }));
  }

  return <section className="loading-intro">
    <div className="loading-intro-card">
      <div className="loading-intro-head">
        <div>
          <h2>Unos količina za utovar</h2>
          <p>Unesi koliko fizičkih boksova ide u prikolicu. Prazno polje se računa kao 0.</p>
        </div>
        <div className="intro-total"><span>Ukupno</span><b>{total}</b></div>
      </div>

      <div className="loading-quantity-grid">
        {cargoTypes.map(type => <label key={type.id} className="quantity-row">
          <span className="quantity-dot" style={{ background: type.color }}></span>
          <span className="quantity-name">{type.name}</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
            value={counts[type.id] || ''}
            onChange={e => updateCount(type.id, e.target.value)}
          />
          <small>{type.stackCount || 4} u buntu</small>
        </label>)}
      </div>

      <div className="loading-intro-actions">
        <button onClick={() => onContinue(counts)}><ArrowRight size={17}/> Dalje</button>
        <button className="ghost" onClick={onSkip}><SkipForward size={17}/> Preskoči</button>
      </div>
    </div>
  </section>;
}
