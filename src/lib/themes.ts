'use client';

import { useCallback, useRef } from 'react';

import { requestIdleCallback, cancelIdleCallback } from 'foxact/request-idle-callback';

import { createContextState } from 'foxact/context-state';

const darkModeStorageKey = 'user-color-scheme';

export const AUTO = 'auto';
export const LIGHT = 'light';
export const DARK = 'dark';

export type ColorScheme = 'light' | 'dark' | 'auto';

const themeColorMap = {
  dark: '#364151',
  light: '#fff'
};

function updateThemeToDom(theme: ColorScheme) {
  if (typeof window !== 'undefined') {
    const rootEl = document.documentElement;
    const metaThemeColorEls = document.querySelectorAll('meta[name="theme-color"]');

    if (theme === DARK) {
      rootEl.classList.remove(LIGHT);
      rootEl.classList.add(DARK);
      metaThemeColorEls.forEach(el => el.setAttribute('content', themeColorMap.dark));
    } else if (theme === LIGHT) {
      rootEl.classList.remove(DARK);
      rootEl.classList.add(LIGHT);
      metaThemeColorEls.forEach(el => el.setAttribute('content', themeColorMap.light));
    } else {
      rootEl.classList.remove(DARK, LIGHT);

      // We already uses CSS to do "system" dark mode. But we need to update the theme-color meta tag
      const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      metaThemeColorEls.forEach(el => el.setAttribute('content', preferDark
        ? themeColorMap.dark
        : themeColorMap.light));
    }
  }
}

const initialThemeValue = ((): ColorScheme => {
  try {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(darkModeStorageKey) as ColorScheme | null) || 'auto';
    }
    return AUTO;
  } catch {
    return AUTO;
  }
})();

updateThemeToDom(initialThemeValue);

const [DarkModeProvider, useDarkMode, useSetDarkModeOriginal] = createContextState(initialThemeValue);

export function useSetDarkMode() {
  const setDarkMode = useSetDarkModeOriginal();

  const timerRef = useRef<number | null>(null);

  return useCallback((newMode: ColorScheme) => {
    setDarkMode(newMode);

    if (typeof window !== 'undefined') {
      updateThemeToDom(newMode);

      // Update localStorage
      if (timerRef.current !== null) {
        cancelIdleCallback(timerRef.current);
      }
      timerRef.current = requestIdleCallback(() => {
        try {
          if (newMode === AUTO) {
            localStorage.removeItem(darkModeStorageKey);
          } else {
            localStorage.setItem(darkModeStorageKey, newMode);
          }
        } finally {
          timerRef.current = null;
        }
      }, { timeout: 200 });
    }
  }, [setDarkMode]);
}

export { DarkModeProvider, useDarkMode };
