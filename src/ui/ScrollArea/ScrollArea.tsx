import { useLayoutEffect, useState } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { ScrollAreaContext } from './scrollAreaContext';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar';
import { ScrollAreaViewport } from './ScrollAreaViewport';

const DISPLAY_NAME = 'ScrollArea';

type ScrollAreaProps = PolyProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { children, className, ...props } = inProps;

  const [viewport, setViewport] = useState<HTMLElement | null>(null);
  const [useCorner, setUseCorner] = useState(false);

  useLayoutEffect(() => {
    if (viewport) {
      const hasOverflowX = viewport.scrollWidth > viewport.offsetWidth;
      const hasOverflowY = viewport.scrollHeight > viewport.offsetHeight;
      setUseCorner(hasOverflowX && hasOverflowY);
    }
  }, [viewport]);

  return (
    <Poly.div
      data-scrollarea="root"
      className={cn(classes.root, className)}
      {...props}
    >
      <ScrollAreaContext
        viewport={viewport}
        useCorner={useCorner}
        setViewport={setViewport}
      >
        <ScrollAreaViewport>{children}</ScrollAreaViewport>
        <ScrollAreaScrollbar />
        <ScrollAreaScrollbar direction="horizontal" />
        {useCorner && (
          <div data-scrollarea="corner" className={classes.corner} />
        )}
      </ScrollAreaContext>
    </Poly.div>
  );
};

ScrollArea.displayName = DISPLAY_NAME;
