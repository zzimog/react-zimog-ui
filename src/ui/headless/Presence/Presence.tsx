import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';

type PresenceProps = NativeProps<'div'> & {
  present?: boolean;
  forceMount?: boolean;
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

  const shouldRender = present || mounted;

  const prevPresentRef = useRef(present);
  const prevAnimationRef = useRef('none');
  const stylesRef = useRef<CSSStyleDeclaration>(null);

  const mergedRef = useMergedRefs(
    refProp,
    useCallback((node: HTMLElement) => {
      let timeoutId: number;
      stylesRef.current = getComputedStyle(node);

      const handleAnimationStart = (event: AnimationEvent) => {
        if (node === event.target) {
          const current = getAnimationName(stylesRef.current);
          prevAnimationRef.current = current;
        }
      };

      const handleAnimationEnd = (event: AnimationEvent) => {
        if (node === event.target) {
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
    }, [])
  );

  useLayoutEffect(() => {
    const current = getAnimationName(stylesRef.current);
    const hasAnimation = current !== 'none';
    prevAnimationRef.current = present ? current : 'none';

    if (present) {
      mountedRef.current = true;
    } else if (!hasAnimation) {
      mountedRef.current = false;
      render();
    }

    prevPresentRef.current = present;
  }, [present]);

  return (
    (forceMount || shouldRender) && (
      <Native.div ref={mergedRef} hidden={!shouldRender} {...props} />
    )
  );
};
