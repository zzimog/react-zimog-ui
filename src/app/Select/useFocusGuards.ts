/**
 * Based on Radix UI useFocusGuards hook
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/focus-guards/src/focus-guards.tsx
 */
import { useEffect } from 'react';

let count = 0;

function createGuard() {
  const span = document.createElement('span');
  span.setAttribute('data-focus-guard', '');
  span.tabIndex = 0;
  span.style.outline = 'none';
  span.style.opacity = '0';
  span.style.position = 'fixed';
  span.style.pointerEvents = 'none';
  return span;
}

export function useFocusGuards(enabled: boolean = true) {
  useEffect(() => {
    if (enabled) {
      const { body } = document;
      const guards = document.querySelectorAll('[data-focus-guard]');
      body.insertAdjacentElement('afterbegin', guards[0] ?? createGuard());
      body.insertAdjacentElement('beforeend', guards[1] ?? createGuard());
      count++;

      return () => {
        if (count === 1) {
          document
            .querySelectorAll('[data-focus-guard]')
            .forEach((node) => node.remove());
        }

        count--;
      };
    }
  }, [enabled]);
}
