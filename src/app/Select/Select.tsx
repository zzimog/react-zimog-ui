import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';

const DISPLAY_NAME = 'Select';

type SelectContextValue = {
  value: string;
  onValueChange(value: string): void;
};

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectProps = NativeProps<'div'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
};

export const Select = (inProps: SelectProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <SelectContext value={value} onValueChange={setValue}>
      Current value: {value}
      <Native.div {...props} />
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.useContext = useSelectContext;
