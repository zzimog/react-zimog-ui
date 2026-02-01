import { useId } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Select } from './Select';
import { SelectGroup } from './SelectGroup';
import classes from './classes';

const DISPLAY_NAME = 'SelectLegend';

type SelectLegendProps = NativeProps<'div'>;

export const SelectLegend = (inProps: SelectLegendProps) => {
  const { ref: refProp, className, ...props } = inProps;

  const id = useId();

  const { onLegendIdChange } = SelectGroup.useContext(DISPLAY_NAME);

  const ref = useMergedRefs(refProp, (node: Element) => {
    onLegendIdChange?.(node?.id);
  });

  Select.useContext(DISPLAY_NAME);

  return (
    <Native.div
      ref={ref}
      id={id}
      role="presentation"
      {...props}
      className={cn(classes.legend, className)}
    />
  );
};

SelectLegend.displayName = DISPLAY_NAME;
