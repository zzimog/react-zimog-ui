import { type PolyProps, Poly } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';

export type AccordionContentProps = PolyProps<'div'>;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { ...props } = inProps;

  const { triggerId, contentId, open } = useAccordionItemContext();

  if (!open) {
    return null;
  }

  return <Poly.div id={contentId} aria-labelledby={triggerId} {...props} />;
};
