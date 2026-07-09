import React from 'react';

export default function SplashScreen({ visible }) {
  if (!visible) return null;

  return (
    <div className="splash-screen" aria-hidden="true">
      <div className="splash-screen__inner">
        <div className="splash-logo-wrap">
          <img src="/splash-logo.png" alt="Verano" className="splash-logo" />
        </div>
        <p className="splash-tagline">Make this your moment</p>
        <div className="splash-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
