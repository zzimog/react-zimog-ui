import { useCallback, useLayoutEffect, useRef } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { useMountedState } from './use-mounted-state';

type PresenceProps = NativeProps<'div'> & {
  present?: boolean;
  forceMount?: boolean;
};

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export const Presence = (inProps: PresenceProps) => {
  const { ref: refProp, present = true, forceMount, ...props } = inProps;

  const [mounted, setMounted] = useMountedState(present);

  const prevPresentRef = useRef(present);
  const stylesRef = useRef<CSSStyleDeclaration>(null);

  const mergedRef = useMergedRefs(
    refProp,
    useCallback((node: HTMLElement) => {
      let timeoutId: number;
      stylesRef.current = getComputedStyle(node);

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

              setMounted(false);
            }
          }
        }
      };

      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        clearTimeout(timeoutId);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }, [])
  );

  useLayoutEffect(() => {
    const current = getAnimationName(stylesRef.current);
    const hasAnimation = current !== 'none';

    prevPresentRef.current = present;
    setMounted(present || hasAnimation);
  }, [present]);

  return forceMount || mounted ? (
    <Native.div ref={mergedRef} hidden={!mounted} {...props} />
  ) : null;
};
