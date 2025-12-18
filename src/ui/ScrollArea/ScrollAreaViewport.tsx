import { useMergedRefs } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { useScrollAreaContext } from './scrollAreaContext';

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
