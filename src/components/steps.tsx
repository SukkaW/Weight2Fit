import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  steps: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '26px'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    rowGap: '8px',
    columnGap: '8px'
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'var(--line)',
    transition: 'background 0.25s, transform 0.25s'
  },
  dotActive: {
    backgroundColor: 'var(--fg)',
    transform: 'scale(1.4)'
  },
  dotDone: {
    backgroundColor: 'var(--success)'
  },
  label: {
    fontSize: '12.5px',
    color: 'var(--fg-subtle)',
    fontWeight: 400,
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    display: {
      default: null,
      '@media (max-width: 540px)': 'none'
    }
  },
  labelActive: {
    color: 'var(--fg)',
    fontWeight: 500,
    display: 'block'
  },
  labelDone: {
    color: 'var(--success)'
  },
  line: {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
    height: '1px',
    backgroundColor: 'var(--line)',
    marginBlock: '0',
    marginInline: '12px',
    minWidth: '24px',
    position: 'relative',
    overflow: 'hidden'
  },
  lineFill: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    backgroundColor: 'var(--success)',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  lineFillDone: {
    width: '100%'
  },
  lineFillEmpty: {
    width: '0%'
  }
});

const STEP_LABELS = ['Body Data', 'Generate .fit', 'Upload to Garmin'];

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div {...stylex.props(styles.steps)}>
      {STEP_LABELS.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const isDone = n < current;
        const isActive = n === current;
        return (
          <Fragment key={n}>
            <div {...stylex.props(styles.step)}>
              <div {...stylex.props(styles.dot, isDone && styles.dotDone, isActive && styles.dotActive)} />
              <span {...stylex.props(styles.label, isDone && styles.labelDone, isActive && styles.labelActive)}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div {...stylex.props(styles.line)}>
                <div {...stylex.props(styles.lineFill, isDone ? styles.lineFillDone : styles.lineFillEmpty)} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
