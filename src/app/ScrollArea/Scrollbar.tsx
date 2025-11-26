import { cn, useMergedRefs } from '@ui';
import { type ComponentPropsWithRef, useEffect, useRef } from 'react';
import scrollAreaClasses from './scrollAreaClasses';

const classes = scrollAreaClasses.scrollbar;

type ScrollbarProps = ComponentPropsWithRef<'div'> & {
  direction?: 'vertical' | 'horizontal';
  onScrollChange?: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const Scrollbar = (inProps: ScrollbarProps) => {
  const {
    ref: refProp,
    direction = 'vertical',
    className,
    children,
    onScrollChange,
    ...props
  } = inProps;

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const ref = useMergedRefs(refProp, scrollbarRef);

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
          ? clientY - scrollbarRect.top
          : clientX - scrollbarRect.left;

        const thumbScroll = clamp(scroll - pointerOffset, 0, track);
        const ratio = clamp((scroll - pointerOffset) / track, 0, 1);

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

        thumb.setPointerCapture(pointerId);
        scrollbarRect = scrollbar.getBoundingClientRect();

        if (target === scrollbar) {
          pointerOffset = thumb.offsetHeight / 2;
          handlePointerMove(event);
        } else {
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
      ref={ref}
      data-scrollbar="root"
      data-direction={direction}
      className={cn(classes.root({ direction }), className)}
      {...props}
    >
      <div
        ref={thumbRef}
        data-scrollbar="thumb"
        className={classes.thumb({ direction })}
      />
    </div>
  );
};

Scrollbar.displayName = 'Scrollbar';
