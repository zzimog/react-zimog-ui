import {
  Button,
  Card,
  Popover,
  useFocusGuards,
  useFocusScope,
  useMergedRefs,
} from '@ui';
import { type ComponentPropsWithRef, useEffect, useRef } from 'react';
import { DemoContainer } from './demo/DemoContainer';

const code = `// Example code
import { Popover } from '@ui';

export default () => (
  <Popover>
    <Popover.Trigger />
    <Popover.Content />
  </Popover>
);`;

const Content = (inProps: ComponentPropsWithRef<'div'>) => {
  const { ref, ...props } = inProps;

  const focusRef = useFocusScope();
  const mergedRef = useMergedRefs(ref, focusRef);

  useFocusGuards();

  return (
    <div
      ref={mergedRef}
      {...props}
      className="p-2 overflow-auto"
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
        }
      }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          tabIndex={0}
          className="p-2 rounded-shape outline-0 focus:bg-highlight"
          onPointerOver={({ target }) => (target as any).focus()}
        >
          {i}. Lorem ipsum dolor sit amet
        </div>
      ))}
    </div>
  );
};

const DemoPopover = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  function handleOpenChange(open: boolean) {
    if (open) {
      requestAnimationFrame(() => {
        const content = contentRef.current;
        if (content) {
          content.scrollTop = scrollRef.current;
        }
      });
    }
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement;
      //console.log(target);
    }

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <DemoContainer title="Popover" code={code}>
      <Popover onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button>Toggle</Button>
        </Popover.Trigger>
        <Popover.Content avoidCollisions>
          <Card className="flex flex-col w-80 max-h-80 p-0">
            <Content
              ref={contentRef}
              onScroll={(event) => {
                const target = event.target as Element;
                scrollRef.current = target.scrollTop;
              }}
            />
          </Card>
        </Popover.Content>
      </Popover>
    </DemoContainer>
  );
};

export default DemoPopover;
