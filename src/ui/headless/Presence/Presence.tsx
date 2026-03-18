import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';

type BaseProps = NativeProps<'div'>;
interface PresenceProps extends BaseProps {
  present?: boolean;
  forceMount?: boolean;
}

function getAnimationName(styles: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none';
}

export const Presence = (inProps: PresenceProps) => {
  const { ref: refProp, present = true, forceMount, ...props } = inProps;

  const [mounted, setMounted] = useState(present);
  const shouldRender = present || mounted;

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
          const escapedAnimationName = CSS.escape(event.animationName);
          const isCurrent = currentAnimation.includes(escapedAnimationName);

          if (isCurrent && !prevPresentRef.current) {
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
    const prevPresent = prevPresentRef.current;
    if (present !== prevPresent) {
      if (present) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
      } else {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const hasAnimation = currentAnimationName !== 'none';
        const isHidden = stylesRef.current?.display === 'none';

        if (!hasAnimation || isHidden) {
          setMounted(false);
        }
      }

      prevPresentRef.current = present;
    }
  }, [present]);

  if (!forceMount && !shouldRender) {
    return null;
  }

  return <Native.div ref={mergedRef} hidden={!shouldRender} {...props} />;
};
