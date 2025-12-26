import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, Popover, useControllableState } from '@ui';
import classes from './selectClasses';
import { SelectContext } from './selectContext';
import { SelectOption } from './SelectOption';
import { SelectOptionsGroup } from './SelectOptionsGroup';

type SelectProps = ComponentPropsWithoutRef<'button'> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

function getFocusables(container: HTMLElement) {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as HTMLElement);
  }

  return nodes;
}

function getFocusableEdges(container: HTMLElement) {
  const focusables = getFocusables(container);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  return [first, last];
}

export const Select = (inProps: SelectProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const [node, setNode] = useState<HTMLElement | undefined>(undefined);
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const context = {
    value,
    setOpen,
    setSelected(value: string, node: HTMLElement) {
      setValue(value);
      setNode(node);
    },
  };

  function handleOpenChange(open: boolean) {
    setOpen(open);
  }

  const prevFocusRef = useRef<HTMLElement>(null);

  //useFocusGuards(open);

  useEffect(() => {
    function handleFocusIn(event: Event) {
      const target = event.target as HTMLElement;
      const content = contentRef.current;
      if (content) {
        const [first, last] = getFocusableEdges(content);
        const prevFocus = prevFocusRef.current;

        if (!content.contains(target)) {
          if (prevFocus === first) {
            last.focus();
            prevFocusRef.current = last;
          }

          if (prevFocus === last) {
            first.focus();
            prevFocusRef.current = first;
          }
        } else {
          prevFocusRef.current = target;
        }
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      const content = contentRef.current;
      if (content) {
        const focusables = getFocusables(content);
        const current = document.activeElement as HTMLElement;
        const currentIndex = current ? focusables.indexOf(current) : -1;
        let newIndex = undefined;

        if (event.key === 'ArrowUp') {
          newIndex = currentIndex - 1;

          if (newIndex < 0) {
            newIndex = focusables.length - 1;
          }
        } else if (event.key === 'ArrowDown') {
          newIndex = currentIndex + 1;

          if (newIndex === focusables.length) {
            newIndex = 0;
          }
        }

        if (newIndex !== undefined) {
          focusables[newIndex].focus();
          event.preventDefault();
        }
      }
    }

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (open && width) {
      node?.focus();
      node?.scrollIntoView({ block: 'nearest' });
    } else {
      triggerRef.current?.focus();
    }
  }, [node, open, width]);

  useLayoutEffect(() => {
    setOpen(false);
  }, []);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (open && trigger) {
      const { width } = trigger.getBoundingClientRect();
      setWidth(width);
    } else {
      setWidth(undefined);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        ref={triggerRef}
        role="combobox"
        className={cn(classes.trigger, className)}
        {...props}
      >
        {node?.innerText || '-'}
        <ChevronDown className={classes.arrow} />
      </Popover.Trigger>
      <Popover.Content
        ref={contentRef}
        align="start"
        tabIndex={-1}
        className={classes.portal}
        style={{
          ['--width' as any]: width ? `${width}px` : undefined,
        }}
      >
        <div className={classes.content}>
          <SelectContext value={context}>{children}</SelectContext>
        </div>
      </Popover.Content>
    </Popover>
  );
};

Select.displayName = 'Select';
Select.Option = SelectOption;
Select.OptionsGroup = SelectOptionsGroup;
