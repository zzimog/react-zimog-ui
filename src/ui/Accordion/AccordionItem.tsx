import { type ReactNode, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import { Collapsible } from '../Collapsible';
import { useAccordionContext } from './accordionContext';
import accordionClasses from './accordionClasses';
import { Poly, type PolyProps } from '../polymorphic';

const { item: classes } = accordionClasses;

export type AccordionItemProps = PolyProps<'div'> & {
  title: ReactNode;
  value?: string;
  disabled?: boolean;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { value: valueProp, disabled, className, children, ...props } = inProps;

  const id = useId();
  const valueId = useId();

  const { value: contextValue, setValue } = useAccordionContext();

  const value = valueProp ?? valueId;
  const triggerId = `${id}-trigger-${value}`;
  const contentId = `${id}-content-${value}`;

  const multiple = Array.isArray(contextValue);
  const open = multiple ? contextValue.includes(value) : contextValue === value;

  function handleClick() {
    if (!disabled) {
      setValue(value);
    }
  }

  return (
    <Poly.div
      data-disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      className={cn(classes.root, className)}
      {...props}
    >
      <Highlight.Item
        as="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={open}
        data-expanded={open}
        className={classes.trigger}
        disabled={disabled}
        onClick={handleClick}
      >
        wip
        <ChevronDown className={classes.arrow} />
      </Highlight.Item>
      <Collapsible
        open={open}
        id={contentId}
        role="region"
        aria-hidden={!open}
        aria-labelledby={triggerId}
      >
        <div className={classes.content}>{children}</div>
      </Collapsible>
    </Poly.div>
  );
};
