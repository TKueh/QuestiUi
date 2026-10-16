import React, { useState } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { useNav } from '../shared.jsx';
import { WISH } from './shared.jsx';

/* Vorhaben und Wunsch anlegen – gleicher Aufbau wie der Geburtstag (Formular-Sheet „Abbrechen · Titel · Sichern“) */
function ItemSheet({ kind }) {
  const nav = useNav();
  const wish = kind === 'wish';
  const title = useState('');
  const extra = useState('');
  const status = useState('idea');
  const tried = useState(false);
  const amount = parseFloat(String(extra[0]).replace(/\./g, '').replace(',', '.'));
  const errTitle =
    tried[0] && !title[0].trim() ? (wish ? 'Gib dem Wunsch einen Namen.' : 'Gib dem Vorhaben einen Namen.') : null;
  const errAmount = wish && tried[0] && !(amount > 0) ? 'Gib ein Budget ein.' : null;
  function save() {
    tried[1](true);
    if (!title[0].trim() || (wish && !(amount > 0))) {
      setTimeout(() => {
        const el = document.getElementById(!title[0].trim() ? 'qs-item-title' : 'qs-item-extra');
        if (el) el.focus();
      }, 0);
      return;
    }
    const t = title[0].trim();
    if (wish) demo.act.addLifeItem('wishes', { title: t, amount, status: status[0], meta: 'Noch nicht eingeplant' });
    else
      demo.act.addLifeItem('projects', {
        title: t,
        meta: extra[0].trim() ? `Noch nicht eingeplant · ca. ${extra[0].trim()}` : 'Noch nicht eingeplant',
      });
    nav.close();
    nav.toast({ tone: 'success', message: `${wish ? 'Wunsch' : 'Vorhaben'} „${t}“ gesichert.` });
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      title={wish ? 'Wunsch' : 'Vorhaben'}
      onCancel={nav.close}
      onDone={save}
      doneLabel="Sichern"
    >
      <N.TextField
        id="qs-item-title"
        label={wish ? 'Wunsch' : 'Vorhaben'}
        size="lg"
        required={true}
        placeholder={wish ? 'z. B. Kochkurs' : 'z. B. Fahrrad zur Inspektion'}
        value={title[0]}
        onChange={title[1]}
        error={errTitle}
      />
      {wish ? (
        <N.FieldRow>
          <N.TextField
            id="qs-item-extra"
            label="Budget"
            kind="money"
            required={true}
            placeholder="0,00"
            value={extra[0]}
            onChange={extra[1]}
            error={errAmount}
          />
          <N.Select label="Status" variant="status" options={WISH} value={status[0]} onChange={status[1]} />
        </N.FieldRow>
      ) : (
        <N.TextField
          id="qs-item-extra"
          label="Dauer"
          optional={true}
          placeholder="z. B. 1 h"
          value={extra[0]}
          onChange={extra[1]}
          hint="Planen legt daraus später eine Quest an."
        />
      )}
    </N.Sheet>
  );
}

export { ItemSheet };
