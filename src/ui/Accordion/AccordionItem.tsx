import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useId,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import { Button } from '../Button';
import { Presence } from '../Presence';
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

  const triggerId = useId();
  const contentId = useId();

  const { index: contextIndex, value, setValue } = useAccordion();
  const index = `${contextIndex}`;

  const open = Array.isArray(value)
    ? value.includes(propValue || index)
    : value === (propValue || index);

  function handleClick() {
    if (disabled) return;

    setValue(propValue || index, !open);
  }

  return (
    <Tag
      data-disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      className={cn(classes.root, className)}
      {...props}
    >
      <Button
        id={triggerId}
        variant="ghost"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={handleClick}
        className={classes.trigger}
        disabled={disabled}
      >
        {title}
        <ChevronDown className={classes.arrow} />
      </Button>
      <Presence
        id={contentId}
        role="region"
        aria-hidden={!open}
        aria-labelledby={triggerId}
        open={open}
        className={[
          'data-[state="closed"]:animate-height-shrink',
          'data-[state="open"]:animate-height-grow',
        ].join(' ')}
      >
        <div className={classes.content}>{children}</div>
      </Presence>
    </Tag>
  );
};
