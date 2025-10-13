import { type Ref, useCallback, useLayoutEffect, useRef } from 'react';
import { usePresence, useMergedRefs, cn } from '@ui';

const classes = cn([
  'absolute z-1',
  'rounded-md',
  'bg-red-500',
  'transition-all',
]);

export type HighlightProps = {
  ref?: Ref<HTMLElement>;
  visible?: boolean;
  rect?: DOMRect;
  className?: string;
};

export const Highlight = (inProps: HighlightProps) => {
  const { ref: refProp, visible = true, rect, className } = inProps;

  const { ref: refPresence, isPresent } = usePresence(visible);

  const preventTransitionRef = useRef(visible);

  const ref = useCallback((node: HTMLElement) => {
    const { animationName = 'none' } = getComputedStyle(node);
    if (animationName !== 'none') {
      node.style.setProperty('transition-duration', '0s');
    }

    function handleAnimationEnd() {
      const preventTransition = preventTransitionRef.current;
      if (preventTransition) {
        node.style.setProperty('transition-duration', '0s');
      } else {
        node.style.removeProperty('transition-duration');
      }
    }

    node.addEventListener('animationcancel', handleAnimationEnd);
    node.addEventListener('animationend', handleAnimationEnd);
    return () => {
      node.removeEventListener('animationcancel', handleAnimationEnd);
      node.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  const mergedRefs = useMergedRefs(refProp, refPresence, ref);

  useLayoutEffect(() => {
    preventTransitionRef.current = !visible;
  }, [visible]);

  return (
    <div
      ref={mergedRefs}
      data-visible={visible}
      className={cn(classes, className)}
      style={{
        width: rect ? `${rect.width}px` : undefined,
        height: rect ? `${rect.height}px` : undefined,
        transform: rect ? `translate(${rect.x}px, ${rect.y}px)` : undefined,
      }}
      hidden={!isPresent}
    />
  );
};
