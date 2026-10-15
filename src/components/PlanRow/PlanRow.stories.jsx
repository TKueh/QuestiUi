import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Zeilen / PlanRow' };

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
      <div className="nh-demo-grid">
        <div className="nh-list nh-rows--boxed">
          <Q.PlanRow
            category="personal"
            icon="calendar"
            title="Wochenzeitplan"
            description="Tagesaufgaben, Arbeit und feste Sporttermine."
            count={5}
          />
          <Q.PlanRow
            category="training"
            title="Trainingsplan"
            description="Übungen, Vorgaben und Satzhaken."
            count={6}
            updated="geändert 13.10."
          />
          <Q.PlanRow
            category="finance"
            title="Finanzplan"
            description="27 Verträge und Sparposten."
            count={3}
            status="paused"
          />
        </div>
        <div className="nh-list nh-rows--boxed">
          <Q.PlanItemRow
            icon="dumbbell"
            title="Kraft A"
            schedule="Mo · Do · A/B im Wechsel"
            detail="7 Übungen"
            onEdit={() => {}}
          />
          <Q.PlanItemRow
            icon="leaf"
            title="Mittag A"
            schedule="Mo · Di · Do · So"
            detail="Kartoffeln, Hähnchen, Gemüse"
            onEdit={() => {}}
          />
          <Q.PlanItemRow icon="basket" title="Frischeinkauf" schedule="Mi · Sa 17:30" onEdit={() => {}} />
        </div>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
