import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';

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
    value: valueProp,
    checked: checkedProp,
    style,
    ...props
  } = inProps;

  const isCheckable = type === 'checkbox' || type === 'radio';
  const event = isCheckable ? 'click' : 'input';
  const prop = isCheckable ? 'checked' : 'value';
  const value = isCheckable ? checkedProp : valueProp;

  const previousValueRef = useRef(value);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  useEffect(() => {
    const node = ref.current;
    const previousValue = previousValueRef.current;
    if (node && value !== previousValue) {
      const Property = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        prop
      ) as PropertyDescriptor;

      if (Property.set) {
        Property.set.call(node, value);
        node.dispatchEvent(new Event(event, { bubbles }));
      }

      previousValueRef.current = value;
    }
  }, [prop, value, event, bubbles]);

  return (
    <input
      ref={mergedRef}
      type={type}
      defaultValue={valueProp}
      defaultChecked={checkedProp}
      {...props}
      style={{
        display: 'none',
        ...style,
      }}
    />
  );
};

BubbleInput.displayName = DISPLAY_NAME;
