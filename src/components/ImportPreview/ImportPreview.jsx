import React from 'react';
import N, { Badge, Icon, Metric } from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

function ImportPreview({ className, file, meta, error, stats, children, excerpt }) {
  return (
    <div className={cx('qs-import', className)}>
      <div className="qs-import-head">
        <Icon name="file" size={22} />
        <span>
          <b>{file}</b>
          <small>{meta}</small>
        </span>
        <Badge tone={error ? 'danger' : 'positive'} led={true}>
          {error ? 'Fehler' : 'Gelesen'}
        </Badge>
      </div>
      {stats ? (
        <div className="qs-import-stats">
          {stats.map((s, i) => (
            <Metric key={i} size="sm" label={s.label} value={s.value} />
          ))}
        </div>
      ) : null}
      {children}
      {excerpt ? <pre className="qs-import-excerpt">{excerpt}</pre> : null}
    </div>
  );
}

export { ImportPreview };
