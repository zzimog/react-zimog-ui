import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type PolyProps, Poly } from '../polymorphic';
import { usePresence, useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { usePopoverContext } from './popoverContext';

export type PopoverContentProps = PolyProps<typeof Poly.div> & {
  persistent?: boolean;
  container?: Element | DocumentFragment;
};

export const PopoverContent = (inProps: PopoverContentProps) => {
  const {
    ref,
    persistent = false,
    container = document.body,
    className,
    style,
    ...props
  } = inProps;

  const { contentRef, contentId, open } = usePopoverContext();

  const { ref: presenceRef, present } = usePresence(persistent || open);
  const mergedRefs = useMergedRefs(ref, contentRef, presenceRef);

  const useAnimationRef = useRef(!open);
  const animate = useAnimationRef.current;

  useEffect(() => {
    const rafId = requestAnimationFrame(() => (useAnimationRef.current = true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  return present
    ? createPortal(
        <Poly.div
          ref={mergedRefs}
          id={contentId}
          data-open={open}
          role="dialog"
          tabIndex={-1}
          hidden={!present}
          className={cn(
            'max-w-(--max-width)',
            'max-h-(--max-height)',
            animate && [
              'data-[open="true"]:with-fade-in',
              'data-[open="false"]:with-fade-out',
            ],
            className
          )}
          style={{
            ...style,
            position: 'fixed',
            top: 0,
            left: 0,
          }}
          {...props}
        />,
        container
      )
    : null;
};
