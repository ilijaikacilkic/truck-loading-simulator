import React from 'react';

export default function SplashScreen({ visible }) {
  if (!visible) return null;

  return (
    <div className="splash-screen verano-splash" aria-hidden="true">
      <div className="verano-splash-mark">
        <div className="verano-wordmark">
          Verano<span>®</span>
        </div>
        <p>Make this your moment</p>
      </div>
    </div>
  );
}
