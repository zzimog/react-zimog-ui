import { useEffect, useRef, type Ref } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { useMergedRefs } from '../hooks';

type ScrollAreaProps = PolyProps<'div'> & {
  viewportRef?: Ref<HTMLElement>;
};

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const {
    ref: refProp,
    viewportRef: viewportRefProp,
    className,
    children,
    ...props
  } = inProps;

  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const mergedRef = useMergedRefs(refProp, ref);
  const mergedViewportRef = useMergedRefs(viewportRefProp, viewportRef);

  /**
   * Viewport
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    if (!viewport || !scrollbar || !thumb) {
      return;
    }

    const handleScroll = () => {
      const scrollableHeight = viewport.scrollHeight - viewport.offsetHeight;
      const offsetScrollHeight = scrollbar.offsetHeight - thumb.offsetHeight;
      const scrollRatioY = viewport.scrollTop / scrollableHeight;
      const thumbScroll = scrollRatioY * offsetScrollHeight;

      thumb.style.setProperty('--scroll', `${thumbScroll}px`);
    };

    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Scrollbar
   */
  useEffect(() => {
    const root = ref.current;
    const viewport = viewportRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    if (!root || !viewport || !scrollbar || !thumb) {
      return;
    }

    let startX: number;
    let startY: number;

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      startX = clientX;
      startY = clientY;

      const scrollableWidth = viewport.scrollWidth - viewport.offsetWidth;
      const offsetScrollWidth = scrollbar.offsetWidth - thumb.offsetWidth;
      const scrollRatioX = deltaX / offsetScrollWidth;

      const scrollableHeight = viewport.scrollHeight - viewport.offsetHeight;
      const offsetScrollHeight = scrollbar.offsetHeight - thumb.offsetHeight;
      const scrollRatioY = deltaY / offsetScrollHeight;

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

    scrollbar.addEventListener('pointerdown', handlePointerDown);
    return () => {
      scrollbar.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  /**
   * Thumb
   */
  useEffect(() => {
    const root = ref.current;
    const viewport = viewportRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    if (!root || !viewport || !scrollbar || !thumb) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const thumbRatio = viewport.offsetHeight / viewport.scrollHeight;
      const thumbSize = Math.max(scrollbar.offsetHeight * thumbRatio, 18);

      scrollbar.hidden = thumbRatio >= 1;
      thumb.style.setProperty('--size', `${thumbSize}px`);
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <Poly.div
      ref={mergedRef}
      data-scrollarea="root"
      className={cn(classes.root, className)}
      {...props}
    >
      <div
        ref={mergedViewportRef}
        data-scrollarea="viewport"
        className={classes.viewport}
      >
        {children}
      </div>
      <div
        ref={scrollbarRef}
        data-scrollarea="scrollbar"
        className={classes.scrollbar({ direction: 'vertical' })}
      >
        <div
          ref={thumbRef}
          data-scrollarea="thumb"
          data-direction="vertical"
          className={classes.thumb({ direction: 'vertical' })}
        />
      </div>
    </Poly.div>
  );
};
