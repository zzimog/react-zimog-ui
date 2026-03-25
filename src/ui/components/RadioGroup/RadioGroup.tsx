import { useId, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { cn, createCollection, createScopedContext } from '@ui/utils';
import { RadioGroupItem } from './RadioGroupItem';
import classes from './classes';

const DISPLAY_NAME = 'RadioGroup';

type RadioGroupContextValue = {
  baseId: string;
  name: string;
  value: string;
  disabled: boolean;
  onValueChange(value: string): void;
  onActiveIdChange(id: string): void;
};

const [RadioGroupContext, useRadioGroupContext] = createScopedContext<
  RadioGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type RadioGroupCollectionData = {
  node: HTMLElement;
  value: string;
  disabled: boolean;
};

const [RadioGroupCollection, useRadioGroupCollection] =
  createCollection<RadioGroupCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type RadioGroupProps = NativeProps<'div'> & {
  defaultValue?: string;
  value?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?(value: string): void;
};

export const RadioGroup = (inProps: RadioGroupProps) => {
  const {
    name: nameProp,
    defaultValue,
    value: valueProp,
    required = false,
    disabled = false,
    className,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue ?? '',
    prop: valueProp,
    onChange: onValueChange,
  });

  const [activeId, setActiveId] = useState<string | undefined>();

  const baseId = useId();
  const name = nameProp ?? baseId;

  return (
    <RadioGroupContext
      baseId={baseId}
      name={name}
      value={value}
      disabled={disabled}
      onValueChange={setValue}
      onActiveIdChange={setActiveId}
    >
      <RadioGroupCollection>
        <Native.div
          role="radiogroup"
          aria-required={required ? true : undefined}
          aria-disabled={disabled ? true : undefined}
          aria-activedescendant={activeId}
          tabIndex={-1}
          {...props}
          className={cn(classes.root, className)}
        />
      </RadioGroupCollection>
    </RadioGroupContext>
  );
};

RadioGroup.displayName = DISPLAY_NAME;
RadioGroup.useContext = useRadioGroupContext;
RadioGroup.useCollection = useRadioGroupCollection;
RadioGroup.Item = RadioGroupItem;
