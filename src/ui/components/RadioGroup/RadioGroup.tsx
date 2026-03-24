import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';

const DISPLAY_NAME = 'RadioGroup';

type RadioGroupContextValue = {
  value: string;
  disabled: boolean;
  onValueChange(value: string): void;
};

const [RadioGroupContext, useRadioGroupContext] = createScopedContext<
  RadioGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type RadioGroupProps = NativeProps<'div'> & {
  defaultValue?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?(value: string): void;
};

export const RadioGroup = (inProps: RadioGroupProps) => {
  const {
    defaultValue,
    value: valueProp,
    required = false,
    disabled = false,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue ?? '',
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <RadioGroupContext
      value={value}
      disabled={disabled}
      onValueChange={setValue}
    >
      <Native.div role="radiogroup" aria-required={required} {...props} />
    </RadioGroupContext>
  );
};

RadioGroup.displayName = DISPLAY_NAME;
RadioGroup.useContext = useRadioGroupContext;
