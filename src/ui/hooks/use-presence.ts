/**
 * Based on Radix UI usePresence hook
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/presence.tsx
 */

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';

type PresenceState = 'mounted' | 'unmounting' | 'unmounted';

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export function usePresence(present: boolean) {
  const initState = present ? 'mounted' : 'unmounted';
  const [state, setState] = useState<PresenceState>(initState);

  const stylesRef = useRef<CSSStyleDeclaration>(null);

  const prevPresentRef = useRef(present);
  const prevAnimationRef = useRef('none');

  useEffect(() => {
    const current = getAnimationName(stylesRef.current);
    prevAnimationRef.current = state === 'mounted' ? current : 'none';
  }, []);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;

    if (present !== wasPresent) {
      const prevAnimation = prevAnimationRef.current;
      const currentAnimation = getAnimationName(stylesRef.current);

      if (present) {
        setState('mounted');
      } else {
        if (styles?.display === 'none' || currentAnimation === 'none') {
          setState('unmounted');
        } else {
          const isAnimating = currentAnimation !== prevAnimation;

          if (wasPresent && isAnimating) {
            setState('unmounting');
          } else {
            setState('unmounted');
          }
        }
      }
    }

    prevPresentRef.current = present;
  }, [present]);

  return {
    present: ['mounted', 'unmounting'].includes(state),
    ref: useCallback((node: HTMLDivElement) => {
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      let timeoutId: number;

      stylesRef.current = getComputedStyle(node);

      function handleAnimationStart({ target }: AnimationEvent) {
        if (node === target) {
          prevAnimationRef.current = getAnimationName(stylesRef.current);
        }
      }

      function handleAnimationEnd({ target, animationName }: AnimationEvent) {
        if (node === target) {
          const currentAnimation = getAnimationName(stylesRef.current);
          const isCurrent = animationName === currentAnimation;

          if (isCurrent) {
            setState((prev) => {
              if (prev === 'unmounting') {
                return 'unmounted';
              }
              return prev;
            });

            if (!prevPresentRef.current) {
              const currentFill = node.style.animationFillMode;
              node.style.animationFillMode = 'forwards';

              timeoutId = ownerWindow.setTimeout(() => {
                if (node.style.animationFillMode === 'forwards') {
                  node.style.animationFillMode = currentFill;
                }
              });
            }
          }
        }
      }

      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }, []),
  };
}
