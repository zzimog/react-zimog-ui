import { useCallback, useContext, useRef, useState } from 'react';
import { poly } from '../polymorphic';
import { usePresence, useMergedRefs } from '../hooks';
import { animationLoop, getRelativeRect, rectEquals, cn } from '../utils';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

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
      visible = false,
      rect,
      className,
      style,
      ...props
    } = inProps;

    const [enabled, setEnabled] = useState(visible);

    const {
      type,
      rootRef,
      currentRef,
      persistent = false,
    } = useContext(HighlightContext) || {};

    const prevRectRef = useRef<DOMRect>(null);

    const ref = useCallback((node: HTMLElement) => {
      return animationLoop(() => {
        const root = rootRef?.current;
        const current = currentRef?.current;

        if (!current) {
          setEnabled(false);
        }

        if (root && current) {
          const rootRect = root.getBoundingClientRect();
          const currentRect = current.getBoundingClientRect();

          const rect = getRelativeRect(rootRect, currentRect);
          const styles = getComputedStyle(current);

          const isVisible =
            styles?.display !== 'none' &&
            styles?.opacity !== '0' &&
            styles?.visibility !== 'hidden';

          if (!isVisible) {
            rootRef.current = null;
            currentRef.current = null;

            setEnabled(false);
          } else {
            const prevRect = prevRectRef.current;
            if (prevRect === null || !rectEquals(rect, prevRect)) {
              const { x, y, width, height } = rect;

              node.style.setProperty('--x', `${x}px`);
              node.style.setProperty('--y', `${y}px`);
              node.style.setProperty('--width', `${width}px`);
              node.style.setProperty('--height', `${height}px`);

              prevRectRef.current = rect;
            }

            setEnabled(true);
          }
        }
      });
    }, []);

    const { ref: refPresence, present } = usePresence(persistent || enabled);
    const mergedRefs = useMergedRefs(refProp, ref, refPresence);

    const classNames = classes.indicator({
      hover: type === 'hover',
      persistent,
    });

    return (
      <Tag
        ref={mergedRefs}
        data-state={getState(enabled)}
        className={cn(classNames, className)}
        hidden={!present}
        style={{
          ...(rect && {
            ['--x']: `${rect.x}px`,
            ['--y']: `${rect.y}px`,
            ['--width']: `${rect.width}px`,
            ['--height']: `${rect.height}px`,
          }),
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
