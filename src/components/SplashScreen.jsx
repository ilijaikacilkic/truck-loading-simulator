import React from 'react';

export default function SplashScreen({ visible }) {
  if (!visible) return null;

  return (
    <div className="splash-screen clean-splash" aria-hidden="true">
      <div className="clean-splash-inner">
        <img src="/logo.png" alt="Verano" className="clean-splash-logo" />
        <p>Make this your moment</p>
      </div>
    </div>
  );
}
