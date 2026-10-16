import React from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { DocLink } from '../../components/DocLink/DocLink.jsx';
import { IngredientList } from '../../components/NutritionPanel/IngredientList.jsx';
import { NutritionPanel } from '../../components/NutritionPanel/NutritionPanel.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

function MealSheet({ id }) {
  const s = demo.use();
  const nav = useNav();

  const q = S.findQuest(s, id) || S.today(s).quests.filter((x) => x.meal)[0];

  const B = q.meal === 'B';
  const nutrition = B
    ? { kcal: 764, macros: { protein: 63, carbs: 89, fat: 14 }, fiber: 17 }
    : { kcal: 702, macros: { protein: 34, carbs: 104, fat: 15 }, fiber: 21 };
  return (
    <N.Sheet
      inline={true}
      size="compact"
      open={true}
      onClose={nav.close}
      category="food"
      tools={React.createElement(
        DocLink,
        {
          variant: 'chip',
          icon: false,
          onClick: (e) => {
            e.preventDefault();
            nav.close();
            nav.tab('more', { stack: ['plans'] });
          },
        },
        'Essensplan',
      )}
      eyebrow={dateLong(q.date)}
      title={`Mittagsportion ${q.meal}`}
      description={`${q.description}.`}
      status={S.qDone(q) ? 'Erledigt' : 'Tagesaufgabe'}
      actions={
        S.qDone(q) ? (
          <Button
            variant="secondary"
            onClick={() => {
              demo.act.toggle(q.id, false);
            }}
          >
            Wieder öffnen
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={() => {
              demo.act.toggle(q.id, true);
              nav.close();
              nav.toast({
                message: `„${q.title}“ erledigt.`,
                action: {
                  label: 'Widerrufen',
                  onClick: () => {
                    demo.act.toggle(q.id, false);
                  },
                },
              });
            }}
          >
            Abhaken
          </Button>
        )
      }
    >
      <NutritionPanel {...nutrition} />
      <IngredientList
        portions={1}
        items={
          B
            ? [
                { name: 'Kartoffeln', quantity: '500 g Rohteil' },
                { name: 'Hähnchen / Pute', quantity: '200 g roh' },
                { name: 'Gemüse', quantity: '285 g' },
                { name: 'Olivenöl', note: 'erst beim Essen', quantity: '10 g' },
              ]
            : [
                { name: 'Basmatireis', quantity: '90 g roh' },
                { name: 'Rote Linsen', quantity: '70 g roh' },
                { name: 'Kokosmilch light', quantity: '100 ml' },
                { name: 'Gurke', quantity: '150 g' },
              ]
        }
      />
    </N.Sheet>
  );
}

export { MealSheet };
