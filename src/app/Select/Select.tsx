import { useLayoutEffect, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';

const DISPLAY_NAME = 'Select';

type SelectContextValue = {
  value: string;
  onOpenChange(open: boolean): void;
  onValueChange(value: string): void;
  onTextValueChange(text?: string): void;
};

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectProps = NativeProps<'div'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?(value?: string): void;
};

export const Select = (inProps: SelectProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    children,
    onValueChange,
    ...props
  } = inProps;

  const [open, setOpen] = useState(true);
  const [textValue, setTextValue] = useState<string | undefined>();

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  useLayoutEffect(() => {
    /**
     * Required to properly load all select options.
     */
    setOpen(false);
  }, []);

  return (
    <SelectContext
      value={value}
      onOpenChange={setOpen}
      onValueChange={setValue}
      onTextValueChange={setTextValue}
    >
      <Native.div {...props}>
        <div onClick={() => setOpen(!open)}>
          {textValue || 'Select a value...'} ({value})
        </div>
        {open && children}
      </Native.div>
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.useContext = useSelectContext;
