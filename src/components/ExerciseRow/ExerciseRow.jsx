import React from 'react';
import N, { Icon, ToggleRow } from 'nordhaus-ui/src/bare.js';

const { cx, idx, num } = N.utils;

/* ---------- Training ---------- */

/* Gewichtsanzeige mit Bearbeiten */
function WeightDisplay({ planned, className, onEdit, value, unit, tag }) {
  return (
    <button
      type="button"
      className={cx('qs-weight', planned && 'is-planned', className)}
      onClick={onEdit}
      aria-label={`${(planned ? 'Vorgabe ' : 'Gewicht ') + value} ${unit || 'kg'} bearbeiten`}
    >
      {planned || tag ? <span className="qs-weight-tag">{planned ? 'Vorgabe' : tag}</span> : null}
      <span className="qs-weight-row">
        <span className="qs-weight-v">
          {typeof value === 'number' ? num(value, value % 1 ? 1 : 0) : value}
          <small>{` ${unit || 'kg'}`}</small>
        </span>
        <Icon name="edit" size={14} />
      </span>
    </button>
  );
}
/* Übungsillustration mit Nummer */
function ExerciseFigure({ className, src, alt, index }) {
  return (
    <figure className={cx('qs-figure', className)}>
      {src ? (
        <img src={src} alt={alt || ''} />
      ) : (
        <span className="qs-figure-ph">
          <Icon name="dumbbell" size={24} />
        </span>
      )}
      {index != null ? <figcaption>{idx(index)}</figcaption> : null}
    </figure>
  );
}
/* Trainings-/Übungszeile: Bild · Name · Vorgabe · Gewicht · Satzhaken */
function ExerciseRow(props) {
  const sets = props.sets || 3;
  return (
    <div className={cx('qs-exercise', props.className)}>
      <div className="qs-exercise-top">
        {props.image ? (
          <ExerciseFigure index={props.index} src={props.image} />
        ) : props.index != null ? (
          <span className="qs-exercise-n" aria-hidden={true}>
            {idx(props.index)}
          </span>
        ) : null}
        <div className="qs-exercise-text">
          <b>{props.name}</b>
          <span>{`${sets} × ${props.reps}${props.rest ? ` · Pause ${props.rest}` : ''}`}</span>
          {props.note ? <small>{props.note}</small> : null}
        </div>
        {props.weight != null ? (
          <WeightDisplay value={props.weight} planned={props.planned} onEdit={props.onEditWeight} />
        ) : null}
      </div>
      <ToggleRow
        sets={Array.from({ length: sets }, (_, i) => ({
          value: (props.setValues && props.setValues[i]) || props.reps,
          deviation: props.deviations && props.deviations[i],
        }))}
        value={
          props.onSets
            ? props.setsValue || Array.from({ length: sets }, (_, i) => i < (props.doneSets || 0))
            : undefined
        }
        onChange={props.onSets}
        defaultValue={props.onSets ? undefined : Array.from({ length: sets }, (_, i) => i < (props.doneSets || 0))}
        label={`${props.name} Sätze`}
      />
    </div>
  );
}

export { ExerciseRow, WeightDisplay, ExerciseFigure };
