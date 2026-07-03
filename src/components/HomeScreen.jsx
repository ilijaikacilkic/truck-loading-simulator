import React from 'react';

export default function HomeScreen({ ctx }) {
  const { appView, APP_LOGO_SRC, APP_QUOTES, quoteIndex, openModule } = ctx;

  if (appView === 'home') {
    return <section className="home-screen home-choice-screen">
      <div className="home-logo">
        <img className="app-logo-img" src={APP_LOGO_SRC} alt="Logo aplikacije" />
        <h1>Verano Logistics</h1>
      </div>

      <div className="home-choice-grid">
        <button className="home-choice-tile production-choice" onClick={() => openModule('production')}>
          <span className="tile-icon">🛠️</span>
          <b>PROIZVODNJA</b>
          <small>Otpis materijala</small>
        </button>
        <button className="home-choice-tile logistics-choice" onClick={() => openModule('logistics')}>
          <span className="tile-icon">🧠</span>
          <b>LOGISTIKA</b>
          <small>Utovar, skeniranje, dopuna, istorija</small>
        </button>
      </div>

      <div className="quote-card quote-only">
        <p>“{APP_QUOTES[quoteIndex]}”</p>
      </div>
    </section>;
  }

  if (appView === 'logistics') {
    return <section className="home-screen logistics-screen">
      <div className="home-logo compact-home-logo">
        <img className="app-logo-img" src={APP_LOGO_SRC} alt="Logo aplikacije" />
        <h1>Logistika</h1>
        <button className="ghost home-back-choice" onClick={() => openModule('home')}>Nazad</button>
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

  return null;
}
