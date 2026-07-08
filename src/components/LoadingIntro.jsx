import React, { useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';

export default function LoadingIntro({ cargoTypes, onContinue, onSkip }) {
  const [counts, setCounts] = useState({});

  function updateCount(id, value) {
    const clean = String(value || '').replace(/\D/g, '').slice(0, 4);
    setCounts(prev => ({ ...prev, [id]: clean }));
  }

  return <section className="loading-intro">
    <div className="loading-intro-card loading-intro-card-clean">
      <div className="loading-intro-head">
        <h2>Unos količina za utovar</h2>
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
        </label>)}
      </div>

      <div className="loading-intro-actions">
        <button onClick={() => onContinue(counts)}><ArrowRight size={17}/> Dalje</button>
        <button className="ghost" onClick={onSkip}><SkipForward size={17}/> Preskoči</button>
      </div>
    </div>
  </section>;
}
