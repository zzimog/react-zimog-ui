import { useState, useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/presence.tsx
 */

type PresenceState = 'mounted' | 'animating' | 'unmounted';

export function usePresence(present: boolean) {
  const initialState = present ? 'mounted' : 'unmounted';
  const [state, setState] = useState<PresenceState>(initialState);

  const stylesRef = useRef<CSSStyleDeclaration>(null);
  const prevPresentRef = useRef(present);

  useLayoutEffect(() => {
    const { display, animationName } = stylesRef.current!;

    if (present !== prevPresentRef.current) {
      if (present) {
        setState('mounted');
      } else {
        const isVisible = display !== 'none';
        const isAnimating = animationName !== 'none';

        if (isVisible && isAnimating) {
          setState('animating');
        } else {
          setState('unmounted');
        }
      }

      prevPresentRef.current = present;
    }
  }, [present]);

  return {
    isPresent: ['mounted', 'animating'].includes(state),
    ref: useCallback((inNode: HTMLElement) => {
      const node = inNode;
      let timeout: number;

      stylesRef.current = getComputedStyle(node);

      function handleAnimationEnd({ target, animationName }: AnimationEvent) {
        const current = stylesRef.current?.animationName || 'none';
        const isCurrent = current.includes(CSS.escape(animationName));

        if (node === target && isCurrent) {
          setState((prev) => (prev === 'animating' ? 'unmounted' : prev));

          if (!prevPresentRef.current) {
            const currentFill = node.style.animationFillMode;
            node.style.animationFillMode = 'forwards';

            timeout = setTimeout(() => {
              if (node.style.animationFillMode === 'forwards') {
                node.style.animationFillMode = currentFill;
              }
            });
          }
        }
      }

      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);

      return () => {
        clearTimeout(timeout);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }, []),
  };
}
