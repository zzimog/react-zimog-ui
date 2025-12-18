import type { NativeProps } from '../Native';
import { Presence } from '../Presence';

type CollapsibleProps = NativeProps<'div'> & {
  open?: boolean;
  forceMount?: boolean;
};

function handleMeasure(node: HTMLElement) {
  const { width, height } = node.getBoundingClientRect();
  node.style.setProperty('--width', `${width}px`);
  node.style.setProperty('--height', `${height}px`);
}

export const Collapsible = (inProps: CollapsibleProps) => {
  const { open, ...props } = inProps;

  return <Presence present={open} onMeasure={handleMeasure} {...props} />;
};
