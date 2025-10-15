import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useId,
  useState,
  Children,
  useRef,
} from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';
import { Interaction } from '../Interaction';
import { Highlight } from '../Highlight';

type AccordionValue = string | string[] | undefined;

export type AccordionProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  children: ReactNode;
} & (
  | {
      multiple?: false;
      defaultValue?: string;
      value?: string;
      onValueChange?: (value?: string) => void;
    }
  | {
      multiple: true;
      defaultValue?: string[];
      value?: string[];
      onValueChange?: (value: string[]) => void;
    }
) &
  Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'value' | 'onChange'>;

export const Accordion = (inProps: AccordionProps) => {
  const {
    as: Tag = 'div',
    multiple,
    defaultValue,
    value: valueProp,
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  if (defaultValue && valueProp) {
    throw new Error(
      'Accordion cannot accept both `defaultValue` and `value` props.'
    );
  }

  const initValue = valueProp || defaultValue || (multiple ? [] : undefined);
  const [value, setValue] = useState<AccordionValue>(initValue);
  const [over, setOver] = useState(false);

  const highlightRef = useRef<HTMLElement>(null);

  const childrenCount = Children.count(children);

  const context = {
    value,
    setValue(itemValue: string) {
      if (multiple) {
        if (!Array.isArray(value)) {
          return;
        }

        const newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];

        onValueChange?.(newValue);
        setValue(newValue);
      } else {
        const isCurrent = itemValue === value;
        const newVal = isCurrent ? '' : itemValue;

        onValueChange?.(newVal);
        setValue(newVal);
      }
    },
  };

  function handleRectChange(rect?: DOMRect) {
    const node = highlightRef.current;
    if (node && rect) {
      const { y, height } = rect;

      Object.assign(node.style, {
        height: `${height}px`,
        transform: `translateY(${y}px)`,
      });
    }
  }

  return (
    <Interaction
      type="hover"
      onRectChange={handleRectChange}
      onOver={() => setOver(true)}
      onLeave={() => setOver(false)}
    >
      <Tag className={cn(classes.root, className)} {...props}>
        <Highlight
          ref={highlightRef}
          visible={over}
          className={classes.highlight}
        />
        <AccordionContext value={context}>
          {Children.map(children, (child, index) => {
            const isLast = index === childrenCount - 1;

            return (
              <>
                {child}
                {!isLast && <div className={classes.divider} />}
              </>
            );
          })}
        </AccordionContext>
      </Tag>
    </Interaction>
  );
};

Accordion.Item = AccordionItem;
