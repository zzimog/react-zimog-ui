import { useEffect, useRef } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';

type ScrollAreaProps = PolyProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { className, children, ...props } = inProps;

  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const viewport = viewportRef.current;
    const scrollbar = viewportRef.current;
    const thumb = thumbRef.current;

    if (!root || !viewport || !scrollbar || !thumb) {
      return;
    }

    const thumbRatio = viewport.clientHeight / viewport.scrollHeight;
    const thumbSize = Math.max(scrollbar.clientHeight * thumbRatio, 18);

    thumb.style.height = `${thumbSize}px`;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const scrollbarHeight = scrollbar.clientHeight;
      const thumbScroll =
        (scrollTop / (scrollHeight - clientHeight)) *
        (scrollbarHeight - thumbSize);

      thumb.style.transform = `translateY(${thumbScroll}px)`;
    };

    let startX: number;
    let startY: number;

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      startX = clientX;
      startY = clientY;

      const scrollableWidth = viewport.scrollWidth - viewport.clientWidth;
      const offsetWidth = scrollbar.clientWidth - thumb.clientWidth;
      const scrollRatioX = deltaX / offsetWidth;

      const scrollableHeight = viewport.scrollHeight - viewport.clientHeight;
      const offsetHeight = scrollbar.clientHeight - thumb.clientHeight;
      const scrollRatioY = deltaY / offsetHeight;

      viewport.scrollLeft += scrollableWidth * scrollRatioX * 0;
      viewport.scrollTop += scrollableHeight * scrollRatioY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      thumb.releasePointerCapture(event.pointerId);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      startX = clientX;
      startY = clientY;

      thumb.setPointerCapture(event.pointerId);
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    viewport.addEventListener('scroll', handleScroll);
    thumb.addEventListener('pointerdown', handlePointerDown);
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      thumb.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <Poly.div
      ref={ref}
      data-scrollarea="root"
      className={cn(classes.root, className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-scrollarea="viewport"
        className={classes.viewport}
      >
        {children}
      </div>
      <div
        ref={scrollbarRef}
        data-scrollarea="scrollbar"
        className={classes.scrollbar}
      >
        <div ref={thumbRef} data-scrollarea="thumb" className={classes.thumb} />
      </div>
    </Poly.div>
  );
};
