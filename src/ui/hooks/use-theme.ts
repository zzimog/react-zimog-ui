import { useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme(): [Theme, (scheme: Theme) => void] {
  const [scheme, setScheme] = useState<Theme>(() => {
    const scheme = localStorage.getItem('color-scheme') as Theme;
    return scheme || 'system';
  });

  useLayoutEffect(() => {
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
    (scheme: Theme) => {
      localStorage.setItem('color-scheme', scheme);
      setScheme(scheme);
    },
  ];
}
