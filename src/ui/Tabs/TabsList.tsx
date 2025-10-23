import { poly } from '../polymorphic';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import classes from './tabsClasses';

export const TabsList = poly.div((Tag, inProps) => {
  const { className, children, ...props } = inProps;

  return (
    <Highlight
      as={Tag}
      role="tabslist"
      className={cn(classes.list.root, className)}
      persistent
      {...props}
    >
      <Highlight.Indicator />
      <div className={classes.list.tabs}>{children}</div>
    </Highlight>
  );
});
