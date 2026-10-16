import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Training / ExerciseRow' };

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
        <Q.ExerciseRow
          index={1}
          name="Kreuzheben"
          reps={8}
          sets={3}
          rest="2 min"
          weight={60}
          doneSets={2}
          note="Langhantel · zwei Vorbereitungssätze"
        />
        <Q.ExerciseRow
          index={2}
          name="Bankdrücken"
          reps={10}
          sets={4}
          rest="90 s"
          note="Langhantel"
          weight={42.5}
          planned={true}
          setValues={['10', '10', '9', '10']}
          deviations={[false, false, true, false]}
          doneSets={0}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;
