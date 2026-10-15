import React, { Fragment } from 'react';
import N, { Badge, CategoryIcon, Icon, ListItem, StatusSelect } from 'nordhaus-ui';
import { BudgetLabel } from '../BudgetLabel/BudgetLabel.jsx';

const { cx } = N.utils;

/* Geburtstag-, Wunsch- und Vorhaben-Zeile: Datumsfenster oder Kennmarke, Titel, Meta, Geschenk; rechts Budget und Statuswahl */
function LifeRow(props) {
  const kind = props.kind || 'birthday';
  return (
    <ListItem
      className={cx('qs-life', `qs-life--${kind}`, props.className)}
      leading={
        kind === 'birthday' ? (
          <Badge variant="date" date={props.date} tone="birthday" />
        ) : (
          <CategoryIcon
            tone={kind === 'wish' ? 'personal' : 'work'}
            icon={kind === 'wish' ? 'star' : 'target'}
            size={40}
          />
        )
      }
      title={props.title}
      subtitle={props.meta}
      description={
        props.gift ? (
          <span className="qs-life-gift">
            <Icon name="gift" size={14} />
            {props.gift}
          </span>
        ) : undefined
      }
      actionsStack={true}
      actions={
        props.amount != null || props.statusOptions || props.action ? (
          <Fragment>
            {props.amount != null ? <BudgetLabel amount={props.amount} spent={props.spent} /> : null}
            {props.statusOptions ? (
              <StatusSelect
                options={props.statusOptions}
                value={props.onStatus ? props.status : undefined}
                defaultValue={props.onStatus ? undefined : props.status}
                onChange={props.onStatus}
                label={`Status ${props.title}`}
              />
            ) : props.action ? (
              <span className="qs-life-action">{props.action}</span>
            ) : null}
          </Fragment>
        ) : null
      }
      onClick={props.onOpen}
    />
  );
}

export { LifeRow };
