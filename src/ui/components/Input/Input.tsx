import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { InputAddon } from './InputAddon';
import { InputGroup } from './InputGroup';
import { useInputGroup } from './context';
import classes from './classes';

const DISPLAY_NAME = 'Input';

type InputProps = NativeProps<'input'>;

export const Input = (inProps: InputProps) => {
  const { ref, type, className, ...props } = inProps;

  const { onInputElementChange } = useInputGroup(DISPLAY_NAME);

  const mergedRefs = useMergedRefs(ref, (node: HTMLInputElement) =>
    onInputElementChange?.(node)
  );

  const isRadio = type === 'radio';
  const isCheckable = type === 'checkbox' || isRadio;

  return (
    <Native.input
      ref={mergedRefs}
      type={type}
      {...props}
      className={cn(
        classes.input({
          check: isCheckable,
          radio: isRadio,
        }),
        className
      )}
    />
  );
};

Input.displayName = DISPLAY_NAME;
Input.Group = InputGroup;
Input.Addon = InputAddon;
