import { type PolyProps, Poly, useMergedRefs } from '@ui';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { useRef, useState } from 'react';
import { HighlightContext } from './highlightContext';

type HighlightProps = PolyProps<'div'>;

export const Highlight = (inProps: HighlightProps) => {
  const { ref: refProp, style, children, ...props } = inProps;

  const [rect, setRect] = useState<DOMRect | null>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  return (
    <Poly.div
      ref={mergedRef}
      {...props}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <HighlightContext rootRef={ref} rect={rect} onRectChange={setRect}>
        {children}
      </HighlightContext>
    </Poly.div>
  );
};

Highlight.displayName = 'Highlight';
Highlight.Indicator = HighlightIndicator;
Highlight.Item = HighlightItem;
