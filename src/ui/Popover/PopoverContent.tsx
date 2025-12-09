import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAnimationFrame, useMergedRefs, usePresence } from '../hooks';
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
  const { updateMode, triggerRef, contentId, open } = context;

  const ref = useRef<HTMLElement>(null);
  const { ref: presenceRef, present } = usePresence(open);
  const mergedRefs = useMergedRefs(refProp, ref, presenceRef);

  const useAnimationRef = useRef(!open);
  const animate = useAnimationRef.current;

  const shouldRender = open || present;

  const calculate = useCallback(() => {
    const trigger = triggerRef.current;
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

      content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      content.style.setProperty('--origin', `${origin.x}px ${origin.y}px`);
      content.style.setProperty('--max-width', `${maxWidth}px`);
      content.style.setProperty('--max-height', `${maxHeight}px`);
    }
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => (useAnimationRef.current = true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    if (updateMode !== 'always' && open) {
      calculate();
      window.addEventListener('resize', calculate);
      window.addEventListener('scroll', calculate);
      return () => {
        window.removeEventListener('resize', calculate);
        window.removeEventListener('scroll', calculate);
      };
    }
  }, [updateMode, open]);

  useAnimationFrame(() => {
    if (updateMode === 'always') {
      calculate();
    }
  }, [updateMode]);

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
          //'max-w-(--max-width)',
          //'max-h-(--max-height)',
          //'translate-x-(--x)',
          //'translate-y-(--y)',
          animate &&
            [
              //'[--exit-blur:40px]',
              //'[--exit-scale:0]',
              //'data-[open="true"]:animate-in',
              //'data-[open="false"]:animate-out',
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
