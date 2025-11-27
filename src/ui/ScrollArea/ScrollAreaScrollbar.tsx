import { useEffect, useRef } from 'react';
import classes from './scrollAreaClasses';
import { useScrollAreaContext } from './scrollAreaContext';

type ScrollAreaScrollbarProps = {
  direction?: 'vertical' | 'horizontal';
};

export const ScrollAreaScrollbar = (inProps: ScrollAreaScrollbarProps) => {
  const { direction = 'vertical' } = inProps;

  const { rootRef, viewportRef } = useScrollAreaContext();

  const thumbRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
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

  return (
    <div
      ref={scrollbarRef}
      data-scrollarea="scrollbar"
      className={classes.scrollbar({ direction })}
    >
      <div
        ref={thumbRef}
        data-scrollarea="thumb"
        data-direction="vertical"
        className={classes.thumb({ direction })}
      />
    </div>
  );
};
