import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Zeilen / QuestRow' };

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
        <Q.QuestList
          groups={[
            {
              title: 'Morgens',
              items: [
                {
                  id: 1,
                  category: 'movement',
                  title: 'Bewegungspausen machen',
                  description: 'Drei kurze Pausen, jeweils 2 Minuten',
                  steps: [1, 3],
                },
                {
                  id: 2,
                  category: 'food',
                  title: 'Vormittagssnack essen',
                  description: 'Eiweißbrot mit Käse und Guacamole',
                  done: true,
                },
              ],
            },
            {
              title: 'Abends',
              items: [
                {
                  id: 3,
                  category: 'training',
                  title: 'Kraft A trainieren',
                  description: '7 Übungen · 24 Sätze',
                  time: '18:00',
                },
                {
                  id: 4,
                  category: 'household',
                  title: 'Frischeinkauf erledigen',
                  description: '10 Artikel für Donnerstag bis Samstag',
                  status: 'missed',
                },
                { id: 5, category: 'training', title: 'Judo', description: 'Verein · Halle 2', paused: true },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
