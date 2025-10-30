import { useLayoutEffect, useRef, useState } from 'react';
import { cn, type PolyProps } from '@ui';

type CollapsibleSize = {
  width: number;
  height: number;
};

export type CollapsibleProps = PolyProps<'div'> & {
  open?: boolean;
};

export const Collapsible = (inProps: CollapsibleProps) => {
  const { open, className, style, ...props } = inProps;

  const [size, setSize] = useState<null | CollapsibleSize>(
    open ? null : { width: 0, height: 0 }
  );

  const ref = useRef<HTMLDivElement>(null);

  const width = size?.width || 0;
  const height = size?.height || 0;

  const visible = size === null || width > 0 || height > 0;
  const shouldRender = open || visible;

  function handleAnimationEnd() {
    if (!open) {
      setSize({ width: 0, height: 0 });
    }
  }

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      const { width, height } = node.getBoundingClientRect();

      if (size !== null) {
        node.style.transitionDuration = null as any;
        node.style.animationName = null as any;
      }

      if (!open) {
        const style = getComputedStyle(node);
        const current = style.animationName;

        if (current === 'none') {
          handleAnimationEnd();
          return;
        }
      }

      setSize({ width, height });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      data-open={open}
      hidden={!shouldRender}
      className={cn(
        size && [
          'overflow-hidden',
          'data-[open="true"]:with-height-grow',
          'data-[open="false"]:with-height-shrink',
        ],
        className
      )}
      style={{
        ...style,
        animationFillMode: !open && visible ? 'forwards' : undefined,
        ['--width' as any]: width > 0 ? `${width}px` : undefined,
        ['--height' as any]: height > 0 ? `${height}px` : undefined,
      }}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    />
  );
};

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-80 h-100">
      <button onClick={() => setOpen(!open)}>toggle</button>
      <Collapsible open={open} className="bg-red-500">
        <div className="border p-2 h-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iste
          rerum perspiciatis minima similique vitae odio harum vero aut, ipsum
          consectetur, corporis beatae aliquid quisquam! Deserunt distinctio
          quasi itaque hic!
        </div>
      </Collapsible>
    </div>
  );
};

export default App;
