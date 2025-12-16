import type { PolyProps } from '../polymorphic';
import { Presence } from '../Presence';

type CollapsibleProps = PolyProps<'div'> & {
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
