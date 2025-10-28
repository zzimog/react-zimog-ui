import { type PolyProps, Collapsible } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';

export type AccordionContentProps = PolyProps<typeof Collapsible>;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { ...props } = inProps;

  const { triggerId, contentId, open } = useAccordionItemContext();

  return (
    <Collapsible
      open={open}
      id={contentId}
      aria-labelledby={triggerId}
      {...props}
    />
  );
};
