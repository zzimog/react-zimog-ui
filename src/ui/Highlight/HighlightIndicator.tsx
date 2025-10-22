import { useRef } from 'react';
import { poly } from '../polymorphic';
import { usePresence, useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './highlightClasses';

export type HighlightIndicatorProps = {
  visible?: boolean;
  rect?: DOMRect;
  persistent?: boolean;
};

export const HighlightIndicator = poly.div<HighlightIndicatorProps>(
  (Tag, inProps) => {
    const {
      ref: refProp,
      visible = true,
      rect,
      className,
      style,
      persistent = false,
      ...props
    } = inProps;

    const ref = useRef<HTMLElement>(null);

    const { ref: refPresence, present } = usePresence(persistent || visible);
    const mergedRefs = useMergedRefs(refProp, ref, refPresence);

    return (
      <Tag
        ref={mergedRefs}
        data-state={getState(visible)}
        className={cn(classes({ persistent }), className)}
        hidden={!present}
        style={{
          width: rect ? `${rect.width}px` : undefined,
          height: rect ? `${rect.height}px` : undefined,
          transform: rect ? `translate(${rect.x}px, ${rect.y}px)` : undefined,
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
