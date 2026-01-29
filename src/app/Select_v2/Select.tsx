import { useState, type PropsWithChildren } from 'react';
import { Popover } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { createCollection } from './create-collection';
import { SelectContent } from './SelectContent';
import { SelectOption } from './SelectOption';
import classes from './classes';

const DISPLAY_NAME = 'Select';

type SelectContextValue = {
  value: string;
  onValueChange(value: string, text: string): void;
  onOpenChange(open: boolean): void;
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
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}>;

export const Select = (inProps: SelectProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  function handleValueChange(value: string, text: string) {
    setValue(value);
    setText(text);
  }

  return (
    <SelectContext
      value={value}
      onValueChange={handleValueChange}
      onOpenChange={setOpen}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger className={classes.trigger}>
          <div>Value: {value}</div>
          <div>TextContent: {text}</div>
        </Popover.Trigger>
        <SelectCollection>
          <SelectContent>{children}</SelectContent>
        </SelectCollection>
      </Popover>
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.useContext = useSelectContext;
Select.useCollection = useSelectCollection;
Select.Content = SelectContent;
Select.Option = SelectOption;
