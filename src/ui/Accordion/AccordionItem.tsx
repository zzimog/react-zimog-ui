import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useId,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import { Interaction } from '../Interaction';
import { Collapsible } from '../Collapsible';
import { useAccordion } from './accordionContext';
import accordionClasses from './accordionClasses';

const { item: classes } = accordionClasses;

export type AccordionItemProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  title: ReactNode;
  disabled?: boolean;
  value?: string;
} & HTMLAttributes<HTMLElement>;

export const AccordionItem = (inProps: AccordionItemProps) => {
  const {
    as: Tag = 'div',
    title,
    disabled,
    value: propValue,
    className,
    children,
    ...props
  } = inProps;

  const id = useId();
  const valueId = useId();

  const { value: contextValue, setValue } = useAccordion();

  const value = propValue ?? valueId;
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
    <Tag
      data-disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      className={cn(classes.root, className)}
      {...props}
    >
      <Interaction.Node
        as="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={open}
        data-expanded={open}
        className={classes.trigger}
        onClick={handleClick}
        disabled={disabled}
      >
        {title}
        <ChevronDown className={classes.arrow} />
      </Interaction.Node>
      <Collapsible
        open={open}
        id={contentId}
        role="region"
        aria-hidden={!open}
        aria-labelledby={triggerId}
      >
        <div className={classes.content}>{children}</div>
      </Collapsible>
    </Tag>
  );
};
