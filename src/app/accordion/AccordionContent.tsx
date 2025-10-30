import { type PolyProps, cn, Collapsible } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';
import classes from './accordionClasses';

export type AccordionContentProps = PolyProps<typeof Collapsible>;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { className, ...props } = inProps;

  const { triggerId, contentId, open } = useAccordionItemContext();

  return (
    <Collapsible
      open={open}
      id={contentId}
      aria-labelledby={triggerId}
      className={cn(classes.content, className)}
      {...props}
    />
  );
};
