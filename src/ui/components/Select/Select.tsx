import { useState, type ComponentProps, type ReactElement } from 'react';
import { Popover } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createCollection, createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import { SelectLegend } from './SelectLegend';
import { SelectOption } from './SelectOption';
import { SelectTrigger } from './SelectTrigger';

const DISPLAY_NAME = 'Select';

interface SelectContextValue {
  value: string;
  open: boolean;
  currentNode: HTMLElement | null;
  onValueChange(value: string): void;
  onOpenChange(open: boolean): void;
  onCurrentNodeChange(node: HTMLElement): void;
}

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type OptionProps = ComponentProps<'option'>;
type OptionElement = ReactElement<OptionProps>;
interface SelectOptionsContextValue {
  options: Set<OptionElement>;
  onOptionAdd(option: OptionElement): void;
  onOptionRemove(option: OptionElement): void;
}

const [SelectOptionsContext, useSelectOptionsContext] = createScopedContext<
  SelectOptionsContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

interface SelectOptionData {
  node: HTMLElement;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

const [SelectCollection, useSelectCollection] = createCollection<
  HTMLElement,
  SelectOptionData
>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<typeof SelectTrigger>;
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

  const [options, setOptions] = useState<Set<OptionElement>>(new Set());
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
      <SelectOptionsContext
        options={options}
        onOptionAdd={(option) => {
          setOptions((prev) => new Set(prev).add(option));
        }}
        onOptionRemove={(option) => {
          setOptions((prev) => {
            const newSet = new Set(prev);
            newSet.delete(option);
            return newSet;
          });
        }}
      >
        <SelectCollection>
          <Popover open={open} onOpenChange={setOpen}>
            <SelectTrigger {...props} />
            <SelectContent>{children}</SelectContent>
          </Popover>
        </SelectCollection>
      </SelectOptionsContext>
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.useContext = useSelectContext;
Select.useOptionsContext = useSelectOptionsContext;
Select.useCollection = useSelectCollection;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.Legend = SelectLegend;
Select.Option = SelectOption;
