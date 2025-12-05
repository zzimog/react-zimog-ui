import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './scrollAreaClasses';
import { useScrollAreaContext } from './scrollAreaContext';

const DISPLAY_NAME = 'ScrollAreaViewport';

export const ScrollAreaViewport = (inProps: PolyProps<'div'>) => {
  const { ref: refProp, className, ...props } = inProps;

  const { setViewport } = useScrollAreaContext(DISPLAY_NAME);
  const ref = useMergedRefs(refProp, setViewport);

  return (
    <Poly.div
      ref={ref}
      data-scrollarea="viewport"
      className={cn(classes.viewport, className)}
      {...props}
    />
  );
};

ScrollAreaViewport.displayName = DISPLAY_NAME;
