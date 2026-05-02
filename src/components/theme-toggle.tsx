'use client';

import { useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { IconSun, IconMoon, IconMonitor } from './icons';
import { useDarkMode, useSetDarkMode } from '../lib/themes';
import type { ColorScheme } from '../lib/themes';
import { falseFn, noop, trueFn } from 'foxts/noop';

const styles = stylex.create({
  toggle: {
    display: 'flex',
    alignItems: 'center',
    rowGap: '2px',
    columnGap: '2px',
    backgroundColor: 'var(--code-bg)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--line)',
    borderRadius: '99px',
    padding: '3px'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '99px',
    borderStyle: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s, box-shadow 0.15s'
  },
  btnOn: {
    backgroundColor: 'var(--bg)',
    color: 'var(--fg)',
    boxShadow: '0 1px 3px oklch(0% 0 0 / 0.1)'
  },
  btnOff: {
    backgroundColor: 'transparent',
    color: 'var(--fg-subtle)'
  }
});

const THEME_OPTIONS: Array<{ value: ColorScheme, icon: ReactNode, label: string }> = [
  { value: 'light', icon: <IconSun size={14} />, label: 'Light' },
  { value: 'auto', icon: <IconMonitor size={14} />, label: 'System' },
  { value: 'dark', icon: <IconMoon size={14} />, label: 'Dark' }
];

export function ThemeToggle() {
  const themeValue = useDarkMode();
  const setThemeValue = useSetDarkMode();

  const isClient = useSyncExternalStore(
    noop,
    trueFn,
    falseFn
  );

  const renderThemeValue = isClient ? themeValue : 'auto';

  return (
    <div {...stylex.props(styles.toggle)}>
      {THEME_OPTIONS.map(o => (
        <button
          key={o.value}
          title={o.label}
          type="button"
          onClick={() => setThemeValue(o.value)}
          {...stylex.props(styles.btn, renderThemeValue === o.value ? styles.btnOn : styles.btnOff)}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}
