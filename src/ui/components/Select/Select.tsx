import { useState, type PropsWithChildren } from 'react';
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
  placeholder: string;
  open: boolean;
  value: string;
  currentNode: HTMLElement | null;
  onOpenChange(open: boolean): void;
  onValueChange(value: string): void;
  onCurrentNodeChange(node: HTMLElement): void;
  onTriggerChange(node: HTMLElement): void;
};

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectOptionData = {
  node: HTMLElement;
  value: string;
  textContent: string;
  disabled: boolean;
};

const [SelectCollection, useSelectCollection] = createCollection<
  HTMLElement,
  SelectOptionData
>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type SelectProps = PropsWithChildren<{
  id?: string;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}>;

export const Select = (inProps: SelectProps) => {
  const {
    placeholder = '-',
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    defaultValue = '',
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [currentNode, setCurrentNode] = useState<HTMLElement | null>(null);

  function handleOpenChange(open: boolean) {
    setOpen(open);
    setTimeout(() => trigger?.focus());
  }

  function handleValueChange(value: string) {
    setValue(value);
    handleOpenChange(false);
  }

  return (
    <SelectContext
      placeholder={placeholder}
      open={open}
      value={value}
      currentNode={currentNode}
      onOpenChange={handleOpenChange}
      onValueChange={handleValueChange}
      onCurrentNodeChange={setCurrentNode}
      onTriggerChange={setTrigger}
    >
      <SelectCollection>
        <Popover open={open} onOpenChange={setOpen}>
          <SelectTrigger />
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
