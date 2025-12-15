import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';

type PresenceProps = PolyProps<'div'> & {
  present?: boolean;
  forceMount?: boolean;
};

function useForcedState() {
  const [, force] = useState(0);
  return () => force((p) => p + 1);
}

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export const Presence = (inProps: PresenceProps) => {
  const { ref: refProp, present = true, forceMount, ...props } = inProps;

  /**
   * Using useState directly for mounted state would cause an extra render on
   * both enter and exit animation, we can avoid this with a "forced" state for
   * rendering and ref to keep the current state value
   *
   * Expected renders:
   * - initial mount: 1 (mounted)
   * - enter animation: 1 (mount)
   * - exit animation: 2 (animating + unmount)
   */
  const render = useForcedState();
  const mountedRef = useRef(present);
  const mounted = mountedRef.current;

  const prevPresentRef = useRef(present);
  const prevAnimationRef = useRef('none');
  const stylesRef = useRef<CSSStyleDeclaration>(null);
  const prevStylesRef = useRef<Record<string, string>>(null);
  const preventAnimationRef = useRef(present);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const shouldRender = present || mounted;

  useEffect(() => {
    const current = getAnimationName(stylesRef.current);
    prevAnimationRef.current = present ? current : 'none';
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      let timeoutId: number;

      stylesRef.current = getComputedStyle(node);

      const rafId = requestAnimationFrame(() => {
        preventAnimationRef.current = false;
      });

      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node) {
          const current = getAnimationName(stylesRef.current);
          prevAnimationRef.current = current;
        }
      };

      const handleAnimationEnd = (event: AnimationEvent) => {
        if (event.target === node) {
          const currentAnimation = getAnimationName(stylesRef.current);

          if (event.animationName === currentAnimation) {
            if (!prevPresentRef.current) {
              const currentFill = node.style.animationFillMode;
              node.style.animationFillMode = 'forwards';

              timeoutId = setTimeout(() => {
                if (node.style.animationFillMode === 'forwards') {
                  node.style.animationFillMode = currentFill;
                }
              });

              mountedRef.current = false;
              render();
            }
          }
        }
      };

      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(rafId);
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [ref.current]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      prevStylesRef.current = prevStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationDuration: node.style.animationDuration,
      };

      node.style.transitionDuration = '0s';
      node.style.animationDuration = '0s';

      if (!preventAnimationRef.current) {
        const { transitionDuration, animationDuration } = prevStylesRef.current;
        node.style.transitionDuration = transitionDuration;
        node.style.animationDuration = animationDuration;
      }
    }

    if (present) {
      mountedRef.current = true;
    } else {
      const currentAnimation = getAnimationName(stylesRef.current);
      const prevAnimation = prevAnimationRef.current;
      const isAnimating = currentAnimation !== prevAnimation;

      if (!isAnimating) {
        mountedRef.current = false;
        render();
      }
    }

    prevPresentRef.current = present;
  }, [present]);

  return (
    (forceMount || shouldRender) && (
      <Poly.div
        ref={mergedRef}
        data-visible={present}
        hidden={!shouldRender}
        {...props}
      />
    )
  );
};
