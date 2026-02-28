import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
} from 'react';
import { useMergedRefs, useResizeObserver } from '@ui/hooks';
import { clamp, cn } from '@ui/utils';
import { useScrollAreaContext } from './context';
import classes from './classes';

const DISPLAY_NAME = 'ScrollAreaScrollbar';

type ScrollAreaScrollbarProps = ComponentPropsWithRef<'div'> & {
  direction?: 'vertical' | 'horizontal';
};

export const ScrollAreaScrollbar = (inProps: ScrollAreaScrollbarProps) => {
  const {
    ref: refProp,
    direction = 'vertical',
    className,
    children,
    ...props
  } = inProps;

  const { viewport, content, useCorner } = useScrollAreaContext(DISPLAY_NAME);

  const [visible, setVisible] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const ref = useMergedRefs(refProp, scrollbarRef);

  const onResize = useCallback(() => {
    const scrollbar = scrollbarRef.current;
    if (viewport && scrollbar) {
      const { ratioY, sizeY, ratioX, sizeX } = getThumbSize(
        viewport,
        scrollbar
      );

      if (direction === 'vertical') {
        scrollbar.style.setProperty('--thumb-size', `${sizeY}px`);
        setVisible(ratioY < 1);
      } else {
        scrollbar.style.setProperty('--thumb-size', `${sizeX}px`);
        setVisible(ratioX < 1);
      }
    }
  }, [viewport, direction]);

  useEffect(() => {
    const isVertical = direction === 'vertical';
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;
    if (viewport && scrollbar && thumb) {
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

        if (direction === 'vertical') {
          const scrollable = viewport.scrollHeight - viewport.clientHeight;
          viewport.scrollTop = scrollable * ratio;
        } else {
          const scrollable = viewport.scrollWidth - viewport.clientWidth;
          viewport.scrollLeft = scrollable * ratio;
        }

        scrollbar.style.setProperty('--scroll', `${thumbScroll}px`);
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
          if (isVertical) {
            pointerOffset = thumb.offsetHeight / 2;

            if (clientY - scrollbarRect.top < pointerOffset) {
              pointerOffset = clientY - scrollbarRect.top;
            } else if (scrollbarRect.bottom - clientY < pointerOffset) {
              const distance = scrollbarRect.bottom - clientY;
              pointerOffset = thumb.offsetHeight - distance;
            }
          } else {
            pointerOffset = thumb.offsetWidth / 2;

            if (clientX - scrollbarRect.left < pointerOffset) {
              pointerOffset = clientX - scrollbarRect.left;
            } else if (scrollbarRect.right - clientX < pointerOffset) {
              const distance = scrollbarRect.right - clientX;
              pointerOffset = thumb.offsetWidth - distance;
            }
          }

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

      const handleScroll = () => {
        const { sizeY, sizeX } = getThumbSize(viewport, scrollbar);

        if (isVertical) {
          const scrollable = viewport.scrollHeight - viewport.offsetHeight;
          const ratio = viewport.scrollTop / scrollable;
          const size = thumb.offsetHeight || sizeY;
          const value = (scrollbar.offsetHeight - size) * ratio;

          scrollbar.style.setProperty('--scroll', `${value}px`);
        } else {
          const scrollable = viewport.scrollWidth - viewport.offsetWidth;
          const ratio = viewport.scrollLeft / scrollable;
          const size = thumb.offsetWidth || sizeX;
          const value = (scrollbar.offsetWidth - size) * ratio;

          scrollbar.style.setProperty('--scroll', `${value}px`);
        }
      };

      viewport.addEventListener('scroll', handleScroll);
      scrollbar.addEventListener('pointerdown', handlePointerDown);
      return () => {
        viewport.removeEventListener('scroll', handleScroll);
        scrollbar.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [viewport, direction]);

  useResizeObserver(viewport, onResize);
  useResizeObserver(content, onResize);

  return (
    <div
      ref={ref}
      data-scrollarea="scrollbar"
      data-scrollbar="root"
      data-direction={direction}
      data-visible={visible}
      {...props}
      className={cn(classes.scrollbar({ direction, useCorner }), className)}
    >
      <div
        ref={thumbRef}
        data-scrollbar="thumb"
        className={classes.thumb({ direction })}
      />
    </div>
  );
};

function getThumbSize(viewport: HTMLElement, scrollbar: HTMLElement) {
  const ratioX = viewport.offsetWidth / viewport.scrollWidth;
  const ratioY = viewport.offsetHeight / viewport.scrollHeight;
  const sizeX = Math.max(scrollbar.offsetWidth * ratioX, 18);
  const sizeY = Math.max(scrollbar.offsetHeight * ratioY, 18);

  return { ratioX, ratioY, sizeX, sizeY };
}

ScrollAreaScrollbar.displayName = DISPLAY_NAME;
