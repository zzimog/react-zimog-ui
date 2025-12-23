import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { useScrollAreaContext } from './context';
import classes from './classes';

const DISPLAY_NAME = 'ScrollAreaViewport';

export const ScrollAreaViewport = (inProps: NativeProps<'div'>) => {
  const { ref: refProp, className, children, ...props } = inProps;

  const { onViewportChange, onContentChange } =
    useScrollAreaContext(DISPLAY_NAME);

  const ref = useMergedRefs(refProp, onViewportChange);

  return (
    <Native.div
      ref={ref}
      data-scrollarea="viewport"
      className={cn(classes.viewport, className)}
      {...props}
    >
      <div
        ref={onContentChange}
        style={{
          minWidth: '100%',
          display: 'table',
        }}
      >
        {children}
      </div>
    </Native.div>
  );
};

ScrollAreaViewport.displayName = DISPLAY_NAME;
