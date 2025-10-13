import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/presence.tsx
 */

type PresenceState = 'mounted' | 'animating' | 'unmounted';

export function usePresence<T extends HTMLElement = HTMLElement>(
  present: boolean
) {
  const initialState = present ? 'mounted' : 'unmounted';
  const [state, setState] = useState<PresenceState>(initialState);

  const stylesRef = useRef<CSSStyleDeclaration>(null);
  const prevPresentRef = useRef(present);

  const prevAnimationRef = useRef<string>(null);

  useEffect(() => {
    const styles = stylesRef.current;
    const current = styles?.animationName || 'none';
    prevAnimationRef.current = state === 'mounted' ? current : 'none';
  }, [state]);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const currentAnimation = styles?.animationName || 'none';

    if (present !== prevPresentRef.current) {
      if (present) {
        setState('mounted');
      } else if (styles?.display === 'none' || currentAnimation === 'none') {
        setState('unmounted');
      } else {
        if (prevAnimationRef.current !== currentAnimation) {
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
    ref: useCallback((inNode: T) => {
      const node = inNode;
      let timeout: number;

      stylesRef.current = getComputedStyle(node);

      function handleAnimationStart() {
        const styles = stylesRef.current;
        prevAnimationRef.current = styles?.animationName || 'none';
      }

      function handleAnimationEnd({ target, animationName }: AnimationEvent) {
        const current = stylesRef.current?.animationName || 'none';
        const isCurrent = current.includes(CSS.escape(animationName));

        if (node === target && isCurrent && !prevPresentRef.current) {
          const currentFill = node.style.animationFillMode;
          node.style.animationFillMode = 'forwards';

          setState('unmounted');

          timeout = setTimeout(() => {
            if (node.style.animationFillMode === 'forwards') {
              node.style.animationFillMode = currentFill;
            }
          });
        }
      }

      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        clearTimeout(timeout);
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }, []),
  };
}
