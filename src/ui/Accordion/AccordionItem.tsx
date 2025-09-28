import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useId,
  useState,
  useContext,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import AccordionContext from './accordionContext';
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

  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionItem must be used inside AccordionContext');
  }

  const { value, setValue } = context;

  const triggerId = useId();
  const contentId = useId();

  const [open, setOpen] = useState(false);

  function handleClick() {
    if (disabled) return;

    setOpen((open) => !open);
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
      <Collapsible
        id={contentId}
        role="region"
        aria-hidden={!open}
        aria-labelledby={triggerId}
        open={open}
      >
        <div className={classes.content}>{children}</div>
      </Collapsible>
    </Tag>
  );
};
