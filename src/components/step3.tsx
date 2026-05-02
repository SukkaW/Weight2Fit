'use client';

import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { IconChevronLeft } from './icons';

const styles = stylex.create({
  pageTitle: {
    fontSize: {
      default: '26px',
      '@media (max-width: 540px)': '22px'
    },
    fontWeight: 600,
    letterSpacing: '-0.6px',
    marginBottom: '8px',
    color: 'var(--fg)'
  },
  pageSub: {
    fontSize: '14px',
    color: 'var(--fg-muted)',
    marginBottom: '36px',
    fontWeight: 300
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    rowGap: '7px',
    columnGap: '7px',
    backgroundColor: 'var(--fg)',
    color: 'var(--bg)',
    borderStyle: 'none',
    borderRadius: '99px',
    paddingBlock: '11px',
    paddingInline: '22px',
    fontFamily: 'var(--font-dm-sans), -apple-system, sans-serif',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.15s, transform 0.1s',
    letterSpacing: '-0.1px',
    opacity: {
      default: null,
      ':hover': 0.85
    },
    transform: {
      default: null,
      ':active': 'scale(0.98)'
    }
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: {
      default: 'var(--fg-muted)',
      ':hover': 'var(--fg)'
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'var(--line)',
      ':hover': 'var(--fg-muted)'
    }
  },
  btnRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    rowGap: '8px',
    columnGap: '8px',
    marginTop: '48px'
  }
});

interface Step3Props {
  children: ReactNode,
  onBack: () => void,
  onReset: () => void
}

export function Step3({ children, onBack, onReset }: Step3Props) {
  return (
    <div>
      <div {...stylex.props(styles.pageTitle)}>Upload to Garmin Connect</div>
      <p {...stylex.props(styles.pageSub)}>Four steps to get your data into Garmin Connect.</p>
      {children}
      <div {...stylex.props(styles.btnRow)}>
        <button type="button" {...stylex.props(styles.btn, styles.btnSecondary)} onClick={onBack}>
          <IconChevronLeft size={16} /> Back
        </button>
        <button type="button" {...stylex.props(styles.btn, styles.btnSecondary)} onClick={onReset}>↺ Start Over</button>
      </div>
    </div>
  );
}
