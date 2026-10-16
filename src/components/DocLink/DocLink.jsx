import React from 'react';
import N, { Icon } from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* ---------- Verweise ---------- */
function DocLink({ variant, className, href, external, onClick, icon, children }) {
  return (
    <a
      className={cx('qs-doclink', variant === 'chip' && 'qs-doclink--chip', className)}
      href={href || '#'}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      onClick={onClick}
    >
      {(variant === 'chip' ? icon : icon !== false) ? (
        <Icon name={typeof icon === 'string' ? icon : 'file'} size={16} />
      ) : null}
      <span>{children}</span>
      <Icon name="arrow-up-right" size={14} />
    </a>
  );
}

export { DocLink };
