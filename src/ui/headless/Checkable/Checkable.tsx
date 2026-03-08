import type { ChangeEvent } from 'react';
import { useControllableState } from '@ui/hooks';
import { composeHandlers, createScopedContext } from '@ui/utils';
import { BubbleInput } from '../BubbleInput';
import { Native, type NativeProps } from '../Native';
import { CheckableIndicator } from './CheckableIndicator';

const DISPLAY_NAME = 'Checkable';

type CheckableContextValue = {
  checked: boolean;
  disabled?: boolean;
};

const [CheckableContext, useCheckableContext] = createScopedContext<
  CheckableContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = Omit<NativeProps<'button'>, 'type' | 'onChange'>;
interface CheckableProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  type?: 'checkbox' | 'radio';
  required?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  onCheckedChange?(checked: boolean): void;
}

export const Checkable = (inProps: CheckableProps) => {
  const {
    checked: checkedProp,
    defaultChecked,
    type = 'checkbox',
    name,
    disabled,
    required,
    form,
    children,
    onClick,
    onChange,
    onCheckedChange,
    ...props
  } = inProps;

  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
  });

  return (
    <CheckableContext checked={checked} disabled={disabled}>
      <Native.button
        role={type}
        type="button"
        aria-checked={checked}
        aria-required={required}
        disabled={disabled}
        {...props}
        onClick={composeHandlers(onClick, () => {
          setChecked((prev) => !prev);
        })}
      >
        {children}
      </Native.button>
      <BubbleInput
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        required={required}
        form={form}
        onChange={onChange}
      />
    </CheckableContext>
  );
};

Checkable.displayName = DISPLAY_NAME;
Checkable.useContext = useCheckableContext;
Checkable.Indicator = CheckableIndicator;
