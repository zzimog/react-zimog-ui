import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleElement } from './CollapsibleElement';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { CollapsibleContext } from './context';

type CollapsibleProps = NativeProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?(open: boolean): void;
};

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    defaultOpen = false,
    open: openProp,
    children,
    onOpenChange,
    ...props
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  return (
    <Native.div data-open={open} {...props}>
      <CollapsibleContext open={open} onOpenChange={setOpen}>
        {children}
      </CollapsibleContext>
    </Native.div>
  );
};

Collapsible.displayName = 'Collapsible';
Collapsible.Content = CollapsibleContent;
Collapsible.Element = CollapsibleElement;
Collapsible.Trigger = CollapsibleTrigger;
