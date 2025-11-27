import { type PolyProps, cn, Poly } from '@ui';
import { useEffect, useRef } from 'react';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar';
import classes from './scrollAreaClasses';

type ScrollAreaProps = PolyProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { children, className, ...props } = inProps;

  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollbarXRef = useRef<HTMLDivElement>(null);
  const thumbXRef = useRef<HTMLDivElement>(null);
  const scrollbarYRef = useRef<HTMLDivElement>(null);
  const thumbYRef = useRef<HTMLDivElement>(null);

  function handleViewportScroll() {
    const viewport = viewportRef.current;
    const scrollbarX = scrollbarXRef.current;
    const scrollbarY = scrollbarYRef.current;
    const thumbX = thumbXRef.current;
    const thumbY = thumbYRef.current;
    if (viewport && scrollbarX && scrollbarY && thumbX && thumbY) {
      const scrollableWidth = viewport.scrollWidth - viewport.offsetWidth;
      const offsetScrollWidth = scrollbarX.offsetWidth - thumbX.offsetWidth;
      const scrollRatioX = viewport.scrollLeft / scrollableWidth;
      const thumbScrollX = scrollRatioX * offsetScrollWidth;

      thumbX.style.setProperty('--scroll', `${thumbScrollX}px`);

      const scrollableHeight = viewport.scrollHeight - viewport.offsetHeight;
      const offsetScrollHeight = scrollbarY.offsetHeight - thumbY.offsetHeight;
      const scrollRatioY = viewport.scrollTop / scrollableHeight;
      const thumbScrollY = scrollRatioY * offsetScrollHeight;

      thumbY.style.setProperty('--scroll', `${thumbScrollY}px`);
    }
  }

  function handleScrollY(scrollRatio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollHeight - viewport.clientHeight;
      viewport.scrollTop = scrollable * scrollRatio;
    }
  }

  function handleScrollX(scrollRatio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = scrollable * scrollRatio;
    }
  }

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const scrollbarX = scrollbarXRef.current;
    const scrollbarY = scrollbarYRef.current;
    const thumbX = thumbXRef.current;
    const thumbY = thumbYRef.current;

    if (
      !root ||
      !viewport ||
      !scrollbarX ||
      !scrollbarY ||
      !thumbX ||
      !thumbY
    ) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const thumbRatioX = viewport.offsetWidth / viewport.scrollWidth;
      const thumbSizeX = Math.max(scrollbarX.offsetWidth * thumbRatioX, 18);

      scrollbarX.hidden = thumbRatioX >= 1;
      thumbX.style.setProperty('--size', `${thumbSizeX}px`);

      const thumbRatioY = viewport.offsetHeight / viewport.scrollHeight;
      const thumbSizeY = Math.max(scrollbarY.offsetHeight * thumbRatioY, 18);

      scrollbarY.hidden = thumbRatioY >= 1;
      thumbY.style.setProperty('--size', `${thumbSizeY}px`);
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <Poly.div
      ref={rootRef}
      data-scrollarea="root"
      className={cn(classes.root, className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-scrollarea="viewport"
        className={classes.viewport}
        onScroll={handleViewportScroll}
      >
        {children}
      </div>
      <ScrollAreaScrollbar
        ref={scrollbarYRef}
        thumbRef={thumbYRef}
        data-scrollarea="scrollbar-y"
        onScrollChange={handleScrollY}
      />
      <ScrollAreaScrollbar
        ref={scrollbarXRef}
        thumbRef={thumbXRef}
        direction="horizontal"
        data-scrollarea="scrollbar-x"
        onScrollChange={handleScrollX}
      />
      <div data-scrollarea="corner" className={classes.corner} />
    </Poly.div>
  );
};
