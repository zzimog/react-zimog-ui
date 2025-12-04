import { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar';

type Overflow = 'none' | 'x' | 'y' | 'both';

type ScrollAreaProps = PolyProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { children, className, ...props } = inProps;

  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState<Overflow>('none');

  const hasCorner = overflow === 'both';
  const hasXScrollbar = hasCorner || overflow === 'x';
  const hasYScrollbar = hasCorner || overflow === 'y';

  const scrollbarXRef = useRef<HTMLDivElement>(null);
  const thumbXRef = useRef<HTMLDivElement>(null);
  const scrollbarYRef = useRef<HTMLDivElement>(null);
  const thumbYRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  function handleViewportScroll() {
    const scrollbarX = scrollbarXRef.current;
    const thumbX = thumbXRef.current;
    const scrollbarY = scrollbarYRef.current;
    const thumbY = thumbYRef.current;
    if (viewport) {
      if (scrollbarX && thumbX) {
        const scrollableWidth = viewport.scrollWidth - viewport.offsetWidth;
        const ratioX = viewport.scrollLeft / scrollableWidth;
        const valueX = (scrollbarX.offsetWidth - thumbX.offsetWidth) * ratioX;

        scrollbarX.style.setProperty('--scroll', `${valueX}px`);
      }

      if (scrollbarY && thumbY) {
        const scrollableHeight = viewport.scrollHeight - viewport.offsetHeight;
        const ratioY = viewport.scrollTop / scrollableHeight;
        const valueY = (scrollbarY.offsetHeight - thumbY.offsetHeight) * ratioY;

        scrollbarY.style.setProperty('--scroll', `${valueY}px`);
      }
    }
  }

  function handleScrollbarScroll(ratio: number, direction: 'x' | 'y') {
    if (viewport) {
      if (direction === 'x') {
        const scrollable = viewport.scrollWidth - viewport.clientWidth;
        viewport.scrollLeft = scrollable * ratio;
      }

      if (direction === 'y') {
        const scrollable = viewport.scrollHeight - viewport.clientHeight;
        viewport.scrollTop = scrollable * ratio;
      }
    }
  }

  useResizeObserver(
    viewport,
    useCallback(() => {
      if (viewport) {
        const scrollbarX = scrollbarXRef.current;
        const scrollbarY = scrollbarYRef.current;
        if (scrollbarX) {
          const ratioX = viewport.offsetWidth / viewport.scrollWidth;
          const sizeX = Math.max(scrollbarX.offsetWidth * ratioX, 18);

          scrollbarX.hidden = ratioX >= 1;
          scrollbarX.style.setProperty('--thumb-size', `${sizeX}px`);
        }
        if (scrollbarY) {
          const ratioY = viewport.offsetHeight / viewport.scrollHeight;
          const sizeY = Math.max(scrollbarY.offsetHeight * ratioY, 18);

          scrollbarY.hidden = ratioY >= 1;
          scrollbarY.style.setProperty('--thumb-size', `${sizeY}px`);
        }
      }
    }, [])
  );

  return (
    <Poly.div
      data-scrollarea="root"
      className={cn(classes.root, className)}
      {...props}
    >
      <div
        ref={(node) => setViewport(node)}
        data-scrollarea="viewport"
        className={classes.viewport}
        onScroll={handleViewportScroll}
      >
        {children}
      </div>
      <ScrollAreaScrollbar
        ref={scrollbarYRef}
        data-scrollarea="scrollbar-y"
        onScrollChange={(r) => handleScrollbarScroll(r, 'y')}
      />
      <ScrollAreaScrollbar
        ref={scrollbarXRef}
        direction="horizontal"
        data-scrollarea="scrollbar-x"
        onScrollChange={(r) => handleScrollbarScroll(r, 'x')}
      />
      {hasCorner && (
        <div
          ref={cornerRef}
          data-scrollarea="corner"
          className={classes.corner}
        />
      )}
    </Poly.div>
  );
};
