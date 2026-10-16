import React, { useState } from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { demo, setState } from '../../data/demo.js';
import { useNav } from '../shared.jsx';

const { eur, iso, num } = N.utils;

function ExpenseSheet({ id, showErrors }) {
  const s = demo.use();
  const nav = useNav();
  const e = s.expenses.filter((x) => x.id === id)[0];
  const what = useState(e ? e.title : showErrors ? 'Konzertkarten' : '');
  const amount = useState(e ? num(e.amount, 2) : '');

  const area = useState(
    e ? (e.category === 'birthday' ? 'Geschenke' : e.category === 'personal' ? 'Wünsche' : 'Haushalt') : 'Geschenke',
  );

  const method = useState(e ? e.method : 'Karte');
  const link = useState(showErrors ? 'Geschenk · Mara' : 'Keine Zuordnung');
  const tried = useState(!!showErrors);
  const val = parseFloat(String(amount[0]).replace(/\./g, '').replace(',', '.'));
  const errWhat = tried[0] && !what[0].trim() ? 'Wofür war die Ausgabe?' : null;
  const errAmount = tried[0] && !(val > 0) ? 'Bitte einen Betrag eingeben.' : null;
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
    demo.act.addExpense({
      title: what[0].trim(),
      amount: val,
      method: method[0],
      category:
        area[0] === 'Geschenke'
          ? 'birthday'
          : area[0] === 'Wünsche'
            ? 'personal'
            : area[0] === 'Training'
              ? 'training'
              : 'household',
      payee: link[0] !== 'Keine Zuordnung' ? `für ${link[0].split('· ')[1]}` : undefined,
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
        <N.DateField label="Bezahlt am" defaultValue={iso(new Date())} />
      </N.FieldRow>
      <N.Select
        label="Bereich"
        options={['Geschenke', 'Wünsche', 'Haushalt', 'Training', 'Sonstiges']}
        value={area[0]}
        onChange={area[1]}
      />
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
        options={['Keine Zuordnung', 'Geschenk · Mara', 'Geschenk · Lena', 'Wunsch · Kamera-Objektiv']}
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
