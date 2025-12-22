import { useEffect, useLayoutEffect, useRef, type ComponentProps } from 'react';
import { Presence } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';

const DISPLAY_NAME = 'CollapsibleElement';

type PresenceProps = Omit<ComponentProps<typeof Presence>, 'present'>;
type CollapsibleElementProps = PresenceProps & {
  open?: boolean;
};

export const CollapsibleElement = (inProps: CollapsibleElementProps) => {
  const { ref: refProp, open, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const preventAnimationRef = useRef(open);
  const prevStylesRef = useRef<Record<string, string>>(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      prevStylesRef.current = prevStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationDuration: node.style.animationDuration,
      };

      node.style.transitionDuration = '0s';
      node.style.animationDuration = '0s';

      const { width, height } = node.getBoundingClientRect();
      node.style.setProperty('--width', `${width}px`);
      node.style.setProperty('--height', `${height}px`);

      if (!preventAnimationRef.current) {
        const { transitionDuration, animationDuration } = prevStylesRef.current;
        node.style.transitionDuration = transitionDuration;
        node.style.animationDuration = animationDuration;
      }
    }
  }, [open]);

  return (
    <Presence ref={mergedRefs} present={open} data-open={open} {...props} />
  );
};

CollapsibleElement.displayName = DISPLAY_NAME;
