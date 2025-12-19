import { useContext } from 'react';
import type { NativeProps } from '../Native';
import { Presence } from '../Presence';
import { useDisclosureContext } from './disclosureContext';
import { DisclosureItemContext } from './disclosureItemContext';

const DISPLAY_NAME = 'DisclosureContent';

type PresenceProps = Omit<NativeProps<typeof Presence>, 'present'>;
type DisclosureContentProps = PresenceProps & {
  value?: string;
};

function handleMeasure(node: HTMLElement) {
  const { width, height } = node.getBoundingClientRect();
  node.style.setProperty('--width', `${width}px`);
  node.style.setProperty('--height', `${height}px`);
}

export const DisclosureContent = (inProps: DisclosureContentProps) => {
  const { value: valueProp, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useContext(DisclosureItemContext);

  const value = valueProp || itemContext?.value;
  const open = !!value && context.value.includes(value);

  return <Presence present={open} onMeasure={handleMeasure} {...props} />;
};

DisclosureContent.displayName = DISPLAY_NAME;
