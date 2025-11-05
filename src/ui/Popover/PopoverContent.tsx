import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMergedRefs, usePresence } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { usePopoverContext } from './popoverContext';

export type PopoverContentProps = PolyProps<typeof Poly.div> & {
  container?: Element | DocumentFragment;
};

export const PopoverContent = (inProps: PopoverContentProps) => {
  const { ref, container = document.body, className, ...props } = inProps;

  const { contentRef, contentId, open } = usePopoverContext();

  const { ref: presenceRef, present } = usePresence(open);
  const mergedRefs = useMergedRefs(ref, contentRef, presenceRef);

  const useAnimationRef = useRef(!open);
  const animate = useAnimationRef.current;

  useEffect(() => {
    const raf = requestAnimationFrame(() => (useAnimationRef.current = true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return present
    ? createPortal(
        <Poly.div
          ref={mergedRefs}
          id={contentId}
          data-open={open}
          role="dialog"
          hidden={!present}
          className={cn(
            'fixed top-0 left-0',
            'max-w-(--max-width)',
            'max-h-(--max-height)',
            'translate-x-(--x)',
            'translate-y-(--y)',
            animate && [
              '[--exit-blur:40px]',
              '[--exit-scale:0]',
              'data-[open="true"]:animate-in',
              'data-[open="false"]:animate-out',
            ],
            className
          )}
          {...props}
        />,
        container
      )
    : null;
};
