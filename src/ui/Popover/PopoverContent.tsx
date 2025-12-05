import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMergedRefs, usePresence } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { animationLoop, cn } from '../utils';
import { usePopoverContext } from './popoverContext';

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
    ref,
    avoidCollisions = false,
    distance = 8,
    padding = 16,
    align = 'center',
    className,
    ...props
  } = inProps;

  const { updateMode, triggerRef, contentRef, contentId, open } =
    usePopoverContext();

  const { ref: presenceRef, present } = usePresence(open);
  const mergedRefs = useMergedRefs(ref, contentRef, presenceRef);

  const useAnimationRef = useRef(!open);
  const animate = useAnimationRef.current;

  const shouldRender = open || present;

  const doTheMath = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
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

      content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
      content.style.setProperty('--x', `${Math.floor(pos.x)}px`);
      content.style.setProperty('--y', `${Math.floor(pos.y)}px`);
      content.style.setProperty('--max-width', `${maxWidth}px`);
      content.style.setProperty('--max-height', `${maxHeight}px`);
    }
  }, [avoidCollisions, distance, padding, align]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => (useAnimationRef.current = true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (updateMode === 'always') {
      doTheMath();
      return animationLoop(doTheMath);
    }
  }, [updateMode]);

  useEffect(() => {
    if (updateMode !== 'always' && open) {
      const rafId = requestAnimationFrame(doTheMath);
      window.addEventListener('resize', doTheMath);
      window.addEventListener('scroll', doTheMath);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', doTheMath);
        window.removeEventListener('scroll', doTheMath);
      };
    }
  }, [updateMode, open]);

  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <Poly.div
      ref={mergedRefs}
      role="dialog"
      id={contentId}
      data-open={open}
      hidden={!shouldRender}
      className={cn(
        'fixed top-0 left-0',
        'max-w-(--max-width)',
        //'max-h-(--max-height)',
        'translate-x-(--x)',
        'translate-y-(--y)',
        animate && [
          //'[--exit-blur:40px]',
          //'[--exit-scale:0]',
          'data-[open="true"]:animate-in',
          'data-[open="false"]:animate-out',
        ],
        className
      )}
      {...props}
    />,
    document.body
  );
};

PopoverContent.displayName = 'PopoverContent';
