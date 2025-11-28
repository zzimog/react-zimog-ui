import { useLayoutEffect, useRef } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar';

type ScrollAreaProps = PolyProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { children, className, ...props } = inProps;

  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollbarXRef = useRef<HTMLDivElement>(null);
  const thumbXRef = useRef<HTMLDivElement>(null);
  const scrollbarYRef = useRef<HTMLDivElement>(null);
  const thumbYRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  function handleViewportScroll() {
    const viewport = viewportRef.current;
    const scrollbarX = scrollbarXRef.current;
    const thumbX = thumbXRef.current;
    const scrollbarY = scrollbarYRef.current;
    const thumbY = thumbYRef.current;
    if (viewport) {
      if (scrollbarX && thumbX) {
        const scrollableWidth = viewport.scrollWidth - viewport.offsetWidth;
        const ratioX = viewport.scrollLeft / scrollableWidth;

        thumbX.style.setProperty(
          '--scroll',
          `${(scrollbarX.offsetWidth - thumbX.offsetWidth) * ratioX}px`
        );
      }

      if (scrollbarY && thumbY) {
        const scrollableHeight = viewport.scrollHeight - viewport.offsetHeight;
        const ratioY = viewport.scrollTop / scrollableHeight;

        thumbY.style.setProperty(
          '--scroll',
          `${(scrollbarY.offsetHeight - thumbY.offsetHeight) * ratioY}px`
        );
      }
    }
  }

  function handleScrollX(ratio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = scrollable * ratio;
    }
  }

  function handleScrollY(ratio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollHeight - viewport.clientHeight;
      viewport.scrollTop = scrollable * ratio;
    }
  }

  useLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    if (root && viewport) {
      const scrollbarX = scrollbarXRef.current;
      const thumbX = thumbXRef.current;
      const scrollbarY = scrollbarYRef.current;
      const thumbY = thumbYRef.current;

      let raf = 0;

      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (scrollbarX && thumbX) {
            const ratioX = viewport.offsetWidth / viewport.scrollWidth;
            const sizeX = Math.max(scrollbarX.offsetWidth * ratioX, 18);

            scrollbarX.hidden = ratioX >= 1;
            thumbX.style.setProperty('--size', `${sizeX}px`);
          }

          if (scrollbarY && thumbY) {
            const ratioY = viewport.offsetHeight / viewport.scrollHeight;
            const sizeY = Math.max(scrollbarY.offsetHeight * ratioY, 18);

            scrollbarY.hidden = ratioY >= 1;
            thumbY.style.setProperty('--size', `${sizeY}px`);
          }
        });
      });

      observer.observe(root);
      return () => {
        cancelAnimationFrame(raf);
        observer.unobserve(root);
      };
    }
  }, []);

  return (
    <Poly.div
      ref={rootRef}
      data-scrollarea="root"
      className={cn(classes.root, className)}
      onKeyDown={(event) => {
        console.log(event.key);
      }}
      {...props}
    >
      <div
        ref={viewportRef}
        data-scrollarea="viewport"
        tabIndex={1}
        className={classes.viewport}
        onScroll={handleViewportScroll}
      >
        {children}
      </div>
      <ScrollAreaScrollbar
        ref={scrollbarYRef}
        thumbRef={thumbYRef}
        data-scrollarea="scrollbar-y"
        tabIndex={2}
        onScrollChange={handleScrollY}
      />
      <ScrollAreaScrollbar
        ref={scrollbarXRef}
        thumbRef={thumbXRef}
        direction="horizontal"
        data-scrollarea="scrollbar-x"
        tabIndex={3}
        onScrollChange={handleScrollX}
      />
      <div
        ref={cornerRef}
        data-scrollarea="corner"
        className={classes.corner}
      />
    </Poly.div>
  );
};
