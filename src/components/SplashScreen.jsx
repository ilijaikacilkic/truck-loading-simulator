import React from 'react';

export default function SplashScreen({ visible }) {
  if (!visible) return null;

  return (
    <div className="splash-screen verano-splash" aria-hidden="true">
      <img className="verano-splash-image" src="/verano-splash.png" alt="Verano" />
    </div>
  );
}
