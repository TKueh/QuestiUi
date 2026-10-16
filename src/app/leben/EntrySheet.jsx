import React, { Fragment, useState } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { useNav } from '../shared.jsx';
import { GIFT } from './shared.jsx';

const { addDays, iso, num } = N.utils;

function EntrySheet({ id }) {
  const s = demo.use();
  const nav = useNav();
  const b = s.birthdays.filter((x) => x.id === id)[0];
  const name = useState(b ? b.name : '');
  const date = useState(b ? b.date : iso(addDays(new Date(), 30)));
  const year = useState(b && b.year ? b.year : '');
  const rel = useState(b && b.rel ? b.rel : 'Freundin');
  const gift = useState(!!(b && b.gift));
  const idea = useState(b && b.gift ? b.gift : '');
  const budget = useState(b && b.amount ? num(b.amount, 2) : '');
  const status = useState(b && b.status ? b.status : 'idea');
  const tried = useState(false);
  const err = tried[0] && !name[0].trim() ? 'Gib einen Namen ein.' : null;
  function save() {
    tried[1](true);
    if (!name[0].trim()) {
      setTimeout(() => {
        const el = document.getElementById('qs-entry-name');
        if (el) el.focus();
      }, 0);
      return;
    }
    demo.act.saveBirthday({
      id: b ? b.id : `b${Date.now()}`,
      name: name[0].trim(),
      date: date[0],
      rel: rel[0],
      gift: gift[0] ? idea[0] : undefined,
      amount: gift[0] && budget[0] ? parseFloat(String(budget[0]).replace(/\./g, '').replace(',', '.')) : undefined,
      status: gift[0] ? status[0] : undefined,
      year: year[0],
    });
    nav.close();
    nav.toast({ tone: 'success', message: `Geburtstag von ${name[0].trim()} gesichert.` });
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      title="Geburtstag"
      onCancel={nav.close}
      onDone={save}
      doneLabel="Sichern"
    >
      <N.TextField
        id="qs-entry-name"
        label="Name"
        size="lg"
        required={true}
        value={name[0]}
        onChange={name[1]}
        error={err}
      />
      <N.FieldRow>
        <N.DateField label="Geburtstag" value={date[0]} onChange={date[1]} quick={false} />
        <N.TextField label="Geburtsjahr" kind="number" optional={true} value={year[0]} onChange={year[1]} />
      </N.FieldRow>
      <N.Select
        label="Beziehung"
        options={['Familie', 'Freundin', 'Freund', 'Kollegin', 'Kollege']}
        value={rel[0]}
        onChange={rel[1]}
      />
      <N.Switch label="Geschenk planen" description="Idee, Budget und Status" checked={gift[0]} onChange={gift[1]} />
      {gift[0] ? (
        <Fragment>
          <N.TextField label="Geschenkidee" value={idea[0]} onChange={idea[1]} />
          <N.FieldRow>
            <N.TextField label="Budget" kind="money" value={budget[0]} onChange={budget[1]} />
            <N.Select label="Status" variant="status" options={GIFT} value={status[0]} onChange={status[1]} />
          </N.FieldRow>
        </Fragment>
      ) : null}
      <N.Select
        label="Erinnerung"
        options={['Am Tag selbst', '3 Tage vorher', '7 Tage vorher', '14 Tage vorher']}
        defaultValue={(b && b.reminder) || '7 Tage vorher'}
      />
    </N.Sheet>
  );
}

export { EntrySheet };
