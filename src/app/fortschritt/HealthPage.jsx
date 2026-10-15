import React, { Fragment } from 'react';
import N from 'nordhaus-ui';
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
        actions={React.createElement(N.AddButton, {
          label: 'Messung erfassen',
          onClick: () => {
            nav.open('measurement');
          },
        })}
      />
      <HealthBody />
    </Fragment>
  );
}

export { HealthPage };
