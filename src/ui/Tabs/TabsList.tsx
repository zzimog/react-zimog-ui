import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import classes from './tabsClasses';

export const TabsList = (inProps: PolyProps<typeof Poly.div>) => {
  const { className, children, ...props } = inProps;

  return (
    <Highlight
      role="tabslist"
      className={cn(classes.list.root, className)}
      persistent
      {...props}
    >
      <Highlight.Indicator />
      <div className={classes.list.tabs}>{children}</div>
    </Highlight>
  );
};
