import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Geräterahmen / Phone' };

const TABS = [
  { id: 'a', label: 'Heute', icon: 'sun' },
  { id: 'b', label: 'Kalender', icon: 'calendar' },
  { id: 'c', label: 'Notizen', icon: 'note' },
  { id: 'd', label: 'Mehr', icon: 'more' },
];
function Main() {
  return (
    <Q.Phone>
      <div className="qs-screen-scroll">
        <N.TopBar
          large={true}
          brand={true}
          eyebrow={new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
          title="Heute"
          aside={React.createElement(N.Badge, { variant: 'count', done: 2, total: 5, size: 'lg' })}
          actions={[
            <N.IconButton key="s" icon="search" label="Suchen" />,
            <N.AddButton key="a" label="Eintrag hinzufügen" />,
          ]}
        />
        <div
          style={{
            padding: 'var(--space-2) var(--gutter) var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
          }}
        >
          <section>
            <N.SectionHeader index={1} title="Vormittag" meta="2 / 2" />
            <N.List boxed={false}>
              <N.ListItem
                time="07:00"
                timeEnd="07:40"
                title="Laufen"
                subtitle="5 km, locker"
                tone="movement"
                done={true}
              />
              <N.ListItem
                time="09:00"
                timeEnd="12:00"
                title="Konzentriert arbeiten"
                subtitle="Ohne Termine"
                tone="work"
                done={true}
              />
            </N.List>
          </section>
          <section>
            <N.SectionHeader index={2} title="Nachmittag" meta="0 / 3" />
            <N.List boxed={false}>
              <N.ListItem
                time="13:00"
                timeEnd="13:30"
                title="Mittag"
                subtitle="Linsen, Reis, Gemüse"
                tone="food"
                trailing="chevron"
                onClick={() => {}}
              />
              <N.ListItem
                time="17:30"
                timeEnd="18:15"
                title="Einkauf"
                subtitle="10 Artikel"
                tone="household"
                trailing="chevron"
                onClick={() => {}}
              />
              <N.ListItem
                time="19:00"
                timeEnd="20:30"
                title="Training"
                subtitle="Verein · Halle 2"
                tone="training"
                trailing="chevron"
                onClick={() => {}}
              />
            </N.List>
          </section>
        </div>
      </div>
      <N.TabBar defaultValue="a" items={TABS} glass={true} safeArea={true} />
    </Q.Phone>
  );
}
function Sub() {
  return (
    <Q.Phone>
      <div className="qs-screen-scroll">
        <N.TopBar nav={true} leading="back" backLabel="Mehr" title="Einstellungen" border={true} />
        <div
          style={{
            padding: 'var(--space-6) var(--gutter) var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
          }}
        >
          <N.SettingsGroup index={1} title="Darstellung">
            <N.SettingsRow
              icon="contrast"
              label="Kontrast erhöhen"
              description="Kräftigere Texte und Linien"
              control="switch"
            />
            <N.SettingsRow icon="calendar" label="Wochenbeginn" value="Montag" control="chevron" onClick={() => {}} />
          </N.SettingsGroup>
          <N.SettingsGroup index={2} title="Daten" footer="Alles bleibt auf diesem Gerät.">
            <N.SettingsRow
              icon="cloud"
              label="Sicherung"
              description="zuletzt heute 09:12"
              led="on"
              value="Gesichert"
              onClick={() => {}}
            />
            <N.SettingsRow icon="download" label="Exportieren" control="chevron" onClick={() => {}} />
          </N.SettingsGroup>
        </div>
      </div>
      <N.TabBar defaultValue="d" items={TABS} glass={true} safeArea={true} />
    </Q.Phone>
  );
}

/* Zwei Geräte; schmaler als zwei Rahmen bricht das zweite unter das erste um, statt beide zu stauchen */
export const Vorschau = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)', justifyContent: 'center' }}>
    <Main />
    <Sub />
  </div>
);
