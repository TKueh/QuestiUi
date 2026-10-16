import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Pläne und Import / ImportPreview' };

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
        <Q.ImportPreview
          file="Essensplan.pdf"
          meta="4 Seiten · 182 KB"
          stats={[
            { label: 'Bausteine', value: '13' },
            { label: 'Termine', value: '21' },
            { label: 'Prüfen', value: '2' },
          ]}
          excerpt={'Mittag A · Mo/Di/Do/So\nKartoffeln 500 g, Hähnchen 200 g, Gemüse 285 g …'}
        >
          <N.Notice tone="danger" title="2 Mengen unklar">
            „eine Handvoll Nüsse“ und „etwas Öl“ bleiben mit Prüfhinweis sichtbar.
          </N.Notice>
        </Q.ImportPreview>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
