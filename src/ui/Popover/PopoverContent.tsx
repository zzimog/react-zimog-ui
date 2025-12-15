import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMergedRefs, usePresence } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { usePopoverContext } from './popoverContext';

const DISPLAY_NAME = 'PopoverContent';

type PopoverContentProps = PolyProps<'div'> & {
  avoidCollisions?: boolean;
  distance?: number;
  padding?: number;
  align?: 'start' | 'center' | 'end';
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const PopoverContent = (inProps: PopoverContentProps) => {
  const {
    ref: refProp,
    avoidCollisions = false,
    distance = 8,
    padding = 16,
    align = 'center',
    className,
    style,
    ...props
  } = inProps;

  const context = usePopoverContext(DISPLAY_NAME);
  const { contentId, trigger, open, setOpen } = context;

  const ref = useRef<HTMLElement>(null);
  const { ref: presenceRef, present } = usePresence(open);
  const mergedRefs = useMergedRefs(refProp, ref, presenceRef);

  const shouldRender = open || present;

  const handleResize = useCallback(() => {
    const content = ref.current;
    if (trigger && content) {
      const { innerWidth, innerHeight } = window;
      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      //const triggerCenterY = triggerRect.height / 2;

      let posX = triggerCenterX - contentRect.width / 2;

      if (align === 'start') {
        posX = triggerRect.left;
      } else if (align === 'end') {
        posX = triggerRect.right - contentRect.width;
      }

      const pos = {
        x: clamp(
          posX,
          padding,
          Math.max(innerWidth - contentRect.width - padding, padding)
        ),
        y: triggerRect.bottom + distance,
      };

      const origin = {
        x: clamp(triggerCenterX - pos.x, 0, contentRect.width),
        y: clamp(0, 0, contentRect.height),
      };

      if (
        avoidCollisions &&
        pos.y + contentRect.height > innerHeight - padding &&
        contentRect.height <= triggerRect.top - distance - padding
      ) {
        pos.y = triggerRect.top - distance - contentRect.height;
        origin.y = contentRect.height;
      }

      const maxWidth = innerWidth - pos.x - padding;
      const maxHeight = innerHeight - pos.y - padding;

      const x = Math.floor(pos.x);
      const y = Math.floor(pos.y);

      content.style.translate = `${x}px ${y}px`;
      content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
      content.style.setProperty('--available-width', `${maxWidth}px`);
      content.style.setProperty('--available-height', `${maxHeight}px`);
    }
  }, [avoidCollisions, trigger]);

  const handleOutside = useCallback((event: Event) => {
    const content = ref.current;
    for (const element of [trigger, content]) {
      const target = event.target as HTMLElement;
      if (element && element.contains(target)) {
        return;
      }
    }

    setOpen(false);
  }, [trigger]);

  useEffect(() => {
    if (trigger && shouldRender) {
      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize);
      window.addEventListener('pointerdown', handleOutside);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
        window.removeEventListener('pointerdown', handleOutside);
      };
    }
  }, [trigger, shouldRender]);

  const preventAnimationRef = useRef(shouldRender);
  const preventAnimation = preventAnimationRef.current;
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    shouldRender &&
    createPortal(
      <Poly.div
        ref={mergedRefs}
        role="dialog"
        id={contentId}
        data-open={open}
        hidden={!shouldRender}
        className={cn(
          !preventAnimation && [
            'data-[open="true"]:animate-in',
            'data-[open="false"]:animate-out',
          ],
          className
        )}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          ...style,
        }}
        {...props}
      />,
      document.body
    )
  );
};

PopoverContent.displayName = DISPLAY_NAME;
