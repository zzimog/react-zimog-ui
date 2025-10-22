import { useCallback, useContext, useRef } from 'react';
import { poly } from '../polymorphic';
import { usePresence, useMergedRefs } from '../hooks';
import { cn, getRelativeRect, rectEquals } from '../utils';
import classes from './highlightClasses';
import { HighlightContext } from './highlightContext';
import { animationLoop } from '../utils/animation-loop';

export type HighlightIndicatorProps = {
  visible?: boolean;
  rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const HighlightIndicator = poly.div<HighlightIndicatorProps>(
  (Tag, inProps) => {
    const {
      ref: refProp,
      visible = true,
      rect,
      className,
      style,
      ...props
    } = inProps;

    const context = useContext(HighlightContext);
    const {
      rootRef,
      currentRef,
      persistent = false,
      enabled = false,
    } = context || {};

    const prevRectRef = useRef<DOMRect>(null);

    const ref = useCallback((node: HTMLElement) => {
      const cancelAnimation = animationLoop(() => {
        const root = rootRef?.current;
        const current = currentRef?.current;

        if (root && current) {
          const rootRect = root.getBoundingClientRect();
          const currentRect = current.getBoundingClientRect();

          const rect = getRelativeRect(rootRect, currentRect);
          /**
           * @todo save to ref?
           */
          const styles = getComputedStyle(current);

          const isVisible =
            styles?.display !== 'none' &&
            styles?.opacity !== '0' &&
            styles?.visibility !== 'hidden';

          if (!isVisible) {
            rootRef.current = null;
            currentRef.current = null;
            return;
          }

          const prevRect = prevRectRef.current;
          if (prevRect === null || !rectEquals(rect, prevRect)) {
            const { x, y, width, height } = rect;

            node.style.setProperty('--x', `${x}px`);
            node.style.setProperty('--y', `${y}px`);
            node.style.setProperty('--width', `${width}px`);
            node.style.setProperty('--height', `${height}px`);

            prevRectRef.current = rect;
          }
        }
      });

      return cancelAnimation;
    }, []);

    const { ref: refPresence, present } = usePresence(persistent || visible);
    const mergedRefs = useMergedRefs(refProp, ref, refPresence);

    return (
      <Tag
        ref={mergedRefs}
        data-state={getState(visible)}
        className={cn(classes({ persistent }), className)}
        hidden={!present}
        style={{
          ...(rect && getStyle(rect)),
          ...style,
        }}
        {...props}
      />
    );
  }
);

function getState(visible?: boolean) {
  if (visible === undefined) {
    return undefined;
  }

  return visible ? 'visible' : 'hidden';
}

function getStyle(rect: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return {
    ['--x']: `${rect.x}px`,
    ['--y']: `${rect.y}px`,
    ['--width']: `${rect.width}px`,
    ['--height']: `${rect.height}px`,
  };
}
