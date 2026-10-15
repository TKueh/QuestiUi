import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Ernährung und Finanzen / ShoppingList' };

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
        <Q.ShoppingList
          groups={[
            {
              title: 'Obst & Gemüse',
              items: [
                { name: 'Bananen', quantity: '5 Stück', checked: true },
                { name: 'Kiwis', quantity: '6 Stück' },
                { name: 'Gurke', quantity: '350 g' },
              ],
            },
            {
              title: 'Kühlregal',
              items: [
                { name: 'Skyr', quantity: '3 × 150 g' },
                { name: 'Körniger Frischkäse', quantity: '2 × 200 g', checked: true },
                { name: 'Tofu natur', quantity: '200 g', note: 'für Di + Fr' },
              ],
            },
            { title: 'Vorrat', pantry: true, items: [{ name: 'Reis', quantity: '300 g' }] },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
