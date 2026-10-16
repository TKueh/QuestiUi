import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { SubBar, useNav } from '../shared.jsx';
import { HealthBody } from './HealthBody.jsx';

function HealthPage() {
  const nav = useNav();
  return (
    <Fragment>
      <SubBar
        large={true}
        backLabel="Mehr"
        title="Gesundheit"
        eyebrow="Gemessen · ohne Bewertung"
        actions={React.createElement(
          N.Button,
          {
            variant: 'key',
            size: 'sm',
            icon: 'plus',
            onClick: () => {
              nav.open('measurement');
            },
          },
          'Messung',
        )}
      />
      <HealthBody />
    </Fragment>
  );
}

export { HealthPage };
