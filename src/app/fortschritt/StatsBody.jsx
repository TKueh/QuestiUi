import React, { Fragment } from 'react';
import { useNav } from '../shared.jsx';
import { AlltagBody } from './AlltagBody.jsx';
import { ExpensesBody } from './ExpensesBody.jsx';
import { GiftsBody } from './GiftsBody.jsx';
import { HealthBody } from './HealthBody.jsx';
import { StatsBar } from './StatsBar.jsx';

function StatsBody() {
  const nav = useNav();
  const tab = nav.route.view || 'a';
  return (
    <Fragment>
      <StatsBar tab={tab} />
      {tab === 'a' ? (
        <AlltagBody />
      ) : tab === 'h' ? (
        <HealthBody register={true} />
      ) : tab === 'p' ? (
        <GiftsBody />
      ) : (
        <ExpensesBody />
      )}
    </Fragment>
  );
}

export { StatsBody };
