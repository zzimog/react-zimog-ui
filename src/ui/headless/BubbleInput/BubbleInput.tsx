import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';
import { usePrevious } from '../../hooks/use-previous';

const DISPLAY_NAME = 'BubbleInput';

type BubbleInputProps = ComponentPropsWithRef<'input'> & {
  bubbles?: boolean;
};

export const BubbleInput = (inProps: BubbleInputProps) => {
  const {
    ref: refProp,
    bubbles = true,
    type,
    value,
    checked,
    style,
    ...props
  } = inProps;

  const isCheckable = type === 'checkbox' || type === 'radio';
  const event = isCheckable ? 'click' : 'input';
  const propName = isCheckable ? 'checked' : 'value';
  const propValue = isCheckable ? checked : value;

  const prevValue = usePrevious(propValue);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const Property = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        propName
      ) as PropertyDescriptor;
      const SetProperty = Property.set;

      if (propValue !== prevValue && SetProperty) {
        SetProperty.call(node, propValue);
        node.dispatchEvent(new Event(event, { bubbles }));
      }
    }
  }, [propName, propValue, prevValue, event, bubbles]);

  return (
    <input
      ref={mergedRef}
      type={type}
      defaultValue={propValue as string}
      defaultChecked={propValue as boolean}
      {...props}
      style={{
        display: 'none',
        ...style,
      }}
    />
  );
};

BubbleInput.displayName = DISPLAY_NAME;
