import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs, usePrevious } from '@ui/hooks';

const DISPLAY_NAME = 'BubbleInput';

type BaseProps = ComponentPropsWithRef<'input'>;
interface BubbleInputProps extends BaseProps {
  bubbles?: boolean;
}

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
      defaultValue={value}
      defaultChecked={checked}
      {...props}
      style={{
        display: 'none',
        ...style,
      }}
    />
  );
};

BubbleInput.displayName = DISPLAY_NAME;
