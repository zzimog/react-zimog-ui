import { useCallback, useContext, useRef, useState } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { usePresence, useMergedRefs } from '../hooks';
import {
  animationLoop,
  getRealRect,
  getRelativeRect,
  rectEquals,
  cn,
} from '../utils';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

export type HighlightIndicatorProps = PolyProps<typeof Poly.div> & {
  visible?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  bound?: 'top' | 'right' | 'bottom' | 'left';
};

export const HighlightIndicator = (inProps: HighlightIndicatorProps) => {
  const {
    ref: refProp,
    visible = false,
    x,
    y,
    width,
    height,
    bound,
    className,
    style,
    ...props
  } = inProps;

  const [enabled, setEnabled] = useState(visible);

  const prevRectRef = useRef<DOMRect>(null);

  const {
    type,
    rootRef,
    currentRef,
    persistent = false,
  } = useContext(HighlightContext) || {};

  const ref = useCallback((node: HTMLElement) => {
    let rootStyles: CSSStyleDeclaration;
    let currentStyles: CSSStyleDeclaration;

    if (!rootRef || !currentRef) {
      return;
    }

    return animationLoop(() => {
      const root = rootRef?.current;
      const current = currentRef?.current;

      if (!current) {
        setEnabled(false);
      }

      if (root && current) {
        const rootRect = root.getBoundingClientRect();
        const currentRect = current.getBoundingClientRect();

        rootStyles = rootStyles || getComputedStyle(root);
        currentStyles = currentStyles || getComputedStyle(current);

        const rootRealRect = getRealRect(rootRect, rootStyles);
        const rect = getRelativeRect(rootRealRect, currentRect);

        const isVisible =
          currentStyles?.display !== 'none' &&
          currentStyles?.opacity !== '0' &&
          currentStyles?.visibility !== 'hidden';

        if (!isVisible) {
          rootRef.current = null;
          currentRef.current = null;

          setEnabled(false);
        } else {
          const prevRect = prevRectRef.current;
          if (prevRect === null || !rectEquals(rect, prevRect)) {
            node.style.setProperty('--x', `${rect.x}px`);
            node.style.setProperty('--y', `${rect.y}px`);
            node.style.setProperty('--width', `${rect.width}px`);
            node.style.setProperty('--height', `${rect.height}px`);

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

  const styles = {
    ['--x']: x ? `${x}px` : undefined,
    ['--y']: y ? `${y}px` : undefined,
    ['--width']: width ? `${width}px` : undefined,
    ['--height']: height ? `${height}px` : undefined,
    ...style,
  };

  return (
    <Poly.div
      ref={mergedRefs}
      data-state={getState(enabled)}
      className={cn(classNames, className)}
      hidden={!present}
      style={styles}
      {...props}
    />
  );
};

function getState(visible?: boolean) {
  if (visible === undefined) {
    return undefined;
  }
  return visible ? 'visible' : 'hidden';
}
