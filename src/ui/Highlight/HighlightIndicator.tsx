import { useRef, useState } from 'react';
import { useAnimationFrame, useMergedRefs } from '../hooks';
import { type PolyProps } from '../polymorphic';
import { cn } from '../utils';
import classes from './highlightClasses';
import { useHighlightContext } from './highlightContext';
import { Presence } from '../Presence';

const DISPLAY_NAME = 'HighlightIndicator';

type PresenceProps = Omit<PolyProps<typeof Presence>, 'present'>;
type HighlightIndicatorProps = PresenceProps;

export function rectEquals(rect1: DOMRect, rect2: DOMRect): boolean {
  return (
    rect1.x === rect2.x &&
    rect1.y === rect2.y &&
    rect1.width === rect2.width &&
    rect1.height === rect2.height
  );
}

export const HighlightIndicator = (inProps: HighlightIndicatorProps) => {
  const { ref: refProp, className, style, ...props } = inProps;

  const {
    type,
    persistent = false,
    rootRef,
    currentRef,
  } = useHighlightContext(DISPLAY_NAME);

  const [visible, setVisible] = useState(false);

  const prevRectRef = useRef<DOMRect>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  useAnimationFrame(() => {
    const node = ref.current;
    const root = rootRef.current;
    const current = currentRef.current;
    if (node && root && current) {
      const { borderTop, borderLeft } = getComputedStyle(root);
      const rootRect = root.getBoundingClientRect();
      const currentRect = current.getBoundingClientRect();

      const rect = new DOMRect(
        currentRect.x - rootRect.x - parseInt(borderLeft),
        currentRect.y - rootRect.y - parseInt(borderTop),
        currentRect.width,
        currentRect.height
      );

      const prevRect = prevRectRef.current;
      if (prevRect === null || !rectEquals(rect, prevRect)) {
        node.style.setProperty('--x', `${rect.x}px`);
        node.style.setProperty('--y', `${rect.y}px`);
        node.style.setProperty('--width', `${rect.width}px`);
        node.style.setProperty('--height', `${rect.height}px`);

        prevRectRef.current = rect;
        setVisible(true);
      }
    } else {
      setVisible(false);
    }
  }, []);

  const classNames = classes.indicator({
    hover: type === 'hover',
    persistent,
  });

  return (
    <Presence
      ref={mergedRefs}
      present={visible}
      {...props}
      className={cn(classNames, className)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        ...style,
      }}
    />
  );
};

HighlightIndicator.displayName = DISPLAY_NAME;
