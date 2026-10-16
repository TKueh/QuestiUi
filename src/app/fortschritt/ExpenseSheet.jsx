import React, { useState } from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { demo, setState } from '../../data/demo.js';
import { useNav } from '../shared.jsx';

const { addDays, eur, iso, num, parse } = N.utils;
/* Bereich ↔ Kategorie in beide Richtungen – Bearbeiten öffnet, was gespeichert ist */
const AREA = { birthday: 'Geschenke', personal: 'Wünsche', household: 'Haushalt', training: 'Training' };
const CAT = Object.fromEntries(Object.entries(AREA).map(([k, v]) => [v, k]));

function ExpenseSheet({ id, showErrors }) {
  const s = demo.use();
  const nav = useNav();
  const e = s.expenses.filter((x) => x.id === id)[0];
  const what = useState(e ? e.title : showErrors ? 'Konzertkarten' : '');
  const amount = useState(e ? num(e.amount, 2) : '');

  const area = useState(e ? AREA[e.category] || 'Haushalt' : 'Geschenke');
  const today = iso(new Date());
  const date = useState(e ? iso(addDays(new Date(), e.d || 0)) : today);

  const method = useState(e ? e.method : 'Karte');
  /* Zuordnung aus den Daten: Geschenke (Geburtstage mit Budget) und Wünsche; gespeichert wird die Kennung (ref) */
  const links = [{ value: 'none', label: 'Keine Zuordnung' }]
    .concat(s.birthdays.filter((b) => b.amount != null).map((b) => ({ value: b.id, label: `Geschenk · ${b.name}` })))
    .concat(s.wishes.map((w) => ({ value: w.id, label: `Wunsch · ${w.title}` })));
  const link = useState(e ? e.ref || 'none' : showErrors ? 'mara' : 'none');
  const tried = useState(!!showErrors);
  const val = parseFloat(String(amount[0]).replace(/\./g, '').replace(',', '.'));
  const errWhat = tried[0] && !what[0].trim() ? 'Gib ein, wofür die Ausgabe war.' : null;
  const errAmount = tried[0] && !(val > 0) ? 'Gib einen Betrag ein.' : null;
  function save() {
    tried[1](true);
    if (!what[0].trim() || !(val > 0)) {
      setTimeout(() => {
        const el = document.getElementById(!what[0].trim() ? 'qs-ex-what' : 'qs-ex-amount');
        if (el) el.focus();
      }, 0);
      return;
    }
    if (e) demo.act.removeExpense(e.id);
    const b = s.birthdays.filter((x) => x.id === link[0])[0];
    demo.act.addExpense({
      ...(e ? { id: e.id } : null),
      d: Math.round((parse(date[0]) - parse(today)) / 864e5),
      title: what[0].trim(),
      amount: val,
      method: method[0],
      category: CAT[area[0]],
      ref: link[0] !== 'none' ? link[0] : undefined,
      payee: b ? `für ${b.name}` : link[0] !== 'none' ? 'Wunsch' : undefined,
    });
    setTimeout(() => {
      setState(() => ({
        removed: null,
      }));
    }, 0);
    nav.close();
    nav.toast({ tone: 'success', message: `${eur(val)} für „${what[0].trim()}“ gesichert.` });
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      title={e ? 'Ausgabe bearbeiten' : 'Ausgabe erfassen'}
      onCancel={nav.close}
      onDone={save}
      doneLabel="Sichern"
    >
      <N.TextField
        id="qs-ex-what"
        label="Wofür?"
        size="lg"
        required={true}
        value={what[0]}
        onChange={what[1]}
        error={errWhat}
      />
      <N.FieldRow>
        <N.TextField
          id="qs-ex-amount"
          label="Betrag"
          kind="money"
          placeholder="0,00"
          required={true}
          value={amount[0]}
          onChange={amount[1]}
          error={errAmount}
        />
        <N.DateField label="Bezahlt am" value={date[0]} onChange={date[1]} max={today} />
      </N.FieldRow>
      <N.Select label="Bereich" options={Object.values(AREA)} value={area[0]} onChange={area[1]} />
      <div className="nh-field">
        <span className="nh-label">Bezahlt mit</span>
        <N.ChoiceRow.Quick
          label="Bezahlt mit"
          value={method[0]}
          onChange={method[1]}
          options={['Karte', 'Bar', 'Überweisung', 'PayPal']}
        />
      </div>
      <N.Select
        label="Zuordnung"
        optional={true}
        options={links}
        value={link[0]}
        onChange={link[1]}
        hint="Verknüpft die Ausgabe mit dem Eintrag unter Leben."
      />
      {e ? (
        <Button
          variant="danger"
          onClick={() => {
            demo.act.removeExpense(e.id);
            nav.close();
          }}
        >
          Ausgabe löschen
        </Button>
      ) : null}
    </N.Sheet>
  );
}

export { ExpenseSheet };
