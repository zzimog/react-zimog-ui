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

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export function usePresence(present: boolean) {
  const [state, setState] = useState({
    mounted: present,
    exiting: false,
  });

  const nodeRef = useRef<HTMLElement>(null);
  const stylesRef = useRef<CSSStyleDeclaration>(null);

  const prevPresentRef = useRef(present);
  const prevAnimationRef = useRef('none');

  useEffect(() => {
    const current = getAnimationName(stylesRef.current);
    prevAnimationRef.current = state.mounted ? current : 'none';
  }, [present]);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;

    if (present !== wasPresent) {
      const prevAnimation = prevAnimationRef.current;
      const currentAnimation = getAnimationName(stylesRef.current);

      if (present) {
        setState({
          mounted: true,
          exiting: false,
        });
      } else {
        if (styles?.display === 'none' || currentAnimation === 'none') {
          setState({
            mounted: false,
            exiting: false,
          });
        } else {
          const isAnimating = currentAnimation !== prevAnimation;

          if (wasPresent && isAnimating) {
            setState({
              mounted: true,
              exiting: true,
            });
          } else {
            setState({
              mounted: false,
              exiting: false,
            });
          }
        }
      }
    }

    prevPresentRef.current = present;
  }, [present]);

  return {
    present: state.mounted,
    ref: useCallback((node: HTMLDivElement) => {
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      let timeoutId: number;

      nodeRef.current = node;
      stylesRef.current = getComputedStyle(node);

      function handleAnimationStart({ target }: AnimationEvent) {
        if (node === target) {
          prevAnimationRef.current = getAnimationName(stylesRef.current);
        }
      }

      function handleAnimationEnd({ target, animationName }: AnimationEvent) {
        if (node === target) {
          const isCurrent =
            animationName === getAnimationName(stylesRef.current);

          if (isCurrent) {
            setState((prev) => ({
              mounted: !prev.exiting,
              exiting: false,
            }));

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
