import { useEffect, useRef, useState } from 'react';
import { Presence, type NativeProps } from '@ui/headless';
import { useAnimationFrame, useMergedRefs } from '@ui/hooks';
import { useHighlightContext } from './context';

const DISPLAY_NAME = 'HighlightIndicator';

type PresenceProps = Omit<NativeProps<typeof Presence>, 'present'>;
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
  const { ref: refProp, style, ...props } = inProps;

  const { /*type, leaveMode,*/ rootRef, currentRef } =
    useHighlightContext(DISPLAY_NAME);

  const [present, setPresent] = useState(false);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const prevPresentRef = useRef(present);
  const prevRectRef = useRef<DOMRect>(null);

  useEffect(() => {
    prevPresentRef.current = present;
  }, [present]);

  useAnimationFrame(() => {
    const root = rootRef.current;
    const current = currentRef.current;
    if (root && current) {
      const { borderTop, borderLeft } = getComputedStyle(root);
      const rootRect = root.getBoundingClientRect();
      const currentRect = current.getBoundingClientRect();

      const rect = new DOMRect(
        currentRect.x - rootRect.x - parseInt(borderLeft),
        currentRect.y - rootRect.y - parseInt(borderTop),
        currentRect.width,
        currentRect.height
      );

      const wasHidden = !prevPresentRef.current;
      const prevRect = prevRectRef.current;
      if (wasHidden || prevRect === null || !rectEquals(rect, prevRect)) {
        const node = ref.current;
        if (node) {
          node.style.setProperty('--x', `${rect.x}px`);
          node.style.setProperty('--y', `${rect.y}px`);
          node.style.setProperty('--width', `${rect.width}px`);
          node.style.setProperty('--height', `${rect.height}px`);
        }

        prevRectRef.current = rect;
        setPresent(true);
      }
    } else if (!current) {
      //prevRectRef.current = null;
      setPresent(false);
    }
  }, []);

  const rect = prevRectRef.current;

  return (
    <Presence
      ref={mergedRefs}
      present={present}
      data-visible={present}
      {...props}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        ...{
          ['--x']: rect ? `${rect.x}px` : undefined,
          ['--y']: rect ? `${rect.y}px` : undefined,
          ['--width']: rect ? `${rect.width}px` : undefined,
          ['--height']: rect ? `${rect.height}px` : undefined,
        },
        ...style,
      }}
    />
  );
};

HighlightIndicator.displayName = DISPLAY_NAME;
