import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Ernährung und Finanzen / NutritionPanel' };

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
      <div className="nh-demo-w" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Q.NutritionPanel kcal={764} macros={{ protein: 63, carbs: 89, fat: 14 }} fiber={17} />
        <Q.IngredientList
          portions={1}
          items={[
            { name: 'Kartoffeln', quantity: '500 g Rohteil' },
            { name: 'Hähnchen / Pute', quantity: '200 g roh' },
            { name: 'Gemüse', quantity: '285 g' },
            { name: 'Olivenöl', note: 'erst beim Essen', quantity: '10 g' },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
