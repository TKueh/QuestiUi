import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* ---------- Geräterahmen (nur Vorschau) ---------- */

function StatusBar({ time, island }) {
  return (
    <div className="qs-sbar" aria-hidden={true}>
      <span className="qs-sbar-time">{time || '9:41'}</span>
      {island !== false ? <span className="qs-island" /> : null}
      <span className="qs-sbar-icons">
        <i className="qs-sig" />
        <i className="qs-bat" />
      </span>
    </div>
  );
}
function HomeIndicator() {
  return <div className="qs-homeind" aria-hidden={true} />;
}
/* Geräte, an denen jeder Screen abgenommen wird: das große iPhone (Standard), das iPhone SE (375 × 667, Home-Taste, keine Insel)
   und die kleinste Breite (320 × 568). Der Rahmen setzt Bildschirm und Safe Areas als Variablen – der Inhalt passt sich an, nicht der Rahmen. */
const DEVICES = {
  'pro-max': { w: 430, h: 932, top: 59, bottom: 34, radius: 55, island: true, label: 'iPhone Pro Max · 430 × 932' },
  se: { w: 375, h: 667, top: 20, bottom: 0, radius: 0, island: false, label: 'iPhone SE · 375 × 667' },
  small: { w: 320, h: 568, top: 20, bottom: 0, radius: 0, island: false, label: 'Kleinste Breite · 320 × 568' },
};
function deviceFromQuery() {
  try {
    const d = new URLSearchParams(window.location.search).get('device');
    return DEVICES[d] ? d : undefined;
  } catch (e) {
    return undefined;
  }
}
function Phone({ device, style, className, theme, time, children, homeIndicator }) {
  const d = DEVICES[device] || DEVICES['pro-max'];
  const st = Object.assign(
    {
      '--screen-w': `${d.w}px`,
      '--screen-h': `${d.h}px`,
      '--safe-top': `${d.top}px`,
      '--safe-bottom': `${d.bottom}px`,
      '--device-radius': `${d.radius}px`,
    },
    style,
  );
  return (
    <div
      className={cx('qs-device', !d.island && 'qs-device--flat', className)}
      style={st}
      data-theme={theme}
      data-device={device || 'pro-max'}
    >
      <StatusBar time={time} island={d.island} />
      <div className="qs-device-content">{children}</div>
      {homeIndicator !== false && d.bottom ? <HomeIndicator /> : null}
    </div>
  );
}

export { Phone, deviceFromQuery, DEVICES, StatusBar, HomeIndicator };
