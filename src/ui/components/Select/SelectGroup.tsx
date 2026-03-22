import { useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectGroup';

type SelectGroupContextValue = {
  disabled: boolean;
  onLegendIdChange(legendId?: string): void;
};

const [SelectGroupContext, useSelectGroupContext] = createScopedContext<
  Partial<SelectGroupContextValue>
>(DISPLAY_NAME, {});

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type SelectGroupProps = BaseProps & {
  disabled?: boolean;
};

export const SelectGroup = (inProps: SelectGroupProps) => {
  const { disabled = false, className, children, ...props } = inProps;

  const [legendId, setLegendId] = useState<string | undefined>();

  Select.useContext(DISPLAY_NAME);
  SelectContent.useContext(DISPLAY_NAME);

  return (
    <SelectGroupContext disabled={disabled} onLegendIdChange={setLegendId}>
      <Native.div
        role="group"
        aria-disabled={disabled || undefined}
        aria-labelledby={legendId}
        {...props}
        className={cn(classes.group, className)}
      >
        {children}
      </Native.div>
    </SelectGroupContext>
  );
};

SelectGroup.displayName = DISPLAY_NAME;
SelectGroup.useContext = useSelectGroupContext;
