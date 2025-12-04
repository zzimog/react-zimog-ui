import { type PolyProps, Poly } from '../polymorphic';
import classes from './scrollAreaClasses';
import { useScrollAreaContext } from './scrollAreaContext';

const DISPLAY_NAME = 'ScrollAreaViewport';

export const ScrollAreaViewport = (inProps: PolyProps<'div'>) => {
  const { ...props } = inProps;

  const context = useScrollAreaContext(DISPLAY_NAME);

  return (
    <Poly.div
      data-scrollarea="viewport"
      className={classes.viewport}
      {...props}
    />
  );
};

ScrollAreaViewport.displayName = DISPLAY_NAME;
