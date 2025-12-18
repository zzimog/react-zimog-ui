import { type NativeProps, Native } from '@ui';
import { useHighlightContext } from './highlightContext';

const DISPLAY_NAME = 'HighlightIndicator';

type HighlightIndicatorProps = NativeProps<'div'>;

export const HighlightIndicator = (inProps: HighlightIndicatorProps) => {
  const { style, ...props } = inProps;

  const context = useHighlightContext(DISPLAY_NAME);

  const { x, y, width, height } = context.rect ?? {};
  const transform = x && y ? `translate3d(${x}px, ${y}px, 0)` : undefined;

  return (
    <Native.div
      {...props}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
    />
  );
};

HighlightIndicator.displayName = DISPLAY_NAME;
