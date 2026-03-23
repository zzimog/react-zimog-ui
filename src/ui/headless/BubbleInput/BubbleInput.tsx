import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { BubbleInputSelect } from './BubbleInputSelect';

const DISPLAY_NAME = 'BubbleInput';

type BaseInputProps = ComponentPropsWithoutRef<'input'>;
type BaseProps = Omit<BaseInputProps, 'defaultValue' | 'defaultChecked'>;
type BubbleInputProps = BaseProps;

export const BubbleInput = (inProps: BubbleInputProps) => {
  const {
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

  const ref = useRef<HTMLInputElement>(null);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const node = ref.current;
    const previousValue = previousValueRef.current;
    if (node && value !== previousValue) {
      const { prototype } = HTMLInputElement;
      const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
      const setProp = descriptor?.set;

      if (setProp) {
        setProp.call(node, value);
        node.dispatchEvent(
          new Event(event, {
            bubbles: true,
            cancelable: true,
          })
        );
      }

      previousValueRef.current = value;
    }
  }, [prop, value, event]);

  return (
    <input
      ref={ref}
      type={type}
      aria-hidden
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
BubbleInput.Select = BubbleInputSelect;
