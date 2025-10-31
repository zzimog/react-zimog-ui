import { Highlight } from '../Highlight';
import { type PolyProps } from '../polymorphic';
import { cn } from '../utils';
import classes from './tabsClasses';

export const TabsList = (inProps: PolyProps<'div'>) => {
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
