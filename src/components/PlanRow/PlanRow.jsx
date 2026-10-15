import React from 'react';
import N, { Badge, ListItem } from 'nordhaus-ui';

const { cx } = N.utils;

/* Planzeile: Kennmarke, Titel mit Zustand, Beschreibung, Anzahl und Stand */
function PlanRow({ className, category, icon, title, description, count, updated, status, onClick }) {
  return (
    <ListItem
      className={cx('qs-plan', className)}
      category={category}
      categoryIcon={icon}
      categorySize={40}
      title={title}
      description={description}
      subtitle={[count != null ? `${count} Einträge` : null, updated].filter(Boolean).join(' · ') || undefined}
      paused={status === 'paused' || status === 'archived'}
      badge={status === 'paused' ? <Badge>Pausiert</Badge> : status === 'archived' ? <Badge>Archiv</Badge> : null}
      trailing={onClick ? 'chevron' : undefined}
      onClick={onClick}
    />
  );
}

export { PlanRow };
