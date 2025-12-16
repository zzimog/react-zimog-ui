import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';

type PresenceProps = PolyProps<'div'> & {
  present?: boolean;
  forceMount?: boolean;
  onMeasure?(node: HTMLElement): void;
};

function useForcedState() {
  const [, force] = useState(0);
  const renderRef = useRef(() => force((p) => p + 1));
  return renderRef.current;
}

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export const Presence = (inProps: PresenceProps) => {
  const {
    ref: refProp,
    present = true,
    forceMount,
    onMeasure,
    ...props
  } = inProps;

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
    const rafId = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      let timeoutId: number;

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
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [present]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      stylesRef.current = getComputedStyle(node);

      prevStylesRef.current = prevStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationDuration: node.style.animationDuration,
      };

      node.style.transitionDuration = '0s';
      node.style.animationDuration = '0s';

      /**
       * This callback will be called before the closing animation and
       * before the opening animation is restored, allowing to get the
       * correct element size.
       */
      onMeasure?.(node);

      if (!preventAnimationRef.current) {
        const { transitionDuration, animationDuration } = prevStylesRef.current;
        node.style.transitionDuration = transitionDuration;
        node.style.animationDuration = animationDuration;
      }
    }
  }, [present, onMeasure]);

  useLayoutEffect(() => {
    const current = getAnimationName(stylesRef.current);
    prevAnimationRef.current = present ? current : 'none';

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
