import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Pläne und Import / ChangeList' };

const useState = React.useState;
const F = React.Fragment;
const U = N.utils;
const TODAY = U.iso(new Date());
function day(n) {
  return U.iso(U.addDays(new Date(), n));
}
function wk(n) {
  return U.iso(U.addDays(U.weekStartOf(new Date(), 1), n));
}
function cap(i, t) {
  return (
    <p className="nh-demo-cap">
      <span>{(i < 10 ? '0' : '') + i}</span>
      {t}
    </p>
  );
}
function Demo() {
  return (
    <div className="nh-demo">
      <div className="nh-demo-w">
        <Q.ChangeList
          items={[
            { type: 'add', title: 'Mittag C · Linsen-Bowl', after: 'Mi · Sa', note: 'Neu aus Essensplan.pdf' },
            { type: 'change', title: 'Kreuzheben', before: '3 × 8 · 55 kg', after: '3 × 8 · 60 kg' },
            { type: 'remove', title: 'Abendessen: Wraps', before: 'Do' },
            { type: 'conflict', title: 'Zahnarzt', after: 'Di 19:00', note: 'Überschneidet sich mit Judo' },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
