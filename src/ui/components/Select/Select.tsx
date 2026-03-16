import { useState, type ComponentPropsWithRef } from 'react';
import { Popover } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createCollection, createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import { SelectLegend } from './SelectLegend';
import { SelectOption } from './SelectOption';
import { SelectTrigger } from './SelectTrigger';

const DISPLAY_NAME = 'Select';

type SelectContextValue = {
  value: string;
  open: boolean;
  currentNode: HTMLElement | null;
  onValueChange(value: string): void;
  onOpenChange(open: boolean): void;
  onCurrentNodeChange(node: HTMLElement): void;
};

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectOptionData = {
  node: HTMLElement;
  value: string;
  selected: boolean;
  disabled: boolean;
};

const [SelectCollection, useSelectCollection] = createCollection<
  HTMLElement,
  SelectOptionData
>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentPropsWithRef<typeof SelectTrigger>;
interface SelectProps extends BaseProps {
  id?: string;
  defaultValue?: string;
  defaultOpen?: boolean;
  value?: string;
  open?: boolean;
  onValueChange?(value: string): void;
  onOpenChange?(open: boolean): void;
}

export const Select = (inProps: SelectProps) => {
  const {
    open: openProp,
    value: valueProp,
    defaultOpen = false,
    defaultValue = '',
    children,
    onOpenChange,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const [currentNode, setCurrentNode] = useState<HTMLElement | null>(null);

  function handleValueChange(value: string) {
    setValue(value);
    setOpen(false);
  }

  return (
    <SelectContext
      value={value}
      open={open}
      currentNode={currentNode}
      onValueChange={handleValueChange}
      onOpenChange={setOpen}
      onCurrentNodeChange={setCurrentNode}
    >
      <SelectCollection>
        <Popover open={open} onOpenChange={setOpen}>
          <SelectTrigger {...props} />
          <SelectContent>{children}</SelectContent>
        </Popover>
      </SelectCollection>
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.useContext = useSelectContext;
Select.useCollection = useSelectCollection;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.Legend = SelectLegend;
Select.Option = SelectOption;
