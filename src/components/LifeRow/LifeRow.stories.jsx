import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Zeilen / LifeRow' };

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
  const st = [
    { value: 'idea', label: 'Idee', led: 'off' },
    { value: 'planned', label: 'Geplant', led: 'off' },
    { value: 'bought', label: 'Besorgt', led: 'on' },
    { value: 'given', label: 'Verschenkt', led: 'ink' },
  ];
  return (
    <div className="nh-demo">
      <div className="nh-demo-w nh-list nh-rows--boxed">
        <Q.LifeRow
          kind="birthday"
          date={day(3)}
          title="Lena"
          meta="In 3 Tagen · 33 Jahre · Freundin"
          gift="Keramik-Workshop"
          amount={65}
          status="planned"
          statusOptions={st}
        />
        <Q.LifeRow
          kind="birthday"
          date={day(12)}
          title="Papa"
          meta="In 12 Tagen · 61 Jahre"
          gift="Kochbuch"
          amount={75}
          spent={34.9}
          status="bought"
          statusOptions={st}
        />
        <Q.LifeRow kind="wish" title="Laufschuhe" meta="Wunsch · bis März" amount={140} />
        <Q.LifeRow
          kind="project"
          title="Fahrrad zur Inspektion"
          meta="Vorhaben · ca. 1 h"
          action={React.createElement(N.Button, { variant: 'key', size: 'sm' }, 'Einplanen')}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
