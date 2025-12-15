import { type PolyProps, Button, cn, Presence } from '@ui';
import { useState } from 'react';
import { Container } from './App';
import { DemoContainer } from './demo/DemoContainer';

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
  const { open, className, style, ...props } = inProps;

  return (
    <Presence
      present={open}
      onMeasure={handleMeasure}
      {...props}
      className={cn(
        'data-[visible=true]:animate-height-grow',
        'data-[visible=false]:animate-height-shrink',
        className
      )}
      style={{
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <DemoContainer title="Collapsible" code="// Work in progress">
        <div className="w-80 h-50 flex flex-col justify-center">
          <Button onClick={() => setOpen(!open)}>Toggle</Button>
          <Collapsible open={open} className="bg-red-500">
            <p className="p-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              hic laborum consequatur facilis, necessitatibus officiis quia
              quidem reprehenderit aut ipsum tenetur ullam, deleniti error
              quisquam neque, explicabo dolorum iure nobis.
            </p>
          </Collapsible>
        </div>
      </DemoContainer>
    </Container>
  );
};
