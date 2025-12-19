import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { Accordion } from '../Accordion';
import { useControllableState } from '../hooks';

type BaseCollapsibleProps = Omit<
  ComponentPropsWithRef<typeof Accordion.Item>,
  'value'
>;

type CollapsibleProps = BaseCollapsibleProps & {
  title?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?(open: boolean): void;
};

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    ...props
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  function handleValueChange(value: string) {
    setOpen(value === String(open));
  }

  return (
    <Accordion
      asChild
      defaultValue={String(open)}
      onValueChange={handleValueChange}
    >
      <Accordion.Item value="true" {...props} />
    </Accordion>
  );
};

Collapsible.displayName = 'Collapsible';
