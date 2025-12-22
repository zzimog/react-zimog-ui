import { useLayoutEffect, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar';
import { ScrollAreaViewport } from './ScrollAreaViewport';
import { ScrollAreaContext } from './context';
import classes from './classes';

const DISPLAY_NAME = 'ScrollArea';

type ScrollAreaProps = NativeProps<'div'>;

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { children, style, ...props } = inProps;

  const [viewport, setViewport] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);
  const [useCorner, setUseCorner] = useState(false);

  useLayoutEffect(() => {
    if (viewport) {
      const hasOverflowX = viewport.scrollWidth > viewport.offsetWidth;
      const hasOverflowY = viewport.scrollHeight > viewport.offsetHeight;

      setUseCorner(hasOverflowX && hasOverflowY);
    }
  }, [viewport]);

  return (
    <Native.div
      data-scrollarea="root"
      {...props}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <ScrollAreaContext
        useCorner={useCorner}
        viewport={viewport}
        content={content}
        onViewportChange={setViewport}
        onContentChange={setContent}
      >
        <ScrollAreaViewport>{children}</ScrollAreaViewport>
        <ScrollAreaScrollbar />
        <ScrollAreaScrollbar direction="horizontal" />
        {useCorner && (
          <div data-scrollarea="corner" className={classes.corner} />
        )}
      </ScrollAreaContext>
    </Native.div>
  );
};

ScrollArea.displayName = DISPLAY_NAME;
