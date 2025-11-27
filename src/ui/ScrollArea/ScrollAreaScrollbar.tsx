import { type ComponentPropsWithRef, type Ref, useEffect, useRef } from 'react';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './scrollAreaClasses';

type ScrollAreaScrollbarProps = ComponentPropsWithRef<'div'> & {
  thumbRef?: Ref<HTMLDivElement | null>;
  direction?: 'vertical' | 'horizontal';
  onScrollChange?: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const ScrollAreaScrollbar = (inProps: ScrollAreaScrollbarProps) => {
  const {
    ref: refProp,
    thumbRef: thumbRefProp,
    direction = 'vertical',
    className,
    children,
    onScrollChange,
    ...props
  } = inProps;

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const ref = useMergedRefs(refProp, scrollbarRef);
  const mergedThumbRef = useMergedRefs(thumbRefProp, thumbRef);

  useEffect(() => {
    const isVertical = direction === 'vertical';
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;
    if (scrollbar && thumb) {
      let scrollbarRect: DOMRect;
      let pointerOffset: number;

      const handlePointerMove = (event: PointerEvent) => {
        const { clientX, clientY } = event;

        const track = isVertical
          ? scrollbarRect.height - thumb.offsetHeight
          : scrollbarRect.width - thumb.offsetWidth;

        const scroll = isVertical
          ? clientY - scrollbarRect.top - pointerOffset
          : clientX - scrollbarRect.left - pointerOffset;

        const thumbScroll = clamp(scroll, 0, track);
        const ratio = clamp(scroll / track, 0, 1);

        onScrollChange?.(ratio);
        thumb.style.setProperty('--scroll', `${thumbScroll}px`);
      };

      const handlePointerUp = (event: PointerEvent) => {
        const { pointerId } = event;
        thumb.releasePointerCapture(pointerId);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      const handlePointerDown = (event: PointerEvent) => {
        const { pointerId, target, clientX, clientY } = event;

        scrollbarRect = scrollbar.getBoundingClientRect();
        thumb.setPointerCapture(pointerId);

        if (target === scrollbar) {
          const offsetSize = isVertical
            ? thumb.offsetHeight
            : thumb.offsetWidth;

          pointerOffset = offsetSize / 2;
          handlePointerMove(event);
        } else if (target === thumb) {
          const thumbRect = thumb.getBoundingClientRect();
          pointerOffset = isVertical
            ? clientY - thumbRect.top
            : clientX - thumbRect.left;
        }

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
      };

      scrollbar.addEventListener('pointerdown', handlePointerDown);
      return () => {
        scrollbar.removeEventListener('pointerdown', handlePointerDown);
      };
    }
  }, [direction, onScrollChange]);

  return (
    <div
      {...props}
      ref={ref}
      data-scrollbar="root"
      data-direction={direction}
      className={cn(classes.scrollbar({ direction }), className)}
    >
      <div
        ref={mergedThumbRef}
        data-scrollbar="thumb"
        className={classes.thumb({ direction })}
      />
    </div>
  );
};

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';
