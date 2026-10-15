import React from 'react';
import N, { IconButton } from 'nordhaus-ui';

const { cx, ico } = N.utils;

function PlanItemRow({ className, icon, title, schedule, detail, trailing, onEdit }) {
  return (
    <div className={cx('qs-planitem', className)}>
      <span className="qs-planitem-kind">{ico(icon || 'note', 18)}</span>
      <span className="qs-planitem-text">
        <b>{title}</b>
        <span>{schedule}</span>
        {detail ? <small>{detail}</small> : null}
      </span>
      {trailing ||
        (onEdit ? <IconButton icon="edit" label={`${title} bearbeiten`} size="sm" onClick={onEdit} /> : null)}
    </div>
  );
}

export { PlanItemRow };
