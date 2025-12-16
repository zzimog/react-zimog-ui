import { Collapsible } from '../Collapsible_old';
import type { PolyProps } from '../polymorphic';
import classes from './accordionClasses';
import { useAccordionItemContext } from './accordionItemContext';

export type AccordionContentProps = PolyProps<typeof Collapsible>;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { className, children, ...props } = inProps;

  const { triggerId, contentId, open } = useAccordionItemContext();

  return (
    <Collapsible
      open={open}
      id={contentId}
      aria-labelledby={triggerId}
      className={className}
      {...props}
    >
      <div className={classes.content}>{children}</div>
    </Collapsible>
  );
};
