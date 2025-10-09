import { useState, useEffect } from 'react';

type ColorScheme = 'light' | 'dark' | 'system';

export function useColorScheme(): [ColorScheme, (scheme: ColorScheme) => void] {
  const [scheme, setScheme] = useState<ColorScheme>(() => {
    const scheme = localStorage.getItem('color-scheme') as ColorScheme;
    return scheme || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (scheme === 'system') {
      const systemScheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemScheme);
      return;
    }

    root.classList.add(scheme);
  }, [scheme]);

  return [
    scheme,
    (scheme: ColorScheme) => {
      localStorage.setItem('color-scheme', scheme);
      setScheme(scheme);
    },
  ];
}
